'use client'
import React, { useMemo } from 'react'
import { Canvas } from "@react-three/fiber";
import { MeshStandardMaterial } from "three";
import { Environment, Center, AccumulativeShadows, RandomizedLight, OrbitControls, useGLTF, useFBX } from "@react-three/drei";

function Model() {
  // CHANGE MODEL
  const { scene } = useGLTF("/tiger/scene.gltf");
    
  useMemo(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new MeshStandardMaterial({
          color: 0xffd700,  // GOLD COLOR
          metalness: 1,
          roughness: 0.1,
        })
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [scene])

  return <primitive object={scene} scale={1.5}/>
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="absolute flex flex-col items-center justify-between text-left left-28 top-20">
          <h2 className="mb-3 text-2xl font-semibold text-white">
            The Layered Universe
          </h2>
      </div>

      <Canvas shadows camera={{ position: [4, 1.5, 8], fov: 35 }}>
        <group position={[0, -0.5, 0]}>
          <Center top>
            <Model />
          </Center>
        </group>
        <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
        <Environment preset="city" />
      </Canvas>
    </main>
  );
}
