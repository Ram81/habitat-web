// Copyright (c) Facebook, Inc. and its affiliates.
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

/* global Module */

import PsiturkEventLogger from "./event_logger";
import { inventorySlots } from "./defaults";
import Inventory from "./inventory";
import TaskValidator from "./task_validator";

/**
 * PickPlaceTask class
 */
class PickPlaceTask {
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
    this.lastInteractedObjectId = -1;
    this.inventory = new Inventory(inventorySlots);
    this.taskValidator = null;

    this.inventory.initInventory(components.inventory);

    if (this.components.taskValidator) {
      this.taskValidator = this.components.taskValidator;
    }

    this.psiturk = new PsiturkEventLogger(window.psiTurk);

    this.actions = [
      { name: "moveForward", key: "w", keyCode: 87 },
      { name: "moveBackward", key: "s", keyCode: 83 },
      { name: "turnLeft", key: "ArrowLeft", keyCode: 37 },
      { name: "turnRight", key: "ArrowRight", keyCode: 39 },
      { name: "turnLeft", key: "a", keyCode: 65 },
      { name: "turnRight", key: "d", keyCode: 68 },
      { name: "lookUp", key: "ArrowUp", keyCode: 38 },
      { name: "lookDown", key: "ArrowDown", keyCode: 40 },
      { name: "grabReleaseObject", key: " ", keyCode: 32 }
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
    this.initPhysics();
  }

  initPhysics() {
    this.activeActions = [];
    this.activeActionIdx = 0;
    this.frameCounter = 0;
    this.numRendersSinceLastUpdate = 0;
    this.frameCounter = 0;
    this.frameRate = 20.0;
    if (Module.enablePhysics && window.config.runFlythrough !== true) {
      console.log("enabled physics step at 100ms interval");
      this.physicsStepFunction = setInterval(() => {
        let action = this.popAction();
        if (action != "noOp") {
          // step action from the queue
          this.handleAction(action);
        }
        let stepSize = 1.0 / this.frameRate;
        let startTime = new Date().getTime();
        // Step world physics
        this.sim.stepWorld(stepSize);
        // Render observation
        this.render();

        // Log current state for replay
        let agentState = this.sim.getAgentPose();
        let objectStates = this.sim.getObjectStates();
        let objectUnderCrosshair = this.sim.getObjectUnderCrosshair()[
          "nearestObjectId"
        ];
        let objectDropPoint = [];
        if (this.sim.grippedObjectId != -1) {
          objectDropPoint = this.sim.findObjectFloorPositionUnderCrosshair()[
            "newObjectPosition"
          ];
          objectDropPoint = this.sim.convertVector3ToVec3f(objectDropPoint);
        }
        this.psiturk.handleRecordTrialData("TEST", "stepPhysics", {
          step: stepSize,
          agentState: agentState,
          objectStates: objectStates,
          objectUnderCrosshair: objectUnderCrosshair,
          objectDropPoint: objectDropPoint,
          totalTime: new Date().getTime() - startTime
        });
        this.frameCounter += 1;
      }, 1000.0 / this.frameRate);
    }
  }

  disablePhysics() {
    if (this.physicsStepFunction) {
      console.log("clearing physics interval on reset");
      window.clearInterval(this.physicsStepFunction);
    }
  }

  /**
   * Reset the task.
   */
  reset() {
    this.lastInteractedObjectId = -1;
    this.disablePhysics();
    this.sim.reset();
    this.inventory.reset();
    this.inventory.renderInventory();
    this.setStatus("Ready");
    this.initPhysics();
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

    this.sim.updateCrossHairNode(this.sim.getCrosshairPosition());
    this.sim.drawBBAroundNearestObject();
    this.sim.showDropPoint();

    this.renderImage();

    this.numRendersSinceLastUpdate += 1;
  }

  handleInventoryUpdate(isCollision) {
    let objectId = this.sim.grippedObjectId;
    if (isCollision) {
      this.setStatus("Collision while releasing object!");
      return;
    }
    if (objectId == -1) {
      let slot = this.inventory.findObjectSlot(this.lastInteractedObjectId);
      if (slot != -1) {
        this.inventory.setSlot(slot, undefined);
      }
    } else {
      let emptySlot = this.inventory.getEmptySlot();
      let object = this.sim.getObjectFromScene(objectId);

      if (emptySlot == -1) {
        console.log("No empty slot in inventory!");
      } else {
        this.inventory.setSlot(emptySlot, {
          objectId: objectId,
          object: object["object"],
          objectIcon: object["objectIcon"]
        });
      }
    }
    this.lastInteractedObjectId = objectId;
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
      if (action == "grabReleaseObject") {
        this.removeActiveAction(action);
      }
      return action;
    }
    return "noOp";
  }

  handleAction(action) {
    let actionData = {};
    let collision = false;
    if (action == "grabReleaseObject") {
      let data = this.sim.inventoryGrabReleaseObject();
      this.handleInventoryUpdate(data["collision"]);
      this.inventory.renderInventory();
      actionData = data;
      if (actionData["actionFailed"] == true) {
        this.setErrorStatus("Release action failed");
        return;
      }
    } else {
      collision = this.sim.step(action, true);
    }

    // Log action and action data
    let agentState = this.sim.getAgentPose();
    let logData = {
      action: action,
      agentState: agentState
    };

    let objectStates = this.sim.getObjectStates();
    let objectUnderCrosshair = this.sim.getObjectUnderCrosshair()[
      "nearestObjectId"
    ];
    let objectDropPoint = [];
    if (this.sim.grippedObjectId != -1) {
      objectDropPoint = this.sim.findObjectFloorPositionUnderCrosshair()[
        "newObjectPosition"
      ];
      objectDropPoint = this.sim.convertVector3ToVec3f(objectDropPoint);
    }

    logData["objectUnderCrosshair"] = objectUnderCrosshair;
    logData["nearestObjectId"] = this.sim.nearestObjectId;
    logData["grippedObjectId"] = this.sim.grippedObjectId;
    logData["objectDropPoint"] = objectDropPoint;
    logData["objectStates"] = objectStates;
    logData["collision"] = collision;

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

export default PickPlaceTask;
