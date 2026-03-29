import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { Portal, MAPS } from "./mapConfig";
import { Html } from "@react-three/drei";

interface Props {
  portal: Portal;
}

export default function PortalMarker({ portal }: Props) {
  const meshRef = useRef<THREE.Mesh>(null);
  const label = MAPS[portal.destination].label;

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const s = 1 + Math.sin(clock.elapsedTime * 2) * 0.08;
    meshRef.current.scale.set(s, 1, s);
    (meshRef.current.material as THREE.MeshStandardMaterial).opacity =
      0.3 + Math.sin(clock.elapsedTime * 2) * 0.2;
  });

  const [x, , z] = portal.position;

  return (
    <group position={[x, 0.05, z]}>
      <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.2, 32]} />
        <meshStandardMaterial
          color="#aaddff"
          transparent
          opacity={0.35}
          emissive="#aaddff"
          emissiveIntensity={0.6}
        />
      </mesh>
      <Html position={[0, 2.5, 0]} center>
        <div style={{
          color: "white",
          fontSize: 11,
          fontWeight: "bold",
          background: "rgba(0,0,0,0.55)",
          padding: "2px 10px",
          borderRadius: 999,
          whiteSpace: "nowrap",
          pointerEvents: "none",
          backdropFilter: "blur(2px)",
          border: "1px solid rgba(255,255,255,0.2)",
        }}>
          → {label}
        </div>
      </Html>
    </group>
  );
}