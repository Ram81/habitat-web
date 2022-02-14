#!/bin/bash

# Update submodules
git submodule update --remote
cd habitat-sim/
git submodule update --init --recursive
cd ../

# Build Habitat-sim
set -e

BULLET=false
USE_SIMD=false

while [[ "$#" -gt 0 ]]; do
    case $1 in
        --bullet) BULLET=true ;;
        --simd) USE_SIMD=true ;;
        *) echo "Unknown parameter passed: $1"; exit 1 ;;
    esac
    shift
done
# git submodule update --init --recursive

mkdir -p build_corrade-rc
pushd build_corrade-rc
cmake ../ \
    -DBUILD_GUI_VIEWERS=OFF \
    -DBUILD_PYTHON_BINDINGS=OFF \
    -DBUILD_ASSIMP_SUPPORT=OFF \
    -DBUILD_DATATOOL=OFF \
    -DBUILD_PTEX_SUPPORT=OFF
cmake --build . --target corrade-rc --
popd

mkdir -p build_js
cd build_js

EXE_LINKER_FLAGS="-s USE_WEBGL2=1"
HAB_C_FLAGS="-s FORCE_FILESYSTEM=1 -s ALLOW_MEMORY_GROWTH=1 -s ASSERTIONS=0"
if ${USE_SIMD} ;
    then HAB_C_FLAGS="${HAB_C_FLAGS} -msimd128"
fi
cmake ../ \
    -DCORRADE_RC_EXECUTABLE=../build_corrade-rc/RelWithDebInfo/bin/corrade-rc \
    -DBUILD_GUI_VIEWERS=ON \
    -DBUILD_PYTHON_BINDINGS=OFF \
    -DBUILD_ASSIMP_SUPPORT=OFF \
    -DBUILD_DATATOOL=OFF \
    -DBUILD_PTEX_SUPPORT=OFF \
    -DCMAKE_BUILD_TYPE=Release \
    -DCMAKE_PREFIX_PATH="$EMSCRIPTEN" \
    -DCMAKE_TOOLCHAIN_FILE="../habitat-sim/src/deps/corrade/toolchains/generic/Emscripten-wasm.cmake" \
    -DCMAKE_INSTALL_PREFIX="." \
    -DCMAKE_C_FLAGS="${HAB_C_FLAGS}" \
    -DCMAKE_CXX_FLAGS="${HAB_C_FLAGS}" \
    -DCMAKE_EXE_LINKER_FLAGS="${EXE_LINKER_FLAGS}" \
    -DBUILD_WITH_BULLET="$( if ${BULLET} ; then echo ON ; else echo OFF; fi )"

cmake --build . -- -j 4 #TODO: Set to 4 cores only on CirelcCI
cmake --build . --target install -- -j 4
cd ../

echo "Done building."
echo "Run:"
echo "cd build_js/task/habitat_web_app/"
echo "Run:"
echo "python2 -m SimpleHTTPServer 8001"
echo "Or:"
echo "python3 -m http.server 8001"
echo "Then open in browser:"
echo "http://0.0.0.0:8001/bindings.html?defaultPhysConfig=default.physics_config.json&scene=sT4fr6TAbpF.glb&episodeId=0&dataset=pick_and_place&enablePhysics=true"
echo "To enable physics"
echo "http://0.0.0.0:8001/bindings.html?defaultPhysConfig=default.physics_config.json&scene=sT4fr6TAbpF.glb&episodeId=0&dataset=pick_and_place&enablePhysics=true"


# Sync the latest WebGL build to PsiTurk app
cp build_js/task/habitat_web_app/*.{js,js.map,wasm,css} task/static/habitat-sim/
