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
export const taskHome = "data/tasks/pick_and_place/";
export const sceneHome = "data/scenes/";
export const flythroughHome = "data/replays/";
export const primitiveObjectHandles = [
  "cylinderSolid_rings_1_segments_12_halfLen_1_useTexCoords_false_useTangents_false_capEnds_true"
];

export const taskFiles = {
  tasks: [
    {
      name: "remake_v0_JustBigStuff_00.json",
      config: "tasks/clean_floor/remake_v0_JustBigStuff_00.json",
      scene: "remake_v0_JustBigStuff_00.glb",
      trainingTask: {
        name: "training_task_3.json",
        config: "tasks/pick_and_place/training_task_3.json"
      }
    },
    {
      name: "task_4.json",
      config: "tasks/pick_and_place/task_4.json",
      scene: "empty_house.glb",
      trainingTask: {
        name: "training_task_3.json",
        config: "tasks/pick_and_place/training_task_3.json"
      }
    },
    {
      name: "task_5.json",
      config: "tasks/pick_and_place/task_5.json",
      scene: "big_house.glb",
      trainingTask: {
        name: "training_task_5.json",
        config: "tasks/pick_and_place/training_task_5.json"
      }
    },
    {
      name: "task_6.json",
      config: "tasks/pick_and_place/task_6.json",
      scene: "house.glb",
      trainingTask: {
        name: "training_task_6.json",
        config: "tasks/pick_and_place/training_task_6.json"
      }
    },
    {
      name: "task_7.json",
      config: "tasks/pick_and_place/task_7.json",
      scene: "big_house_2.glb",
      trainingTask: {
        name: "training_task_7.json",
        config: "tasks/pick_and_place/training_task_7.json"
      }
    },
    {
      name: "task_9.json",
      config: "tasks/pick_and_place/task_9.json",
      scene: "bigger_house.glb",
      trainingTask: {
        name: "training_task_9.json",
        config: "tasks/pick_and_place/training_task_9.json"
      }
    },
    {
      name: "house_4.json",
      config: "tasks/pick_and_place/house_4.json",
      scene: "house_4.glb",
      trainingTask: {
        name: "house_4_training_task.json",
        config: "tasks/pick_and_place/house_4_training_task.json"
      }
    },
    {
      name: "house_5.json",
      config: "tasks/pick_and_place/house_5.json",
      scene: "house_5.glb",
      trainingTask: {
        name: "house_5_training_task.json",
        config: "tasks/pick_and_place/house_5_training_task.json"
      }
    },
    {
      name: "house_6.json",
      config: "tasks/pick_and_place/house_6.json",
      scene: "house_6.glb",
      trainingTask: {
        name: "house_6_training_task.json",
        config: "tasks/pick_and_place/house_6_training_task.json"
      }
    },
    {
      name: "house_8.json",
      config: "tasks/pick_and_place/house_8.json",
      scene: "house_8.glb",
      trainingTask: {
        name: "house_8_training_task.json",
        config: "tasks/pick_and_place/house_8_training_task.json"
      }
    },
    {
      name: "empty_house_v2.json",
      config: "tasks/pick_and_place/empty_house_v2.json",
      scene: "empty_house.glb",
      trainingTask: {
        name: "training_task_3.json",
        config: "tasks/pick_and_place/training_task_3.json"
      }
    },
    {
      name: "big_house_v2.json",
      config: "tasks/pick_and_place/big_house_v2.json",
      scene: "big_house.glb",
      trainingTask: {
        name: "training_task_5.json",
        config: "tasks/pick_and_place/training_task_5.json"
      }
    },
    {
      name: "house_v2.json",
      config: "tasks/pick_and_place/house_v2.json",
      scene: "house.glb",
      trainingTask: {
        name: "training_task_6.json",
        config: "tasks/pick_and_place/training_task_6.json"
      }
    },
    {
      name: "big_house_2_v2.json",
      config: "tasks/pick_and_place/big_house_2_v2.json",
      scene: "big_house_2.glb",
      trainingTask: {
        name: "training_task_7.json",
        config: "tasks/pick_and_place/training_task_7.json"
      }
    },
    {
      name: "bigger_house_v2.json",
      config: "tasks/pick_and_place/bigger_house_v2.json",
      scene: "bigger_house.glb",
      trainingTask: {
        name: "training_task_9.json",
        config: "tasks/pick_and_place/training_task_9.json"
      }
    },
    {
      name: "remake_v0_JustBigStuff_00.json",
      config: "tasks/clean_floor/remake_v0_JustBigStuff_00.json",
      scene: "remake_v0_JustBigStuff_00.glb",
      trainingTask: {
        name: "remake_v0_JustBigStuff_00_train_task.json",
        config: "tasks/clean_floor/remake_v0_JustBigStuff_00_train_task.json"
      }
    },
    {
      name: "remake_v0_v3_sc4_staging_17.json",
      config: "tasks/clean_floor/remake_v0_v3_sc4_staging_17.json",
      scene: "remake_v0_v3_sc4_staging_17.glb",
      trainingTask: {
        name: "remake_v0_v3_sc4_staging_17_train_task.json",
        config: "tasks/clean_floor/remake_v0_v3_sc4_staging_17_train_task.json"
      }
    },
    {
      name: "remake_v0_v3_sc4_staging_18.json",
      config: "tasks/clean_floor/remake_v0_v3_sc4_staging_18.json",
      scene: "remake_v0_v3_sc4_staging_18.glb",
      trainingTask: {
        name: "remake_v0_v3_sc4_staging_18_train_task.json",
        config: "tasks/clean_floor/remake_v0_v3_sc4_staging_18_train_task.json"
      }
    },
    {
      name: "remake_v0_v3_sc4_staging_19.json",
      config: "tasks/clean_floor/remake_v0_v3_sc4_staging_19.json",
      scene: "remake_v0_v3_sc4_staging_19.glb",
      trainingTask: {
        name: "remake_v0_v3_sc4_staging_19_train_task.json",
        config: "tasks/clean_floor/remake_v0_v3_sc4_staging_19_train_task.json"
      }
    },
    {
      name: "remake_v0_v3_sc4_staging_20.json",
      config: "tasks/clean_floor/remake_v0_v3_sc4_staging_20.json",
      scene: "remake_v0_v3_sc4_staging_20.glb",
      trainingTask: {
        name: "remake_v0_v3_sc4_staging_20_train_task.json",
        config: "tasks/clean_floor/remake_v0_v3_sc4_staging_20_train_task.json"
      }
    },
    {
      name: "sT4fr6TAbpF.json",
      config: "tasks/objectnav_mp3d_v6/sT4fr6TAbpF.json",
      scene: "sT4fr6TAbpF.glb",
      trainingTask: {
        name: "sT4fr6TAbpF_train.json",
        config: "tasks/objectnav_mp3d_v6/sT4fr6TAbpF_train.json"
      }
    },
    {
      name: "E9uDoFAP3SH.json",
      config: "tasks/objectnav_mp3d_v6/E9uDoFAP3SH.json",
      scene: "E9uDoFAP3SH.glb",
      trainingTask: {
        name: "E9uDoFAP3SH_train.json",
        config: "tasks/objectnav_mp3d_v6/E9uDoFAP3SH_train.json"
      }
    },
    {
      name: "29hnd4uzFmX.json",
      config: "tasks/objectnav_mp3d_v6/29hnd4uzFmX.json",
      scene: "29hnd4uzFmX.glb",
      trainingTask: {
        name: "29hnd4uzFmX_train.json",
        config: "tasks/objectnav_mp3d_v6/29hnd4uzFmX_train.json"
      }
    },
    {
      name: "ac26ZMwG7aT.json",
      config: "tasks/objectnav_mp3d_v6/ac26ZMwG7aT.json",
      scene: "ac26ZMwG7aT.glb",
      trainingTask: {
        name: "ac26ZMwG7aT_train.json",
        config: "tasks/objectnav_mp3d_v6/ac26ZMwG7aT_train.json"
      }
    },
    {
      name: "i5noydFURQK.json",
      config: "tasks/objectnav_mp3d_v6/i5noydFURQK.json",
      scene: "i5noydFURQK.glb",
      trainingTask: {
        name: "i5noydFURQK_train.json",
        config: "tasks/objectnav_mp3d_v6/i5noydFURQK_train.json"
      }
    },
    {
      name: "s8pcmisQ38h.json",
      config: "tasks/objectnav_mp3d_v6/s8pcmisQ38h.json",
      scene: "s8pcmisQ38h.glb",
      trainingTask: {
        name: "s8pcmisQ38h_train.json",
        config: "tasks/objectnav_mp3d_v6/s8pcmisQ38h_train.json"
      }
    },
    {
      name: "rPc6DW4iMge.json",
      config: "tasks/objectnav_mp3d_v6/rPc6DW4iMge.json",
      scene: "rPc6DW4iMge.glb",
      trainingTask: {
        name: "rPc6DW4iMge_train.json",
        config: "tasks/objectnav_mp3d_v6/rPc6DW4iMge_train.json"
      }
    },
    {
      name: "EDJbREhghzL.json",
      config: "tasks/objectnav_mp3d_v6/EDJbREhghzL.json",
      scene: "EDJbREhghzL.glb",
      trainingTask: {
        name: "EDJbREhghzL_train.json",
        config: "tasks/objectnav_mp3d_v6/EDJbREhghzL_train.json"
      }
    },
    {
      name: "mJXqzFtmKg4.json",
      config: "tasks/objectnav_mp3d_v6/mJXqzFtmKg4.json",
      scene: "mJXqzFtmKg4.glb",
      trainingTask: {
        name: "mJXqzFtmKg4_train.json",
        config: "tasks/objectnav_mp3d_v6/mJXqzFtmKg4_train.json"
      }
    },
    {
      name: "JeFG25nYj2p.json",
      config: "tasks/objectnav_mp3d_v6/JeFG25nYj2p.json",
      scene: "JeFG25nYj2p.glb",
      trainingTask: {
        name: "JeFG25nYj2p_train.json",
        config: "tasks/objectnav_mp3d_v6/JeFG25nYj2p_train.json"
      }
    },
    {
      name: "82sE5b5pLXE.json",
      config: "tasks/objectnav_mp3d_v6/82sE5b5pLXE.json",
      scene: "82sE5b5pLXE.glb",
      trainingTask: {
        name: "82sE5b5pLXE_train.json",
        config: "tasks/objectnav_mp3d_v6/82sE5b5pLXE_train.json"
      }
    },
    {
      name: "D7N2EKCX4Sj.json",
      config: "tasks/objectnav_mp3d_v6/D7N2EKCX4Sj.json",
      scene: "D7N2EKCX4Sj.glb",
      trainingTask: {
        name: "D7N2EKCX4Sj_train.json",
        config: "tasks/objectnav_mp3d_v6/D7N2EKCX4Sj_train.json"
      }
    },
    {
      name: "7y3sRwLe3Va.json",
      config: "tasks/objectnav_mp3d_v6/7y3sRwLe3Va.json",
      scene: "7y3sRwLe3Va.glb",
      trainingTask: {
        name: "7y3sRwLe3Va_train.json",
        config: "tasks/objectnav_mp3d_v6/7y3sRwLe3Va_train.json"
      }
    },
    {
      name: "HxpKQynjfin.json",
      config: "tasks/objectnav_mp3d_v6/HxpKQynjfin.json",
      scene: "HxpKQynjfin.glb",
      trainingTask: {
        name: "HxpKQynjfin_train.json",
        config: "tasks/objectnav_mp3d_v6/HxpKQynjfin_train.json"
      }
    },
    {
      name: "5LpN3gDmAk7.json",
      config: "tasks/objectnav_mp3d_v6/5LpN3gDmAk7.json",
      scene: "5LpN3gDmAk7.glb",
      trainingTask: {
        name: "5LpN3gDmAk7_train.json",
        config: "tasks/objectnav_mp3d_v6/5LpN3gDmAk7_train.json"
      }
    },
    {
      name: "gZ6f7yhEvPG.json",
      config: "tasks/objectnav_mp3d_v6/gZ6f7yhEvPG.json",
      scene: "gZ6f7yhEvPG.glb",
      trainingTask: {
        name: "gZ6f7yhEvPG_train.json",
        config: "tasks/objectnav_mp3d_v6/gZ6f7yhEvPG_train.json"
      }
    },
    {
      name: "ur6pFq6Qu1A.json",
      config: "tasks/objectnav_mp3d_v6/ur6pFq6Qu1A.json",
      scene: "ur6pFq6Qu1A.glb",
      trainingTask: {
        name: "ur6pFq6Qu1A_train.json",
        config: "tasks/objectnav_mp3d_v6/ur6pFq6Qu1A_train.json"
      }
    },
    {
      name: "qoiz87JEwZ2.json",
      config: "tasks/objectnav_mp3d_v6/qoiz87JEwZ2.json",
      scene: "qoiz87JEwZ2.glb",
      trainingTask: {
        name: "qoiz87JEwZ2_train.json",
        config: "tasks/objectnav_mp3d_v6/qoiz87JEwZ2_train.json"
      }
    },
    {
      name: "PuKPg4mmafe.json",
      config: "tasks/objectnav_mp3d_v6/PuKPg4mmafe.json",
      scene: "PuKPg4mmafe.glb",
      trainingTask: {
        name: "PuKPg4mmafe_train.json",
        config: "tasks/objectnav_mp3d_v6/PuKPg4mmafe_train.json"
      }
    },
    {
      name: "VLzqgDo317F.json",
      config: "tasks/objectnav_mp3d_v6/VLzqgDo317F.json",
      scene: "VLzqgDo317F.glb",
      trainingTask: {
        name: "VLzqgDo317F_train.json",
        config: "tasks/objectnav_mp3d_v6/VLzqgDo317F_train.json"
      }
    },
    {
      name: "aayBHfsNo7d.json",
      config: "tasks/objectnav_mp3d_v6/aayBHfsNo7d.json",
      scene: "aayBHfsNo7d.glb",
      trainingTask: {
        name: "aayBHfsNo7d_train.json",
        config: "tasks/objectnav_mp3d_v6/aayBHfsNo7d_train.json"
      }
    },
    {
      name: "XcA2TqTSSAj.json",
      config: "tasks/objectnav_mp3d_v6/XcA2TqTSSAj.json",
      scene: "XcA2TqTSSAj.glb",
      trainingTask: {
        name: "XcA2TqTSSAj_train.json",
        config: "tasks/objectnav_mp3d_v6/XcA2TqTSSAj_train.json"
      }
    },
    {
      name: "8WUmhLawc2A.json",
      config: "tasks/objectnav_mp3d_v6/8WUmhLawc2A.json",
      scene: "8WUmhLawc2A.glb",
      trainingTask: {
        name: "8WUmhLawc2A_train.json",
        config: "tasks/objectnav_mp3d_v6/8WUmhLawc2A_train.json"
      }
    },
    {
      name: "sKLMLpTHeUy.json",
      config: "tasks/objectnav_mp3d_v6/sKLMLpTHeUy.json",
      scene: "sKLMLpTHeUy.glb",
      trainingTask: {
        name: "sKLMLpTHeUy_train.json",
        config: "tasks/objectnav_mp3d_v6/sKLMLpTHeUy_train.json"
      }
    },
    {
      name: "r47D5H71a5s.json",
      config: "tasks/objectnav_mp3d_v6/r47D5H71a5s.json",
      scene: "r47D5H71a5s.glb",
      trainingTask: {
        name: "r47D5H71a5s_train.json",
        config: "tasks/objectnav_mp3d_v6/r47D5H71a5s_train.json"
      }
    },
    {
      name: "Uxmj2M2itWa.json",
      config: "tasks/objectnav_mp3d_v6/Uxmj2M2itWa.json",
      scene: "Uxmj2M2itWa.glb",
      trainingTask: {
        name: "Uxmj2M2itWa_train.json",
        config: "tasks/objectnav_mp3d_v6/Uxmj2M2itWa_train.json"
      }
    },
    {
      name: "Pm6F8kyY3z2.json",
      config: "tasks/objectnav_mp3d_v6/Pm6F8kyY3z2.json",
      scene: "Pm6F8kyY3z2.glb",
      trainingTask: {
        name: "Pm6F8kyY3z2_train.json",
        config: "tasks/objectnav_mp3d_v6/Pm6F8kyY3z2_train.json"
      }
    },
    {
      name: "p5wJjkQkbXX.json",
      config: "tasks/objectnav_mp3d_v6/p5wJjkQkbXX.json",
      scene: "p5wJjkQkbXX.glb",
      trainingTask: {
        name: "p5wJjkQkbXX_train.json",
        config: "tasks/objectnav_mp3d_v6/p5wJjkQkbXX_train.json"
      }
    },
    {
      name: "759xd9YjKW5.json",
      config: "tasks/objectnav_mp3d_v6/759xd9YjKW5.json",
      scene: "759xd9YjKW5.glb",
      trainingTask: {
        name: "759xd9YjKW5_train.json",
        config: "tasks/objectnav_mp3d_v6/759xd9YjKW5_train.json"
      }
    },
    {
      name: "JF19kD82Mey.json",
      config: "tasks/objectnav_mp3d_v6/JF19kD82Mey.json",
      scene: "JF19kD82Mey.glb",
      trainingTask: {
        name: "JF19kD82Mey_train.json",
        config: "tasks/objectnav_mp3d_v6/JF19kD82Mey_train.json"
      }
    },
    {
      name: "V2XKFyX4ASd.json",
      config: "tasks/objectnav_mp3d_v6/V2XKFyX4ASd.json",
      scene: "V2XKFyX4ASd.glb",
      trainingTask: {
        name: "V2XKFyX4ASd_train.json",
        config: "tasks/objectnav_mp3d_v6/V2XKFyX4ASd_train.json"
      }
    },
    {
      name: "1LXtFkjw3qL.json",
      config: "tasks/objectnav_mp3d_v6/1LXtFkjw3qL.json",
      scene: "1LXtFkjw3qL.glb",
      trainingTask: {
        name: "1LXtFkjw3qL_train.json",
        config: "tasks/objectnav_mp3d_v6/1LXtFkjw3qL_train.json"
      }
    },
    {
      name: "17DRP5sb8fy.json",
      config: "tasks/objectnav_mp3d_v6/17DRP5sb8fy.json",
      scene: "17DRP5sb8fy.glb",
      trainingTask: {
        name: "17DRP5sb8fy_train.json",
        config: "tasks/objectnav_mp3d_v6/17DRP5sb8fy_train.json"
      }
    },
    {
      name: "5q7pvUzZiYa.json",
      config: "tasks/objectnav_mp3d_v6/5q7pvUzZiYa.json",
      scene: "5q7pvUzZiYa.glb",
      trainingTask: {
        name: "5q7pvUzZiYa_train.json",
        config: "tasks/objectnav_mp3d_v6/5q7pvUzZiYa_train.json"
      }
    },
    {
      name: "VVfe2KiqLaN.json",
      config: "tasks/objectnav_mp3d_v6/VVfe2KiqLaN.json",
      scene: "VVfe2KiqLaN.glb",
      trainingTask: {
        name: "VVfe2KiqLaN_train.json",
        config: "tasks/objectnav_mp3d_v6/VVfe2KiqLaN_train.json"
      }
    },
    {
      name: "Vvot9Ly1tCj.json",
      config: "tasks/objectnav_mp3d_v6/Vvot9Ly1tCj.json",
      scene: "Vvot9Ly1tCj.glb",
      trainingTask: {
        name: "Vvot9Ly1tCj_train.json",
        config: "tasks/objectnav_mp3d_v6/Vvot9Ly1tCj_train.json"
      }
    },
    {
      name: "ULsKaCPVFJR.json",
      config: "tasks/objectnav_mp3d_v6/ULsKaCPVFJR.json",
      scene: "ULsKaCPVFJR.glb",
      trainingTask: {
        name: "ULsKaCPVFJR_train.json",
        config: "tasks/objectnav_mp3d_v6/ULsKaCPVFJR_train.json"
      }
    },
    {
      name: "D7G3Y4RVNrH.json",
      config: "tasks/objectnav_mp3d_v6/D7G3Y4RVNrH.json",
      scene: "D7G3Y4RVNrH.glb",
      trainingTask: {
        name: "D7G3Y4RVNrH_train.json",
        config: "tasks/objectnav_mp3d_v6/D7G3Y4RVNrH_train.json"
      }
    },
    {
      name: "uNb9QFRL6hY.json",
      config: "tasks/objectnav_mp3d_v6/uNb9QFRL6hY.json",
      scene: "uNb9QFRL6hY.glb",
      trainingTask: {
        name: "uNb9QFRL6hY_train.json",
        config: "tasks/objectnav_mp3d_v6/uNb9QFRL6hY_train.json"
      }
    },
    {
      name: "ZMojNkEp431.json",
      config: "tasks/objectnav_mp3d_v6/ZMojNkEp431.json",
      scene: "ZMojNkEp431.glb",
      trainingTask: {
        name: "ZMojNkEp431_train.json",
        config: "tasks/objectnav_mp3d_v6/ZMojNkEp431_train.json"
      }
    },
    {
      name: "vyrNrziPKCB.json",
      config: "tasks/objectnav_mp3d_v6/vyrNrziPKCB.json",
      scene: "vyrNrziPKCB.glb",
      trainingTask: {
        name: "vyrNrziPKCB_train.json",
        config: "tasks/objectnav_mp3d_v6/vyrNrziPKCB_train.json"
      }
    },
    {
      name: "e9zR4mvMWw7.json",
      config: "tasks/objectnav_mp3d_v6/e9zR4mvMWw7.json",
      scene: "e9zR4mvMWw7.glb",
      trainingTask: {
        name: "e9zR4mvMWw7_train.json",
        config: "tasks/objectnav_mp3d_v6/e9zR4mvMWw7_train.json"
      }
    },
    {
      name: "r1Q1Z4BcV1o.json",
      config: "tasks/objectnav_mp3d_v6/r1Q1Z4BcV1o.json",
      scene: "r1Q1Z4BcV1o.glb",
      trainingTask: {
        name: "r1Q1Z4BcV1o_train.json",
        config: "tasks/objectnav_mp3d_v6/r1Q1Z4BcV1o_train.json"
      }
    },
    {
      name: "PX4nDJXEHrG.json",
      config: "tasks/objectnav_mp3d_v6/PX4nDJXEHrG.json",
      scene: "PX4nDJXEHrG.glb",
      trainingTask: {
        name: "PX4nDJXEHrG_train.json",
        config: "tasks/objectnav_mp3d_v6/PX4nDJXEHrG_train.json"
      }
    },
    {
      name: "YmJkqBEsHnH.json",
      config: "tasks/objectnav_mp3d_v6/YmJkqBEsHnH.json",
      scene: "YmJkqBEsHnH.glb",
      trainingTask: {
        name: "YmJkqBEsHnH_train.json",
        config: "tasks/objectnav_mp3d_v6/YmJkqBEsHnH_train.json"
      }
    },
    {
      name: "b8cTxDM8gDG.json",
      config: "tasks/objectnav_mp3d_v6/b8cTxDM8gDG.json",
      scene: "b8cTxDM8gDG.glb",
      trainingTask: {
        name: "b8cTxDM8gDG_train.json",
        config: "tasks/objectnav_mp3d_v6/b8cTxDM8gDG_train.json"
      }
    },
    {
      name: "GdvgFV5R1Z5.json",
      config: "tasks/objectnav_mp3d_v6/GdvgFV5R1Z5.json",
      scene: "GdvgFV5R1Z5.glb",
      trainingTask: {
        name: "GdvgFV5R1Z5_train.json",
        config: "tasks/objectnav_mp3d_v6/GdvgFV5R1Z5_train.json"
      }
    },
    {
      name: "pRbA3pwrgk9.json",
      config: "tasks/objectnav_mp3d_v6/pRbA3pwrgk9.json",
      scene: "pRbA3pwrgk9.glb",
      trainingTask: {
        name: "pRbA3pwrgk9_train.json",
        config: "tasks/objectnav_mp3d_v6/pRbA3pwrgk9_train.json"
      }
    },
    {
      name: "jh4fc5c5qoQ.json",
      config: "tasks/objectnav_mp3d_v6/jh4fc5c5qoQ.json",
      scene: "jh4fc5c5qoQ.glb",
      trainingTask: {
        name: "jh4fc5c5qoQ_train.json",
        config: "tasks/objectnav_mp3d_v6/jh4fc5c5qoQ_train.json"
      }
    },
    {
      name: "1pXnuDYAj8r.json",
      config: "tasks/objectnav_mp3d_v6/1pXnuDYAj8r.json",
      scene: "1pXnuDYAj8r.glb",
      trainingTask: {
        name: "1pXnuDYAj8r_train.json",
        config: "tasks/objectnav_mp3d_v6/1pXnuDYAj8r_train.json"
      }
    },
    {
      name: "S9hNv5qa7GM.json",
      config: "tasks/objectnav_mp3d_v6/S9hNv5qa7GM.json",
      scene: "S9hNv5qa7GM.glb",
      trainingTask: {
        name: "S9hNv5qa7GM_train.json",
        config: "tasks/objectnav_mp3d_v6/S9hNv5qa7GM_train.json"
      }
    },
    {
      name: "VFuaQ6m2Qom.json",
      config: "tasks/objectnav_mp3d_v6/VFuaQ6m2Qom.json",
      scene: "VFuaQ6m2Qom.glb",
      trainingTask: {
        name: "VFuaQ6m2Qom_train.json",
        config: "tasks/objectnav_mp3d_v6/VFuaQ6m2Qom_train.json"
      }
    },
    {
      name: "cV4RVeZvu5T.json",
      config: "tasks/objectnav_mp3d_v6/cV4RVeZvu5T.json",
      scene: "cV4RVeZvu5T.glb",
      trainingTask: {
        name: "cV4RVeZvu5T_train.json",
        config: "tasks/objectnav_mp3d_v6/cV4RVeZvu5T_train.json"
      }
    },
    {
      name: "B6ByNegPMKs.json",
      config: "tasks/objectnav_mp3d_v6/B6ByNegPMKs.json",
      scene: "B6ByNegPMKs.glb",
      trainingTask: {
        name: "B6ByNegPMKs_train.json",
        config: "tasks/objectnav_mp3d_v6/B6ByNegPMKs_train.json"
      }
    },
    {
      name: "kEZ7cmS4wCh.json",
      config: "tasks/objectnav_mp3d_v6/kEZ7cmS4wCh.json",
      scene: "kEZ7cmS4wCh.glb",
      trainingTask: {
        name: "kEZ7cmS4wCh_train.json",
        config: "tasks/objectnav_mp3d_v6/kEZ7cmS4wCh_train.json"
      }
    },
    {
      name: "dhjEzFoUFzH.json",
      config: "tasks/objectnav_mp3d_v6/dhjEzFoUFzH.json",
      scene: "dhjEzFoUFzH.glb",
      trainingTask: {
        name: "dhjEzFoUFzH_train.json",
        config: "tasks/objectnav_mp3d_v6/dhjEzFoUFzH_train.json"
      }
    },
    {
      name: "zsNo4HB9uLZ.json",
      config: "tasks/objectnav_val_v1/zsNo4HB9uLZ.json",
      scene: "zsNo4HB9uLZ.glb",
      trainingTask: {
        name: "zsNo4HB9uLZ_train.json",
        config: "tasks/objectnav_val_v1/zsNo4HB9uLZ_train.json"
      }
    },
    {
      name: "QUCTc6BB5sX.json",
      config: "tasks/objectnav_val_v1/QUCTc6BB5sX.json",
      scene: "QUCTc6BB5sX.glb",
      trainingTask: {
        name: "QUCTc6BB5sX_train.json",
        config: "tasks/objectnav_val_v1/QUCTc6BB5sX_train.json"
      }
    },
    {
      name: "X7HyMhZNoso.json",
      config: "tasks/objectnav_val_v1/X7HyMhZNoso.json",
      scene: "X7HyMhZNoso.glb",
      trainingTask: {
        name: "X7HyMhZNoso_train.json",
        config: "tasks/objectnav_val_v1/X7HyMhZNoso_train.json"
      }
    },
    {
      name: "EU6Fwq7SyZv.json",
      config: "tasks/objectnav_val_v1/EU6Fwq7SyZv.json",
      scene: "EU6Fwq7SyZv.glb",
      trainingTask: {
        name: "EU6Fwq7SyZv_train.json",
        config: "tasks/objectnav_val_v1/EU6Fwq7SyZv_train.json"
      }
    },
    {
      name: "pLe4wQe7qrG.json",
      config: "tasks/objectnav_val_v1/pLe4wQe7qrG.json",
      scene: "pLe4wQe7qrG.glb",
      trainingTask: {
        name: "pLe4wQe7qrG_train.json",
        config: "tasks/objectnav_val_v1/pLe4wQe7qrG_train.json"
      }
    },
    {
      name: "TbHJrupSAjP.json",
      config: "tasks/objectnav_val_v1/TbHJrupSAjP.json",
      scene: "TbHJrupSAjP.glb",
      trainingTask: {
        name: "TbHJrupSAjP_train.json",
        config: "tasks/objectnav_val_v1/TbHJrupSAjP_train.json"
      }
    },
    {
      name: "2azQ1b91cZZ.json",
      config: "tasks/objectnav_val_v1/2azQ1b91cZZ.json",
      scene: "2azQ1b91cZZ.glb",
      trainingTask: {
        name: "2azQ1b91cZZ_train.json",
        config: "tasks/objectnav_val_v1/2azQ1b91cZZ_train.json"
      }
    },
    {
      name: "oLBMNvg9in8.json",
      config: "tasks/objectnav_val_v1/oLBMNvg9in8.json",
      scene: "oLBMNvg9in8.glb",
      trainingTask: {
        name: "oLBMNvg9in8_train.json",
        config: "tasks/objectnav_val_v1/oLBMNvg9in8_train.json"
      }
    },
    {
      name: "x8F5xyUWy9e.json",
      config: "tasks/objectnav_val_v1/x8F5xyUWy9e.json",
      scene: "x8F5xyUWy9e.glb",
      trainingTask: {
        name: "x8F5xyUWy9e_train.json",
        config: "tasks/objectnav_val_v1/x8F5xyUWy9e_train.json"
      }
    },
    {
      name: "8194nk5LbLH.json",
      config: "tasks/objectnav_val_v1/8194nk5LbLH.json",
      scene: "8194nk5LbLH.glb",
      trainingTask: {
        name: "8194nk5LbLH_train.json",
        config: "tasks/objectnav_val_v1/8194nk5LbLH_train.json"
      }
    },
    {
      name: "Z6MFQCViBuw.json",
      config: "tasks/objectnav_val_v1/Z6MFQCViBuw.json",
      scene: "Z6MFQCViBuw.glb",
      trainingTask: {
        name: "Z6MFQCViBuw_train.json",
        config: "tasks/objectnav_val_v1/Z6MFQCViBuw_train.json"
      }
    },
    {
      name: "Marstons.json",
      config: "tasks/objectnav_gibson_v3/Marstons.json",
      scene: "Marstons.glb",
      trainingTask: {
        name: "Marstons_train.json",
        config: "tasks/objectnav_gibson_v3/Marstons_train.json"
      }
    },
    {
      name: "Wainscott.json",
      config: "tasks/objectnav_gibson_v3/Wainscott.json",
      scene: "Wainscott.glb",
      trainingTask: {
        name: "Wainscott_train.json",
        config: "tasks/objectnav_gibson_v3/Wainscott_train.json"
      }
    },
    {
      name: "Hanson.json",
      config: "tasks/objectnav_gibson_v3/Hanson.json",
      scene: "Hanson.glb",
      trainingTask: {
        name: "Hanson_train.json",
        config: "tasks/objectnav_gibson_v3/Hanson_train.json"
      }
    },
    {
      name: "Forkland.json",
      config: "tasks/objectnav_gibson_v3/Forkland.json",
      scene: "Forkland.glb",
      trainingTask: {
        name: "Forkland_train.json",
        config: "tasks/objectnav_gibson_v3/Forkland_train.json"
      }
    },
    {
      name: "Shelbyville.json",
      config: "tasks/objectnav_gibson_v3/Shelbyville.json",
      scene: "Shelbyville.glb",
      trainingTask: {
        name: "Shelbyville_train.json",
        config: "tasks/objectnav_gibson_v3/Shelbyville_train.json"
      }
    },
    {
      name: "Ranchester.json",
      config: "tasks/objectnav_gibson_v3/Ranchester.json",
      scene: "Ranchester.glb",
      trainingTask: {
        name: "Ranchester_train.json",
        config: "tasks/objectnav_gibson_v3/Ranchester_train.json"
      }
    },
    {
      name: "Tolstoy.json",
      config: "tasks/objectnav_gibson_v3/Tolstoy.json",
      scene: "Tolstoy.glb",
      trainingTask: {
        name: "Tolstoy_train.json",
        config: "tasks/objectnav_gibson_v3/Tolstoy_train.json"
      }
    },
    {
      name: "Merom.json",
      config: "tasks/objectnav_gibson_v3/Merom.json",
      scene: "Merom.glb",
      trainingTask: {
        name: "Merom_train.json",
        config: "tasks/objectnav_gibson_v3/Merom_train.json"
      }
    },
    {
      name: "Coffeen.json",
      config: "tasks/objectnav_gibson_v3/Coffeen.json",
      scene: "Coffeen.glb",
      trainingTask: {
        name: "Coffeen_train.json",
        config: "tasks/objectnav_gibson_v3/Coffeen_train.json"
      }
    },
    {
      name: "Onaga.json",
      config: "tasks/objectnav_gibson_v3/Onaga.json",
      scene: "Onaga.glb",
      trainingTask: {
        name: "Onaga_train.json",
        config: "tasks/objectnav_gibson_v3/Onaga_train.json"
      }
    },
    {
      name: "Benevolence.json",
      config: "tasks/objectnav_gibson_v3/Benevolence.json",
      scene: "Benevolence.glb",
      trainingTask: {
        name: "Benevolence_train.json",
        config: "tasks/objectnav_gibson_v3/Benevolence_train.json"
      }
    },
    {
      name: "Pomaria.json",
      config: "tasks/objectnav_gibson_v3/Pomaria.json",
      scene: "Pomaria.glb",
      trainingTask: {
        name: "Pomaria_train.json",
        config: "tasks/objectnav_gibson_v3/Pomaria_train.json"
      }
    },
    {
      name: "Hiteman.json",
      config: "tasks/objectnav_gibson_v3/Hiteman.json",
      scene: "Hiteman.glb",
      trainingTask: {
        name: "Hiteman_train.json",
        config: "tasks/objectnav_gibson_v3/Hiteman_train.json"
      }
    },
    {
      name: "Allensville.json",
      config: "tasks/objectnav_gibson_v3/Allensville.json",
      scene: "Allensville.glb",
      trainingTask: {
        name: "Allensville_train.json",
        config: "tasks/objectnav_gibson_v3/Allensville_train.json"
      }
    },
    {
      name: "Woodbine.json",
      config: "tasks/objectnav_gibson_v3/Woodbine.json",
      scene: "Woodbine.glb",
      trainingTask: {
        name: "Woodbine_train.json",
        config: "tasks/objectnav_gibson_v3/Woodbine_train.json"
      }
    },
    {
      name: "Newfields.json",
      config: "tasks/objectnav_gibson_v3/Newfields.json",
      scene: "Newfields.glb",
      trainingTask: {
        name: "Newfields_train.json",
        config: "tasks/objectnav_gibson_v3/Newfields_train.json"
      }
    },
    {
      name: "Stockman.json",
      config: "tasks/objectnav_gibson_v3/Stockman.json",
      scene: "Stockman.glb",
      trainingTask: {
        name: "Stockman_train.json",
        config: "tasks/objectnav_gibson_v3/Stockman_train.json"
      }
    },
    {
      name: "Mifflinburg.json",
      config: "tasks/objectnav_gibson_v3/Mifflinburg.json",
      scene: "Mifflinburg.glb",
      trainingTask: {
        name: "Mifflinburg_train.json",
        config: "tasks/objectnav_gibson_v3/Mifflinburg_train.json"
      }
    },
    {
      name: "Beechwood.json",
      config: "tasks/objectnav_gibson_v3/Beechwood.json",
      scene: "Beechwood.glb",
      trainingTask: {
        name: "Beechwood_train.json",
        config: "tasks/objectnav_gibson_v3/Beechwood_train.json"
      }
    },
    {
      name: "Lakeville.json",
      config: "tasks/objectnav_gibson_v3/Lakeville.json",
      scene: "Lakeville.glb",
      trainingTask: {
        name: "Lakeville_train.json",
        config: "tasks/objectnav_gibson_v3/Lakeville_train.json"
      }
    },
    {
      name: "Pinesdale.json",
      config: "tasks/objectnav_gibson_v3/Pinesdale.json",
      scene: "Pinesdale.glb",
      trainingTask: {
        name: "Pinesdale_train.json",
        config: "tasks/objectnav_gibson_v3/Pinesdale_train.json"
      }
    },
    {
      name: "Cosmos.json",
      config: "tasks/objectnav_gibson_v3/Cosmos.json",
      scene: "Cosmos.glb",
      trainingTask: {
        name: "Cosmos_train.json",
        config: "tasks/objectnav_gibson_v3/Cosmos_train.json"
      }
    },
    {
      name: "Lindenwood.json",
      config: "tasks/objectnav_gibson_v3/Lindenwood.json",
      scene: "Lindenwood.glb",
      trainingTask: {
        name: "Lindenwood_train.json",
        config: "tasks/objectnav_gibson_v3/Lindenwood_train.json"
      }
    },
    {
      name: "Klickitat.json",
      config: "tasks/objectnav_gibson_v3/Klickitat.json",
      scene: "Klickitat.glb",
      trainingTask: {
        name: "Klickitat_train.json",
        config: "tasks/objectnav_gibson_v3/Klickitat_train.json"
      }
    },
    {
      name: "Leonardo.json",
      config: "tasks/objectnav_gibson_v3/Leonardo.json",
      scene: "Leonardo.glb",
      trainingTask: {
        name: "Leonardo_train.json",
        config: "tasks/objectnav_gibson_v3/Leonardo_train.json"
      }
    }
  ]
};

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
    sliding: false,
    actuationSpec: {
      move: 0.25,
      turn: 30.0
    }
  },
  rearrangement: {
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
    sliding: true,
    actuationSpec: {
      move: 0.15,
      turn: 5.0
    }
  }
};
