# Copyright (c) Facebook, Inc. and its affiliates.
# This source code is licensed under the MIT license found in the
# LICENSE file in the root directory of this source tree.

cmake_minimum_required(VERSION 3.10)

option(BUILD_WITH_CUDA "Build Habitat-Sim with CUDA features enabled -- Requires CUDA"
       OFF
)

if(BUILD_WITH_CUDA)
  project(esp LANGUAGES C CXX CUDA)
  find_library(CUDART_LIBRARY cudart ${CMAKE_CUDA_IMPLICIT_LINK_DIRECTORIES})
else()
  project(esp LANGUAGES C CXX)
endif()

if(MSVC)
  add_definitions(/DNOMINMAX)
endif()

find_program(CCACHE_FOUND ccache)
if(CCACHE_FOUND)
  set_property(GLOBAL PROPERTY RULE_LAUNCH_COMPILE ccache)
  set_property(GLOBAL PROPERTY RULE_LAUNCH_LINK ccache)
endif()

set(DATA_DIR ${CMAKE_CURRENT_SOURCE_DIR}/task/data)
set(SCENE_DATASETS ${CMAKE_CURRENT_SOURCE_DIR}/task/data/scene_datasets)
set(TEST_ASSETS ${CMAKE_CURRENT_SOURCE_DIR}/task/data/test_assets)
set(DATASETS ${CMAKE_CURRENT_SOURCE_DIR}/task/data)
set(TASK_CSS ${CMAKE_CURRENT_SOURCE_DIR}/task/static/css)
# build options
option(BUILD_ASSIMP_SUPPORT "Whether to build assimp import library support" ON)
option(BUILD_PYTHON_BINDINGS "Whether to build python bindings" ON)
option(BUILD_DATATOOL "Whether to build datatool utility binary" ON)
option(BUILD_PTEX_SUPPORT "Whether to build ptex mesh support" ON)
option(BUILD_GUI_VIEWERS "Whether to build GUI viewer utility binary" OFF)
option(BUILD_WITH_BULLET
       "Build Habitat-Sim with Bullet physics enabled -- Requires Bullet" OFF
)
option(BUILD_TEST "Build test binaries" OFF)
option(USE_SYSTEM_ASSIMP "Use system Assimp instead of a bundled submodule" OFF)
option(USE_SYSTEM_EIGEN "Use system Eigen instead of a bundled submodule" OFF)
option(USE_SYSTEM_GLFW "Use system GLFW instead of a bundled submodule" OFF)
option(USE_SYSTEM_MAGNUM "Use system Magnum instead of a bundled submodule" OFF)
option(USE_SYSTEM_PYBIND11 "Use system Pybind11 instead of a bundled submodule" OFF)
option(USE_SYSTEM_RAPIDJSON "Use system RapidJSON instead of a bundled submodule" OFF)
option(USE_SYSTEM_BULLET "Use system Bullet instead of a bundled submodule" OFF)

set(CMAKE_CXX_STANDARD 14)
set(CMAKE_POSITION_INDEPENDENT_CODE ON)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
if(NOT CMAKE_BUILD_TYPE)
  set(
    CMAKE_BUILD_TYPE
    RelWithDebInfo
    CACHE STRING
          "Choose build, options are: None Debug Release RelWithDebInfo MinSizeRel"
          FORCE
  )
endif()
# avoid ld visibility warnings, should be done by CMAKE_CXX_VISIBILITY_PRESET
# but need cmake_policy(SET CMP0063 NEW) also which seems to not work
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -fvisibility=hidden")

# ---[ Dependencies
include(habitat-sim/src/cmake/dependencies.cmake)

# include source dirs
include_directories(habitat-sim/src)

# Physics
add_definitions(-DBT_ENABLE_PROFILE)
# compiler define for enabling ptex support
if(BUILD_PTEX_SUPPORT)
   message("Building with ptex support")
endif()

# add subdirectories
add_subdirectory(habitat-sim/src/esp esp)

# emscripten js bindings
if(CORRADE_TARGET_EMSCRIPTEN)
  message("Building Emscripten JS bindings")
  add_subdirectory(task/habitat_web_app)
endif()
