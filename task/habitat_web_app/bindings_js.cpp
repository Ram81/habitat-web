// Copyright (c) Facebook, Inc. and its affiliates.
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

#include <emscripten/bind.h>

namespace em = emscripten;

#include "esp/gfx/magnum.h"
#include "esp/scene/SemanticScene.h"
#include "esp/sim/Simulator.h"

using namespace esp;
using namespace esp::agent;
using namespace esp::assets;
using namespace esp::core;
using namespace esp::geo;
using namespace esp::gfx;
using namespace esp::nav;
using namespace esp::physics;
using namespace esp::scene;
using namespace esp::sensor;
using namespace esp::sim;

// Consider
// https://becominghuman.ai/passing-and-returning-webassembly-array-parameters-a0f572c65d97
em::val Observation_getData(Observation& obs) {
  auto buffer = obs.buffer;
  if (buffer != nullptr) {
    return em::val(
        em::typed_memory_view(buffer->data.size(), buffer->data.data()));
  } else {
    return em::val::undefined();
  }
}

ObservationSpace Simulator_getAgentObservationSpace(Simulator& sim,
                                                    int agentId,
                                                    std::string sensorId) {
  ObservationSpace space;
  sim.getAgentObservationSpace(agentId, sensorId, space);
  return space;
}

std::map<std::string, ObservationSpace> Simulator_getAgentObservationSpaces(
    Simulator& sim,
    int agentId) {
  std::map<std::string, ObservationSpace> spaces;
  sim.getAgentObservationSpaces(agentId, spaces);
  return spaces;
}

bool Range3D_contains(Magnum::Range3D bb, Magnum::Vector3 point) {
  int size_x = bb.sizeX();
  int size_y = bb.sizeY();
  int size_z = bb.sizeZ();
  bool is_x_in_range = bb.x().min() <= point.x() && point.x() <= bb.x().max();
  bool is_y_in_range = bb.y().min() <= point.y() && point.y() <= bb.y().max();
  bool is_z_in_range = bb.z().min() <= point.z() && point.z() <= bb.z().max();
  LOG(WARNING) << "bx min " << bb.x().min() << " -- " << bb.x().max() << " -- "
               << point.x() << " -- " << (bb.x().min() <= point.x()) << "--"
               << (point.x() <= bb.x().max());
  LOG(WARNING) << "by min " << bb.y().min() << " -- " << bb.y().max() << " -- "
               << point.y() << " -- " << (bb.y().min() <= point.y()) << "--"
               << (point.y() <= bb.y().max());
  LOG(WARNING) << "bz min " << bb.z().min() << " -- " << bb.z().max() << " -- "
               << point.z() << " -- " << (bb.z().min() <= point.z()) << "--"
               << (point.z() <= bb.z().max());
  LOG(WARNING) << "res " << is_x_in_range << " -- " << is_y_in_range << " -- "
               << is_z_in_range << " -- "
               << (is_x_in_range && is_y_in_range && is_z_in_range);
  return (is_x_in_range && is_y_in_range && is_z_in_range);
}

EMSCRIPTEN_BINDINGS(habitat_sim_bindings_js) {
  em::register_vector<SensorSpec::ptr>("VectorSensorSpec");
  em::register_vector<size_t>("VectorSizeT");
  em::register_vector<int>("VectorInt");
  em::register_vector<std::string>("VectorString");
  em::register_vector<std::shared_ptr<SemanticCategory>>(
      "VectorSemanticCategories");
  em::register_vector<std::shared_ptr<SemanticObject>>("VectorSemanticObjects");
  em::register_vector<std::shared_ptr<SemanticRegion>>("VectorSemanticRegions");
  em::register_vector<std::shared_ptr<SemanticLevel>>("VectorSemanticLevels");
  em::register_vector<gfx::LightInfo>("LightSetup");

  em::register_map<std::string, float>("MapStringFloat");
  em::register_map<std::string, std::string>("MapStringString");
  em::register_map<std::string, Sensor::ptr>("MapStringSensor");
  em::register_map<std::string, SensorSpec::ptr>("MapStringSensorSpec");
  em::register_map<std::string, Observation>("MapStringObservation");
  em::register_map<std::string, ActionSpec::ptr>("ActionSpace");

  em::value_array<vec2f>("vec2f")
      .element(em::index<0>())
      .element(em::index<1>());

  em::value_array<vec3f>("vec3f")
      .element(em::index<0>())
      .element(em::index<1>())
      .element(em::index<2>());

  em::value_array<vec4f>("vec4f")
      .element(em::index<0>())
      .element(em::index<1>())
      .element(em::index<2>())
      .element(em::index<3>());

  em::value_array<vec2i>("vec2i")
      .element(em::index<0>())
      .element(em::index<1>());

  em::value_array<vec3i>("vec3i")
      .element(em::index<0>())
      .element(em::index<1>())
      .element(em::index<2>());

  em::value_array<vec4i>("vec4i")
      .element(em::index<0>())
      .element(em::index<1>())
      .element(em::index<2>())
      .element(em::index<3>());

  em::value_array<Magnum::Vector2i>("Vector2i")
      .element(em::index<0>())
      .element(em::index<1>());

  em::value_object<RayHitInfo>("RayHitInfo")
      .field("point", &RayHitInfo::point)
      .field("objectId", &RayHitInfo::objectId);

  em::enum_<gfx::LightPositionModel>("LightPositionModel")
      .value("CAMERA", gfx::LightPositionModel::CAMERA)
      .value("GLOBAL", gfx::LightPositionModel::GLOBAL)
      .value("OBJECT", gfx::LightPositionModel::OBJECT);

  em::value_object<gfx::LightInfo>("LightInfo")
      .field("position", &gfx::LightInfo::vector)
      .field("color", &gfx::LightInfo::color)
      .field("model", &gfx::LightInfo::model);

  em::class_<esp::box3f>("box3f")
      .constructor<esp::box3f>()
      .function("minn", em::optional_override(
                            [](const esp::box3f& self) { return self.min(); }))
      .function("maxx", em::optional_override(
                            [](const esp::box3f& self) { return self.max(); }))
      .function("centerr", &esp::box3f::center);

  em::class_<Magnum::Matrix4>("Matrix4")
      .constructor<Magnum::Matrix4>()
      .function("inverted", &Magnum::Matrix4::inverted)
      .function("translation", em::select_overload<Magnum::Vector3&()>(
                                   &Magnum::Matrix4::translation))
      .function("backward", em::select_overload<Magnum::Vector3&()>(
                                &Magnum::Matrix4::backward))
      .function("transformPoint", &Magnum::Matrix4::transformPoint)
      .function("mul",
                em::optional_override(
                    [](const Magnum::Matrix4& self, const Magnum::Matrix4 rhs) {
                      return new Magnum::Matrix4(self * rhs);
                    }),
                em::allow_raw_pointers())
      .function(
          "toString", em::optional_override([](const Magnum::Matrix4& self) {
            std::ostringstream out;
            Magnum::Debug{&out, Magnum::Debug::Flag::NoNewlineAtTheEnd} << self;
            return out.str();
          }));

  em::class_<Magnum::Vector3>("Vector3")
      .constructor<Magnum::Vector3>()
      .constructor<float, float, float>()
      .function("x", em::select_overload<float&()>(&Magnum::Vector3::x))
      .function("y", em::select_overload<float&()>(&Magnum::Vector3::y))
      .function("z", em::select_overload<float&()>(&Magnum::Vector3::z))
      .class_function("xAxis", &Magnum::Vector3::xAxis)
      .class_function("yAxis", &Magnum::Vector3::yAxis)
      .class_function("zAxis", &Magnum::Vector3::zAxis)
      .function("mul",
                em::optional_override(
                    [](const Magnum::Vector3& self, const float distance) {
                      return new Magnum::Vector3(self * distance);
                    }),
                em::allow_raw_pointers())
      .function("add",
                em::optional_override(
                    [](const Magnum::Vector3& self, const Magnum::Vector3 rhs) {
                      return new Magnum::Vector3(self + rhs);
                    }),
                em::allow_raw_pointers())
      .function("sub",
                em::optional_override(
                    [](const Magnum::Vector3& self, const Magnum::Vector3 rhs) {
                      return new Magnum::Vector3(self - rhs);
                    }),
                em::allow_raw_pointers())
      .function(
          "toString", em::optional_override([](const Magnum::Vector3& self) {
            std::ostringstream out;
            Magnum::Debug{&out, Magnum::Debug::Flag::NoNewlineAtTheEnd} << self;
            return out.str();
          }));

  em::class_<Magnum::Range3D>("Range3D")
      .constructor<Magnum::Range3D>()
      .class_function("contains", &Range3D_contains);

  em::class_<Magnum::Quaternion>("Quaternion")
      .constructor<Magnum::Vector3, float>()
      .constructor<Magnum::Quaternion>()
      .function("normalized", &Magnum::Quaternion::normalized)
      .function("vector", em::select_overload<Magnum::Vector3&()>(
                              &Magnum::Quaternion::vector))
      .function("scalar",
                em::select_overload<float&()>(&Magnum::Quaternion::scalar))
      .class_function("rotation", &Magnum::Quaternion::rotation)
      .class_function("fromMatrix", &Magnum::Quaternion::fromMatrix);

  em::value_object<std::pair<vec3f, vec3f>>("aabb")
      .field("min", &std::pair<vec3f, vec3f>::first)
      .field("max", &std::pair<vec3f, vec3f>::second);

  em::value_object<esp::geo::Ray>("Ray")
      .field("origin", &esp::geo::Ray::origin)
      .field("direction", &esp::geo::Ray::direction);

  em::class_<NavMeshSettings>("NavMeshSettings")
      .smart_ptr_constructor("NavMeshSettings", &NavMeshSettings::create<>)
      .property("agentRadius", &NavMeshSettings::agentRadius)
      .property("agentHeight", &NavMeshSettings::agentHeight)
      .property("navMeshBBMax", &NavMeshSettings::navMeshBBMax)
      .function("setDefaults", &NavMeshSettings::setDefaults);

  em::class_<AgentConfiguration>("AgentConfiguration")
      .smart_ptr_constructor("AgentConfiguration",
                             &AgentConfiguration::create<>)
      .property("height", &AgentConfiguration::height)
      .property("radius", &AgentConfiguration::radius)
      .property("mass", &AgentConfiguration::mass)
      .property("linearAcceleration", &AgentConfiguration::linearAcceleration)
      .property("angularAcceleration", &AgentConfiguration::angularAcceleration)
      .property("linearFriction", &AgentConfiguration::linearFriction)
      .property("angularFriction", &AgentConfiguration::angularFriction)
      .property("coefficientOfRestitution",
                &AgentConfiguration::coefficientOfRestitution)
      .property("sensorSpecifications",
                &AgentConfiguration::sensorSpecifications)
      .property("actionSpace", &AgentConfiguration::actionSpace);

  em::class_<ActionSpec>("ActionSpec")
      .smart_ptr_constructor(
          "ActionSpec",
          &ActionSpec::create<const std::string&, const ActuationMap&>)
      .property("name", &ActionSpec::name)
      .property("actuation", &ActionSpec::actuation);

  em::class_<ShortestPath>("ShortestPath")
      .smart_ptr_constructor("ShortestPath", &ShortestPath::create<>)
      .property("requestedStart", &ShortestPath::requestedStart)
      .property("requestedEnd", &ShortestPath::requestedEnd)
      .property("points", &ShortestPath::points)
      .property("geodesicDistance", &ShortestPath::geodesicDistance);

  em::class_<PathFinder>("PathFinder")
      .smart_ptr<PathFinder::ptr>("PathFinder::ptr")
      .property("bounds", &PathFinder::bounds)
      .function("isNavigable", &PathFinder::isNavigable)
      .function("getRandomNavigablePoint", &PathFinder::getRandomNavigablePoint)
      .function("snapPoint", &PathFinder::snapPoint<Magnum::Vector3>)
      .function("islandRadius", em::select_overload<float(const vec3f&) const>(
                                    &PathFinder::islandRadius))
      .function("findPath",
                em::select_overload<bool(ShortestPath&)>(&PathFinder::findPath))
      .function("tryStep",
                em::optional_override([](PathFinder& self,
                                         const Magnum::Vector3& start,
                                         const Magnum::Vector3& end) {
                  return self.tryStep(start, end);
                }));

  em::class_<SensorSuite>("SensorSuite")
      .smart_ptr_constructor("SensorSuite", &SensorSuite::create<>)
      .function("get", &SensorSuite::get)
      .function("getSensors", &SensorSuite::getSensors);

  em::enum_<SensorType>("SensorType")
      .value("NONE", SensorType::NONE)
      .value("COLOR", SensorType::COLOR)
      .value("DEPTH", SensorType::DEPTH)
      .value("NORMAL", SensorType::NORMAL)
      .value("SEMANTIC", SensorType::SEMANTIC)
      .value("PATH", SensorType::PATH)
      .value("GOAL", SensorType::GOAL)
      .value("FORCE", SensorType::FORCE)
      .value("TENSOR", SensorType::TENSOR)
      .value("TEXT", SensorType::TEXT);

  em::class_<SensorSpec>("SensorSpec")
      .smart_ptr_constructor("SensorSpec", &SensorSpec::create<>)
      .property("uuid", &SensorSpec::uuid)
      .property("sensorType", &SensorSpec::sensorType)
      .property("sensorSubtype", &SensorSpec::sensorSubType)
      .property("position", &SensorSpec::position)
      .property("orientation", &SensorSpec::orientation)
      .property("resolution", &SensorSpec::resolution)
      .property("channels", &SensorSpec::channels)
      .property("parameters", &SensorSpec::parameters);

  em::class_<Sensor>("Sensor")
      .smart_ptr<Sensor::ptr>("Sensor::ptr")
      .function("specification", &Sensor::specification)
      .function("getObservation", &Sensor::getObservation)
      .function("rotation", &Sensor::getRotation)
      .function("translation", &Sensor::getPosition);

  em::class_<SimulatorConfiguration>("SimulatorConfiguration")
      .smart_ptr_constructor("SimulatorConfiguration",
                             &SimulatorConfiguration::create<>)
      .property("scene_id", &SimulatorConfiguration::activeSceneID)
      .property("defaultAgentId", &SimulatorConfiguration::defaultAgentId)
      .property("defaultCameraUuid", &SimulatorConfiguration::defaultCameraUuid)
      .property("gpuDeviceId", &SimulatorConfiguration::gpuDeviceId)
      .property("compressTextures", &SimulatorConfiguration::compressTextures)
      .property("enablePhysics", &SimulatorConfiguration::enablePhysics)
      .property("allowSliding", &SimulatorConfiguration::allowSliding)
      .property("textureDownsampleFactor",
                &SimulatorConfiguration::textureDownsampleFactor)
      .property("physicsConfigFile",
                &SimulatorConfiguration::physicsConfigFile);

  em::class_<AgentState>("AgentState")
      .smart_ptr_constructor("AgentState", &AgentState::create<>)
      .property("position", &AgentState::position)
      .property("rotation", &AgentState::rotation)
      .property("velocity", &AgentState::velocity)
      .property("angularVelocity", &AgentState::angularVelocity)
      .property("force", &AgentState::force)
      .property("torque", &AgentState::torque);

  em::class_<Agent>("Agent")
      .smart_ptr<Agent::ptr>("Agent::ptr")
      .property("config",
                em::select_overload<const AgentConfiguration&() const>(
                    &Agent::getConfig))
      .property("sensorSuite", em::select_overload<const SensorSuite&() const>(
                                   &Agent::getSensorSuite))
      .function("getState", &Agent::getState)
      .function("setState", &Agent::setState)
      .function("hasAction", &Agent::hasAction)
      .function("act", &Agent::act);

  em::class_<Observation>("Observation")
      .smart_ptr_constructor("Observation", &Observation::create<>)
      .function("getData", &Observation_getData);

  em::class_<ObservationSpace>("ObservationSpace")
      .smart_ptr_constructor("ObservationSpace", &ObservationSpace::create<>)
      .property("dataType", &ObservationSpace::dataType)
      .property("shape", &ObservationSpace::shape);

  em::class_<SemanticCategory>("SemanticCategory")
      .smart_ptr<SemanticCategory::ptr>("SemanticCategory::ptr")
      .function("getIndex", &SemanticCategory::index)
      .function("getName", &SemanticCategory::name);

  em::class_<SemanticRegion>("SemanticRegion")
      .smart_ptr<SemanticRegion::ptr>("SemanticRegion::ptr")
      .property("id", &SemanticRegion::id)
      .property("aabb", &SemanticRegion::aabb)
      .property("objects", &SemanticRegion::objects)
      .property("category", &SemanticRegion::category);

  em::class_<SemanticLevel>("SemanticLevel")
      .smart_ptr<SemanticLevel::ptr>("SemanticLevel::ptr")
      .property("aabb", &SemanticLevel::aabb)
      .property("objects", &SemanticLevel::objects)
      .property("regions", &SemanticLevel::regions);

  em::class_<SemanticObject>("SemanticObject")
      .smart_ptr<SemanticObject::ptr>("SemanticObject::ptr")
      .property("category", &SemanticObject::category)
      .function("aabb", &SemanticObject::aabb);

  em::class_<SemanticScene>("SemanticScene")
      .smart_ptr<SemanticScene::ptr>("SemanticScene::ptr")
      .property("categories", &SemanticScene::categories)
      .property("objects", &SemanticScene::objects)
      .property("regions", &SemanticScene::regions)
      .property("levels", &SemanticScene::levels);

  em::class_<SceneNode>("SceneNode")
      .property("id", &SceneNode::getId, &SceneNode::setId)
      .property("semanticId", &SceneNode::getSemanticId,
                &SceneNode::setSemanticId);

  em::enum_<MotionType>("MotionType")
      .value("UNDEFINED", MotionType::UNDEFINED)
      .value("STATIC", MotionType::STATIC)
      .value("KINEMATIC", MotionType::KINEMATIC)
      .value("DYNAMIC", MotionType::DYNAMIC);

  em::class_<VelocityControl>("VelocityControl")
      .smart_ptr<VelocityControl::ptr>("VelocityControl::ptr")
      .property("linVel", &VelocityControl::linVel)
      .property("angVel", &VelocityControl::angVel)
      .property("controllingLinVel", &VelocityControl::controllingLinVel)
      .property("linVelIsLocal", &VelocityControl::linVelIsLocal)
      .property("controllingAngVel", &VelocityControl::controllingAngVel)
      .property("angVelIsLocal", &VelocityControl::angVelIsLocal);

  em::class_<Simulator>("Simulator")
      .smart_ptr_constructor("Simulator",
                             &Simulator::create<const SimulatorConfiguration&>)
      .function("getSemanticScene", &Simulator::getSemanticScene)
      .function("seed", &Simulator::seed)
      .function("reconfigure", &Simulator::reconfigure)
      .function("reset", &Simulator::reset)
      .function("getAgentObservations", &Simulator::getAgentObservations)
      .function("getAgentObservation", &Simulator::getAgentObservation)
      .function("displayObservation", &Simulator::displayObservation)
      .function("getAgentObservationSpaces",
                &Simulator_getAgentObservationSpaces)
      .function("getAgentObservationSpace", &Simulator_getAgentObservationSpace)
      .function("getAgent", &Simulator::getAgent)
      .function("getPathFinder", &Simulator::getPathFinder)
      .function("addAgent",
                em::select_overload<Agent::ptr(const AgentConfiguration&)>(
                    &Simulator::addAgent))
      .function("addAgentToNode",
                em::select_overload<Agent::ptr(const AgentConfiguration&,
                                               scene::SceneNode&)>(
                    &Simulator::addAgent))
      .function("getExistingObjectIDs", &Simulator::getExistingObjectIDs)
      .function("setObjectMotionType", &Simulator::setObjectMotionType)
      .function("getObjectMotionType", &Simulator::getObjectMotionType)
      .function("addObject", &Simulator::addObject, em::allow_raw_pointers())
      .function("addObjectByHandle", &Simulator::addObjectByHandle,
                em::allow_raw_pointers())
      .function("removeObject", &Simulator::removeObject)
      .function("setTransformation", &Simulator::setTransformation)
      .function("getTransformation", &Simulator::getTransformation)
      .function("setTranslation", &Simulator::setTranslation)
      .function("getTranslation", &Simulator::getTranslation)
      .function("setRotation", &Simulator::setRotation)
      .function("getRotation", &Simulator::getRotation)
      .function("setObjectLightSetup", &Simulator::setObjectLightSetup)
      .function("getLightSetup", &Simulator::getLightSetup)
      .function("setLightSetup", &Simulator::setLightSetup)
      .function("stepWorld", &Simulator::stepWorld)
      .function("getWorldTime", &Simulator::getWorldTime)
      .function("syncGrippedObject", &Simulator::syncGrippedObject)
      .function("updateCrossHairNode", &Simulator::updateCrossHairNode)
      .function("recomputeNavMesh", &Simulator::recomputeNavMesh)
      .function("findNearestObjectUnderCrosshair",
                &Simulator::findNearestObjectUnderCrosshair)
      .function("unproject", &Simulator::unproject)
      .function("getAgentTransformation", &Simulator::getAgentTransformation)
      .function("getAgentAbsoluteTranslation",
                &Simulator::getAgentAbsoluteTranslation)
      .function("setObjectBBDraw", &Simulator::setObjectBBDraw)
      .function("sampleObjectState", &Simulator::sampleObjectState)
      .function("findFloorPositionUnderCrosshair",
                &Simulator::findFloorPositionUnderCrosshair)
      .function("contactTest", &Simulator::contactTest)
      .function("preAddContactTest", &Simulator::preAddContactTest)
      .function("addContactTestObject", &Simulator::addContactTestObject)
      .function("removeContactTestObject", &Simulator::removeContactTestObject)
      .function("setNavMeshVisualization", &Simulator::setNavMeshVisualization)
      .function("clearRecycledObjectIds", &Simulator::clearRecycledObjectIds)
      .function("updateDropPointNode", &Simulator::updateDropPointNode)
      .function("getObjectBBYCoord", &Simulator::getObjectBBYCoord)
      .function("getAgentRotation", &Simulator::getAgentRotation)
      .function("getAgentSensorSuite", &Simulator::getAgentSensorSuite)
      .function("getNumActiveContactPoints",
                &Simulator::getNumActiveContactPoints)
      .function("getGravity", &Simulator::getGravity)
      .function("setActiveState", &Simulator::setActiveState)
      .function("setObjectSemanticId", &Simulator::setObjectSemanticId)
      .function("getSceneBB", &Simulator::getSceneBB)
      .function("addLocobot", &Simulator::addLocobot);
}
