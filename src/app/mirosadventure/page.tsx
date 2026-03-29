"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useState, useEffect, useCallback } from "react";
import { Html } from "@react-three/drei";
import { Physics, RigidBody, CapsuleCollider } from "@react-three/rapier";
import { RapierRigidBody } from "@react-three/rapier";
import * as THREE from "three";
import Miro, { JoystickState } from "./characters/Miro";
import Lia from "./characters/Lia";
import VillageMap from "./maps/VillageMap";
import PlaceholderMap from "./maps/PlaceholderMap";
import PortalTrigger from "./maps/PortalTrigger";
import PortalMarker from "./maps/PortalMarker";
import { useFollowCamera } from "./hooks/useFollowCamera";
import { useDialogue, NPC } from "./hooks/useDialogue";
import DialogueBox from "./components/DialogueBox";
import InteractIndicator from "./components/InteractIndicator";
import MobileControls from "./components/MobileControls";
import LoadingScreen from "./components/LoadingScreen";
import MapLabel from "./components/MapLabel";
import { MAPS, MapId, Portal } from "./maps/mapConfig";

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

function CameraRig({ miroRef, dialogue }: {
  miroRef: React.RefObject<RapierRigidBody | null>;
  dialogue: ReturnType<typeof useDialogue>["dialogue"];
}) {
  useFollowCamera(miroRef, dialogue);
  return null;
}

function ProximityChecker({ miroRef, npcs, onProximityChange }: {
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
        nearId = npc.id; break;
      }
    }
    if (nearId !== lastNear.current) {
      lastNear.current = nearId;
      onProximityChange(nearId);
    }
  });
  return null;
}

function CurrentMap({ mapId }: { mapId: MapId }) {
  const config = MAPS[mapId];
  if (mapId === "village") return <VillageMap />;
  return <PlaceholderMap config={config} />;
}

function Scene({ miroRef, currentMap, dialogue, onInteract, nearNpcId,
  onProximityChange, joystickRef, onPortalEnter, transitioning }: {
  miroRef: React.RefObject<RapierRigidBody | null>;
  currentMap: MapId;
  dialogue: ReturnType<typeof useDialogue>["dialogue"];
  onInteract: () => void;
  nearNpcId: string | null;
  onProximityChange: (id: string | null) => void;
  joystickRef: React.RefObject<JoystickState>;
  onPortalEnter: (portal: Portal) => void;
  transitioning: boolean;
}) {
  const map = MAPS[currentMap];

  return (
    <>
      <color attach="background" args={["#87ceeb"]} />
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[10, 20, 10]} intensity={1.3} castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5} shadow-camera-far={100}
        shadow-camera-left={-35} shadow-camera-right={35}
        shadow-camera-top={35} shadow-camera-bottom={-35}
      />

      <CameraRig miroRef={miroRef} dialogue={dialogue} />
      <ProximityChecker miroRef={miroRef} npcs={map.npcs} onProximityChange={onProximityChange} />

      {map.portals.map((portal, i) => (
        <PortalMarker key={i} portal={portal} />
      ))}

      <Physics gravity={[0, -9.81, 0]}>
        <CurrentMap mapId={currentMap} />

        {/* Passa transitioning a Miro per bloccare il movimento */}
        <Miro
          ref={miroRef}
          onInteract={onInteract}
          dialogueActive={dialogue.active || transitioning}
          joystick={joystickRef}
        />

        {currentMap === "village" && (
          <RigidBody type="fixed" colliders={false} position={[3, 1, -3]}>
            <CapsuleCollider args={[0.5, 0.3]} />
            <Lia />
          </RigidBody>
        )}

        {/* Portali disabilitati durante transizione */}
        {!transitioning && map.portals.map((portal, i) => (
          <PortalTrigger
            key={i}
            portal={portal}
            miroRef={miroRef}
            onEnter={onPortalEnter}
          />
        ))}

        {map.npcs.map((npc) => (
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
  const [currentMap, setCurrentMap] = useState<MapId>("village");
  const [loading, setLoading] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const joystickRef = useRef<JoystickState>({ x: 0, y: 0 });
  const labelTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { dialogue, startDialogue, advance } = useDialogue(miroRef, MAPS[currentMap].npcs);

  const handleInteract = () => {
    if (dialogue.active) advance();
    else startDialogue();
  };

  const handlePortalEnter = useCallback((portal: Portal) => {
    setTransitioning(true); // blocca movimento subito
    setLoading(true);

    setTimeout(() => {
      setCurrentMap(portal.destination);

      if (miroRef.current) {
        const [x, y, z] = portal.spawnAtDestination;
        miroRef.current.setTranslation({ x, y, z }, true);
        miroRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
        miroRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
      }

      setTimeout(() => {
        setLoading(false);
        // Sblocca movimento solo dopo che loading è finito
        setTimeout(() => setTransitioning(false), 500);

        setShowLabel(true);
        if (labelTimerRef.current) clearTimeout(labelTimerRef.current);
        labelTimerRef.current = setTimeout(() => setShowLabel(false), 3000);
      }, 300);
    }, 1200);
  }, []);

  return (
    <div className="w-full h-screen relative">
      <Canvas shadows camera={{ position: [0, 8, 14], fov: 60 }}>
        <Suspense fallback={<Loader />}>
          <Scene
            miroRef={miroRef}
            currentMap={currentMap}
            dialogue={dialogue}
            onInteract={handleInteract}
            nearNpcId={nearNpcId}
            onProximityChange={setNearNpcId}
            joystickRef={joystickRef}
            onPortalEnter={handlePortalEnter}
            transitioning={transitioning}
          />
        </Suspense>
      </Canvas>

      <LoadingScreen visible={loading} />
      <MapLabel label={MAPS[currentMap].label} visible={showLabel} />
      <DialogueBox dialogue={dialogue} onAdvance={advance} />

      <MobileControls
        visible={isMobile}
        onJoystick={(state) => { joystickRef.current = state; }}
        onAction={handleInteract}
      />

      {!isMobile && !dialogue.active && (
        <div className="fixed bottom-4 right-4 text-white/60 text-xs text-right space-y-1 pointer-events-none">
          <div>WASD / ↑↓←→ — muovi</div>
          <div>Shift — corri</div>
          <div>E — parla</div>
        </div>
      )}
    </div>
  );
}