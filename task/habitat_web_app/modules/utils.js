// Copyright (c) Facebook, Inc. and its affiliates.
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

/* global FS */

import { infoSemanticFileName, defaultEpisode, taskHome } from "./defaults";

/**
 *
 * @param {function} func Function to be throttled
 * @param {int} timeout Milliseconds interval after which throttle will be called,
 * `func` will be called at least once in the timeout timeframe.
 */
export function throttle(func, timeout = 500) {
  let active = false;

  return function() {
    const args = arguments;
    const context = this;
    if (!active) {
      func.apply(context, args);
      active = true;
      window.setTimeout(() => {
        active = false;
      }, timeout);
    }
  };
}

/**
 * Check whether web assembly is supported on the current browser or not.
 * Returns false if not otherwise true.
 */
export function checkWebAssemblySupport() {
  try {
    if (
      typeof WebAssembly === "object" &&
      typeof WebAssembly.instantiate === "function"
    ) {
      const module = new WebAssembly.Module(
        Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00)
      );
      if (module instanceof WebAssembly.Module) {
        return new WebAssembly.Instance(module) instanceof WebAssembly.Instance;
      }
    }
  } catch (e) {
    return false;
  }
  return false;
}

/**
 * Checks for WebGL2 support in current browser.
 * Returns 0 if there is no support, 1 if support is there but disabled otherwise 2.
 */
export function checkWebgl2Support() {
  let canvas;
  let ctx;
  let hasWebgl = false;

  try {
    canvas = document.createElement("canvas");
    ctx = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  } catch (e) {
    return;
  }

  if (ctx !== undefined) {
    hasWebgl = true;
  }

  canvas = undefined;
  if (!hasWebgl) {
    if (typeof WebGL2RenderingContext !== "undefined") {
      return 1;
    } else {
      return 0;
    }
  } else {
    return 2;
  }
}

export function getInfoSemanticUrl(mainUrl) {
  const splits = mainUrl.split("/");
  const moreThanOne = splits.length > 1;
  splits.pop();
  let infoSemanticPath = infoSemanticFileName;
  if (moreThanOne) {
    infoSemanticPath = "/" + infoSemanticPath;
  }
  return splits.join("/") + infoSemanticPath;
}

export function buildConfigFromURLParameters(config = {}) {
  for (let arg of window.location.search.substr(1).split("&")) {
    let [key, value] = arg.split("=");
    if (key && value) {
      config[key] = decodeURIComponent(value);
    }
  }
  return config;
}

export function getRandomInt(max = 5) {
  return Math.floor(Math.random() * max);
}

export function readJSON(url, options = { encoding: "utf8" }) {
  let contentsRaw = FS.readFile(url, { encoding: options["encoding"] });
  let contents = JSON.parse(contentsRaw);
  return contents;
}

export function buildEpisodeFromJSON(
  task = "task.json",
  episode_id = "0",
  dataset = "pick_and_place"
) {
  let episodeJSON = readJSON(task);
  let episode = {};
  episode.startState = {};
  if (dataset == "pick_and_place") {
    episode.episodeID = episode_id;
    episode.startState.position =
      episodeJSON.episodes[episode_id].start_position;
    episode.startState.rotation =
      episodeJSON.episodes[episode_id].start_rotation;
    episode.sceneID = episodeJSON.episodes[episode_id].scene_id;
    episode.objects = episodeJSON.episodes[episode_id].objects;
    episode.task = episodeJSON.episodes[episode_id].task;
  } else {
    let scenePath = episodeJSON.episodes[episode_id].scene_id.split("/");
    episode.episode_id = parseInt(episodeJSON.episodes[episode_id].episode_id);
    episode.startState.position =
      episodeJSON.episodes[episode_id].start_position;
    episode.startState.rotation =
      episodeJSON.episodes[episode_id].start_rotation;
    episode.scene_id = episodeJSON.episodes[episode_id].scene_id;
    episode.object_category = episodeJSON.episodes[episode_id].object_category;
    let goal_id =
      scenePath[scenePath.length - 1] + "_" + episode.object_category;

    episode.scene_dataset = episodeJSON.episodes[episode_id].scene_dataset;
    if (!Object.keys(episodeJSON.goals_by_category).includes(goal_id)) {
      episode.is_thda = true;
      episode.goals = episodeJSON.episodes[episode_id].goals;
      episode.scene_state = episodeJSON.episodes[episode_id].scene_state;
      episodeJSON.goals_by_category = null;
    } else {
      episode.goals = episodeJSON.goals_by_category[goal_id];
    }
    episode.info = episodeJSON.episodes[episode_id].info;
    episode.start_room = episodeJSON.episodes[episode_id].start_room;
    episode.shortest_paths = episodeJSON.episodes[episode_id].shortest_paths;
    episode.task = {
      instruction: "Find and go to " + episode.object_category,
      type: "objectnav"
    };
  }
  return episode;
}

export function replaceAll(str, needle, replacement) {
  while (str.indexOf(needle) !== -1) {
    str = str.replace(needle, replacement);
  }
  return str;
}

export function loadEpisode(
  episodeConfigPath,
  episode_id = "0",
  dataset = "pick_and_place"
) {
  let episode;
  if (episodeConfigPath === undefined) {
    episode = defaultEpisode;
  } else if (episode_id === undefined) {
    episode = buildEpisodeFromJSON(episodeConfigPath);
  } else {
    episode = buildEpisodeFromJSON(episodeConfigPath, episode_id, dataset);
  }
  return episode;
}

export function compareObjectStates(gtObjectState, objectState) {
  let objectId = objectState["objectId"];
  let actualId = gtObjectState["objectId"];
  if (objectId == actualId) {
    let trans = objectState["translation"];
    let actualTrans = gtObjectState["translation"];
    if (JSON.stringify(trans) === JSON.stringify(actualTrans)) {
      let rot = objectState["rotation"];
      let actualRot = gtObjectState["rotation"];

      if (JSON.stringify(rot) !== JSON.stringify(actualRot)) {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
  return true;
}

export function getObjectIconImgTags(episode) {
  if (episode.objects == undefined) {
    return {
      objects: [],
      receptacles: []
    };
  }
  let objects = episode["objects"];
  let objectImgTags = {};
  objectImgTags["objects"] = [];
  objectImgTags["receptacles"] = [];
  for (let i = 0; i < objects.length; i++) {
    let object = objects[i];
    let objectName = object["object"];
    objectName = objectName.charAt(0).toUpperCase() + objectName.slice(1);
    let item =
      "<div><img src='" +
      object["objectIcon"] +
      "' style='border: 3px solid grey'/><div class='img-caption'>" +
      objectName +
      "</div></div>";

    if (object["isReceptacle"]) {
      objectImgTags["receptacles"].push(item);
    } else {
      objectImgTags["objects"].push(item);
    }
  }
  return objectImgTags;
}

export function getHost() {
  return window.location.protocol + "//" + window.location.host;
}

export function getEpisodeMeta(sceneConfig, episodeId) {
  // read config from URL location
  let url = getHost() + "/" + sceneConfig;
  var request = new XMLHttpRequest();
  request.open("GET", url, false);
  request.send(null);

  if (request.status == 200) {
    let response = JSON.parse(request.response);
    let episode = response.episodes[episodeId];

    if (episode == undefined) {
      episode = response.episodes[0];
    }
    return episode;
  }
  return null;
}

export function getObjects(episode, trainingEpisode, dataset) {
  let objectConfigs = [];
  if (dataset == "objectnav") {
    let scene_state = episode.scene_state;
    if (scene_state == undefined) {
      return [];
    }
    for (let idx in scene_state.objects) {
      let object = scene_state.objects[idx];
      let objectTemplate = object["object_template"];
      let objectTemplateSplit = objectTemplate.split("/");
      let objectName = objectTemplateSplit[objectTemplateSplit.length - 1];

      let objectConfig = getObjectConfig(objectName.split(".")[0], objectName);
      objectConfigs.push(objectConfig);
    }
    scene_state = trainingEpisode.scene_state;
    for (let idx in scene_state.objects) {
      let object = scene_state.objects[idx];
      let objectTemplate = object["object_template"];
      let objectTemplateSplit = objectTemplate.split("/");
      let objectName = objectTemplateSplit[objectTemplateSplit.length - 1];

      let objectConfig = getObjectConfig(objectName.split(".")[0], objectName);
      objectConfigs.push(objectConfig);
    }
  } else {
    let objects = episode.objects;
    let uniqueObjectIds = [];
    for (let idx in objects) {
      let object = objects[idx];
      let objectTemplate = object["objectHandle"];
      let objectTemplateSplit = objectTemplate.split("/");
      let objectName = objectTemplateSplit[objectTemplateSplit.length - 1];

      if (!uniqueObjectIds.includes(objectName)) {
        let objectConfig = getObjectConfig(
          objectName.split(".")[0],
          objectName
        );
        objectConfigs.push(objectConfig);
        uniqueObjectIds.push(objectName);
      }
    }

    objects = trainingEpisode.objects;
    for (let idx in objects) {
      let object = objects[idx];
      let objectTemplate = object["objectHandle"];
      let objectTemplateSplit = objectTemplate.split("/");
      let objectName = objectTemplateSplit[objectTemplateSplit.length - 1];

      if (!uniqueObjectIds.includes(objectName)) {
        let objectConfig = getObjectConfig(
          objectName.split(".")[0],
          objectName
        );
        objectConfigs.push(objectConfig);
        uniqueObjectIds.push(objectName);
      }
    }
  }
  return objectConfigs;
}

export function getObjectConfig(objectName, objectHandle) {
  let objectId = objectHandle.split(".")[0];
  return {
    object: objectName,
    objectIcon: "/data/test_assets/objects/" + objectId + ".png",
    objectHandle: "/data/objects/" + objectHandle,
    physicsProperties: "test_assets/objects/" + objectHandle,
    renderMesh: "test_assets/objects/" + objectId + ".glb"
  };
}

export function getTaskConfigPath(sceneId, dataset) {
  if (dataset == "pick_and_place") {
    let path = taskHome + "pick_and_place/" + sceneId + ".json";
    return path;
  } else if (dataset == "objectnav") {
    let path = taskHome + "objectnav_mp3d_v6/" + sceneId + ".json";
    return path;
  }
  let defaultPath = taskHome + sceneId + ".json";
  return defaultPath;
}
