// Copyright (c) Facebook, Inc. and its affiliates.
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

/*global Module */

import {
  getServerAndURL,
  getBrowserAndPage,
  closeBrowserAndServer
} from "./test_utils.js";

const groundTruthFile = require("./physics_determinism.json");

test("simulator physics determinism", async () => {
  jest.setTimeout(120000);
  const { server, url } = await getServerAndURL(
    "build_js/esp/bindings_js/bindings.html?scene=skokloster-castle.glb&enablePhysics=true&defaultPhysConfig=default.phys_scene_config.json&enableStepPhysics=false"
  );
  const { browser, page } = await getBrowserAndPage(url);

  page.setDefaultTimeout(120000);

  await page.waitForFunction(
    'document.querySelector("#status").style.color === "white"'
  );

  const executionContext = await page.mainFrame().executionContext();
  const testResult = await executionContext.evaluate(() => {
    let sim = window.demo.simenv;
    sim.reset();
    let timeline = [];

    let worldTime = function getWorldTime(sim) {
      return sim.getWorldTime();
    };

    let stepPhysics = function stepPhysics(sim) {
      sim.stepWorld();
      return;
    };

    let getAllObjectsState = function getAllObjectsTranslation(sim) {
      let existingObjectIds = sim.getExistingObjectIDs();
      let objectStates = [];
      for (let idx = 0; idx < existingObjectIds.size(); idx++) {
        let objectId = existingObjectIds.get(idx);
        let sceneId = 0;
        let objectTranslation = sim.getTranslation(objectId, sceneId);
        let objectTranslationArray = [
          objectTranslation.x(),
          objectTranslation.y(),
          objectTranslation.z()
        ];

        let motionType = sim.getObjectMotionType(objectId, sceneId);

        objectStates.push({
          objectId: objectId,
          translation: objectTranslationArray,
          motionType: motionType.value
        });
      }
      return objectStates;
    };

    let addObjects = function addSphereAndSoccerBallObjects(sim) {
      let sphereObjectId = sim.addObjectByHandle(
        "/data/objects/sphere.phys_properties.json"
      );
      let spherePosition = sim.convertVec3fToVector3([
        -0.9517786502838135,
        2.167676642537117,
        11.343990325927734
      ]);
      sim.setObjectMotionType(Module.MotionType.DYNAMIC, sphereObjectId, 0);
      sim.setTranslation(spherePosition, sphereObjectId, 0);

      let soccerBallObjectId = sim.addObjectByHandle(
        "/data/objects/mini_soccer_ball.phys_properties.json"
      );
      let soccerBallPosition = sim.convertVec3fToVector3([
        -0.9517786502838135,
        0.467676642537117,
        11.343990325927734
      ]);
      sim.setObjectMotionType(Module.MotionType.DYNAMIC, soccerBallObjectId, 0);
      sim.setTranslation(soccerBallPosition, soccerBallObjectId, 0);

      let chairObjectId = sim.addObjectByHandle(
        "/data/objects/chair.phys_properties.json"
      );
      let chairPosition = sim.convertVec3fToVector3([
        -0.9517786502838135,
        1.57676642537117,
        11.343990325927734
      ]);
      sim.setObjectMotionType(Module.MotionType.DYNAMIC, chairObjectId, 0);
      sim.setTranslation(chairPosition, chairObjectId, 0);
      return [sphereObjectId, soccerBallObjectId, chairObjectId];
    };

    // initialize scene with objects
    addObjects(sim);

    // initial world time
    timeline.push({
      worldTime: worldTime(sim),
      stepCount: 0,
      objectStates: []
    });

    let testWorldTime = 3.0;
    let count = 1;
    let currentWorldTime = worldTime(sim);
    while (currentWorldTime < testWorldTime) {
      stepPhysics(sim);
      currentWorldTime = worldTime(sim);
      let state = {
        worldTime: currentWorldTime,
        stepCount: count,
        objectStates: getAllObjectsState(sim)
      };
      timeline.push(state);
      count++;
    }

    return Promise.resolve(timeline);
  });

  closeBrowserAndServer(browser, server);

  let testResultLength = testResult.length;
  let groundTruthFileLength = groundTruthFile.length;

  expect(testResultLength).toEqual(groundTruthFileLength);

  for (let i = 0; i < groundTruthFileLength; i++) {
    expect(testResult[i]["worldTime"]).toEqual(
      groundTruthFile[i]["world_time"]
    );
    expect(testResult[i]["stepCount"]).toEqual(
      groundTruthFile[i]["step_count"]
    );

    expect("objectStates" in testResult[i]).toEqual(true);

    let testResultObjectsStates = testResult[i]["objectStates"];
    let groundTruthObjectStates = groundTruthFile[i]["object_states"];

    for (let idx = 0; idx < testResultObjectsStates.length; i++) {
      expect(testResultObjectsStates[i]["objectId"]).toEqual(
        groundTruthObjectStates[i]["object_id"]
      );
      expect(testResultObjectsStates[i]["translation"]).toEqual(
        groundTruthObjectStates[i]["translation"]
      );
    }
  }
});
