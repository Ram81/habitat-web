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
export const sceneHome = "data/scenes/gibson/";
export const flythroughHome = "data/replays/";
export const primitiveObjectHandles = [
  "cylinderSolid_rings_1_segments_12_halfLen_1_useTexCoords_false_useTangents_false_capEnds_true"
];

export const fileBasedObjects = {
  objects: [
    {
      object: "apple",
      objectIcon: "/data/test_assets/objects/apple.png",
      objectHandle: "/data/objects/apple.object_config.json",
      physicsProperties: "test_assets/objects/apple.object_config.json",
      renderMesh: "test_assets/objects/apple.glb"
    },
    {
      object: "banana",
      objectIcon: "/data/test_assets/objects/banana.png",
      objectHandle: "/data/objects/banana.object_config.json",
      physicsProperties: "test_assets/objects/banana.object_config.json",
      renderMesh: "test_assets/objects/banana.glb"
    },
    {
      object: "cracker box",
      objectIcon: "/data/test_assets/objects/cracker_box.png",
      objectHandle: "/data/objects/cracker_box.object_config.json",
      physicsProperties: "test_assets/objects/cracker_box.object_config.json",
      renderMesh: "test_assets/objects/cracker_box.glb"
    },
    {
      object: "colored wood blocks",
      objectIcon: "/data/test_assets/objects/colored_wood_blocks.png",
      objectHandle: "/data/objects/colored_wood_blocks.object_config.json",
      physicsProperties:
        "test_assets/objects/colored_wood_blocks.object_config.json",
      renderMesh: "test_assets/objects/colored_wood_blocks.glb"
    },
    {
      object: "gelatin box",
      objectIcon: "/data/test_assets/objects/gelatin_box.png",
      objectHandle: "/data/objects/gelatin_box.object_config.json",
      physicsProperties: "test_assets/objects/gelatin_box.object_config.json",
      renderMesh: "test_assets/objects/gelatin_box.glb"
    },
    {
      object: "hammer",
      objectIcon: "/data/test_assets/objects/hammer.png",
      objectHandle: "/data/objects/hammer.object_config.json",
      physicsProperties: "test_assets/objects/hammer.object_config.json",
      renderMesh: "test_assets/objects/hammer.glb"
    },
    {
      object: "master chef can",
      objectIcon: "/data/test_assets/objects/master_chef_can.png",
      objectHandle: "/data/objects/master_chef_can.object_config.json",
      physicsProperties:
        "test_assets/objects/master_chef_can.object_config.json",
      renderMesh: "test_assets/objects/master_chef_can.glb"
    },
    {
      object: "soccer ball",
      objectIcon: "/data/test_assets/objects/mini_soccer_ball.png",
      objectHandle: "/data/objects/mini_soccer_ball.object_config.json",
      physicsProperties:
        "test_assets/objects/mini_soccer_ball.object_config.json",
      renderMesh: "test_assets/objects/mini_soccer_ball.glb"
    },
    {
      object: "mustard bottle",
      objectIcon: "/data/test_assets/objects/mustard_bottle.png",
      objectHandle: "/data/objects/mustard_bottle.object_config.json",
      physicsProperties:
        "test_assets/objects/mustard_bottle.object_config.json",
      renderMesh: "test_assets/objects/mustard_bottle.glb"
    },
    {
      object: "orange",
      objectIcon: "/data/test_assets/objects/orange.png",
      objectHandle: "/data/objects/orange.object_config.json",
      physicsProperties: "test_assets/objects/orange.object_config.json",
      renderMesh: "test_assets/objects/orange.glb"
    },
    {
      object: "red bowl",
      objectIcon: "/data/test_assets/objects/bowl.png",
      objectHandle: "/data/objects/bowl.object_config.json",
      physicsProperties: "test_assets/objects/bowl.object_config.json",
      renderMesh: "test_assets/objects/bowl.glb"
    },
    {
      object: "red mug",
      objectIcon: "/data/test_assets/objects/mug.png",
      objectHandle: "/data/objects/mug.object_config.json",
      physicsProperties: "test_assets/objects/mug.object_config.json",
      renderMesh: "test_assets/objects/mug.glb"
    },
    {
      object: "red plate",
      objectIcon: "/data/test_assets/objects/plate.png",
      objectHandle: "/data/objects/plate.object_config.json",
      physicsProperties: "test_assets/objects/plate.object_config.json",
      renderMesh: "test_assets/objects/plate.glb"
    },
    {
      object: "red sphere",
      objectIcon: "/data/test_assets/objects/sphere.png",
      objectHandle: "/data/objects/sphere.object_config.json",
      physicsProperties: "test_assets/objects/sphere.object_config.json",
      renderMesh: "test_assets/objects/sphere.glb"
    },
    {
      object: "tomato soup can",
      objectIcon: "/data/test_assets/objects/tomato_soup_can.png",
      objectHandle: "/data/objects/tomato_soup_can.object_config.json",
      physicsProperties:
        "test_assets/objects/tomato_soup_can.object_config.json",
      renderMesh: "test_assets/objects/tomato_soup_can.glb"
    },
    {
      object: "toy airplane",
      objectIcon: "/data/test_assets/objects/toy_airplane.png",
      objectHandle: "/data/objects/toy_airplane.object_config.json",
      physicsProperties: "test_assets/objects/toy_airplane.object_config.json",
      renderMesh: "test_assets/objects/toy_airplane.glb"
    },
    {
      object: "wood block",
      objectIcon: "/data/test_assets/objects/wood_block.png",
      objectHandle: "/data/objects/wood_block.object_config.json",
      physicsProperties: "test_assets/objects/wood_block.object_config.json",
      renderMesh: "test_assets/objects/wood_block.glb"
    },
    {
      object: "large clamp",
      objectIcon: "/data/test_assets/objects/large_clamp.png",
      objectHandle: "/data/objects/large_clamp.object_config.json",
      physicsProperties: "test_assets/objects/large_clamp.object_config.json",
      renderMesh: "test_assets/objects/large_clamp.glb"
    },
    {
      object: "blue cup",
      objectIcon: "/data/test_assets/objects/b_cups.png",
      objectHandle: "/data/objects/b_cups.object_config.json",
      physicsProperties: "test_assets/objects/b_cups.object_config.json",
      renderMesh: "test_assets/objects/b_cups.glb"
    },
    {
      object: "green cup",
      objectIcon: "/data/test_assets/objects/c_cups.png",
      objectHandle: "/data/objects/c_cups.object_config.json",
      physicsProperties: "test_assets/objects/c_cups.object_config.json",
      renderMesh: "test_assets/objects/c_cups.glb"
    },
    {
      object: "baseball",
      objectIcon: "/data/test_assets/objects/baseball.png",
      objectHandle: "/data/objects/baseball.object_config.json",
      physicsProperties: "test_assets/objects/baseball.object_config.json",
      renderMesh: "test_assets/objects/baseball.glb"
    },
    {
      object: "tennis ball",
      objectIcon: "/data/test_assets/objects/tennis_ball.png",
      objectHandle: "/data/objects/tennis_ball.object_config.json",
      physicsProperties: "test_assets/objects/tennis_ball.object_config.json",
      renderMesh: "test_assets/objects/tennis_ball.glb"
    },
    {
      object: "blue jug",
      objectIcon: "/data/test_assets/objects/pitcher_base.png",
      objectHandle: "/data/objects/pitcher_base.object_config.json",
      physicsProperties: "test_assets/objects/pitcher_base.object_config.json",
      renderMesh: "test_assets/objects/pitcher_base.glb"
    },
    {
      object: "potted meat can",
      objectIcon: "/data/test_assets/objects/potted_meat_can.png",
      objectHandle: "/data/objects/potted_meat_can.object_config.json",
      physicsProperties:
        "test_assets/objects/potted_meat_can.object_config.json",
      renderMesh: "test_assets/objects/potted_meat_can.glb"
    },
    {
      object: "sugar box",
      objectIcon: "/data/test_assets/objects/sugar_box.png",
      objectHandle: "/data/objects/sugar_box.object_config.json",
      physicsProperties: "test_assets/objects/sugar_box.object_config.json",
      renderMesh: "test_assets/objects/sugar_box.glb"
    },
    {
      object: "rubiks cube",
      objectIcon: "/data/test_assets/objects/rubiks_cube.png",
      objectHandle: "/data/objects/rubiks_cube.object_config.json",
      physicsProperties: "test_assets/objects/rubiks_cube.object_config.json",
      renderMesh: "test_assets/objects/rubiks_cube.glb"
    },
    {
      object: "softball",
      objectIcon: "/data/test_assets/objects/softball.png",
      objectHandle: "/data/objects/softball.object_config.json",
      physicsProperties: "test_assets/objects/softball.object_config.json",
      renderMesh: "test_assets/objects/softball.glb"
    },
    {
      object: "plum",
      objectIcon: "/data/test_assets/objects/plum.png",
      objectHandle: "/data/objects/plum.object_config.json",
      physicsProperties: "test_assets/objects/plum.object_config.json",
      renderMesh: "test_assets/objects/plum.glb"
    },
    {
      object: "spoon",
      objectIcon: "/data/test_assets/objects/spoon.png",
      objectHandle: "/data/objects/spoon.object_config.json",
      physicsProperties: "test_assets/objects/spoon.object_config.json",
      renderMesh: "test_assets/objects/spoon.glb"
    },
    {
      object: "blue wood block",
      objectIcon: "/data/test_assets/objects/b_colored_wood_blocks.png",
      objectHandle: "/data/objects/b_colored_wood_blocks.object_config.json",
      physicsProperties:
        "test_assets/objects/b_colored_wood_blocks.object_config.json",
      renderMesh: "test_assets/objects/b_colored_wood_blocks.glb"
    },
    {
      object: "fork",
      objectIcon: "/data/test_assets/objects/fork.png",
      objectHandle: "/data/objects/fork.object_config.json",
      physicsProperties: "test_assets/objects/fork.object_config.json",
      renderMesh: "test_assets/objects/fork.glb"
    },
    {
      object: "knife",
      objectIcon: "/data/test_assets/objects/knife.png",
      objectHandle: "/data/objects/knife.object_config.json",
      physicsProperties: "test_assets/objects/knife.object_config.json",
      renderMesh: "test_assets/objects/knife.glb"
    },
    {
      object: "red cup",
      objectIcon: "/data/test_assets/objects/e_cups.png",
      objectHandle: "/data/objects/e_cups.object_config.json",
      physicsProperties: "test_assets/objects/e_cups.object_config.json",
      renderMesh: "test_assets/objects/e_cups.glb"
    },
    {
      object: "yellow cup",
      objectIcon: "/data/test_assets/objects/d_cups.png",
      objectHandle: "/data/objects/d_cups.object_config.json",
      physicsProperties: "test_assets/objects/d_cups.object_config.json",
      renderMesh: "test_assets/objects/d_cups.glb"
    },
    {
      object: "toy gun",
      objectIcon: "/data/test_assets/objects/b_toy_airplane.png",
      objectHandle: "/data/objects/b_toy_airplane.object_config.json",
      physicsProperties:
        "test_assets/objects/b_toy_airplane.object_config.json",
      renderMesh: "test_assets/objects/b_toy_airplane.glb"
    },
    {
      object: "screwdriver",
      objectIcon: "/data/test_assets/objects/phillips_screwdriver.png",
      objectHandle: "/data/objects/phillips_screwdriver.object_config.json",
      physicsProperties:
        "test_assets/objects/phillips_screwdriver.object_config.json",
      renderMesh: "test_assets/objects/phillips_screwdriver.glb"
    },
    {
      object: "brown box",
      objectIcon: "/data/test_assets/objects/foam_brick.png",
      objectHandle: "/data/objects/foam_brick.object_config.json",
      physicsProperties: "test_assets/objects/foam_brick.object_config.json",
      renderMesh: "test_assets/objects/foam_brick.glb"
    },
    {
      object: "purple lego",
      objectIcon: "/data/test_assets/objects/b_lego_duplo.png",
      objectHandle: "/data/objects/b_lego_duplo.object_config.json",
      physicsProperties: "test_assets/objects/b_lego_duplo.object_config.json",
      renderMesh: "test_assets/objects/b_lego_duplo.glb"
    },
    {
      object: "blue lego",
      objectIcon: "/data/test_assets/objects/e_lego_duplo.png",
      objectHandle: "/data/objects/e_lego_duplo.object_config.json",
      physicsProperties: "test_assets/objects/e_lego_duplo.object_config.json",
      renderMesh: "test_assets/objects/e_lego_duplo.glb"
    },
    {
      object: "spatula",
      objectIcon: "/data/test_assets/objects/spatula.png",
      objectHandle: "/data/objects/spatula.object_config.json",
      physicsProperties: "test_assets/objects/spatula.object_config.json",
      renderMesh: "test_assets/objects/spatula.glb"
    },
    {
      object: "wrench",
      objectIcon: "/data/test_assets/objects/adjustable_wrench.png",
      objectHandle: "/data/objects/adjustable_wrench.object_config.json",
      physicsProperties:
        "test_assets/objects/adjustable_wrench.object_config.json",
      renderMesh: "test_assets/objects/adjustable_wrench.glb"
    },
    {
      object: "orange cup",
      objectIcon: "/data/test_assets/objects/a_cups.png",
      objectHandle: "/data/objects/a_cups.object_config.json",
      physicsProperties: "test_assets/objects/a_cups.object_config.json",
      renderMesh: "test_assets/objects/a_cups.glb"
    },
    {
      object: "tuna fish can",
      objectIcon: "/data/test_assets/objects/tuna_fish_can.png",
      objectHandle: "/data/objects/tuna_fish_can.object_config.json",
      physicsProperties: "test_assets/objects/tuna_fish_can.object_config.json",
      renderMesh: "test_assets/objects/tuna_fish_can.glb"
    },
    {
      object: "power drill",
      objectIcon: "/data/test_assets/objects/power_drill.png",
      objectHandle: "/data/objects/power_drill.object_config.json",
      physicsProperties: "test_assets/objects/power_drill.object_config.json",
      renderMesh: "test_assets/objects/power_drill.glb"
    },
    {
      object: "green lego",
      objectIcon: "/data/test_assets/objects/a_lego_duplo.png",
      objectHandle: "/data/objects/a_lego_duplo.object_config.json",
      physicsProperties: "test_assets/objects/a_lego_duplo.object_config.json",
      renderMesh: "test_assets/objects/a_lego_duplo.glb"
    },
    {
      object: "purple cup",
      objectIcon: "/data/test_assets/objects/f_cups.png",
      objectHandle: "/data/objects/f_cups.object_config.json",
      physicsProperties: "test_assets/objects/f_cups.object_config.json",
      renderMesh: "test_assets/objects/f_cups.glb"
    },
    {
      object: "pear",
      objectIcon: "/data/test_assets/objects/pear.png",
      objectHandle: "/data/objects/pear.object_config.json",
      physicsProperties: "test_assets/objects/pear.object_config.json",
      renderMesh: "test_assets/objects/pear.glb"
    },
    {
      object: "racquetball",
      objectIcon: "/data/test_assets/objects/racquetball.png",
      objectHandle: "/data/objects/racquetball.object_config.json",
      physicsProperties: "test_assets/objects/racquetball.object_config.json",
      renderMesh: "test_assets/objects/racquetball.glb"
    },
    {
      object: "scissors",
      objectIcon: "/data/test_assets/objects/scissors.png",
      objectHandle: "/data/objects/scissors.object_config.json",
      physicsProperties: "test_assets/objects/scissors.object_config.json",
      renderMesh: "test_assets/objects/scissors.glb"
    },
    {
      object: "white bottle",
      objectIcon: "/data/test_assets/objects/bleach_cleanser.png",
      objectHandle: "/data/objects/bleach_cleanser.object_config.json",
      physicsProperties:
        "test_assets/objects/bleach_cleanser.object_config.json",
      renderMesh: "test_assets/objects/bleach_cleanser.glb"
    },
    {
      object: "yellow plant pot",
      objectIcon:
        "/data/test_assets/objects/Pennington_Electric_Pot_Cabana_4.png",
      objectHandle:
        "/data/objects/Pennington_Electric_Pot_Cabana_4.object_config.json",
      physicsProperties:
        "test_assets/objects/Pennington_Electric_Pot_Cabana_4.object_config.json",
      renderMesh: "test_assets/objects/Pennington_Electric_Pot_Cabana_4.glb"
    },
    {
      object: "grey plant pot",
      objectIcon: "/data/test_assets/objects/Cole_Hardware_Flower_Pot_1025.png",
      objectHandle:
        "/data/objects/Cole_Hardware_Flower_Pot_1025.object_config.json",
      physicsProperties:
        "test_assets/objects/Cole_Hardware_Flower_Pot_1025.object_config.json",
      renderMesh: "test_assets/objects/Cole_Hardware_Flower_Pot_1025.glb"
    },
    {
      object: "red coffee mug",
      objectIcon:
        "/data/test_assets/objects/ACE_Coffee_Mug_Kristen_16_oz_cup.png",
      objectHandle:
        "/data/objects/ACE_Coffee_Mug_Kristen_16_oz_cup.object_config.json",
      physicsProperties:
        "test_assets/objects/ACE_Coffee_Mug_Kristen_16_oz_cup.object_config.json",
      renderMesh: "test_assets/objects/ACE_Coffee_Mug_Kristen_16_oz_cup.glb"
    },
    {
      object: "white tray",
      objectIcon:
        "/data/test_assets/objects/Threshold_Tray_Rectangle_Porcelain.png",
      objectHandle:
        "/data/objects/Threshold_Tray_Rectangle_Porcelain.object_config.json",
      physicsProperties:
        "test_assets/objects/Threshold_Tray_Rectangle_Porcelain.object_config.json",
      renderMesh: "test_assets/objects/Threshold_Tray_Rectangle_Porcelain.glb"
    },
    {
      object: "spiderman action figure",
      objectIcon:
        "/data/test_assets/objects/SpiderMan_Titan_Hero_12Inch_Action_Figure_5Hnn4mtkFsP.png",
      objectHandle:
        "/data/objects/SpiderMan_Titan_Hero_12Inch_Action_Figure_5Hnn4mtkFsP.object_config.json",
      physicsProperties:
        "test_assets/objects/SpiderMan_Titan_Hero_12Inch_Action_Figure_5Hnn4mtkFsP.object_config.json",
      renderMesh:
        "test_assets/objects/SpiderMan_Titan_Hero_12Inch_Action_Figure_5Hnn4mtkFsP.glb"
    },
    {
      object: "toy school bus",
      objectIcon: "/data/test_assets/objects/SCHOOL_BUS.png",
      objectHandle: "/data/objects/SCHOOL_BUS.object_config.json",
      physicsProperties: "test_assets/objects/SCHOOL_BUS.object_config.json",
      renderMesh: "test_assets/objects/SCHOOL_BUS.glb"
    },
    {
      object: "Squirrel",
      objectIcon: "/data/test_assets/objects/Squirrel.png",
      objectHandle: "/data/objects/Squirrel.object_config.json",
      physicsProperties: "test_assets/objects/Squirrel.object_config.json",
      renderMesh: "test_assets/objects/Squirrel.glb"
    },
    {
      object: "green toy train",
      objectIcon:
        "/data/test_assets/objects/Thomas_Friends_Woodan_Railway_Henry.png",
      objectHandle:
        "/data/objects/Thomas_Friends_Woodan_Railway_Henry.object_config.json",
      physicsProperties:
        "test_assets/objects/Thomas_Friends_Woodan_Railway_Henry.object_config.json",
      renderMesh: "test_assets/objects/Thomas_Friends_Woodan_Railway_Henry.glb"
    },
    {
      object: "teapot",
      objectIcon:
        "/data/test_assets/objects/Threshold_Porcelain_Teapot_White.png",
      objectHandle:
        "/data/objects/Threshold_Porcelain_Teapot_White.object_config.json",
      physicsProperties:
        "test_assets/objects/Threshold_Porcelain_Teapot_White.object_config.json",
      renderMesh: "test_assets/objects/Threshold_Porcelain_Teapot_White.glb"
    },
    {
      object: "chocolate box",
      objectIcon:
        "/data/test_assets/objects/KS_Chocolate_Cube_Box_Assortment_By_Neuhaus_2010_Ounces.png",
      objectHandle:
        "/data/objects/KS_Chocolate_Cube_Box_Assortment_By_Neuhaus_2010_Ounces.object_config.json",
      physicsProperties:
        "test_assets/objects/KS_Chocolate_Cube_Box_Assortment_By_Neuhaus_2010_Ounces.object_config.json",
      renderMesh:
        "test_assets/objects/KS_Chocolate_Cube_Box_Assortment_By_Neuhaus_2010_Ounces.glb"
    },
    {
      object: "ramekin",
      objectIcon:
        "/data/test_assets/objects/Threshold_Ramekin_White_Porcelain.png",
      objectHandle:
        "/data/objects/Threshold_Ramekin_White_Porcelain.object_config.json",
      physicsProperties:
        "test_assets/objects/Threshold_Ramekin_White_Porcelain.object_config.json",
      renderMesh: "test_assets/objects/Threshold_Ramekin_White_Porcelain.glb"
    },
    {
      object: "dixie bowl",
      objectIcon: "/data/test_assets/objects/Dixie_10_ounce_Bowls_35_ct.png",
      objectHandle:
        "/data/objects/Dixie_10_ounce_Bowls_35_ct.object_config.json",
      physicsProperties:
        "test_assets/objects/Dixie_10_ounce_Bowls_35_ct.object_config.json",
      renderMesh: "test_assets/objects/Dixie_10_ounce_Bowls_35_ct.glb"
    },
    {
      object: "red fabric cube",
      objectIcon:
        "/data/test_assets/objects/Closetmaid_Premium_Fabric_Cube_Red.png",
      objectHandle:
        "/data/objects/Closetmaid_Premium_Fabric_Cube_Red.object_config.json",
      physicsProperties:
        "test_assets/objects/Closetmaid_Premium_Fabric_Cube_Red.object_config.json",
      renderMesh: "test_assets/objects/Closetmaid_Premium_Fabric_Cube_Red.glb"
    },
    {
      object: "green saucer",
      objectIcon:
        "/data/test_assets/objects/Ecoforms_Quadra_Saucer_SQ1_Avocado.png",
      objectHandle:
        "/data/objects/Ecoforms_Quadra_Saucer_SQ1_Avocado.object_config.json",
      physicsProperties:
        "test_assets/objects/Ecoforms_Quadra_Saucer_SQ1_Avocado.object_config.json",
      renderMesh: "test_assets/objects/Ecoforms_Quadra_Saucer_SQ1_Avocado.glb"
    },
    {
      object: "red orchid pot",
      objectIcon:
        "/data/test_assets/objects/Down_To_Earth_Orchid_Pot_Ceramic_Red.png",
      objectHandle:
        "/data/objects/Down_To_Earth_Orchid_Pot_Ceramic_Red.object_config.json",
      physicsProperties:
        "test_assets/objects/Down_To_Earth_Orchid_Pot_Ceramic_Red.object_config.json",
      renderMesh: "test_assets/objects/Down_To_Earth_Orchid_Pot_Ceramic_Red.glb"
    },
    {
      object: "blue orchid pot",
      objectIcon:
        "/data/test_assets/objects/Down_To_Earth_Ceramic_Orchid_Pot_Asst_Blue.png",
      objectHandle:
        "/data/objects/Down_To_Earth_Ceramic_Orchid_Pot_Asst_Blue.object_config.json",
      physicsProperties:
        "test_assets/objects/Down_To_Earth_Ceramic_Orchid_Pot_Asst_Blue.object_config.json",
      renderMesh:
        "test_assets/objects/Down_To_Earth_Ceramic_Orchid_Pot_Asst_Blue.glb"
    },
    {
      object: "blue dog food bowl",
      objectIcon:
        "/data/test_assets/objects/Top_Paw_Dog_Bowl_Blue_Paw_Bone_Ceramic_25_fl_oz_total.png",
      objectHandle:
        "/data/objects/Top_Paw_Dog_Bowl_Blue_Paw_Bone_Ceramic_25_fl_oz_total.object_config.json",
      physicsProperties:
        "test_assets/objects/Top_Paw_Dog_Bowl_Blue_Paw_Bone_Ceramic_25_fl_oz_total.object_config.json",
      renderMesh:
        "test_assets/objects/Top_Paw_Dog_Bowl_Blue_Paw_Bone_Ceramic_25_fl_oz_total.glb"
    },
    {
      object: "toy shark",
      objectIcon: "/data/test_assets/objects/Weisshai_Great_White_Shark.png",
      objectHandle:
        "/data/objects/Weisshai_Great_White_Shark.object_config.json",
      physicsProperties:
        "test_assets/objects/Weisshai_Great_White_Shark.object_config.json",
      renderMesh: "test_assets/objects/Weisshai_Great_White_Shark.glb"
    },
    {
      object: "toy school bus",
      objectIcon: "/data/test_assets/objects/Sonny_School_Bus.png",
      objectHandle: "/data/objects/Sonny_School_Bus.object_config.json",
      physicsProperties:
        "test_assets/objects/Sonny_School_Bus.object_config.json",
      renderMesh: "test_assets/objects/Sonny_School_Bus.glb"
    },
    {
      object: "ceramic plate",
      objectIcon:
        "/data/test_assets/objects/Threshold_Bistro_Ceramic_Dinner_Plate_Ruby_Ring.png",
      objectHandle:
        "/data/objects/Threshold_Bistro_Ceramic_Dinner_Plate_Ruby_Ring.object_config.json",
      physicsProperties:
        "test_assets/objects/Threshold_Bistro_Ceramic_Dinner_Plate_Ruby_Ring.object_config.json",
      renderMesh:
        "test_assets/objects/Threshold_Bistro_Ceramic_Dinner_Plate_Ruby_Ring.glb"
    },
    {
      object: "turtle toy",
      objectIcon: "/data/test_assets/objects/Vtech_Roll_Learn_Turtle.png",
      objectHandle: "/data/objects/Vtech_Roll_Learn_Turtle.object_config.json",
      physicsProperties:
        "test_assets/objects/Vtech_Roll_Learn_Turtle.object_config.json",
      renderMesh: "test_assets/objects/Vtech_Roll_Learn_Turtle.glb"
    },
    {
      object: "blue mug",
      objectIcon:
        "/data/test_assets/objects/Cole_Hardware_Mug_Classic_Blue.png",
      objectHandle:
        "/data/objects/Cole_Hardware_Mug_Classic_Blue.object_config.json",
      physicsProperties:
        "test_assets/objects/Cole_Hardware_Mug_Classic_Blue.object_config.json",
      renderMesh: "test_assets/objects/Cole_Hardware_Mug_Classic_Blue.glb"
    },
    {
      object: "bookend",
      objectIcon: "/data/test_assets/objects/Victor_Reversible_Bookend.png",
      objectHandle:
        "/data/objects/Victor_Reversible_Bookend.object_config.json",
      physicsProperties:
        "test_assets/objects/Victor_Reversible_Bookend.object_config.json",
      renderMesh: "test_assets/objects/Victor_Reversible_Bookend.glb"
    },
    {
      object: "green toy rail",
      objectIcon:
        "/data/test_assets/objects/Thomas_Friends_Wooden_Railway_Porter_5JzRhMm3a9o.png",
      objectHandle:
        "/data/objects/Thomas_Friends_Wooden_Railway_Porter_5JzRhMm3a9o.object_config.json",
      physicsProperties:
        "test_assets/objects/Thomas_Friends_Wooden_Railway_Porter_5JzRhMm3a9o.object_config.json",
      renderMesh:
        "test_assets/objects/Thomas_Friends_Wooden_Railway_Porter_5JzRhMm3a9o.glb"
    },
    {
      object: "dinosaur action figure",
      objectIcon:
        "/data/test_assets/objects/Schleich_Spinosaurus_Action_Figure.png",
      objectHandle:
        "/data/objects/Schleich_Spinosaurus_Action_Figure.object_config.json",
      physicsProperties:
        "test_assets/objects/Schleich_Spinosaurus_Action_Figure.object_config.json",
      renderMesh: "test_assets/objects/Schleich_Spinosaurus_Action_Figure.glb"
    },
    {
      object: "buzzy bee toy",
      objectIcon:
        "/data/test_assets/objects/Fisher_price_Classic_Toys_Buzzy_Bee.png",
      objectHandle:
        "/data/objects/Fisher_price_Classic_Toys_Buzzy_Bee.object_config.json",
      physicsProperties:
        "test_assets/objects/Fisher_price_Classic_Toys_Buzzy_Bee.object_config.json",
      renderMesh: "test_assets/objects/Fisher_price_Classic_Toys_Buzzy_Bee.glb"
    },
    {
      object: "toy airplane",
      objectIcon: "/data/test_assets/objects/TURBOPROP_AIRPLANE_WITH_PILOT.png",
      objectHandle:
        "/data/objects/TURBOPROP_AIRPLANE_WITH_PILOT.object_config.json",
      physicsProperties:
        "test_assets/objects/TURBOPROP_AIRPLANE_WITH_PILOT.object_config.json",
      renderMesh: "test_assets/objects/TURBOPROP_AIRPLANE_WITH_PILOT.glb"
    },
    {
      object: "dish drainer",
      objectIcon:
        "/data/test_assets/objects/Room_Essentials_Dish_Drainer_Collapsible_White.png",
      objectHandle:
        "/data/objects/Room_Essentials_Dish_Drainer_Collapsible_White.object_config.json",
      physicsProperties:
        "test_assets/objects/Room_Essentials_Dish_Drainer_Collapsible_White.object_config.json",
      renderMesh:
        "test_assets/objects/Room_Essentials_Dish_Drainer_Collapsible_White.glb"
    },
    {
      object: "large ramekin",
      objectIcon:
        "/data/test_assets/objects/Utana_5_Porcelain_Ramekin_Large.png",
      objectHandle:
        "/data/objects/Utana_5_Porcelain_Ramekin_Large.object_config.json",
      physicsProperties:
        "test_assets/objects/Utana_5_Porcelain_Ramekin_Large.object_config.json",
      renderMesh: "test_assets/objects/Utana_5_Porcelain_Ramekin_Large.glb"
    },
    {
      object: "baking pan",
      objectIcon:
        "/data/test_assets/objects/Chef_Style_Round_Cake_Pan_9_inch_pan.png",
      objectHandle:
        "/data/objects/Chef_Style_Round_Cake_Pan_9_inch_pan.object_config.json",
      physicsProperties:
        "test_assets/objects/Chef_Style_Round_Cake_Pan_9_inch_pan.object_config.json",
      renderMesh: "test_assets/objects/Chef_Style_Round_Cake_Pan_9_inch_pan.glb"
    },
    {
      object: "android panda figure",
      objectIcon: "/data/test_assets/objects/Android_Figure_Panda.png",
      objectHandle: "/data/objects/Android_Figure_Panda.object_config.json",
      physicsProperties:
        "test_assets/objects/Android_Figure_Panda.object_config.json",
      renderMesh: "test_assets/objects/Android_Figure_Panda.glb"
    },
    {
      object: "cole hammer",
      objectIcon: "/data/test_assets/objects/Cole_Hardware_Hammer_Black.png",
      objectHandle:
        "/data/objects/Cole_Hardware_Hammer_Black.object_config.json",
      physicsProperties:
        "test_assets/objects/Cole_Hardware_Hammer_Black.object_config.json",
      renderMesh: "test_assets/objects/Cole_Hardware_Hammer_Black.glb"
    },
    {
      object: "plastic dog food dish",
      objectIcon:
        "/data/test_assets/objects/Grreat_Choice_Dog_Double_Dish_Plastic_Blue.png",
      objectHandle:
        "/data/objects/Grreat_Choice_Dog_Double_Dish_Plastic_Blue.object_config.json",
      physicsProperties:
        "test_assets/objects/Grreat_Choice_Dog_Double_Dish_Plastic_Blue.object_config.json",
      renderMesh:
        "test_assets/objects/Grreat_Choice_Dog_Double_Dish_Plastic_Blue.glb"
    },
    {
      object: "porcelain spoon",
      objectIcon:
        "/data/test_assets/objects/Threshold_Porcelain_Spoon_Rest_White.png",
      objectHandle:
        "/data/objects/Threshold_Porcelain_Spoon_Rest_White.object_config.json",
      physicsProperties:
        "test_assets/objects/Threshold_Porcelain_Spoon_Rest_White.object_config.json",
      renderMesh: "test_assets/objects/Threshold_Porcelain_Spoon_Rest_White.glb"
    },
    {
      object: "puzzle football",
      objectIcon:
        "/data/test_assets/objects/Toys_R_Us_Treat_Dispenser_Smart_Puzzle_Foobler.png",
      objectHandle:
        "/data/objects/Toys_R_Us_Treat_Dispenser_Smart_Puzzle_Foobler.object_config.json",
      physicsProperties:
        "test_assets/objects/Toys_R_Us_Treat_Dispenser_Smart_Puzzle_Foobler.object_config.json",
      renderMesh:
        "test_assets/objects/Toys_R_Us_Treat_Dispenser_Smart_Puzzle_Foobler.glb"
    },
    {
      object: "dust pan",
      objectIcon:
        "/data/test_assets/objects/Ocedar_Snap_On_Dust_Pan_And_Brush_1_ct.png",
      objectHandle:
        "/data/objects/Ocedar_Snap_On_Dust_Pan_And_Brush_1_ct.object_config.json",
      physicsProperties:
        "test_assets/objects/Ocedar_Snap_On_Dust_Pan_And_Brush_1_ct.object_config.json",
      renderMesh:
        "test_assets/objects/Ocedar_Snap_On_Dust_Pan_And_Brush_1_ct.glb"
    },
    {
      object: "rahzar action figure",
      objectIcon:
        "/data/test_assets/objects/Teenage_Mutant_Ninja_Turtles_Rahzar_Action_Figure.png",
      objectHandle:
        "/data/objects/Teenage_Mutant_Ninja_Turtles_Rahzar_Action_Figure.object_config.json",
      physicsProperties:
        "test_assets/objects/Teenage_Mutant_Ninja_Turtles_Rahzar_Action_Figure.object_config.json",
      renderMesh:
        "test_assets/objects/Teenage_Mutant_Ninja_Turtles_Rahzar_Action_Figure.glb"
    },
    {
      object: "toy shark",
      objectIcon: "/data/test_assets/objects/Shark.png",
      objectHandle: "/data/objects/Shark.object_config.json",
      physicsProperties: "test_assets/objects/Shark.object_config.json",
      renderMesh: "test_assets/objects/Shark.glb"
    },
    {
      object: "lion action figure",
      objectIcon: "/data/test_assets/objects/Schleich_Lion_Action_Figure.png",
      objectHandle:
        "/data/objects/Schleich_Lion_Action_Figure.object_config.json",
      physicsProperties:
        "test_assets/objects/Schleich_Lion_Action_Figure.object_config.json",
      renderMesh: "test_assets/objects/Schleich_Lion_Action_Figure.glb"
    },
    {
      object: "brown bag",
      objectIcon:
        "/data/test_assets/objects/INTERNATIONAL_PAPER_Willamette_4_Brown_Bag_500Count.png",
      objectHandle:
        "/data/objects/INTERNATIONAL_PAPER_Willamette_4_Brown_Bag_500Count.object_config.json",
      physicsProperties:
        "test_assets/objects/INTERNATIONAL_PAPER_Willamette_4_Brown_Bag_500Count.object_config.json",
      renderMesh:
        "test_assets/objects/INTERNATIONAL_PAPER_Willamette_4_Brown_Bag_500Count.glb"
    },
    {
      object: "square porcelain plate",
      objectIcon:
        "/data/test_assets/objects/Threshold_Dinner_Plate_Square_Rim_White_Porcelain.png",
      objectHandle:
        "/data/objects/Threshold_Dinner_Plate_Square_Rim_White_Porcelain.object_config.json",
      physicsProperties:
        "test_assets/objects/Threshold_Dinner_Plate_Square_Rim_White_Porcelain.object_config.json",
      renderMesh:
        "test_assets/objects/Threshold_Dinner_Plate_Square_Rim_White_Porcelain.glb"
    },
    {
      object: "pink fabric cube",
      objectIcon:
        "/data/test_assets/objects/Room_Essentials_Fabric_Cube_Lavender.png",
      objectHandle:
        "/data/objects/Room_Essentials_Fabric_Cube_Lavender.object_config.json",
      physicsProperties:
        "test_assets/objects/Room_Essentials_Fabric_Cube_Lavender.object_config.json",
      renderMesh: "test_assets/objects/Room_Essentials_Fabric_Cube_Lavender.glb"
    },
    {
      object: "blue toy train",
      objectIcon:
        "/data/test_assets/objects/Thomas_Friends_Wooden_Railway_Talking_Thomas_z7yi7UFHJRj.png",
      objectHandle:
        "/data/objects/Thomas_Friends_Wooden_Railway_Talking_Thomas_z7yi7UFHJRj.object_config.json",
      physicsProperties:
        "test_assets/objects/Thomas_Friends_Wooden_Railway_Talking_Thomas_z7yi7UFHJRj.object_config.json",
      renderMesh:
        "test_assets/objects/Thomas_Friends_Wooden_Railway_Talking_Thomas_z7yi7UFHJRj.glb"
    },
    {
      object: "stack ring toy",
      objectIcon:
        "/data/test_assets/objects/Vtech_Stack_Sing_Rings_636_Months.png",
      objectHandle:
        "/data/objects/Vtech_Stack_Sing_Rings_636_Months.object_config.json",
      physicsProperties:
        "test_assets/objects/Vtech_Stack_Sing_Rings_636_Months.object_config.json",
      renderMesh: "test_assets/objects/Vtech_Stack_Sing_Rings_636_Months.glb"
    },
    {
      object: "yellow mug",
      objectIcon:
        "/data/test_assets/objects/Room_Essentials_Mug_White_Yellow.png",
      objectHandle:
        "/data/objects/Room_Essentials_Mug_White_Yellow.object_config.json",
      physicsProperties:
        "test_assets/objects/Room_Essentials_Mug_White_Yellow.object_config.json",
      renderMesh: "test_assets/objects/Room_Essentials_Mug_White_Yellow.glb"
    },
    {
      object: "toy dog",
      objectIcon:
        "/data/test_assets/objects/Toysmith_Windem_Up_Flippin_Animals_Dog.png",
      objectHandle:
        "/data/objects/Toysmith_Windem_Up_Flippin_Animals_Dog.object_config.json",
      physicsProperties:
        "test_assets/objects/Toysmith_Windem_Up_Flippin_Animals_Dog.object_config.json",
      renderMesh:
        "test_assets/objects/Toysmith_Windem_Up_Flippin_Animals_Dog.glb"
    },
    {
      object: "android figure",
      objectIcon: "/data/test_assets/objects/Great_Dinos_Triceratops_Toy.png",
      objectHandle:
        "/data/objects/Great_Dinos_Triceratops_Toy.object_config.json",
      physicsProperties:
        "test_assets/objects/Great_Dinos_Triceratops_Toy.object_config.json",
      renderMesh: "test_assets/objects/Great_Dinos_Triceratops_Toy.glb"
    },
    {
      object: "pressure cooker",
      objectIcon:
        "/data/test_assets/objects/TriStar_Products_PPC_Power_Pressure_Cooker_XL_in_Black.png",
      objectHandle:
        "/data/objects/TriStar_Products_PPC_Power_Pressure_Cooker_XL_in_Black.object_config.json",
      physicsProperties:
        "test_assets/objects/TriStar_Products_PPC_Power_Pressure_Cooker_XL_in_Black.object_config.json",
      renderMesh:
        "test_assets/objects/TriStar_Products_PPC_Power_Pressure_Cooker_XL_in_Black.glb"
    },
    {
      object: "hair straightener",
      objectIcon:
        "/data/test_assets/objects/Remington_TStudio_Silk_Ceramic_Hair_Straightener_2_Inch_Floating_Plates.png",
      objectHandle:
        "/data/objects/Remington_TStudio_Silk_Ceramic_Hair_Straightener_2_Inch_Floating_Plates.object_config.json",
      physicsProperties:
        "test_assets/objects/Remington_TStudio_Silk_Ceramic_Hair_Straightener_2_Inch_Floating_Plates.object_config.json",
      renderMesh:
        "test_assets/objects/Remington_TStudio_Silk_Ceramic_Hair_Straightener_2_Inch_Floating_Plates.glb"
    },
    {
      object: "red saucer",
      objectIcon: "/data/test_assets/objects/Ecoforms_Plant_Saucer_SQ8COR.png",
      objectHandle:
        "/data/objects/Ecoforms_Plant_Saucer_SQ8COR.object_config.json",
      physicsProperties:
        "test_assets/objects/Ecoforms_Plant_Saucer_SQ8COR.object_config.json",
      renderMesh: "test_assets/objects/Ecoforms_Plant_Saucer_SQ8COR.glb"
    },
    {
      object: "storage bin",
      objectIcon:
        "/data/test_assets/objects/Curver_Storage_Bin_Black_Small.png",
      objectHandle:
        "/data/objects/Curver_Storage_Bin_Black_Small.object_config.json",
      physicsProperties:
        "test_assets/objects/Curver_Storage_Bin_Black_Small.object_config.json",
      renderMesh: "test_assets/objects/Curver_Storage_Bin_Black_Small.glb"
    },
    {
      object: "white pitcher",
      objectIcon:
        "/data/test_assets/objects/Threshold_Porcelain_Pitcher_White.png",
      objectHandle:
        "/data/objects/Threshold_Porcelain_Pitcher_White.object_config.json",
      physicsProperties:
        "test_assets/objects/Threshold_Porcelain_Pitcher_White.object_config.json",
      renderMesh: "test_assets/objects/Threshold_Porcelain_Pitcher_White.glb"
    },
    {
      object: "pink saucer",
      objectIcon: "/data/test_assets/objects/Cole_Hardware_Saucer_Electric.png",
      objectHandle:
        "/data/objects/Cole_Hardware_Saucer_Electric.object_config.json",
      physicsProperties:
        "test_assets/objects/Cole_Hardware_Saucer_Electric.object_config.json",
      renderMesh: "test_assets/objects/Cole_Hardware_Saucer_Electric.glb"
    },
    {
      object: "white mug",
      objectIcon:
        "/data/test_assets/objects/Threshold_Porcelain_Coffee_Mug_All_Over_Bead_White.png",
      objectHandle:
        "/data/objects/Threshold_Porcelain_Coffee_Mug_All_Over_Bead_White.object_config.json",
      physicsProperties:
        "test_assets/objects/Threshold_Porcelain_Coffee_Mug_All_Over_Bead_White.object_config.json",
      renderMesh:
        "test_assets/objects/Threshold_Porcelain_Coffee_Mug_All_Over_Bead_White.glb"
    },
    {
      object: "cereal bowl",
      objectIcon:
        "/data/test_assets/objects/Threshold_Bead_Cereal_Bowl_White.png",
      objectHandle:
        "/data/objects/Threshold_Bead_Cereal_Bowl_White.object_config.json",
      physicsProperties:
        "test_assets/objects/Threshold_Bead_Cereal_Bowl_White.object_config.json",
      renderMesh: "test_assets/objects/Threshold_Bead_Cereal_Bowl_White.glb"
    },
    {
      object: "flashlight",
      objectIcon: "/data/test_assets/objects/HeavyDuty_Flashlight.png",
      objectHandle: "/data/objects/HeavyDuty_Flashlight.object_config.json",
      physicsProperties:
        "test_assets/objects/HeavyDuty_Flashlight.object_config.json",
      renderMesh: "test_assets/objects/HeavyDuty_Flashlight.glb"
    },
    {
      object: "red plastic bowl",
      objectIcon:
        "/data/test_assets/objects/Bradshaw_International_11642_7_Qt_MP_Plastic_Bowl.png",
      objectHandle:
        "/data/objects/Bradshaw_International_11642_7_Qt_MP_Plastic_Bowl.object_config.json",
      physicsProperties:
        "test_assets/objects/Bradshaw_International_11642_7_Qt_MP_Plastic_Bowl.object_config.json",
      renderMesh:
        "test_assets/objects/Bradshaw_International_11642_7_Qt_MP_Plastic_Bowl.glb"
    },
    {
      object: "soap dish",
      objectIcon:
        "/data/test_assets/objects/Threshold_Bamboo_Ceramic_Soap_Dish.png",
      objectHandle:
        "/data/objects/Threshold_Bamboo_Ceramic_Soap_Dish.object_config.json",
      physicsProperties:
        "test_assets/objects/Threshold_Bamboo_Ceramic_Soap_Dish.object_config.json",
      renderMesh: "test_assets/objects/Threshold_Bamboo_Ceramic_Soap_Dish.glb"
    },
    {
      object: "brown hat",
      objectIcon: "/data/test_assets/objects/DPC_Handmade_Hat_Brown.png",
      objectHandle: "/data/objects/DPC_Handmade_Hat_Brown.object_config.json",
      physicsProperties:
        "test_assets/objects/DPC_Handmade_Hat_Brown.object_config.json",
      renderMesh: "test_assets/objects/DPC_Handmade_Hat_Brown.glb"
    },
    {
      object: "lime orchid pot",
      objectIcon:
        "/data/test_assets/objects/Down_To_Earth_Orchid_Pot_Ceramic_Lime.png",
      objectHandle:
        "/data/objects/Down_To_Earth_Orchid_Pot_Ceramic_Lime.object_config.json",
      physicsProperties:
        "test_assets/objects/Down_To_Earth_Orchid_Pot_Ceramic_Lime.object_config.json",
      renderMesh:
        "test_assets/objects/Down_To_Earth_Orchid_Pot_Ceramic_Lime.glb"
    },
    {
      object: "red butter dish",
      objectIcon:
        "/data/test_assets/objects/Cole_Hardware_Butter_Dish_Square_Red.png",
      objectHandle:
        "/data/objects/Cole_Hardware_Butter_Dish_Square_Red.object_config.json",
      physicsProperties:
        "test_assets/objects/Cole_Hardware_Butter_Dish_Square_Red.object_config.json",
      renderMesh: "test_assets/objects/Cole_Hardware_Butter_Dish_Square_Red.glb"
    },
    {
      object: "grey dog food bowl",
      objectIcon:
        "/data/test_assets/objects/Grreatv_Choice_Dog_Bowl_Gray_Bones_Plastic_20_fl_oz_total.png",
      objectHandle:
        "/data/objects/Grreatv_Choice_Dog_Bowl_Gray_Bones_Plastic_20_fl_oz_total.object_config.json",
      physicsProperties:
        "test_assets/objects/Grreatv_Choice_Dog_Bowl_Gray_Bones_Plastic_20_fl_oz_total.object_config.json",
      renderMesh:
        "test_assets/objects/Grreatv_Choice_Dog_Bowl_Gray_Bones_Plastic_20_fl_oz_total.glb"
    },
    {
      object: "android lego",
      objectIcon: "/data/test_assets/objects/Android_Lego.png",
      objectHandle: "/data/objects/Android_Lego.object_config.json",
      physicsProperties: "test_assets/objects/Android_Lego.object_config.json",
      renderMesh: "test_assets/objects/Android_Lego.glb"
    },
    {
      object: "utensil holder",
      objectIcon:
        "/data/test_assets/objects/BIA_Cordon_Bleu_White_Porcelain_Utensil_Holder_900028.png",
      objectHandle:
        "/data/objects/BIA_Cordon_Bleu_White_Porcelain_Utensil_Holder_900028.object_config.json",
      physicsProperties:
        "test_assets/objects/BIA_Cordon_Bleu_White_Porcelain_Utensil_Holder_900028.object_config.json",
      renderMesh:
        "test_assets/objects/BIA_Cordon_Bleu_White_Porcelain_Utensil_Holder_900028.glb"
    },
    {
      object: "yellow serving bowl",
      objectIcon:
        "/data/test_assets/objects/Cole_Hardware_Bowl_Scirocco_YellowBlue.png",
      objectHandle:
        "/data/objects/Cole_Hardware_Bowl_Scirocco_YellowBlue.object_config.json",
      physicsProperties:
        "test_assets/objects/Cole_Hardware_Bowl_Scirocco_YellowBlue.object_config.json",
      renderMesh:
        "test_assets/objects/Cole_Hardware_Bowl_Scirocco_YellowBlue.glb"
    },
    {
      object: "basket",
      objectIcon: "/data/test_assets/objects/basket.png",
      objectHandle: "/data/objects/basket.object_config.json",
      physicsProperties: "test_assets/objects/basket.object_config.json",
      renderMesh: "test_assets/objects/basket.glb"
    },
    {
      object: "grey hat",
      objectIcon: "/data/test_assets/objects/grey_hat.png",
      objectHandle: "/data/objects/grey_hat.object_config.json",
      physicsProperties: "test_assets/objects/grey_hat.object_config.json",
      renderMesh: "test_assets/objects/grey_hat.glb"
    },
    {
      object: "locobot",
      objectIcon: "/data/test_assets/objects/locobot_merged.png",
      objectHandle: "/data/objects/locobot_merged.object_config.json",
      physicsProperties:
        "test_assets/objects/locobot_merged.object_config.json",
      renderMesh: "test_assets/objects/locobot_merged.glb"
    }
  ]
};

export const flythroughReplayTask = {
  name: "replay_task_1.json",
  config: "tasks/pick_and_place/replay_task_1.json"
};

export const flythroughReplayFile = {
  name: "replay_task_1.csv",
  location: "replays/replay_task_1.csv"
};

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

export const trainingTask = {
  name: "training_task_1.json",
  config: "tasks/pick_and_place/training_task_1.json"
};

export const inventorySlots = 1;

export const episodeIdObjectReceptacleMap = {
  object_list: [
    ["tomato_soup_can", "Threshold_Dinner_Plate_Square_Rim_White_Porcelain"],
    ["tomato_soup_can", "Threshold_Bistro_Ceramic_Dinner_Plate_Ruby_Ring"],
    ["master_chef_can", "Threshold_Dinner_Plate_Square_Rim_White_Porcelain"],
    ["master_chef_can", "Threshold_Bistro_Ceramic_Dinner_Plate_Ruby_Ring"],
    ["tuna_fish_can", "Threshold_Dinner_Plate_Square_Rim_White_Porcelain"],
    ["tuna_fish_can", "Threshold_Bistro_Ceramic_Dinner_Plate_Ruby_Ring"],
    ["potted_meat_can", "Threshold_Dinner_Plate_Square_Rim_White_Porcelain"],
    ["potted_meat_can", "Threshold_Bistro_Ceramic_Dinner_Plate_Ruby_Ring"],
    ["gelatin_box", "Threshold_Dinner_Plate_Square_Rim_White_Porcelain"],
    ["gelatin_box", "Threshold_Bistro_Ceramic_Dinner_Plate_Ruby_Ring"],
    ["apple", "Threshold_Dinner_Plate_Square_Rim_White_Porcelain"],
    ["apple", "Threshold_Bistro_Ceramic_Dinner_Plate_Ruby_Ring"],
    ["apple", "Dixie_10_ounce_Bowls_35_ct"],
    ["apple", "Bradshaw_International_11642_7_Qt_MP_Plastic_Bowl"],
    ["banana", "Threshold_Dinner_Plate_Square_Rim_White_Porcelain"],
    ["banana", "Threshold_Bistro_Ceramic_Dinner_Plate_Ruby_Ring"],
    ["banana", "Dixie_10_ounce_Bowls_35_ct"],
    ["banana", "Bradshaw_International_11642_7_Qt_MP_Plastic_Bowl"],
    ["orange", "Threshold_Dinner_Plate_Square_Rim_White_Porcelain"],
    ["orange", "Threshold_Bistro_Ceramic_Dinner_Plate_Ruby_Ring"],
    ["orange", "Dixie_10_ounce_Bowls_35_ct"],
    ["orange", "Bradshaw_International_11642_7_Qt_MP_Plastic_Bowl"],
    ["plum", "Threshold_Dinner_Plate_Square_Rim_White_Porcelain"],
    ["plum", "Threshold_Bistro_Ceramic_Dinner_Plate_Ruby_Ring"],
    ["plum", "Dixie_10_ounce_Bowls_35_ct"],
    ["plum", "Bradshaw_International_11642_7_Qt_MP_Plastic_Bowl"],
    ["pear", "Threshold_Dinner_Plate_Square_Rim_White_Porcelain"],
    ["pear", "Threshold_Bistro_Ceramic_Dinner_Plate_Ruby_Ring"],
    ["pear", "Dixie_10_ounce_Bowls_35_ct"],
    ["pear", "Bradshaw_International_11642_7_Qt_MP_Plastic_Bowl"],
    ["cracker_box", "Threshold_Dinner_Plate_Square_Rim_White_Porcelain"],
    ["cracker_box", "Threshold_Bistro_Ceramic_Dinner_Plate_Ruby_Ring"],
    ["sugar_box", "Threshold_Dinner_Plate_Square_Rim_White_Porcelain"],
    ["sugar_box", "Threshold_Bistro_Ceramic_Dinner_Plate_Ruby_Ring"],
    ["mustard_bottle", "Threshold_Dinner_Plate_Square_Rim_White_Porcelain"],
    ["mustard_bottle", "Threshold_Bistro_Ceramic_Dinner_Plate_Ruby_Ring"],
    ["bleach_cleanser", "Threshold_Dinner_Plate_Square_Rim_White_Porcelain"],
    ["bleach_cleanser", "Threshold_Bistro_Ceramic_Dinner_Plate_Ruby_Ring"],
    ["spoon", "Threshold_Dinner_Plate_Square_Rim_White_Porcelain"],
    ["spoon", "Threshold_Bistro_Ceramic_Dinner_Plate_Ruby_Ring"],
    ["spoon", "Room_Essentials_Dish_Drainer_Collapsible_White"],
    ["fork", "Threshold_Dinner_Plate_Square_Rim_White_Porcelain"],
    ["fork", "Threshold_Bistro_Ceramic_Dinner_Plate_Ruby_Ring"],
    ["fork", "Room_Essentials_Dish_Drainer_Collapsible_White"],
    ["knife", "Threshold_Dinner_Plate_Square_Rim_White_Porcelain"],
    ["knife", "Threshold_Bistro_Ceramic_Dinner_Plate_Ruby_Ring"],
    ["knife", "Room_Essentials_Dish_Drainer_Collapsible_White"],
    ["spatula", "Threshold_Dinner_Plate_Square_Rim_White_Porcelain"],
    ["spatula", "Threshold_Bistro_Ceramic_Dinner_Plate_Ruby_Ring"],
    ["spatula", "Room_Essentials_Dish_Drainer_Collapsible_White"],
    ["b_cups", "Threshold_Dinner_Plate_Square_Rim_White_Porcelain"],
    ["b_cups", "Threshold_Bistro_Ceramic_Dinner_Plate_Ruby_Ring"],
    ["b_cups", "Room_Essentials_Dish_Drainer_Collapsible_White"],
    ["c_cups", "Threshold_Dinner_Plate_Square_Rim_White_Porcelain"],
    ["c_cups", "Threshold_Bistro_Ceramic_Dinner_Plate_Ruby_Ring"],
    ["c_cups", "Room_Essentials_Dish_Drainer_Collapsible_White"],
    ["e_cups", "Threshold_Dinner_Plate_Square_Rim_White_Porcelain"],
    ["e_cups", "Threshold_Bistro_Ceramic_Dinner_Plate_Ruby_Ring"],
    ["e_cups", "Room_Essentials_Dish_Drainer_Collapsible_White"],
    ["d_cups", "Threshold_Dinner_Plate_Square_Rim_White_Porcelain"],
    ["d_cups", "Threshold_Bistro_Ceramic_Dinner_Plate_Ruby_Ring"],
    ["d_cups", "Room_Essentials_Dish_Drainer_Collapsible_White"],
    ["a_cups", "Threshold_Dinner_Plate_Square_Rim_White_Porcelain"],
    ["a_cups", "Threshold_Bistro_Ceramic_Dinner_Plate_Ruby_Ring"],
    ["a_cups", "Room_Essentials_Dish_Drainer_Collapsible_White"],
    ["f_cups", "Threshold_Dinner_Plate_Square_Rim_White_Porcelain"],
    ["f_cups", "Threshold_Bistro_Ceramic_Dinner_Plate_Ruby_Ring"],
    ["f_cups", "Room_Essentials_Dish_Drainer_Collapsible_White"],
    ["mug", "Threshold_Dinner_Plate_Square_Rim_White_Porcelain"],
    ["mug", "Threshold_Bistro_Ceramic_Dinner_Plate_Ruby_Ring"],
    ["mug", "Room_Essentials_Dish_Drainer_Collapsible_White"],
    ["bowl", "Threshold_Dinner_Plate_Square_Rim_White_Porcelain"],
    ["bowl", "Threshold_Bistro_Ceramic_Dinner_Plate_Ruby_Ring"],
    ["bowl", "Room_Essentials_Dish_Drainer_Collapsible_White"],
    ["plate", "Room_Essentials_Dish_Drainer_Collapsible_White"],
    ["plate", "Dixie_10_ounce_Bowls_35_ct"],
    ["plate", "Bradshaw_International_11642_7_Qt_MP_Plastic_Bowl"],
    ["Cole_Hardware_Bowl_Scirocco_YellowBlue", "plate"],
    ["Cole_Hardware_Bowl_Scirocco_YellowBlue", "b_colored_wood_blocks"],
    ["Cole_Hardware_Bowl_Scirocco_YellowBlue", "foam_brick"],
    [
      "Cole_Hardware_Bowl_Scirocco_YellowBlue",
      "Room_Essentials_Dish_Drainer_Collapsible_White"
    ],
    [
      "Cole_Hardware_Bowl_Scirocco_YellowBlue",
      "Threshold_Dinner_Plate_Square_Rim_White_Porcelain"
    ],
    [
      "Cole_Hardware_Bowl_Scirocco_YellowBlue",
      "Threshold_Bistro_Ceramic_Dinner_Plate_Ruby_Ring"
    ],
    ["Dixie_10_ounce_Bowls_35_ct", "plate"],
    ["Dixie_10_ounce_Bowls_35_ct", "b_colored_wood_blocks"],
    ["Dixie_10_ounce_Bowls_35_ct", "foam_brick"],
    [
      "Dixie_10_ounce_Bowls_35_ct",
      "Room_Essentials_Dish_Drainer_Collapsible_White"
    ],
    [
      "Dixie_10_ounce_Bowls_35_ct",
      "Threshold_Dinner_Plate_Square_Rim_White_Porcelain"
    ],
    [
      "Dixie_10_ounce_Bowls_35_ct",
      "Threshold_Bistro_Ceramic_Dinner_Plate_Ruby_Ring"
    ],
    ["Threshold_Bead_Cereal_Bowl_White", "plate"],
    ["Threshold_Bead_Cereal_Bowl_White", "b_colored_wood_blocks"],
    ["Threshold_Bead_Cereal_Bowl_White", "foam_brick"],
    [
      "Threshold_Bead_Cereal_Bowl_White",
      "Room_Essentials_Dish_Drainer_Collapsible_White"
    ],
    [
      "Threshold_Bead_Cereal_Bowl_White",
      "Threshold_Dinner_Plate_Square_Rim_White_Porcelain"
    ],
    [
      "Threshold_Bead_Cereal_Bowl_White",
      "Threshold_Bistro_Ceramic_Dinner_Plate_Ruby_Ring"
    ],
    ["Bradshaw_International_11642_7_Qt_MP_Plastic_Bowl", "plate"],
    [
      "Bradshaw_International_11642_7_Qt_MP_Plastic_Bowl",
      "b_colored_wood_blocks"
    ],
    ["Bradshaw_International_11642_7_Qt_MP_Plastic_Bowl", "foam_brick"],
    [
      "Bradshaw_International_11642_7_Qt_MP_Plastic_Bowl",
      "Room_Essentials_Dish_Drainer_Collapsible_White"
    ],
    [
      "Bradshaw_International_11642_7_Qt_MP_Plastic_Bowl",
      "Threshold_Dinner_Plate_Square_Rim_White_Porcelain"
    ],
    [
      "Bradshaw_International_11642_7_Qt_MP_Plastic_Bowl",
      "Threshold_Bistro_Ceramic_Dinner_Plate_Ruby_Ring"
    ],
    [
      "Top_Paw_Dog_Bowl_Blue_Paw_Bone_Ceramic_25_fl_oz_total",
      "b_colored_wood_blocks"
    ],
    [
      "Top_Paw_Dog_Bowl_Blue_Paw_Bone_Ceramic_25_fl_oz_total",
      "colored_wood_blocks"
    ],
    [
      "Top_Paw_Dog_Bowl_Blue_Paw_Bone_Ceramic_25_fl_oz_total",
      "Curver_Storage_Bin_Black_Small"
    ],
    ["Grreat_Choice_Dog_Double_Dish_Plastic_Blue", "b_colored_wood_blocks"],
    ["Grreat_Choice_Dog_Double_Dish_Plastic_Blue", "colored_wood_blocks"],
    [
      "Grreat_Choice_Dog_Double_Dish_Plastic_Blue",
      "Curver_Storage_Bin_Black_Small"
    ],
    [
      "Grreatv_Choice_Dog_Bowl_Gray_Bones_Plastic_20_fl_oz_total",
      "b_colored_wood_blocks"
    ],
    [
      "Grreatv_Choice_Dog_Bowl_Gray_Bones_Plastic_20_fl_oz_total",
      "colored_wood_blocks"
    ],
    [
      "Grreatv_Choice_Dog_Bowl_Gray_Bones_Plastic_20_fl_oz_total",
      "Curver_Storage_Bin_Black_Small"
    ],
    ["Pennington_Electric_Pot_Cabana_4", "b_colored_wood_blocks"],
    ["Pennington_Electric_Pot_Cabana_4", "wood_block"],
    ["Pennington_Electric_Pot_Cabana_4", "foam_brick"],
    ["Pennington_Electric_Pot_Cabana_4", "Curver_Storage_Bin_Black_Small"],
    ["Down_To_Earth_Orchid_Pot_Ceramic_Red", "b_colored_wood_blocks"],
    ["Down_To_Earth_Orchid_Pot_Ceramic_Red", "wood_block"],
    ["Down_To_Earth_Orchid_Pot_Ceramic_Red", "foam_brick"],
    ["Down_To_Earth_Orchid_Pot_Ceramic_Red", "Curver_Storage_Bin_Black_Small"],
    ["Down_To_Earth_Ceramic_Orchid_Pot_Asst_Blue", "b_colored_wood_blocks"],
    ["Down_To_Earth_Ceramic_Orchid_Pot_Asst_Blue", "wood_block"],
    ["Down_To_Earth_Ceramic_Orchid_Pot_Asst_Blue", "foam_brick"],
    [
      "Down_To_Earth_Ceramic_Orchid_Pot_Asst_Blue",
      "Curver_Storage_Bin_Black_Small"
    ],
    ["Down_To_Earth_Orchid_Pot_Ceramic_Lime", "b_colored_wood_blocks"],
    ["Down_To_Earth_Orchid_Pot_Ceramic_Lime", "wood_block"],
    ["Down_To_Earth_Orchid_Pot_Ceramic_Lime", "foam_brick"],
    ["Down_To_Earth_Orchid_Pot_Ceramic_Lime", "Curver_Storage_Bin_Black_Small"],
    [
      "SpiderMan_Titan_Hero_12Inch_Action_Figure_5Hnn4mtkFsP",
      "b_colored_wood_blocks"
    ],
    [
      "SpiderMan_Titan_Hero_12Inch_Action_Figure_5Hnn4mtkFsP",
      "colored_wood_blocks"
    ],
    [
      "SpiderMan_Titan_Hero_12Inch_Action_Figure_5Hnn4mtkFsP",
      "Closetmaid_Premium_Fabric_Cube_Red"
    ],
    ["SpiderMan_Titan_Hero_12Inch_Action_Figure_5Hnn4mtkFsP", "basket"],
    [
      "SpiderMan_Titan_Hero_12Inch_Action_Figure_5Hnn4mtkFsP",
      "Room_Essentials_Fabric_Cube_Lavender"
    ],
    [
      "SpiderMan_Titan_Hero_12Inch_Action_Figure_5Hnn4mtkFsP",
      "Curver_Storage_Bin_Black_Small"
    ],
    ["Schleich_Spinosaurus_Action_Figure", "b_colored_wood_blocks"],
    ["Schleich_Spinosaurus_Action_Figure", "colored_wood_blocks"],
    [
      "Schleich_Spinosaurus_Action_Figure",
      "Closetmaid_Premium_Fabric_Cube_Red"
    ],
    ["Schleich_Spinosaurus_Action_Figure", "basket"],
    [
      "Schleich_Spinosaurus_Action_Figure",
      "Room_Essentials_Fabric_Cube_Lavender"
    ],
    ["Schleich_Spinosaurus_Action_Figure", "Curver_Storage_Bin_Black_Small"],
    [
      "Teenage_Mutant_Ninja_Turtles_Rahzar_Action_Figure",
      "b_colored_wood_blocks"
    ],
    [
      "Teenage_Mutant_Ninja_Turtles_Rahzar_Action_Figure",
      "colored_wood_blocks"
    ],
    [
      "Teenage_Mutant_Ninja_Turtles_Rahzar_Action_Figure",
      "Closetmaid_Premium_Fabric_Cube_Red"
    ],
    ["Teenage_Mutant_Ninja_Turtles_Rahzar_Action_Figure", "basket"],
    [
      "Teenage_Mutant_Ninja_Turtles_Rahzar_Action_Figure",
      "Room_Essentials_Fabric_Cube_Lavender"
    ],
    [
      "Teenage_Mutant_Ninja_Turtles_Rahzar_Action_Figure",
      "Curver_Storage_Bin_Black_Small"
    ],
    ["Schleich_Lion_Action_Figure", "b_colored_wood_blocks"],
    ["Schleich_Lion_Action_Figure", "colored_wood_blocks"],
    ["Schleich_Lion_Action_Figure", "Closetmaid_Premium_Fabric_Cube_Red"],
    ["Schleich_Lion_Action_Figure", "basket"],
    ["Schleich_Lion_Action_Figure", "Room_Essentials_Fabric_Cube_Lavender"],
    ["Schleich_Lion_Action_Figure", "Curver_Storage_Bin_Black_Small"],
    ["SCHOOL_BUS", "b_colored_wood_blocks"],
    ["SCHOOL_BUS", "colored_wood_blocks"],
    ["SCHOOL_BUS", "Closetmaid_Premium_Fabric_Cube_Red"],
    ["SCHOOL_BUS", "basket"],
    ["SCHOOL_BUS", "Room_Essentials_Fabric_Cube_Lavender"],
    ["SCHOOL_BUS", "Curver_Storage_Bin_Black_Small"],
    ["Thomas_Friends_Woodan_Railway_Henry", "b_colored_wood_blocks"],
    ["Thomas_Friends_Woodan_Railway_Henry", "colored_wood_blocks"],
    [
      "Thomas_Friends_Woodan_Railway_Henry",
      "Closetmaid_Premium_Fabric_Cube_Red"
    ],
    ["Thomas_Friends_Woodan_Railway_Henry", "basket"],
    [
      "Thomas_Friends_Woodan_Railway_Henry",
      "Room_Essentials_Fabric_Cube_Lavender"
    ],
    ["Thomas_Friends_Woodan_Railway_Henry", "Curver_Storage_Bin_Black_Small"],
    ["Weisshai_Great_White_Shark", "b_colored_wood_blocks"],
    ["Weisshai_Great_White_Shark", "colored_wood_blocks"],
    ["Weisshai_Great_White_Shark", "Closetmaid_Premium_Fabric_Cube_Red"],
    ["Weisshai_Great_White_Shark", "basket"],
    ["Weisshai_Great_White_Shark", "Room_Essentials_Fabric_Cube_Lavender"],
    ["Weisshai_Great_White_Shark", "Curver_Storage_Bin_Black_Small"],
    ["Sonny_School_Bus", "b_colored_wood_blocks"],
    ["Sonny_School_Bus", "colored_wood_blocks"],
    ["Sonny_School_Bus", "Closetmaid_Premium_Fabric_Cube_Red"],
    ["Sonny_School_Bus", "basket"],
    ["Sonny_School_Bus", "Room_Essentials_Fabric_Cube_Lavender"],
    ["Sonny_School_Bus", "Curver_Storage_Bin_Black_Small"],
    ["Vtech_Roll_Learn_Turtle", "b_colored_wood_blocks"],
    ["Vtech_Roll_Learn_Turtle", "colored_wood_blocks"],
    ["Vtech_Roll_Learn_Turtle", "Closetmaid_Premium_Fabric_Cube_Red"],
    ["Vtech_Roll_Learn_Turtle", "basket"],
    ["Vtech_Roll_Learn_Turtle", "Room_Essentials_Fabric_Cube_Lavender"],
    ["Vtech_Roll_Learn_Turtle", "Curver_Storage_Bin_Black_Small"],
    [
      "Thomas_Friends_Wooden_Railway_Porter_5JzRhMm3a9o",
      "b_colored_wood_blocks"
    ],
    ["Thomas_Friends_Wooden_Railway_Porter_5JzRhMm3a9o", "colored_wood_blocks"],
    [
      "Thomas_Friends_Wooden_Railway_Porter_5JzRhMm3a9o",
      "Closetmaid_Premium_Fabric_Cube_Red"
    ],
    ["Thomas_Friends_Wooden_Railway_Porter_5JzRhMm3a9o", "basket"],
    [
      "Thomas_Friends_Wooden_Railway_Porter_5JzRhMm3a9o",
      "Room_Essentials_Fabric_Cube_Lavender"
    ],
    [
      "Thomas_Friends_Wooden_Railway_Porter_5JzRhMm3a9o",
      "Curver_Storage_Bin_Black_Small"
    ],
    ["Fisher_price_Classic_Toys_Buzzy_Bee", "b_colored_wood_blocks"],
    ["Fisher_price_Classic_Toys_Buzzy_Bee", "colored_wood_blocks"],
    [
      "Fisher_price_Classic_Toys_Buzzy_Bee",
      "Closetmaid_Premium_Fabric_Cube_Red"
    ],
    ["Fisher_price_Classic_Toys_Buzzy_Bee", "basket"],
    [
      "Fisher_price_Classic_Toys_Buzzy_Bee",
      "Room_Essentials_Fabric_Cube_Lavender"
    ],
    ["Fisher_price_Classic_Toys_Buzzy_Bee", "Curver_Storage_Bin_Black_Small"],
    ["TURBOPROP_AIRPLANE_WITH_PILOT", "b_colored_wood_blocks"],
    ["TURBOPROP_AIRPLANE_WITH_PILOT", "colored_wood_blocks"],
    ["TURBOPROP_AIRPLANE_WITH_PILOT", "Closetmaid_Premium_Fabric_Cube_Red"],
    ["TURBOPROP_AIRPLANE_WITH_PILOT", "basket"],
    ["TURBOPROP_AIRPLANE_WITH_PILOT", "Room_Essentials_Fabric_Cube_Lavender"],
    ["TURBOPROP_AIRPLANE_WITH_PILOT", "Curver_Storage_Bin_Black_Small"],
    [
      "Thomas_Friends_Wooden_Railway_Talking_Thomas_z7yi7UFHJRj",
      "b_colored_wood_blocks"
    ],
    [
      "Thomas_Friends_Wooden_Railway_Talking_Thomas_z7yi7UFHJRj",
      "colored_wood_blocks"
    ],
    [
      "Thomas_Friends_Wooden_Railway_Talking_Thomas_z7yi7UFHJRj",
      "Closetmaid_Premium_Fabric_Cube_Red"
    ],
    ["Thomas_Friends_Wooden_Railway_Talking_Thomas_z7yi7UFHJRj", "basket"],
    [
      "Thomas_Friends_Wooden_Railway_Talking_Thomas_z7yi7UFHJRj",
      "Room_Essentials_Fabric_Cube_Lavender"
    ],
    [
      "Thomas_Friends_Wooden_Railway_Talking_Thomas_z7yi7UFHJRj",
      "Curver_Storage_Bin_Black_Small"
    ],
    ["Vtech_Stack_Sing_Rings_636_Months", "b_colored_wood_blocks"],
    ["Vtech_Stack_Sing_Rings_636_Months", "colored_wood_blocks"],
    ["Vtech_Stack_Sing_Rings_636_Months", "Closetmaid_Premium_Fabric_Cube_Red"],
    ["Vtech_Stack_Sing_Rings_636_Months", "basket"],
    [
      "Vtech_Stack_Sing_Rings_636_Months",
      "Room_Essentials_Fabric_Cube_Lavender"
    ],
    ["Vtech_Stack_Sing_Rings_636_Months", "Curver_Storage_Bin_Black_Small"],
    ["Toysmith_Windem_Up_Flippin_Animals_Dog", "b_colored_wood_blocks"],
    ["Toysmith_Windem_Up_Flippin_Animals_Dog", "colored_wood_blocks"],
    [
      "Toysmith_Windem_Up_Flippin_Animals_Dog",
      "Closetmaid_Premium_Fabric_Cube_Red"
    ],
    ["Toysmith_Windem_Up_Flippin_Animals_Dog", "basket"],
    [
      "Toysmith_Windem_Up_Flippin_Animals_Dog",
      "Room_Essentials_Fabric_Cube_Lavender"
    ],
    [
      "Toysmith_Windem_Up_Flippin_Animals_Dog",
      "Curver_Storage_Bin_Black_Small"
    ],
    ["Squirrel", "b_colored_wood_blocks"],
    ["Squirrel", "colored_wood_blocks"],
    ["Squirrel", "Closetmaid_Premium_Fabric_Cube_Red"],
    ["Squirrel", "basket"],
    ["Squirrel", "Room_Essentials_Fabric_Cube_Lavender"],
    ["Squirrel", "Curver_Storage_Bin_Black_Small"],
    ["Threshold_Porcelain_Teapot_White", "b_colored_wood_blocks"],
    ["Threshold_Porcelain_Teapot_White", "colored_wood_blocks"],
    ["Threshold_Porcelain_Teapot_White", "Closetmaid_Premium_Fabric_Cube_Red"],
    ["Threshold_Porcelain_Teapot_White", "basket"],
    [
      "Threshold_Porcelain_Teapot_White",
      "Room_Essentials_Fabric_Cube_Lavender"
    ],
    ["Threshold_Porcelain_Teapot_White", "Curver_Storage_Bin_Black_Small"],
    [
      "KS_Chocolate_Cube_Box_Assortment_By_Neuhaus_2010_Ounces",
      "b_colored_wood_blocks"
    ],
    [
      "KS_Chocolate_Cube_Box_Assortment_By_Neuhaus_2010_Ounces",
      "colored_wood_blocks"
    ],
    [
      "KS_Chocolate_Cube_Box_Assortment_By_Neuhaus_2010_Ounces",
      "Closetmaid_Premium_Fabric_Cube_Red"
    ],
    ["KS_Chocolate_Cube_Box_Assortment_By_Neuhaus_2010_Ounces", "basket"],
    [
      "KS_Chocolate_Cube_Box_Assortment_By_Neuhaus_2010_Ounces",
      "Room_Essentials_Fabric_Cube_Lavender"
    ],
    [
      "KS_Chocolate_Cube_Box_Assortment_By_Neuhaus_2010_Ounces",
      "Curver_Storage_Bin_Black_Small"
    ],
    ["Great_Dinos_Triceratops_Toy", "b_colored_wood_blocks"],
    ["Great_Dinos_Triceratops_Toy", "colored_wood_blocks"],
    ["Great_Dinos_Triceratops_Toy", "Closetmaid_Premium_Fabric_Cube_Red"],
    ["Great_Dinos_Triceratops_Toy", "basket"],
    ["Great_Dinos_Triceratops_Toy", "Room_Essentials_Fabric_Cube_Lavender"],
    ["Great_Dinos_Triceratops_Toy", "Curver_Storage_Bin_Black_Small"],
    [
      "Remington_TStudio_Silk_Ceramic_Hair_Straightener_2_Inch_Floating_Plates",
      "b_colored_wood_blocks"
    ],
    [
      "Remington_TStudio_Silk_Ceramic_Hair_Straightener_2_Inch_Floating_Plates",
      "colored_wood_blocks"
    ],
    [
      "Remington_TStudio_Silk_Ceramic_Hair_Straightener_2_Inch_Floating_Plates",
      "Closetmaid_Premium_Fabric_Cube_Red"
    ],
    [
      "Remington_TStudio_Silk_Ceramic_Hair_Straightener_2_Inch_Floating_Plates",
      "basket"
    ],
    [
      "Remington_TStudio_Silk_Ceramic_Hair_Straightener_2_Inch_Floating_Plates",
      "Room_Essentials_Fabric_Cube_Lavender"
    ],
    [
      "Remington_TStudio_Silk_Ceramic_Hair_Straightener_2_Inch_Floating_Plates",
      "Curver_Storage_Bin_Black_Small"
    ],
    ["Threshold_Porcelain_Pitcher_White", "b_colored_wood_blocks"],
    ["Threshold_Porcelain_Pitcher_White", "colored_wood_blocks"],
    ["Threshold_Porcelain_Pitcher_White", "Closetmaid_Premium_Fabric_Cube_Red"],
    ["Threshold_Porcelain_Pitcher_White", "basket"],
    [
      "Threshold_Porcelain_Pitcher_White",
      "Room_Essentials_Fabric_Cube_Lavender"
    ],
    ["Threshold_Porcelain_Pitcher_White", "Curver_Storage_Bin_Black_Small"],
    ["Chef_Style_Round_Cake_Pan_9_inch_pan", "b_colored_wood_blocks"],
    ["Chef_Style_Round_Cake_Pan_9_inch_pan", "colored_wood_blocks"],
    ["Ocedar_Snap_On_Dust_Pan_And_Brush_1_ct", "b_colored_wood_blocks"],
    ["Ocedar_Snap_On_Dust_Pan_And_Brush_1_ct", "colored_wood_blocks"],
    [
      "Ocedar_Snap_On_Dust_Pan_And_Brush_1_ct",
      "Curver_Storage_Bin_Black_Small"
    ],
    ["Shark", "b_colored_wood_blocks"],
    ["Shark", "colored_wood_blocks"],
    ["Shark", "Closetmaid_Premium_Fabric_Cube_Red"],
    ["Shark", "basket"],
    ["Shark", "Room_Essentials_Fabric_Cube_Lavender"],
    ["Shark", "Curver_Storage_Bin_Black_Small"],
    ["Victor_Reversible_Bookend", "b_colored_wood_blocks"],
    ["Victor_Reversible_Bookend", "colored_wood_blocks"],
    ["Victor_Reversible_Bookend", "Curver_Storage_Bin_Black_Small"],
    ["HeavyDuty_Flashlight", "b_colored_wood_blocks"],
    ["HeavyDuty_Flashlight", "colored_wood_blocks"],
    ["HeavyDuty_Flashlight", "Closetmaid_Premium_Fabric_Cube_Red"],
    ["HeavyDuty_Flashlight", "basket"],
    ["HeavyDuty_Flashlight", "Room_Essentials_Fabric_Cube_Lavender"],
    ["HeavyDuty_Flashlight", "Curver_Storage_Bin_Black_Small"],
    ["Android_Lego", "b_colored_wood_blocks"],
    ["Android_Lego", "colored_wood_blocks"],
    ["Android_Lego", "Closetmaid_Premium_Fabric_Cube_Red"],
    ["Android_Lego", "basket"],
    ["Android_Lego", "Room_Essentials_Fabric_Cube_Lavender"],
    ["Android_Lego", "Curver_Storage_Bin_Black_Small"],
    ["DPC_Handmade_Hat_Brown", "b_colored_wood_blocks"],
    ["DPC_Handmade_Hat_Brown", "colored_wood_blocks"],
    ["DPC_Handmade_Hat_Brown", "Closetmaid_Premium_Fabric_Cube_Red"],
    ["DPC_Handmade_Hat_Brown", "basket"],
    ["DPC_Handmade_Hat_Brown", "Room_Essentials_Fabric_Cube_Lavender"],
    ["DPC_Handmade_Hat_Brown", "Curver_Storage_Bin_Black_Small"],
    ["grey_hat", "b_colored_wood_blocks"],
    ["grey_hat", "colored_wood_blocks"],
    ["grey_hat", "Closetmaid_Premium_Fabric_Cube_Red"],
    ["grey_hat", "basket"],
    ["grey_hat", "Room_Essentials_Fabric_Cube_Lavender"],
    ["grey_hat", "Curver_Storage_Bin_Black_Small"],
    [
      "INTERNATIONAL_PAPER_Willamette_4_Brown_Bag_500Count",
      "b_colored_wood_blocks"
    ],
    [
      "INTERNATIONAL_PAPER_Willamette_4_Brown_Bag_500Count",
      "colored_wood_blocks"
    ],
    [
      "INTERNATIONAL_PAPER_Willamette_4_Brown_Bag_500Count",
      "Closetmaid_Premium_Fabric_Cube_Red"
    ],
    ["INTERNATIONAL_PAPER_Willamette_4_Brown_Bag_500Count", "basket"],
    [
      "INTERNATIONAL_PAPER_Willamette_4_Brown_Bag_500Count",
      "Room_Essentials_Fabric_Cube_Lavender"
    ],
    [
      "INTERNATIONAL_PAPER_Willamette_4_Brown_Bag_500Count",
      "Curver_Storage_Bin_Black_Small"
    ],
    ["Toys_R_Us_Treat_Dispenser_Smart_Puzzle_Foobler", "b_colored_wood_blocks"],
    ["Toys_R_Us_Treat_Dispenser_Smart_Puzzle_Foobler", "colored_wood_blocks"],
    [
      "Toys_R_Us_Treat_Dispenser_Smart_Puzzle_Foobler",
      "Closetmaid_Premium_Fabric_Cube_Red"
    ],
    ["Toys_R_Us_Treat_Dispenser_Smart_Puzzle_Foobler", "basket"],
    [
      "Toys_R_Us_Treat_Dispenser_Smart_Puzzle_Foobler",
      "Room_Essentials_Fabric_Cube_Lavender"
    ],
    [
      "Toys_R_Us_Treat_Dispenser_Smart_Puzzle_Foobler",
      "Curver_Storage_Bin_Black_Small"
    ],
    ["Threshold_Bamboo_Ceramic_Soap_Dish", "b_colored_wood_blocks"],
    ["Threshold_Bamboo_Ceramic_Soap_Dish", "colored_wood_blocks"],
    ["Cole_Hardware_Butter_Dish_Square_Red", "b_colored_wood_blocks"],
    ["Cole_Hardware_Butter_Dish_Square_Red", "colored_wood_blocks"],
    [
      "BIA_Cordon_Bleu_White_Porcelain_Utensil_Holder_900028",
      "b_colored_wood_blocks"
    ],
    [
      "BIA_Cordon_Bleu_White_Porcelain_Utensil_Holder_900028",
      "colored_wood_blocks"
    ],
    ["Ecoforms_Quadra_Saucer_SQ1_Avocado", "b_colored_wood_blocks"],
    ["Ecoforms_Quadra_Saucer_SQ1_Avocado", "foam_brick"],
    [
      "Ecoforms_Quadra_Saucer_SQ1_Avocado",
      "Room_Essentials_Dish_Drainer_Collapsible_White"
    ],
    ["Ecoforms_Plant_Saucer_SQ8COR", "b_colored_wood_blocks"],
    ["Ecoforms_Plant_Saucer_SQ8COR", "foam_brick"],
    [
      "Ecoforms_Plant_Saucer_SQ8COR",
      "Room_Essentials_Dish_Drainer_Collapsible_White"
    ],
    ["Cole_Hardware_Saucer_Electric", "b_colored_wood_blocks"],
    ["Cole_Hardware_Saucer_Electric", "foam_brick"],
    [
      "Cole_Hardware_Saucer_Electric",
      "Room_Essentials_Dish_Drainer_Collapsible_White"
    ],
    [
      "Threshold_Bistro_Ceramic_Dinner_Plate_Ruby_Ring",
      "b_colored_wood_blocks"
    ],
    ["Threshold_Bistro_Ceramic_Dinner_Plate_Ruby_Ring", "foam_brick"],
    [
      "Threshold_Bistro_Ceramic_Dinner_Plate_Ruby_Ring",
      "Room_Essentials_Dish_Drainer_Collapsible_White"
    ],
    [
      "Threshold_Dinner_Plate_Square_Rim_White_Porcelain",
      "b_colored_wood_blocks"
    ],
    ["Threshold_Dinner_Plate_Square_Rim_White_Porcelain", "foam_brick"],
    [
      "Threshold_Dinner_Plate_Square_Rim_White_Porcelain",
      "Room_Essentials_Dish_Drainer_Collapsible_White"
    ],
    ["ACE_Coffee_Mug_Kristen_16_oz_cup", "plate"],
    [
      "ACE_Coffee_Mug_Kristen_16_oz_cup",
      "Threshold_Dinner_Plate_Square_Rim_White_Porcelain"
    ],
    [
      "ACE_Coffee_Mug_Kristen_16_oz_cup",
      "Threshold_Bistro_Ceramic_Dinner_Plate_Ruby_Ring"
    ],
    ["Cole_Hardware_Mug_Classic_Blue", "plate"],
    [
      "Cole_Hardware_Mug_Classic_Blue",
      "Threshold_Dinner_Plate_Square_Rim_White_Porcelain"
    ],
    [
      "Cole_Hardware_Mug_Classic_Blue",
      "Threshold_Bistro_Ceramic_Dinner_Plate_Ruby_Ring"
    ],
    ["Room_Essentials_Mug_White_Yellow", "plate"],
    [
      "Room_Essentials_Mug_White_Yellow",
      "Threshold_Dinner_Plate_Square_Rim_White_Porcelain"
    ],
    [
      "Room_Essentials_Mug_White_Yellow",
      "Threshold_Bistro_Ceramic_Dinner_Plate_Ruby_Ring"
    ],
    ["Threshold_Porcelain_Coffee_Mug_All_Over_Bead_White", "plate"],
    [
      "Threshold_Porcelain_Coffee_Mug_All_Over_Bead_White",
      "Threshold_Dinner_Plate_Square_Rim_White_Porcelain"
    ],
    [
      "Threshold_Porcelain_Coffee_Mug_All_Over_Bead_White",
      "Threshold_Bistro_Ceramic_Dinner_Plate_Ruby_Ring"
    ],
    [
      "TriStar_Products_PPC_Power_Pressure_Cooker_XL_in_Black",
      "b_colored_wood_blocks"
    ],
    ["TriStar_Products_PPC_Power_Pressure_Cooker_XL_in_Black", "foam_brick"],
    ["Cole_Hardware_Hammer_Black", "b_colored_wood_blocks"],
    ["Cole_Hardware_Hammer_Black", "wood_block"],
    ["Cole_Hardware_Hammer_Black", "foam_brick"]
  ]
};

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
