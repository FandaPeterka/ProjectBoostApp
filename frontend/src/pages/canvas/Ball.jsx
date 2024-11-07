import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";
import CanvasLoader from "../Loader";
import * as THREE from 'three';  // Import THREE.js library

const createTextTexture = (text) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = 250;
  canvas.height = 125; // Size can be adjusted based on the amount of text
  context.fillStyle = 'black'; // Background color
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.font = 'bold 40px Comic Sans MS'; // Adjust font size/style as necessary
  context.fillStyle = 'white'; // Text color
  context.textAlign = 'center';
  context.fillText(text, canvas.width / 2, canvas.height / 2 + 10); // Adjust text position
  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;

  return texture;
};


const Ball = ({ imgUrl, line1, line2 }) => {
  const [iconDecal] = useTexture([imgUrl]);
  const textDecal1 = createTextTexture(line1);
  const textDecal2 = createTextTexture(line2);

  return (
    <Float speed={1.75} rotationIntensity={0} floatIntensity={0}>
      <ambientLight intensity={0.25} color="#ffffff" />
      <directionalLight position={[0, 0, 5]} intensity={1.5} color="#ffffff" />
      <mesh castShadow receiveShadow scale={3}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color='#363636' polygonOffset polygonOffsetFactor={-5} flatShading />
        <Decal position={[0, 0, 1]} rotation={[2 * Math.PI, 0, 6.25]} scale={1} map={iconDecal} flatShading />
        <Decal position={[0, 0.2, -1]} rotation={[0, Math.PI, 0]} scale={1.2} map={textDecal1} />
        <Decal position={[0, -0.2, -1]} rotation={[0, Math.PI, 0]} scale={1.2} map={textDecal2} />
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon, line1, line2 }) => {
  return (
    <Canvas
      frameloop='demand'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true, shadowMapEnabled: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
        <Ball imgUrl={icon} line1={line1} line2={line2} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;