// Copyright (c) Facebook, Inc. and its affiliates.
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

/* global Module */
import {
  defaultAgentConfig,
  defaultEpisode,
  defaultResolution,
  taskConfigs
} from "./defaults";
import SimEnv from "./simenv_embind";
import ObjectNavTask from "./objectnav_task";
import PickPlaceTask from "./pick_place_task";
import {
  buildConfigFromURLParameters,
  loadEpisode,
  getObjectIconImgTags
} from "./utils";
import TaskValidator from "./task_validator";

class WebDemo {
  currentResolution = defaultResolution;

  constructor(canvasId = "canvas") {
    this.canvasId = canvasId;
  }

  initializeModules(
    agentConfig = defaultAgentConfig,
    episode = defaultEpisode
  ) {
    this.taskConfig = taskConfigs[window.config.dataset];

    this.config = new Module.SimulatorConfiguration();
    this.config.allowSliding = this.taskConfig.allowSliding;

    this.config.scene_id = Module.scene;
    this.config.enablePhysics = Module.enablePhysics;
    this.config.physicsConfigFile = Module.physicsConfigFile;

    this.simenv = new SimEnv(this.config, episode, 0);
    this.task_type = episode["task"]["type"];
    this.setEpisode(episode);

    agentConfig = this.updateAgentConfigWithSensors({ ...agentConfig });

    this.simenv.addAgent(agentConfig);
    this.simenv.updateCrossHairNode(this.simenv.resolution);

    this.canvasElement = document.getElementById(this.canvasId);

    this.taskValidator = new TaskValidator(episode, this.simenv);
    this.task = this.instantiateTask(window.config.dataset);
  }

  instantiateTask(dataset) {
    let task = null;
    if (dataset == "objectnav") {
      task = new ObjectNavTask(this.simenv, {
        canvas: this.canvasElement,
        fps: document.getElementById("fps"),
        scope: document.getElementById("scope"),
        status: document.getElementById("status"),
        taskValidator: this.taskValidator
      });
    } else if (dataset == "pick_and_place") {
      task = new PickPlaceTask(this.simenv, {
        canvas: this.canvasElement,
        fps: document.getElementById("fps"),
        inventory: document.getElementById("inventory"),
        scope: document.getElementById("scope"),
        status: document.getElementById("status"),
        taskValidator: this.taskValidator
      });
    }
    return task;
  }

  setEpisode(episode) {
    let taskInstruction = document.getElementById("task-instruction");
    let assistance = document.getElementById("text-assistance-1");
    if (taskInstruction !== undefined && taskInstruction !== null) {
      taskInstruction.innerHTML =
        "<hr> <h4>Task: " + episode.task.instruction + "</h4> <hr>";
    }
    if (assistance !== undefined && assistance !== null) {
      let objectIconTags = getObjectIconImgTags(episode);
      if (
        objectIconTags["objects"].length > 0 &&
        objectIconTags["receptacles"].length > 0 &&
        episode["task"]["type"] == "arrangement"
      ) {
        assistance.innerHTML =
          "<div class='object-type'> Object: </div> <ul>" +
          objectIconTags["objects"].join("\n") +
          "</ul>" +
          "<br/><div class='object-type'> Receptacle: </div> <ul>" +
          objectIconTags["receptacles"].join("\n") +
          "</ul>";
      }
    }
    this.simenv.setEpisode(episode);
  }

  setTaskValidator(episode) {
    this.task.setTaskValidator(episode);
  }

  runFlythrough() {
    window.config.disableLogging = true;
    window.config.runFlythrough = true;
    window.config.actualTask = false;
    this.task.reset();
  }

  runInit() {
    window.config.disableLogging = false;
    window.config.runFlythrough = false;
    window.config.actualTask = true;
    let episodeId = window.config.episodeId;
    let taskPathSplitted = window.config.datasetPath.split("/");
    let episode = loadEpisode(
      "/data/".concat(taskPathSplitted[taskPathSplitted.length - 1]),
      episodeId,
      window.config.dataset
    );
    this.setEpisode(episode);
    this.setTaskValidator(episode);
    this.task.reset();
  }

  runTrainingTask() {
    window.config.disableLogging = true;
    window.config.runFlythrough = false;
    window.config.actualTask = false;
    let taskPathSplitted = window.config.datasetPath.split("/");
    let episode = loadEpisode(
      "/data/".concat(taskPathSplitted[taskPathSplitted.length - 1]),
      0,
      window.config.dataset
    );
    this.setEpisode(episode);
    this.setTaskValidator(episode);
    this.task.reset();
  }

  updateAgentConfigWithSensors(agentConfig = defaultAgentConfig) {
    const sensorConfigs = [
      {
        uuid: "rgb",
        sensorType: Module.SensorType.COLOR,
        position: this.taskConfig["sensorConfig"]["position"],
        hfov: 79,
        resolution: [480, 640]
      }
    ];
    const actionSpace = new Module.ActionSpace();
    const moveActuationSpec = new Module.MapStringFloat();
    moveActuationSpec.set("amount", this.taskConfig["actuationSpec"]["move"]);
    const turnActuationSpec = new Module.MapStringFloat();
    turnActuationSpec.set("amount", this.taskConfig["actuationSpec"]["turn"]);
    const actions = this.taskConfig["actions"];
    for (let action in actions) {
      action = actions[action];
      if (action.includes("move")) {
        actionSpace.set(
          action,
          new Module.ActionSpec(action, moveActuationSpec)
        );
      } else {
        actionSpace.set(
          action,
          new Module.ActionSpec(action, turnActuationSpec)
        );
      }
    }

    agentConfig.sensorSpecifications = sensorConfigs;
    agentConfig.actionSpace = actionSpace;
    agentConfig = this.updateAgentConfigWithResolution(agentConfig);

    return agentConfig;
  }

  resetCanvas(resolution) {
    this.canvasElement.width = resolution.width;
    this.canvasElement.height = resolution.height;
  }

  updateAgentConfigWithResolution(agentConfig) {
    agentConfig.sensorSpecifications.forEach(sensorConfig => {
      sensorConfig.resolution = [
        this.currentResolution.height,
        this.currentResolution.width
      ];
    });

    return agentConfig;
  }

  display(agentConfig = defaultAgentConfig, episode = {}) {
    const config = buildConfigFromURLParameters();
    if (config.useDefaultEpisode) {
      episode = defaultEpisode;
    }

    this.initializeModules(agentConfig, episode);

    this.task.init();
    this.task.reset();
  }

  validateTask() {
    this.task.validateTask();
  }
}

export default WebDemo;
