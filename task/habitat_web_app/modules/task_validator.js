// Copyright (c) Facebook, Inc. and its affiliates.
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

/**
 * TaskValidator class
 */
import PsiturkEventLogger from "./event_logger";

class TaskValidator {
  // PUBLIC methods.

  /**
   * Create task validator.
   * @param {object} episode - task config
   */
  constructor(episode, sim) {
    this.episode = episode;
    this.sim = sim;
    this.task = this.episode.task;
    this.psiturk = new PsiturkEventLogger(window.psiTurk);
  }

  validate() {
    if (this.task === undefined) {
      return true;
    }
    this.psiturk.handleRecordTrialData("TEST", "handleValidation", {
      action: "STOP"
    });
    if (this.task.type === "arrangement") {
      return this.validateArrangementTask();
    } else if (this.task.type === "cleaning") {
      return this.validateCleaningTask();
    } else if (this.task.type == "objectnav") {
      return this.validateObjectNavTask();
    }
  }

  validateArrangementTask() {
    let goal = this.task.goals;
    if (goal === undefined || goal.objectToReceptacleMap === undefined) {
      return true;
    }

    if (this.sim.grippedObjectId != -1) {
      return false;
    }

    let objectToGoalMap = goal.objectToReceptacleMap;
    let objectsInScene = this.sim.getObjectsInScene();
    let episode = this.sim.episode;
    let taskStarted = false;

    // Check if objects have moved from the initial position
    let objectsInitialState = episode.objects;
    for (let index in objectsInitialState) {
      let objectId = objectsInitialState[index]["objectId"];
      let objectInitialTranslation = objectsInitialState[index]["position"];
      let objectTranslation = this.sim.convertVector3ToVec3f(
        this.sim.getTranslation(objectId, 0)
      );

      let distance = this.sim.geodesicDistance(
        objectInitialTranslation,
        objectTranslation
      );
      if (distance > 0) {
        taskStarted = true;
      }
    }

    for (let key in objectToGoalMap) {
      let sourceObjectId = objectsInScene[parseInt(key)]["objectId"];
      let sourcePosition = this.sim.convertVector3ToVec3f(
        this.sim.getTranslation(sourceObjectId, 0)
      );
      let receptacles = objectToGoalMap[key];

      let success = false;
      for (let i = 0; i < receptacles.length; i++) {
        let receptacleObjectId = objectsInScene[receptacles[i]]["objectId"];
        let receptaclePosition = this.sim.convertVector3ToVec3f(
          this.sim.getTranslation(receptacleObjectId, 0)
        );

        let distance = this.sim.geodesicDistance(
          sourcePosition,
          receptaclePosition
        );
        let receptacleY =
          receptaclePosition[1] +
          this.sim.getObjectBBYCoord(receptacleObjectId);
        if (distance <= 0.7 && sourcePosition[1] > receptacleY) {
          success = true;
        }
      }
      if (!success) {
        return false;
      }
    }
    return true && taskStarted;
  }

  validateObjectNavTask() {
    let goals = this.episode.goals;
    if (goals === undefined) {
      return true;
    }

    let taskSuccess = false;
    for (let goal in goals) {
      let objectGoal = this.episode.goals[goal];

      for (let viewPointt in objectGoal.view_points) {
        let viewPoint = objectGoal.view_points[viewPointt];
        let position = viewPoint.agent_state.position;

        let agentTransform = this.sim.getAgentTransformation(
          this.sim.selectedAgentId
        );
        let agentPosition = this.sim.convertVector3ToVec3f(
          agentTransform.translation()
        );

        let dist = this.sim.geodesicDistance(agentPosition, position);

        if (dist < 0.1) {
          taskSuccess = true;
        }
      }
    }
    return taskSuccess;
  }
}

export default TaskValidator;
