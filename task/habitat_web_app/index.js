// Copyright (c) Facebook, Inc. and its affiliates.
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

/* global FS, Module */

import WebDemo from "./modules/web_demo";
import { defaultScene, dataHome, sceneHome } from "./modules/defaults";
import "./bindings.css";
import {
  checkWebAssemblySupport,
  checkWebgl2Support,
  getInfoSemanticUrl,
  buildConfigFromURLParameters,
  loadEpisode,
  getEpisodeMeta,
  getObjects,
  getTaskConfigPath
} from "./modules/utils";

function preload(url) {
  let file = url;
  if (url.indexOf("http") === 0) {
    const splits = url.split("/");
    file = splits[splits.length - 1];
  }
  if (window.config.dataset == "objectnav") {
    if (url.includes("semantic")) {
      url = url.split(".")[0].split("_")[0] + "/" + url;
    } else {
      url = url.split(".")[0] + "/" + url;
    }
  }
  FS.createPreloadedFile("/", file, sceneHome.concat(url), true, false);
  return file;
}

function preloadPhysConfig(url, episodeId, objectsToLoadList = null) {
  let emDataHome = "/data";
  FS.mkdir(emDataHome);

  let file = url;
  if (url.indexOf("http") === 0) {
    const splits = url.split("/");
    file = splits[splits.length - 1];
  }
  FS.createPreloadedFile(emDataHome, file, dataHome.concat(url), true, false);

  let emObjHome = emDataHome.concat("/objects");
  FS.mkdir(emObjHome);

  // Load selected objects only needed for the current episode
  for (let objectIdx in objectsToLoadList) {
    let physicsProperties = objectsToLoadList[objectIdx]["physicsProperties"];
    let physicsPropertyName = physicsProperties.split("/")[
      physicsProperties.split("/").length - 1
    ];
    let renderMesh = objectsToLoadList[objectIdx]["renderMesh"];
    let renderMeshName = renderMesh.split("/")[
      renderMesh.split("/").length - 1
    ];

    FS.createPreloadedFile(
      emObjHome,
      renderMeshName,
      dataHome.concat(renderMesh),
      true,
      false
    );
    FS.createPreloadedFile(
      emObjHome,
      physicsPropertyName,
      dataHome.concat(physicsProperties),
      true,
      false
    );
  }

  return emDataHome.concat("/".concat(file));
}

function preloadTask(datasetPath) {
  let emDataHome = "/data";

  if (datasetPath !== undefined) {
    let splittedPath = datasetPath.split("/");
    let taskName = splittedPath[splittedPath.length - 1];

    FS.createPreloadedFile(emDataHome, taskName, datasetPath, true, false);
  }
}

Module.preRun.push(() => {
  const args = decodeURIComponent(window.location.search.substr(1))
    .trim()
    .split("&");
  for (let i = 0; i != args.length; ++i) {
    let j = args[i].indexOf("=");
    /* Key + value */
    if (j != -1) {
      Module.arguments.push("--" + args[i].substring(0, j));
      Module.arguments.push(args[i].substring(j + 1));

      /* Just key */
    } else {
      Module.arguments.push("--" + args[i]);
    }
  }

  let config = {};
  config.scene = defaultScene;
  buildConfigFromURLParameters(config);

  window.config = config;
  let sceneId = config.scene.split(".")[0];
  let datasetPath = getTaskConfigPath(sceneId, window.config.dataset);
  window.config.datasetPath = datasetPath;
  let episodeId = config.episodeId;

  let episodeMeta = getEpisodeMeta(datasetPath, episodeId);
  let trainingEpisodeMeta = getEpisodeMeta(datasetPath, 0);
  let objectsToLoad = getObjects(
    episodeMeta,
    trainingEpisodeMeta,
    window.config.dataset
  );

  const scene = config.scene;
  Module.scene = preload(scene);

  const physicsConfigFile = window.config.defaultPhysConfig;
  Module.physicsConfigFile = preloadPhysConfig(
    physicsConfigFile,
    episodeId,
    objectsToLoad
  );

  Module.enablePhysics = window.config.enablePhysics === "true";
  window.config.runFlythrough = window.config.runFlythrough === "true";

  preloadTask(datasetPath);

  const fileNoExtension = scene.substr(0, scene.lastIndexOf("."));

  if (!window.config.recomputeNavMesh) {
    preload(fileNoExtension + ".navmesh");
    preload(fileNoExtension + ".stage_config.json");
  }
  if (config.semantic === "mp3d") {
    preload(fileNoExtension + ".house");
    preload(fileNoExtension + "_semantic.ply");
  } else if (config.semantic === "replica") {
    preload(getInfoSemanticUrl(config.scene));
  }
});

Module.onRuntimeInitialized = () => {
  console.log("hsim_bindings initialized");
  let demo;
  demo = new WebDemo();

  if (window.config.datasetPath !== undefined) {
    let sceneId = window.config.scene.split(".")[0];
    let episode = loadEpisode(
      "/data/".concat(sceneId + ".json"),
      window.config.episodeId,
      window.config.dataset
    );
    demo.display(undefined, episode);
  } else {
    demo.display();
  }
  if (window.config.runFlythrough === true) {
    demo.runFlythrough();
  }
  window.demo = demo;
};

function checkSupport() {
  const webgl2Support = checkWebgl2Support();
  let message = "";

  if (!webgl2Support) {
    message = "WebGL2 is not supported on your browser. ";
  } else if (webgl2Support === 1) {
    message = "WebGL2 is supported on your browser, but not enabled. ";
  }

  const webasmSupport = checkWebAssemblySupport();

  if (!webasmSupport) {
    message += "Web Assembly is not supported in your browser";
  }

  if (message.length > 0) {
    const warningElement = document.getElementById("warning");
    warningElement.innerHTML = message;
    // Remove the default hidden class
    warningElement.className = "";
  }
}

checkSupport();
