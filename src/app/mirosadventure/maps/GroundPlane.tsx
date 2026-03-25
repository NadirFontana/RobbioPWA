import { RigidBody } from "@react-three/rapier";

export default function GroundPlane() {
  return (
    <RigidBody type="fixed" colliders="cuboid" friction={1}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#6fcf97" flatShading />
      </mesh>
    </RigidBody>
  );
}