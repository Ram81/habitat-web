add_executable(hsim_bindings bindings_js.cpp)

target_link_libraries(
  hsim_bindings
  PUBLIC agent
         assets
         scene
         core
         gfx
         nav
         sensor
         sim
)

#set_target_properties(hsim_bindings PROPERTIES LINK_FLAGS "--bind")

set_target_properties(
  hsim_bindings
  PROPERTIES
    LINK_FLAGS "--bind"
    # Override the Magnum-set default which is in $<CONFIG>/bin or $<CONFIG>/lib
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_CURRENT_BINARY_DIR}
    LIBRARY_OUTPUT_DIRECTORY ${CMAKE_CURRENT_BINARY_DIR}
    ARCHIVE_OUTPUT_DIRECTORY ${CMAKE_CURRENT_BINARY_DIR}
)

# copy JS/HTML/CSS resources for WebGL build
set(
  resources
  ${SCENE_DATASETS}/habitat-test-scenes/skokloster-castle.glb
  ${SCENE_DATASETS}/habitat-test-scenes/skokloster-castle.navmesh
  ${SCENE_DATASETS}/habitat-test-scenes/van-gogh-room.glb
  ${SCENE_DATASETS}/habitat-test-scenes/van-gogh-room.navmesh
  ${MAGNUM_WINDOWLESSEMSCRIPTENAPPLICATION_JS}
  ${MAGNUM_WEBAPPLICATION_CSS}
  ${DATASETS}
)

foreach(resource ${resources})
  get_filename_component(filename ${resource} NAME)
  get_filename_component(path ${resource} ABSOLUTE)
  add_custom_command(
    TARGET hsim_bindings POST_BUILD COMMAND ${CMAKE_COMMAND} -E create_symlink ${path}
                                            ${CMAKE_CURRENT_BINARY_DIR}/${filename}
  )
endforeach()

message("ola::: ${PROJECT_SOURCE_DIR}")
set(package_files ${PROJECT_SOURCE_DIR}/package.json)

add_custom_command(
  OUTPUT empty.stamp
  COMMAND npm install
  COMMAND ${CMAKE_COMMAND} -E touch ${CMAKE_CURRENT_BINARY_DIR}/empty.stamp
  DEPENDS ${package_files}
  WORKING_DIRECTORY ${PROJECT_SOURCE_DIR}
  COMMENT "Trying npm install"
)

set(
  bundle_files
  bindings.html
  bindings.css
  index.js
  modules/defaults.js
  modules/objectnav_task.js
  modules/object_maps.js
  modules/simenv_embind.js
  modules/task_validator.js
  modules/utils.js
  modules/web_demo.js
  webpack.config.js
)

add_custom_command(
  COMMENT "Trying bundlejs build..."
  OUTPUT bundle.js
  COMMAND npm run lint-fix
  COMMAND npm run build -- --build_dir ${CMAKE_CURRENT_BINARY_DIR}
  DEPENDS hsim_bindings ${bundle_files} empty.stamp
  WORKING_DIRECTORY ${PROJECT_SOURCE_DIR}
  COMMENT "Building JS files now"
)

add_custom_target(hsim_bundle ALL DEPENDS bundle.js)

add_dependencies(hsim_bundle hsim_bindings)
