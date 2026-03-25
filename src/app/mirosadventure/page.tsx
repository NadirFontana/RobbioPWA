"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { Html } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { RapierRigidBody } from "@react-three/rapier";
import Miro from "./characters/Miro";
import GroundPlane from "./maps/GroundPlane";
import { useFollowCamera } from "./hooks/useFollowCamera";

function Loader() {
  return (
    <Html center>
      <div className="text-white text-xl animate-pulse">
        Caricamento Miro's Adventure...
      </div>
    </Html>
  );
}

// Componente separato per poter usare useFollowCamera dentro Canvas
function CameraRig({ miroRef }: { miroRef: React.RefObject<RapierRigidBody | null> }) {
  useFollowCamera(miroRef);
  return null;
}

function Scene() {
  const miroRef = useRef<RapierRigidBody>(null);

  return (
    <>
      <color attach="background" args={["#87ceeb"]} />

      <ambientLight intensity={0.6} />
      <directionalLight
        position={[8, 12, 6]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Camera segue Miro */}
      <CameraRig miroRef={miroRef} />

      <Physics gravity={[0, -9.81, 0]}>
        <GroundPlane />
        <Miro ref={miroRef} />
      </Physics>
    </>
  );
}

export default function MirosAdventure() {
  return (
    <div className="w-full h-screen">
      <Canvas shadows camera={{ position: [0, 6, 12], fov: 60 }}>
        <Suspense fallback={<Loader />}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}