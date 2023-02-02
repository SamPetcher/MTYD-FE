import { Canvas, useFrame } from "@react-three/fiber";
import { Camera } from "three";
import * as THREE from 'three'
import { CameraControls, Center, OrbitControls, PerspectiveCamera, Sky, Sparkles, Stars, useSelect } from "@react-three/drei";
import PlayArea from "./PlayArea";
import Table from "./Table";
import { useControls } from 'leva'
import GameControls from './GameControls';
import { useSelector } from "react-redux";

function Zoom() {
    const { zoom } = useControls({ zoom: { value: 0.5, min: 0.05, max: 1.1, step: 0.01 } })
    return useFrame((state) => {
      state.camera.zoom = THREE.MathUtils.lerp(state.camera.zoom, zoom * 5.3, 0.1)
      state.camera.updateProjectionMatrix()
    })
  };

function ThreeDimensionalGame() {
  const effect = useSelector(state => state.board.effect);
 
  return (
  <main id="three-d-main">
  <GameControls/>
  <section className="anim">
  <Canvas>
    <PerspectiveCamera makeDefault fov={75} position={[25, 25, 15]}/>
    <Zoom/>
    {effect === "stars" && <Stars/>}
    {effect === "sky" && <Sky exposure={0.01} elevation={0.01} azimuth={90} rayleigh={0}/>}
    <Sparkles {...props}/>
    <pointLight position={[10, 0, 10]}/>
    <CameraControls/>
    <OrbitControls/>
    <Center>
      <PlayArea/>
      <Table/>
    </Center>
  </Canvas>
  </section>
  </main>)
  
};

export default ThreeDimensionalGame;

const props = {
    /** Number of particles (default: 100) */ count: 20000,
    /** Speed of particles (default: 1) */
    speed: 1,
    /** Opacity of particles (default: 1) */
    opacity: 1,
    /** Color of particles (default: 100) */
    color: 100,
    /** Size of particles (default: randomized between 0 and 1) */
    size: 5,
    /** The space the particles occupy (default: 1) */
    scale: [100, 100, 100],
    /** Movement factor (default: 1) */
    noise: 1,
  };
  

/*
{startStop: false, reset: false, faster: false, slower: false, edge: false, wrap: false, enableClick: false, disableClick: false, clear: false}
*/