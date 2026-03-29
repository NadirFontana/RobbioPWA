"use client";
import { RigidBody, CylinderCollider } from "@react-three/rapier";

// ─── Colori ───────────────────────────────────────────────
const C = {
  dirt:      "#c8a96e",
  grass:     "#7ab648",
  stone:     "#9e9e9e",
  stoneDark: "#757575",
  wood:      "#8B5E3C",
  woodLight: "#a0724f",
  roof:      "#8B3A3A",
  wall:      "#f0e0c0",
  thatch:    "#c8a040",
  water:     "#4a90d9",
};

function Box({ pos, size, color, castShadow = true, receiveShadow = true }: {
  pos: [number, number, number];
  size: [number, number, number];
  color: string;
  castShadow?: boolean;
  receiveShadow?: boolean;
}) {
  return (
    <mesh position={pos} castShadow={castShadow} receiveShadow={receiveShadow}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} flatShading />
    </mesh>
  );
}

function Cyl({ pos, args, color }: {
  pos: [number, number, number];
  args: [number, number, number, number];
  color: string;
}) {
  return (
    <mesh position={pos} castShadow>
      <cylinderGeometry args={args} />
      <meshStandardMaterial color={color} flatShading />
    </mesh>
  );
}

// ─── Terreno ──────────────────────────────────────────────
function Ground() {
  return (
    <RigidBody type="fixed" colliders="cuboid">
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[60, 40]} />
        <meshStandardMaterial color={C.grass} flatShading />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0.01, 0]}>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial color={C.dirt} flatShading />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[-27, 0.01, 0]}>
        <planeGeometry args={[40, 6]} />
        <meshStandardMaterial color={C.dirt} flatShading />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[27, 0.01, 0]}>
        <planeGeometry args={[40, 6]} />
        <meshStandardMaterial color={C.dirt} flatShading />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0.01, -17]}>
        <planeGeometry args={[6, 20]} />
        <meshStandardMaterial color={C.dirt} flatShading />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0.01, 17]}>
        <planeGeometry args={[6, 20]} />
        <meshStandardMaterial color={C.dirt} flatShading />
      </mesh>
    </RigidBody>
  );
}

// ─── Casa ─────────────────────────────────────────────────
function House({ pos, rot = 0, scale = 1 }: {
  pos: [number, number, number];
  rot?: number;
  scale?: number;
}) {
  const s = scale;
  return (
    <group position={pos} rotation={[0, rot, 0]}>
      <RigidBody type="fixed" colliders="cuboid">
        <Box pos={[0, 1.2 * s, 0]}             size={[4 * s, 2.4 * s, 3.5 * s]} color={C.wall} />
        <Box pos={[0, 2.3 * s, 1.76 * s]}      size={[4 * s, 0.15 * s, 0.12 * s]} color={C.wood} />
        <Box pos={[0, 0.5 * s, 1.76 * s]}      size={[4 * s, 0.15 * s, 0.12 * s]} color={C.wood} />
        <Box pos={[-1.9 * s, 1.2 * s, 1.76 * s]} size={[0.12 * s, 2.4 * s, 0.12 * s]} color={C.wood} />
        <Box pos={[1.9 * s, 1.2 * s, 1.76 * s]}  size={[0.12 * s, 2.4 * s, 0.12 * s]} color={C.wood} />
        <Box pos={[0, 1.2 * s, 1.76 * s]}        size={[0.12 * s, 2.4 * s, 0.12 * s]} color={C.wood} />
        <Box pos={[0, 0.6 * s, 1.77 * s]}        size={[0.9 * s, 1.2 * s, 0.05 * s]} color={C.wood} />
        <Box pos={[-1.2 * s, 1.4 * s, 1.77 * s]} size={[0.7 * s, 0.7 * s, 0.05 * s]} color={C.water} />
        <Box pos={[1.2 * s, 1.4 * s, 1.77 * s]}  size={[0.7 * s, 0.7 * s, 0.05 * s]} color={C.water} />
      </RigidBody>
      <mesh position={[0, 3.0 * s, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[3.2 * s, 1.8 * s, 4]} />
        <meshStandardMaterial color={C.thatch} flatShading />
      </mesh>
    </group>
  );
}

// ─── Pozzo ────────────────────────────────────────────────
function Well({ pos }: { pos: [number, number, number] }) {
  return (
    <group position={pos}>
      {/* Collider cilindrico esplicito */}
      <RigidBody type="fixed" colliders={false}>
        <CylinderCollider args={[0.45, 0.85]} position={[0, 0.45, 0]} />
        <Cyl pos={[0, 0.4, 0]}  args={[0.8, 0.9, 0.8, 8]} color={C.stone} />
        <Cyl pos={[0, 0.85, 0]} args={[0.85, 0.8, 0.1, 8]} color={C.stoneDark} />
        <Cyl pos={[0, 0.6, 0]}  args={[0.7, 0.7, 0.2, 8]} color={C.water} />
      </RigidBody>
      {/* Struttura legno sopra — solo visiva */}
      <Box pos={[-0.85, 1.5, 0]} size={[0.12, 1.4, 0.12]} color={C.wood} />
      <Box pos={[0.85, 1.5, 0]}  size={[0.12, 1.4, 0.12]} color={C.wood} />
      <Box pos={[0, 2.1, 0]}     size={[1.9, 0.12, 0.12]} color={C.wood} />
      <Cyl pos={[0, 2.1, 0]}     args={[0.12, 0.12, 0.3, 8]} color={C.woodLight} />
      <mesh position={[0, 2.5, 0]} castShadow>
        <coneGeometry args={[1.1, 0.7, 4]} />
        <meshStandardMaterial color={C.roof} flatShading />
      </mesh>
    </group>
  );
}

// ─── Recinto ──────────────────────────────────────────────
function Fence({ from, to }: {
  from: [number, number];
  to: [number, number];
}) {
  const dx = to[0] - from[0];
  const dz = to[1] - from[1];
  const len = Math.sqrt(dx * dx + dz * dz);
  const angle = Math.atan2(dx, dz);
  const mx = (from[0] + to[0]) / 2;
  const mz = (from[1] + to[1]) / 2;
  const posts = Math.floor(len / 1.2);

  return (
    <RigidBody type="fixed" colliders="cuboid">
      <group position={[mx, 0, mz]} rotation={[0, angle, 0]}>
        <Box pos={[0, 0.9, 0]} size={[0.1, 0.1, len]} color={C.woodLight} />
        <Box pos={[0, 0.5, 0]} size={[0.1, 0.1, len]} color={C.woodLight} />
        {Array.from({ length: posts + 1 }).map((_, i) => (
          <Box
            key={i}
            pos={[0, 0.5, -len / 2 + i * (len / posts)]}
            size={[0.1, 1.0, 0.1]}
            color={C.wood}
          />
        ))}
      </group>
    </RigidBody>
  );
}

// ─── Barile ───────────────────────────────────────────────
function Barrel({ pos }: { pos: [number, number, number] }) {
  return (
    <RigidBody type="fixed" colliders={false}>
      <CylinderCollider args={[0.35, 0.28]} position={pos} />
      <group position={pos}>
        <Cyl pos={[0, 0.35, 0]} args={[0.25, 0.3, 0.7, 8]} color={C.wood} />
        <Box pos={[0, 0.35, 0]} size={[0.52, 0.08, 0.08]} color={C.stoneDark} />
        <Box pos={[0, 0.55, 0]} size={[0.52, 0.08, 0.08]} color={C.stoneDark} />
      </group>
    </RigidBody>
  );
}

// ─── Mappa Villaggio ──────────────────────────────────────
export default function VillageMap() {
  return (
    <group>
      <Ground />
      <Well pos={[0, 0, 0]} />

      <House pos={[-10, 0, -10]} rot={Math.PI * 0.25}  scale={1} />
      <House pos={[10, 0, -10]}  rot={-Math.PI * 0.25} scale={1.1} />
      <House pos={[-10, 0, 10]}  rot={Math.PI * 0.75}  scale={0.9} />
      <House pos={[10, 0, 10]}   rot={-Math.PI * 0.75} scale={1} />

      <Fence from={[-13, -7]}  to={[-7, -7]} />
      <Fence from={[-13, -7]}  to={[-13, -13]} />
      <Fence from={[-7, -7]}   to={[-7, -13]} />
      <Fence from={[7, -7]}    to={[13, -7]} />
      <Fence from={[13, -7]}   to={[13, -13]} />
      <Fence from={[7, -7]}    to={[7, -13]} />
      <Fence from={[-13, 7]}   to={[-7, 7]} />
      <Fence from={[-13, 7]}   to={[-13, 13]} />
      <Fence from={[-7, 7]}    to={[-7, 13]} />
      <Fence from={[7, 7]}     to={[13, 7]} />
      <Fence from={[13, 7]}    to={[13, 13]} />
      <Fence from={[7, 7]}     to={[7, 13]} />

      <Barrel pos={[-6.5, 0, -6.5]} />
      <Barrel pos={[-6.0, 0, -6.5]} />
      <Barrel pos={[6.5, 0, -6.5]} />
      <Barrel pos={[6.0, 0, 6.5]} />
    </group>
  );
}