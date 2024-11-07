import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei"
import CanvasLoader from "../Loader"

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf")

  return (
    <mesh>
      {/* Světla počítače (všechna) */}
      <hemisphereLight intensity={2} groundColor="black" />
      {/* Světlo (point) na obrazovce */}
      <pointLight intensity={20} />
      {/* Hlavní světlo */}
      <spotLight 
        position={[-30, 50, 10]}
        angle={0.12}
        penubra={1}
        intensity={20}
        castShadow
        shadow-mapSize={1024}
      />
      {/* Objekt počítače */}
      <primitive 
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -4, -2.2] : [0, -4.5, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  )
}

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false)
  // Kontroluje zda se jedná o mobilní zařízení a upravuje 
  // Mění isMobile proměnnou 

  useEffect(() => {
      // Přidává posluchač událostí pro změnu velikosti obrazovky
    const mediaQuery = window.matchMedia(`(max-width:500px)`)

    // Nastavuje počáteční hodnotu isMobile proměnné
    setIsMobile(mediaQuery.matches)

    // Callback funkce pro zajištění změn v media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches)
    }

    // Callback funkce je přidána jako posluchat do media query
    mediaQuery.addEventListener("change", handleMediaQueryChange)

    // Odstraňuje posluchač když je komponenta odmontována
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange)
    }
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      // Pozice kamery
      camera={{ position: [20, 3, 5], fov: 30 }}
      gl={{ preserveDrawingBuffer: true }}
    >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls 
          // Nelze se přibližovat k modelu
            enableZoom={false} 
            // Omezení možností otáčení modelu
            maxPolarAngle={Math.PI /2}
            minPolarAngle={Math.PI /2}
          />
          <Computers isMobile={isMobile}/>
        </Suspense>

        <Preload all />
    </Canvas>
  )
}


export default ComputersCanvas