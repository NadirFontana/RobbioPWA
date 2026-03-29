import { RigidBody } from "@react-three/rapier";
import { MapConfig } from "./mapConfig";

interface Props {
  config: MapConfig;
}

const ROAD_COLOR = "#c8a96e";
const ROAD_WIDTH = 6;

function getRoadDirection(x: number, z: number): "north" | "south" | "east" | "west" | null {
  const absX = Math.abs(x);
  const absZ = Math.abs(z);
  if (absX > absZ) return x > 0 ? "east" : "west";
  if (absZ > absX) return z > 0 ? "south" : "north";
  return null;
}

export default function PlaceholderMap({ config }: Props) {
  const [w, d] = config.size;

  return (
    <group>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
          <planeGeometry args={[w, d]} />
          <meshStandardMaterial color={config.color} flatShading />
        </mesh>

        {config.portals.map((portal, i) => {
          const [px, , pz] = portal.position;
          const dir = getRoadDirection(px, pz);
          if (!dir) return null;

          const isH = dir === "east" || dir === "west";
          const roadW = isH ? w / 2 : ROAD_WIDTH;
          const roadD = isH ? ROAD_WIDTH : d / 2;
          const offsetX = dir === "east" ? w / 4 : dir === "west" ? -w / 4 : 0;
          const offsetZ = dir === "south" ? d / 4 : dir === "north" ? -d / 4 : 0;

          return (
            <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[offsetX, 0.01, offsetZ]}>
              <planeGeometry args={[roadW, roadD]} />
              <meshStandardMaterial color={ROAD_COLOR} flatShading />
            </mesh>
          );
        })}

        {/* Piazza centrale */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0.01, 0]}>
          <planeGeometry args={[ROAD_WIDTH + 2, ROAD_WIDTH + 2]} />
          <meshStandardMaterial color={ROAD_COLOR} flatShading />
        </mesh>
      </RigidBody>
    </group>
  );
}