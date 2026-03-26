"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useState, useEffect } from "react";
import { Html } from "@react-three/drei";
import { Physics, RigidBody, CapsuleCollider } from "@react-three/rapier";
import { RapierRigidBody } from "@react-three/rapier";
import * as THREE from "three";
import Miro, { JoystickState } from "./characters/Miro";
import Lia from "./characters/Lia";
import GroundPlane from "./maps/GroundPlane";
import { useFollowCamera } from "./hooks/useFollowCamera";
import { useDialogue, NPC } from "./hooks/useDialogue";
import DialogueBox from "./components/DialogueBox";
import InteractIndicator from "./components/InteractIndicator";
import MobileControls from "./components/MobileControls";

const NPC_LIST: NPC[] = [
  {
    id: "lia",
    name: "Lia",
    position: new THREE.Vector3(3, 1, -3),
    dialogues: [
      "Ciao! È bello vederti da queste parti!",
      "Stavo proprio pensando a te...",
      "Fai attenzione mentre esplori, il mondo è grande!",
    ],
  },
];

const INTERACTION_RADIUS = 2.5;

function Loader() {
  return (
    <Html center>
      <div className="text-white text-xl animate-pulse">
        Caricamento Miro's Adventure...
      </div>
    </Html>
  );
}

function CameraRig({
  miroRef,
  dialogue,
}: {
  miroRef: React.RefObject<RapierRigidBody | null>;
  dialogue: ReturnType<typeof useDialogue>["dialogue"];
}) {
  useFollowCamera(miroRef, dialogue);
  return null;
}

function ProximityChecker({
  miroRef,
  npcs,
  onProximityChange,
}: {
  miroRef: React.RefObject<RapierRigidBody | null>;
  npcs: NPC[];
  onProximityChange: (nearId: string | null) => void;
}) {
  const lastNear = useRef<string | null>(null);

  useFrame(() => {
    if (!miroRef.current) return;
    const t = miroRef.current.translation();
    const miroPos = new THREE.Vector3(t.x, t.y, t.z);

    let nearId: string | null = null;
    for (const npc of npcs) {
      if (miroPos.distanceTo(npc.position) < INTERACTION_RADIUS) {
        nearId = npc.id;
        break;
      }
    }

    if (nearId !== lastNear.current) {
      lastNear.current = nearId;
      onProximityChange(nearId);
    }
  });

  return null;
}

function Scene({
  miroRef,
  dialogue,
  onInteract,
  nearNpcId,
  onProximityChange,
  joystickRef,
}: {
  miroRef: React.RefObject<RapierRigidBody | null>;
  dialogue: ReturnType<typeof useDialogue>["dialogue"];
  onInteract: () => void;
  nearNpcId: string | null;
  onProximityChange: (id: string | null) => void;
  joystickRef: React.RefObject<JoystickState>;
}) {
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

      <CameraRig miroRef={miroRef} dialogue={dialogue} />
      <ProximityChecker
        miroRef={miroRef}
        npcs={NPC_LIST}
        onProximityChange={onProximityChange}
      />

      <Physics gravity={[0, -9.81, 0]}>
        <GroundPlane />

        <Miro
          ref={miroRef}
          onInteract={onInteract}
          dialogueActive={dialogue.active}
          joystick={joystickRef}
        />

        <RigidBody type="fixed" colliders={false} position={[3, 1, -3]}>
          <CapsuleCollider args={[0.5, 0.3]} />
          <Lia />
        </RigidBody>

        {NPC_LIST.map((npc) => (
          <InteractIndicator
            key={npc.id}
            position={npc.position}
            name={npc.name}
            visible={nearNpcId === npc.id && !dialogue.active}
          />
        ))}
      </Physics>
    </>
  );
}

export default function MirosAdventure() {
  const miroRef = useRef<RapierRigidBody>(null);
  const [nearNpcId, setNearNpcId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const joystickRef = useRef<JoystickState>({ x: 0, y: 0 });

  useEffect(() => {
    const check = () =>
      setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { dialogue, startDialogue, advance } = useDialogue(miroRef, NPC_LIST);

  const handleInteract = () => {
    if (dialogue.active) advance();
    else startDialogue();
  };

  return (
    <div className="w-full h-screen relative">
      <Canvas shadows camera={{ position: [0, 6, 12], fov: 60 }}>
        <Suspense fallback={<Loader />}>
          <Scene
            miroRef={miroRef}
            dialogue={dialogue}
            onInteract={handleInteract}
            nearNpcId={nearNpcId}
            onProximityChange={setNearNpcId}
            joystickRef={joystickRef}
          />
        </Suspense>
      </Canvas>

      <DialogueBox dialogue={dialogue} onAdvance={advance} />

      <MobileControls
        visible={isMobile}
        onJoystick={(state) => { joystickRef.current = state; }}
        onAction={handleInteract}
      />

      {!isMobile && !dialogue.active && (
        <div className="fixed bottom-4 right-4 text-white/60 text-xs text-right space-y-1 pointer-events-none">
          <div>WASD / ↑↓←→ — muovi</div>
          <div>E — parla</div>
        </div>
      )}
    </div>
  );
}