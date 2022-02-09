// Copyright (c) Facebook, Inc. and its affiliates.
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

/*global Module */

import {
  primitiveObjectHandles,
  fileBasedObjects,
  largeScenes,
  defaultAgentConfig
} from "./defaults";
import { getRandomInt } from "./utils";
import PsiturkEventLogger from "./event_logger";

/**
 * SimEnv class
 *
 * TODO(aps,msb) - Add support for multiple agents instead of
 * hardcoding 0th one.
 */
class SimEnv {
  // PUBLIC methods.

  /**
   * Create a simulator.
   * @param {Object} config - simulator config
   * @param {Object} episode - episode to run
   * @param {number} agentId - default agent id
   */
  constructor(config, episode = {}, agentId = 0) {
    if (largeScenes.includes(config.scene_id)) {
      config.textureDownsampleFactor = 1;
    }
    this.sim = new Module.Simulator(config);
    this.pathfinder = this.sim.getPathFinder();
    this.psiturk = new PsiturkEventLogger(window.psiTurk);

    this.resolution = null;
    this.grippedObjectId = -1;
    this.nearestObjectId = -1;
    this.gripOffset = null;
    this.selectedAgentId = agentId;
    this.agentObjectHandle = primitiveObjectHandles[0];

    this.setEpisode(episode);
    this.maxDistance = 2.0;
    this.objectIndexx = 108;
    this.islandRadiusLimit = 1.8;
    this.recomputeNavMesh();
    this.locobot_id = -1;
  }

  /**
   * Resets the simulation.
   */
  reset() {
    this.sim.reset();
    if (this.initialAgentState !== null) {
      const agent = this.sim.getAgent(this.selectedAgentId);
      agent.setState(this.initialAgentState, true);
    }

    this.grippedObjectId = -1;
    this.nearestObjectId = -1;
    this.gripOffset = null;
    this.psiturk.handleRecordTrialData("TEST", "simReset", {});
  }

  /**
   * Change selected agent in the simulation.
   * @param {number} agentId - agent id
   */
  changeAgent(agentId) {
    this.selectedAgentId = agentId;
  }

  /**
   * Set episode and initialize agent state.
   * @param {Object} episode - episode config
   */
  setEpisode(episode = {}) {
    this.removeAllObjects();
    this.episode = episode;
    this.initialAgentState = null;
    this.objectsInScene = [];

    this.initialize_THDA_episode(episode);
    if (Object.keys(episode).length > 0) {
      this.initialAgentState = this.createAgentState(episode.startState);
      // add agent object for collision test
      this.sim.addContactTestObject(this.agentObjectHandle, 0);
      if (episode.objects !== undefined) {
        let objects = JSON.parse(JSON.stringify(episode.objects));

        objects.sort(function(a, b) {
          var keyA = a["objectId"];
          var keyB = b["objectId"];

          if (keyA < keyB) {
            return -1;
          }
          if (keyA > keyB) {
            return 1;
          }
          return 0;
        });
        for (let index in objects) {
          let objectLibHandle = objects[index]["objectHandle"];
          let position = this.convertVec3fToVector3(objects[index]["position"]);
          let rotation = this.quatFromCoeffs(objects[index]["rotation"]);

          let objectId = this.addObjectAtLocation(
            objectLibHandle,
            position,
            rotation,
            Module.MotionType.DYNAMIC
          );
          this.addObjectInScene(objectId, objects[index]);
          // adding contact test shape for object
          this.sim.addContactTestObject(objectLibHandle, 0);
          episode.objects[index]["simObjectId"] = objectId;
          episode.objects[index]["prevObjectId"] =
            episode.objects[index]["objectId"];
          episode.objects[index]["objectId"] = objectId;
        }
      }
    } else {
      // add agent object for collision test
      this.sim.addContactTestObject(this.agentObjectHandle, 0);
    }
    let episodeCopy = JSON.parse(JSON.stringify(episode));
    if (window.config.dataset == "objectnav" && episode.is_thda != true) {
      episodeCopy.goals = [];
    }
    this.psiturk.handleRecordTrialData("TEST", "setEpisode", {
      episode: episodeCopy
    });
  }

  initialize_THDA_episode(episode) {
    let scene_state = episode.scene_state;
    if (scene_state !== undefined) {
      let objects = scene_state.objects;

      for (let idx in objects) {
        let object = objects[idx];

        let objectTemplate = object["object_template"].split("/");
        let objectLibHandle =
          "/data/objects/" +
          objectTemplate[objectTemplate.length - 1] +
          ".object_config.json";
        let position = this.convertVec3fToVector3(object["position"]);
        let rotation = this.quatFromCoeffs(object["rotation"]);

        this.addObjectAtLocation(
          objectLibHandle,
          position,
          rotation,
          Module.MotionType.STATIC
        );
      }
      this.recomputeNavMesh();
    }
  }

  /**
   * Update cross hair node position.
   */
  updateCrossHairNode(postion) {
    this.sim.updateCrossHairNode(postion);
  }

  addObjectInScene(objectId, objectTemplate) {
    let object = JSON.parse(JSON.stringify(objectTemplate));
    object["objectId"] = objectId;
    this.objectsInScene.push(object);
  }

  updateObjectInScene(prevObjectId, newObjectId) {
    for (let index = 0; index < this.objectsInScene.length; index++) {
      if (this.objectsInScene[index]["objectId"] == prevObjectId) {
        this.objectsInScene[index]["objectId"] = newObjectId;
        break;
      }
    }
  }

  getObjectFromScene(objectId) {
    for (let index = 0; index < this.objectsInScene.length; index++) {
      if (this.objectsInScene[index]["objectId"] == objectId) {
        return this.objectsInScene[index];
      }
    }
    return null;
  }

  getObjectsInScene() {
    return this.objectsInScene;
  }

  /**
   * Sync objects grabbed by agent to agent body.
   */
  syncObjects() {
    this.sim.syncGrippedObject(this.grippedObjectId);
  }

  /**
   * Adds a dynamic object at specific position in simulation.
   */
  addObjectAtLocation(
    objectLibHandle,
    position,
    rotation,
    motionType = Module.MotionType.STATIC
  ) {
    let objectId = this.addObjectByHandle(objectLibHandle);
    this.setTranslation(position, objectId, 0);
    this.setRotation(rotation, objectId, 0);
    this.setObjectMotionType(motionType, objectId, 0);
    return objectId;
  }

  /**
   * Remove all existing objects
   */
  removeAllObjects() {
    let existingObjectIds = this.getExistingObjectIDs();

    for (let index = existingObjectIds.size() - 1; index >= 0; index--) {
      let objectId = existingObjectIds.get(index);
      let object = this.getObjectFromScene(objectId);

      this.removeObject(objectId);
      if (window.config.dataset != "objectnav") {
        this.sim.removeContactTestObject(object["objectHandle"], 0);
      }
    }
    this.sim.clearRecycledObjectIds();
  }

  /**
   * Take one step in the simulation.
   * @param {string} action - action to take
   */
  step(action, checkCollision = false) {
    const agent = this.sim.getAgent(this.selectedAgentId);
    if (checkCollision) {
      let agentTransform = this.getAgentTransformation(this.selectedAgentId);
      let data = this.isAgentColliding(action, agentTransform);
      if (data["collision"]) {
        return true;
      }
    }
    agent.act(action);
    return false;
  }

  /**
   * Add an agent to the simulation.
   * @param {Object} config - agent config
   */
  addAgent(config) {
    let agentConfig = this.createAgentConfig(config);
    this.resolution = this.flipVec2i(
      agentConfig.sensorSpecifications.get(0).resolution
    );
    return this.sim.addAgent(agentConfig);
  }

  /**
   * Adds an instance of the specified object mesh to the environment.
   * @param {number} objectLibIndex - index of the object's template
   * @param {number} sceneId - specifies which physical scene to add an object to
   * @returns {number} object ID or -1 if object was unable to be added
   */
  addObject(objectLibIndex) {
    // using default values for rest of the params
    return this.sim.addObject(objectLibIndex, null, "", 0);
  }

  /**
   * Remove an instanced object by ID
   * @param {number} objectID - index of the object's template
   * @param {boolean} deleteObjectNode - if true, deletes the object's scene node
   * @param {boolean} deleteVisualNode - if true, deletes the object's visual node
   * @param {number} sceneId - specifies which physical scene to remove an object from
   */
  removeObject(objectId) {
    // using default values for rest of the params
    this.sim.removeObject(objectId, true, true, 0);
  }

  /**
   * Adds an instance of the specified object mesh to the environment.
   * @param {string} objectLibHandle - object's template config/origin handle
   * @returns {number} object ID or -1 if object was unable to be added
   */
  addObjectByHandle(objectLibHandle) {
    // using default values for rest of the params
    return this.sim.addObjectByHandle(objectLibHandle, null, "", 0);
  }

  /**
   * Add a random primitive object to the environment.
   * @returns {number} object ID or -1 if object was unable to be added
   */
  addPrimitiveObject() {
    let primitiveObjectIdx = getRandomInt(primitiveObjectHandles.length);
    let objectLibHandle = primitiveObjectHandles[primitiveObjectIdx];
    let objectId = this.addObjectByHandle(objectLibHandle);
    let agentTransform = this.getAgentTransformation(0);
    let position = agentTransform.transformPoint(
      new Module.Vector3(0.1, 1.5, -1.5)
    );
    this.setTranslation(position, objectId, 0);
    return objectId;
  }

  /**
   * Add a random file based object to the environment.
   * @returns {number} object ID or -1 if object was unable to be added
   */
  addTemplateObject() {
    let fileBasedObjectIdx = this.objectIndexx; // getRandomInt(fileBasedObjects["objects"].length);
    let objectLibHandle =
      fileBasedObjects["objects"][fileBasedObjectIdx]["objectHandle"];
    let objectId = this.addObjectByHandle(objectLibHandle);
    let agentTransform = this.getAgentTransformation(0);
    let position = agentTransform.transformPoint(
      new Module.Vector3(0.1, 1.5, -1.5)
    );
    this.setTranslation(position, objectId, 0);
    fileBasedObjects["objects"][fileBasedObjectIdx]["isReceptacle"] = false;
    this.addObjectInScene(
      objectId,
      fileBasedObjects["objects"][fileBasedObjectIdx]
    );
    this.sim.addContactTestObject(
      fileBasedObjects["objects"][fileBasedObjectIdx]["objectHandle"],
      0
    );
    this.objectIndexx += 1;
    return objectId;
  }

  /**
   * Add a random primitive object to the environment.
   * @returns {number} object ID or -1 if object was unable to be added
   */
  removeLastObject() {
    let existingObjectIds = this.getExistingObjectIDs();
    if (existingObjectIds.size() > 0) {
      this.removeObject(existingObjectIds.get(existingObjectIds.size() - 1));
    }
  }

  /**
   * Grab or release object under cross hair.
   * @returns {number} object ID or -1 if object was unable to be added
   */
  grabReleaseObject() {
    let nearestObjectId = this.getObjectUnderCrosshair();
    let agentTransform = this.getAgentTransformation(0);

    if (this.grippedObjectId != -1) {
      // already gripped, so let it go
      this.setTransformation(
        agentTransform.mul(this.gripOffset),
        this.grippedObjectId,
        0
      );

      let position = this.getTranslation(this.grippedObjectId, 0);
      let isNav = this.pathfinder.isNavigable(
        this.convertVector3ToVec3f(position),
        0.5
      );
      // check for collision (apparently this is always true)
      if (!isNav) {
        console.log("Colliding with object or position is not navigable");
        return;
      }

      this.setObjectMotionType(
        Module.MotionType.STATIC,
        this.grippedObjectId,
        0
      );
      this.grippedObjectId = -1;
      this.drawBBAroundNearestObject();
    } else if (nearestObjectId != -1) {
      this.gripOffset = agentTransform
        .inverted()
        .mul(this.getTransformation(nearestObjectId, 0));
      this.setObjectMotionType(Module.MotionType.KINEMATIC, nearestObjectId, 0);
      this.grippedObjectId = nearestObjectId;
    } else {
      return;
    }

    this.recomputeNavMesh();
  }

  /**
   * Grab or release object under cross hair to inventory.
   * @returns {number} object ID or -1 if object was unable to be added
   */
  inventoryGrabReleaseObject() {
    let crossHairdata = this.getObjectUnderCrosshair();
    let nearestObjectId = crossHairdata["nearestObjectId"];
    let grabAction = false;
    let releaseAction = false;
    let actionData = {};

    if (this.grippedObjectId != -1) {
      releaseAction = true;

      let data = this.findObjectFloorPositionUnderCrosshair();
      let newObjectPosition = data["newObjectPosition"];
      let invalidDropPoint = data["collision"];

      if (invalidDropPoint) {
        return {
          actionFailed: true
        };
      }
      let object = this.getObjectFromScene(this.grippedObjectId);

      // Drop object at collision free location
      let newObjectId = this.addObjectByHandle(object["objectHandle"]);
      this.setTranslation(newObjectPosition, newObjectId, 0);
      this.setObjectMotionType(Module.MotionType.DYNAMIC, newObjectId, 0);

      this.updateObjectInScene(this.grippedObjectId, newObjectId);
      // record action data
      actionData = {
        newObjectTranslation: this.convertVector3ToVec3f(newObjectPosition),
        newObjectId: newObjectId,
        objectHandle: object["objectHandle"],
        grippedObjectId: this.grippedObjectId
      };

      this.grippedObjectId = -1;
    } else if (nearestObjectId != -1) {
      grabAction = true;
      this.grippedObjectTransformation = this.getTransformation(
        nearestObjectId,
        0
      );
      // Check if object is not a receptacle to grab
      let object = this.getObjectFromScene(nearestObjectId);
      if (object["isReceptacle"] !== true) {
        this.removeObject(nearestObjectId, 0);
        this.grippedObjectId = nearestObjectId;
      }
      actionData = {
        grippedObjectId: this.grippedObjectId
      };
    }

    return {
      grabAction: grabAction,
      releaseAction: releaseAction,
      objectUnderCrosshair: nearestObjectId,
      grippedObjectId: this.grippedObjectId,
      nearestObjectId: this.nearestObjectId,
      actionMeta: actionData
    };
  }

  /**
   * Get the observation space for a given sensorId.
   * @param {number} sensorId - id of sensor
   * @returns {ObservationSpace} observation space of sensor
   */
  getObservationSpace(sensorId) {
    return this.sim.getAgentObservationSpace(this.selectedAgentId, sensorId);
  }

  /**
   * Get an observation from the given sensorId.
   * @param {number} sensorId - id of sensor
   * @param {Observation} obs - observation is read into this object
   */
  getObservation(sensorId, obs) {
    this.sim.getAgentObservation(this.selectedAgentId, sensorId, obs);
    return obs;
  }

  /**
   * Get the PathFinder for the scene.
   * @returns {PathFinder} pathFinder of the scene
   */
  getPathFinder() {
    return this.sim.getPathFinder();
  }

  /**
   * Get the motion type of an object.
   * @param {number} objectID - object id identifying the object in sim.existingObjects_
   * @param {number} sceneID - scene id
   * @returns {MotionType} object MotionType or ERROR_MOTIONTYPE if query failed
   */
  getObjectMotionType(objectID, sceneID) {
    return this.sim.getObjectMotionType(objectID, sceneID);
  }

  /**
   * Set the motion type of an object.
   * * @param {MotionType} motionType - desired motion type of the object
   * @param {number} objectID - object id identifying the object in sim.existingObjects_
   * @param {number} sceneID - scene id
   * @returns {bool} object MotionType or ERROR_MOTIONTYPE if query failed
   */
  setObjectMotionType(motionType, objectID, sceneID) {
    return this.sim.setObjectMotionType(motionType, objectID, sceneID);
  }

  /**
   * Get the IDs of the physics objects instanced in a physical scene.
   * @param {number} sceneID - scene id
   * @returns {Array} list of existing object Ids in the scene
   */
  getExistingObjectIDs(sceneId = 0) {
    return this.sim.getExistingObjectIDs(sceneId);
  }

  /**
   * Set the 4x4 transformation matrix of an object kinematically.
   * @param {Magnum::Matrix4} transform - desired 4x4 transform of the object.
   * @param {number} objectID - object id identifying the object in sim.existingObjects_
   * @param {number} sceneID - scene id
   */
  setTransformation(transform, objectID, sceneID) {
    this.sim.setTransformation(transform, objectID, sceneID);
  }

  /**
   * Get the current 4x4 transformation matrix of an object.
   * @param {number} objectID - object id identifying the object in sim.existingObjects_
   * @param {number} sceneID - scene id
   * @returns {Magnum::Matrix4} 4x4 transform of the object
   */
  getTransformation(objectID, sceneID) {
    return this.sim.getTransformation(objectID, sceneID);
  }

  /**
   * Get the current 3D position of an object.
   * @param {number} objectID - object id identifying the object in sim.existingObjects_
   * @param {number} sceneID - scene id
   * @returns {Magnum::Vector3} 3D position of the object
   */
  getTranslation(objectID, sceneID) {
    return this.sim.getTranslation(objectID, sceneID);
  }

  /**
   * Set the 3D position of an object kinematically.
   * @param {Magnum::Vector3} translation - 3D position of the object
   * @param {number} objectID - object id identifying the object in sim.existingObjects_
   * @param {number} sceneID - scene id
   */
  setTranslation(translation, objectID, sceneID) {
    this.sim.setTranslation(translation, objectID, sceneID);
  }

  /**
   * Get the current orientation of an object.
   * @param {number} objectID - object id identifying the object in sim.existingObjects_
   * @param {number} sceneID - scene id
   * @returns {Magnum::Vector3} quaternion representation of the object's orientation
   */
  getRotation(objectID, sceneID) {
    return this.sim.getRotation(objectID, sceneID);
  }

  /**
   * Set the orientation of an object kinematically.
   * @param {Magnum::Vector3} rotation - desired orientation of the object
   * @param {number} objectID - object id identifying the object in sim.existingObjects_
   * @param {number} sceneID - scene id
   */
  setRotation(rotation, objectID, sceneID) {
    this.sim.setRotation(rotation, objectID, sceneID);
  }

  /**
   * Turn on/off rendering for the bounding box of the object's visual
   * component.
   * @param {boolean} drawBB - whether or not the render the bounding box
   * @param {number} objectID - object id identifying the object in sim.existingObjects_
   * @param {number} sceneID - scene id
   */
  setObjectBBDraw(drawBB, objectID, sceneID) {
    this.sim.setObjectBBDraw(drawBB, objectID, sceneID);
  }

  /**
   * @param {double} dt - step the physical world forward in time by a desired duration.
   * @returns {double} world time after step
   */
  stepWorld(dt = 1.0 / 60.0) {
    return this.sim.stepWorld(dt);
  }

  getWorldTime() {
    return this.sim.getWorldTime();
  }

  /**
   * Display an observation from the given sensorId
   * to canvas selected as default frame buffer.
   * @param {number} sensorId - id of sensor
   */
  displayObservation(sensorId) {
    this.sim.displayObservation(0, sensorId);
  }

  /**
   * Get the semantic scene.
   * @returns {SemanticScene} semantic scene
   */
  getSemanticScene() {
    return this.sim.getSemanticScene();
  }

  contactTest(objectId) {
    return this.sim.contactTest(objectId, 0);
  }

  getAgent(agentId) {
    return this.sim.getAgent(agentId);
  }

  getAgentTransformation(agentId) {
    return this.sim.getAgentTransformation(agentId);
  }

  getAgentAbsoluteTranslation(agentId) {
    return this.sim.getAgentAbsoluteTranslation(agentId);
  }

  getAgentRotation(agentId) {
    return this.sim.getAgentRotation(agentId);
  }

  getAgentSensorSuite(agentId) {
    return this.sim.getAgentSensorSuite(agentId);
  }

  getAgentState() {
    let state = new Module.AgentState();
    const agent = this.sim.getAgent(this.selectedAgentId);
    agent.getState(state);
    return state;
  }

  getCrosshairPosition() {
    let center = this.resolution.map(function(element) {
      return element * 0.5;
    });
    return center;
  }

  getObjectUnderCrosshair() {
    let crossHairPosition = this.getCrosshairPosition();
    let ray = this.unproject(crossHairPosition);
    let crossHairPoint = ray.direction;
    let refPoint = this.getAgentAbsoluteTranslation(0);

    let nearestObjectId = this.findNearestObjectUnderCrosshair(
      crossHairPoint,
      refPoint,
      this.resolution
    );
    return {
      nearestObjectId: nearestObjectId,
      crossHairPoint: this.convertVector3ToVec3f(crossHairPoint),
      refPoint: this.convertVector3ToVec3f(refPoint),
      crossHairPosition: crossHairPosition
    };
  }

  drawBBAroundNearestObject() {
    let objectId = this.getObjectUnderCrosshair()["nearestObjectId"];
    if (objectId == -1) {
      if (
        this.nearestObjectId != -1 &&
        this.grippedObjectId != this.nearestObjectId
      ) {
        this.setObjectBBDraw(false, this.nearestObjectId, 0);
        this.nearestObjectId = objectId;
      }
    } else {
      if (
        this.nearestObjectId != -1 &&
        this.grippedObjectId != this.nearestObjectId
      ) {
        this.setObjectBBDraw(false, this.nearestObjectId, 0);
        this.nearestObjectId = -1;
      }
      // Don't draw bb around receptacles
      let object = this.getObjectFromScene(objectId);
      if (object["isReceptacle"] === true) {
        return;
      }
      if (this.nearestObjectId != objectId) {
        this.nearestObjectId = objectId;
        this.setObjectBBDraw(true, this.nearestObjectId, 0);
      }
    }
  }

  showDropPoint() {
    if (this.grippedObjectId === -1) {
      let position = this.getAgentAbsoluteTranslation(0);
      position = new Module.Vector3(
        position.x(),
        position.y() - 0.5,
        position.z()
      );
      this.updateDropPointNode(position);
    } else {
      let data = this.findObjectFloorPositionUnderCrosshair();
      let newObjectPosition = data["newObjectPosition"];
      this.updateDropPointNode(newObjectPosition);
    }
  }

  updateDropPointNode(position) {
    this.sim.updateDropPointNode(position);
  }

  findObjectFloorPositionUnderCrosshair() {
    // Object already gripped, so let it go
    let crossHairPosition = this.getCrosshairPosition();
    let ray = this.unproject(crossHairPosition);
    let crossHairPoint = ray.direction;
    let refTransform = this.getAgentTransformation(0);

    // Get raycast hit point
    let rayHitInfo = this.sim.findFloorPositionUnderCrosshair(
      crossHairPoint,
      refTransform,
      this.resolution,
      this.maxDistance
    );
    let floorPosition = rayHitInfo.point;
    if (floorPosition == null) {
      return true;
    }

    // use original Y value to keep object on the floor if crosshair is pointing on ground
    let newObjectPosition = new Module.Vector3(
      floorPosition.x(),
      floorPosition.y(),
      floorPosition.z()
    );

    let object = this.getObjectFromScene(this.grippedObjectId);

    // Collision check on drop point
    let collision = this.isCollision(object["objectHandle"], newObjectPosition);
    let count = 0;
    while (collision && count < 2) {
      newObjectPosition = new Module.Vector3(
        newObjectPosition.x(),
        newObjectPosition.y() + 0.25,
        newObjectPosition.z()
      );
      collision = this.isCollision(object["objectHandle"], newObjectPosition);
      count += 1;
    }
    let snappedPoint = this.pathfinder.snapPoint(newObjectPosition);
    snappedPoint = this.convertVector3ToVec3f(snappedPoint);
    let isOnSeparateIsland =
      this.pathfinder.islandRadius(snappedPoint) < this.islandRadiusLimit;

    let y_diff = Math.abs(
      refTransform.translation().y() - newObjectPosition.y()
    );
    let isDroppedOnIncorrectFloor = y_diff > 1.6;
    return {
      newObjectPosition: newObjectPosition,
      collision: collision || isOnSeparateIsland || isDroppedOnIncorrectFloor
    };
  }

  sampleObjectState(objectID, sceneID) {
    this.sim.sampleObjectState(objectID, sceneID);
  }

  recomputeNavMesh() {
    let navMeshSettings = new Module.NavMeshSettings();
    navMeshSettings.agentRadius = defaultAgentConfig.radius;
    navMeshSettings.agentHeight = defaultAgentConfig.height;
    this.sim.recomputeNavMesh(this.getPathFinder(), navMeshSettings, true);
  }

  toggleNavMeshVisualization() {
    this.sim.setNavMeshVisualization(true);
  }

  findNearestObjectUnderCrosshair(crossHairPoint, refPoint, windowSize) {
    return this.sim.findNearestObjectUnderCrosshair(
      crossHairPoint,
      refPoint,
      windowSize,
      this.maxDistance
    );
  }

  unproject(crossHairPosition) {
    return this.sim.unproject(crossHairPosition);
  }

  isAgentColliding(action, agentTransform) {
    let stepSize = 0.15;
    if (action == "moveForward") {
      let position = agentTransform.backward().mul(-1 * stepSize);
      let newPosition = agentTransform.translation().add(position);
      let filteredPoint = this.pathfinder.tryStep(
        agentTransform.translation(),
        newPosition
      );
      let filterDiff = filteredPoint.sub(newPosition);
      // adding buffer of 0.1 y to avoid collision with navmesh
      let isColliding = false;
      let offsets = [0, 0.05, -0.05, 0.1, -0.1, -0.2];
      for (let idx in offsets) {
        let offset = offsets[idx];
        let finalPosition = newPosition
          .add(filterDiff)
          .add(new Module.Vector3(0.0, offset, 0.0));
        let collision = this.isCollision(
          this.agentObjectHandle,
          finalPosition,
          true
        );
        if (collision) {
          isColliding = true;
        }
      }
      return {
        collision: isColliding
      };
    } else if (action == "moveBackward") {
      let position = agentTransform.backward().mul(stepSize);
      let newPosition = agentTransform.translation().add(position);
      let filteredPoint = this.pathfinder.tryStep(
        agentTransform.translation(),
        newPosition
      );
      let filterDiff = filteredPoint.sub(newPosition);
      // adding buffer of 0.1 y to avoid collision with navmesh
      let isColliding = false;
      let offsets = [0, 0.05, -0.05, 0.1, -0.1, -0.2];
      for (let idx in offsets) {
        let offset = offsets[idx];
        let finalPosition = newPosition
          .add(filterDiff)
          .add(new Module.Vector3(0.0, offset, 0.0));
        let collision = this.isCollision(
          this.agentObjectHandle,
          finalPosition,
          true
        );
        if (collision) {
          isColliding = true;
        }
      }
      return {
        collision: isColliding
      };
    }
    return false;
  }

  isCollision(objectHandle, point, isNavigationTest = false, sceneId = 0) {
    let collisionGroup = 1;
    let collisionMask = -1;
    if (isNavigationTest) {
      collisionMask = 1;
    }
    return this.sim.preAddContactTest(
      objectHandle,
      point,
      isNavigationTest,
      collisionGroup,
      collisionMask,
      sceneId
    );
  }

  /**
   * Get the geodesic distance between two points.
   * @param {number} positionA - starting position
   * @param {number} positionB - ending position
   * @returns {number} distance between positionA and positionB
   */
  geodesicDistance(positionA, positionB) {
    let path = new Module.ShortestPath();
    path.requestedStart = positionA;
    path.requestedEnd = positionB;
    this.pathfinder.findPath(path);
    return path.geodesicDistance;
  }

  /**
   * Get the geodesic distance between two objects.
   * @param {number} sourceObjectId - source object id
   * @param {number} destinationObjectId - destination object id
   * @returns {number} distance between sourceObjectId and destinationObjectId
   */
  getDistanceBetweenObjects(sourceObjectId, destinationObjectId) {
    let sourcePosition = this.getTranslation(sourceObjectId, 0);
    let destinationPosition = this.getTranslation(destinationObjectId, 0);

    let distance = this.geodesicDistance(
      this.convertVector3ToVec3f(sourcePosition),
      this.convertVector3ToVec3f(destinationPosition)
    );
    return distance;
  }

  getObjectBBYCoord(objectId) {
    return this.sim.getObjectBBYCoord(objectId);
  }

  getNumActiveContactPoints() {
    return this.sim.getNumActiveContactPoints();
  }

  getSceneBB() {
    return this.sim.getSceneBB();
  }

  getObjectStates() {
    let objectStates = [];
    let existingObjectIds = this.getExistingObjectIDs();

    for (let index = 0; index < existingObjectIds.size(); index++) {
      let objectId = existingObjectIds.get(index);
      let translation = this.getTranslation(objectId, 0);
      let rotation = this.getRotation(objectId, 0);
      let motionType = this.getObjectMotionType(objectId, 0).value;
      let object = this.getObjectFromScene(objectId);
      let objectState = {
        objectId: objectId,
        translation: this.convertVector3ToVec3f(translation),
        rotation: this.coeffFromQuat(rotation),
        motionType: motionType,
        objectHandle: object["objectHandle"]
      };
      objectStates.push(objectState);
    }

    return objectStates;
  }

  getAgentPose() {
    let tfms = this.getAgentTransformation(this.selectedAgentId);
    let agentPosition = tfms.translation();
    let agentRotation = this.getAgentRotation(this.selectedAgentId);
    let sensors = this.getAgentSensorSuite(this.selectedAgentId);
    let sensorKeys = sensors.keys();
    let sensorData = {};
    for (let i = 0; i < sensorKeys.size(); i++) {
      let key = sensorKeys.get(i);
      let rotation = sensors.get(key).rotation();
      let position = sensors.get(key).translation();
      sensorData[key] = {
        rotation: this.coeffFromQuat(rotation),
        position: this.convertVector3ToVec3f(position)
      };
    }
    return {
      position: this.convertVector3ToVec3f(agentPosition),
      rotation: this.coeffFromQuat(agentRotation),
      sensorData: sensorData
    };
  }

  getObjectPose() {
    let objectId = this.getObjectUnderCrosshair()["nearestObjectId"];
    let translation = this.getTranslation(objectId, 0);
    let rotation = this.getRotation(objectId, 0);
    console.log(
      "object translation: " + this.convertVector3ToVec3f(translation)
    );
    console.log("object rotation: " + this.coeffFromQuat(rotation));
  }

  convertVector3ToVec3f(position) {
    let vec3fPosition = [position.x(), position.y(), position.z()];
    return vec3fPosition;
  }

  convertVec3fToVector3(position) {
    let vector3Position = new Module.Vector3(
      position[0],
      position[1],
      position[2]
    );
    return vector3Position;
  }

  coeffFromQuat(rotation) {
    let vector = this.convertVector3ToVec3f(rotation.vector());
    let coeff = vector.slice();
    coeff.push(rotation.scalar());
    return coeff;
  }

  quatFromCoeffs(rotation) {
    let vector = this.convertVec3fToVector3(rotation.slice(0, 3));
    let quatRotation = new Module.Quaternion(vector, rotation[3]);
    return quatRotation;
  }

  flipVec2i(position) {
    return [position[1], position[0]];
  }

  euclideanDistance(positionA, positionB) {
    return Math.sqrt(
      (positionA[0] - positionB[0]) ** 2 +
        (positionA[2] - positionB[2]) ** 2 +
        (positionA[1] - positionB[1]) ** 2
    );
  }

  enableDebugDraw() {
    this.sim.enableDebugDraw();
  }

  /**
   * Get the distance to goal in polar coordinates.
   * @returns {Array} [magnitude, clockwise-angle (in radians)]
   */
  distanceToGoal() {
    if (
      Object.keys(this.episode).length === 0 ||
      this.episode.goal === undefined
    ) {
      return [0, 0];
    }
    let dst = this.episode.goal.position;
    let state = this.getAgentState();
    let src = state.position;
    let dv = [dst[0] - src[0], dst[1] - src[1], dst[2] - src[2]];
    dv = this.applyRotation(dv, state.rotation);
    return this.cartesian_to_polar(-dv[2], dv[0]);
  }

  // PRIVATE methods.

  // Rotate vector, v, by quaternion, q.
  // Result r = q' * v * q where q' is the quaternion conjugate.
  // http://www.chrobotics.com/library/understanding-quaternions
  applyRotation(v, q) {
    let x, y, z;
    [x, y, z] = v;
    let qx, qy, qz, qw;
    [qx, qy, qz, qw] = q;

    // i = q' * v
    let ix = qw * x - qy * z + qz * y;
    let iy = qw * y - qz * x + qx * z;
    let iz = qw * z - qx * y + qy * x;
    let iw = qx * x + qy * y + qz * z;

    // r = i * q
    let r = [];
    r[0] = ix * qw + iw * qx + iy * qz - iz * qy;
    r[1] = iy * qw + iw * qy + iz * qx - ix * qz;
    r[2] = iz * qw + iw * qz + ix * qy - iy * qx;

    return r;
  }

  cartesian_to_polar(x, y) {
    return [Math.sqrt(x * x + y * y), Math.atan2(y, x)];
  }

  createSensorSpec(config) {
    const converted = new Module.SensorSpec();
    for (let key in config) {
      let value = config[key];
      converted[key] = value;
    }
    return converted;
  }

  createAgentConfig(config) {
    const converted = new Module.AgentConfiguration();
    for (let key in config) {
      let value = config[key];
      if (key === "sensorSpecifications") {
        const sensorSpecs = new Module.VectorSensorSpec();
        for (let c of value) {
          sensorSpecs.push_back(this.createSensorSpec(c));
        }
        value = sensorSpecs;
      }
      converted[key] = value;
    }
    return converted;
  }

  createAgentState(state) {
    const converted = new Module.AgentState();
    for (let key in state) {
      let value = state[key];
      converted[key] = value;
    }
    return converted;
  }
}

export default SimEnv;
