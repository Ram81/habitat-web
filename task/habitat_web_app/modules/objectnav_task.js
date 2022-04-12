// Copyright (c) Facebook, Inc. and its affiliates.
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

import PsiturkEventLogger from "./event_logger";
import TaskValidator from "./task_validator";

/**
 * ObjectNavTask class
 */
class ObjectNavTask {
  // PUBLIC methods.

  /**
   * Create navigate task.
   * @param {SimEnv} sim - simulator
   * @param {Object} components - dictionary with status and canvas elements
   */
  constructor(sim, components) {
    this.sim = sim;
    this.components = components;
    this.keyBindListener = null;
    this.taskValidator = null;
    this.taskConfig = null;

    if (this.components.taskValidator) {
      this.taskValidator = this.components.taskValidator;
    }
    if (this.components.taskConfig) {
      this.taskConfig = this.components.taskConfig;
    }

    this.psiturk = new PsiturkEventLogger(window.psiTurk);

    this.actions = [
      { name: "moveForward", key: "w", keyCode: 87 },
      { name: "turnLeft", key: "ArrowLeft", keyCode: 37 },
      { name: "turnRight", key: "ArrowRight", keyCode: 39 },
      { name: "turnLeft", key: "a", keyCode: 65 },
      { name: "turnRight", key: "d", keyCode: 68 },
      { name: "lookUp", key: "ArrowUp", keyCode: 38 },
      { name: "lookDown", key: "ArrowDown", keyCode: 40 }
    ];
  }

  /**
   * Initialize the task. Should be called once.
   */
  init() {
    this.bindKeys();
    this.psiturk.handleRecordTrialData("TEST", "simInitialized", {
      config: window.config
    });
    this.initialized = true;
    this.initRendering();
  }

  initRendering() {
    this.activeActions = [];
    this.activeActionIdx = 0;
    this.frameCounter = 0;
    this.frameRate = 7.0;
    if (window.config.runFlythrough !== true) {
      console.log("enabled rendering step at 100ms interval");
      this.renderingFunction = setInterval(() => {
        let action = this.popAction();
        if (action != "noOp") {
          // Step action from the queue
          this.handleAction(action);
        }

        // Render observation
        this.render();
        this.frameCounter += 1;
      }, 1000.0 / this.frameRate);
    }
  }

  disableRendering() {
    if (this.renderingFunction) {
      console.log("clearing rendering interval on reset");
      window.clearInterval(this.renderingFunction);
    }
  }

  /**
   * Reset the task.
   */
  reset() {
    this.disableRendering();
    this.sim.reset();
    this.setStatus("Ready");
    this.initRendering();
    this.render();
  }

  setTaskValidator(epsiode) {
    this.taskValidator = new TaskValidator(epsiode, this.sim);
  }

  // PRIVATE methods.

  setStatus(text) {
    this.components.status.style = "color:white";
    this.components.status.innerHTML = text;
  }

  setErrorStatus(text) {
    this.components.status.style = "color:red";
    this.components.status.innerHTML = text;
  }

  setWarningStatus(text) {
    this.components.status.style = "color:orange";
    this.components.status.innerHTML = text;
  }

  setSuccessStatus(text) {
    this.components.status.style = "color:green";
    this.components.status.innerHTML = text;
  }

  renderImage() {
    this.sim.displayObservation("rgb");
  }

  render() {
    this.renderImage();
    this.renderImage();
  }

  validateTask() {
    if (window.config.runFlythrough) {
      return false;
    }
    return this.taskValidator.validate();
  }

  pushAction(action) {
    if (this.activeActions.length == 0) {
      this.activeActions.push(action);
    }
  }

  popAction() {
    if (this.activeActions.length > 0) {
      this.activeActionIdx = 0;
      let action = this.activeActions[this.activeActionIdx];
      return action;
    }
    return "noOp";
  }

  handleAction(action) {
    this.sim.step(action);
    let logData = {
      action: action
    };
    // Log action and agent state
    if (this.taskConfig.logState) {
      let agentState = this.sim.getAgentPose();
      logData["agentState"] = agentState;
    }
    this.psiturk.handleRecordTrialData("TEST", "handleAction", logData);
  }

  removeActiveAction(action) {
    const index = this.activeActions.indexOf(action);
    if (index > -1) {
      this.activeActions.splice(index, 1);
    }
  }

  handleKeypressUp(key) {
    for (let a of this.actions) {
      if (a.keyCode === key) {
        this.removeActiveAction(a.name);
        break;
      }
    }
  }

  handleKeypress(key) {
    for (let a of this.actions) {
      if (a.keyCode === key) {
        this.pushAction(a.name);
        break;
      }
    }
  }

  bindKeys() {
    var _self = this;
    if (_self.keyBindListener) {
      console.log("Keys already bound. Returning");
      return;
    }
    _self.keyBindListener = function(event) {
      event.preventDefault();
      _self.handleKeypress(event.keyCode);
    };
    document.addEventListener("keydown", _self.keyBindListener, true);

    _self.keyBindListener2 = function(event) {
      event.preventDefault();
      _self.handleKeypressUp(event.keyCode);
    };
    document.addEventListener("keyup", _self.keyBindListener2, true);
  }

  unbindKeys() {
    if (this.keyBindListener) {
      document.removeEventListener("keydown", this.keyBindListener, true);
      this.keyBindListener = null;

      document.removeEventListener("keyup", this.keyBindListener2, true);
      this.keyBindListener2 = null;
    }
  }
}

export default ObjectNavTask;
