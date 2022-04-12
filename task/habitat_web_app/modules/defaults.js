// Copyright (c) Facebook, Inc. and its affiliates.
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

export const defaultAgentConfig = {
  height: 0.88,
  radius: 0.18,
  mass: 32.0,
  linearAcceleration: 20.0,
  angularAcceleration: 4 * Math.PI,
  linearFriction: 0.5,
  angularFriction: 1.0,
  coefficientOfRestitution: 0.0
};

export const defaultStartState = {
  position: [-4.94049, -2.63092, -7.57733],
  rotation: [0, 0.980792, 0, 0.195056]
};

export const defaultGoal = {
  position: [2.2896811962127686, 0.11950381100177765, 16.97636604309082]
};

export const defaultEpisode = {
  startState: defaultStartState,
  goal: defaultGoal
};

export const defaultResolution = { height: 480, width: 640 };

export const defaultScene =
  window.location.href.indexOf("localhost") === -1
    ? "https://habitat-resources.s3.amazonaws.com/data/scene_datasets/habitat-test-scenes/skokloster-castle.glb"
    : "skokloster-castle.glb";

export const infoSemanticFileName = "info_semantic.json";

export const dataHome = "data/";
export const taskHome = "data/tasks/";
export const sceneHome = "data/scene_datasets/";
export const primitiveObjectHandles = [
  "cylinderSolid_rings_1_segments_12_halfLen_1_useTexCoords_false_useTangents_false_capEnds_true"
];

export const inventorySlots = 1;

export const largeScenes = [
  "B6ByNegPMKs.glb",
  "kEZ7cmS4wCh.glb",
  "dhjEzFoUFzH.glb",
  "E9uDoFAP3SH.glb",
  "vyrNrziPKCB.glb"
];

export const taskConfigs = {
  objectnav: {
    sensorConfig: {
      position: [0.0, 0.88, 0.0]
    },
    actions: ["moveForward", "turnLeft", "turnRight", "lookUp", "lookDown"],
    allowSliding: false,
    actuationSpec: {
      move: 0.25,
      turn: 30.0
    },
    logState: false
  },
  pick_and_place: {
    sensorConfig: {
      position: [0, 1.5, 0]
    },
    actions: [
      "moveForward",
      "turnLeft",
      "turnRight",
      "lookUp",
      "lookDown",
      "moveBackward"
    ],
    allowSliding: true,
    actuationSpec: {
      move: 0.15,
      turn: 5.0
    }
  }
};
