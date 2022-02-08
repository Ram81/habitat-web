#!/bin/bash

# Update submodules
git submodule update --remote
cd habitat-sim/
git submodule update --init --recursive
cd ../

# Sync latest WebGL app
# cp -r task/habitat_web_app/* habitat-sim/src/esp/bindings_js/

# Build Habitat-sim with bullet
./build_js.sh #--bullet

# Sync the latest WebGL build to PsiTurk app
cp build_js/task/habitat_web_app/*.{js,js.map,wasm,css} task/static/habitat-sim/
