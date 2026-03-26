"use client";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody, CapsuleCollider, RapierRigidBody } from "@react-three/rapier";
import { useRef, useEffect, forwardRef } from "react";
import * as THREE from "three";

const MODEL_PATH = "/models/characters/Meshy_AI_1_Miro_0325182531_texture.glb";

useGLTF.preload(MODEL_PATH);

const SPEED = 5;

export interface JoystickState {
  x: number;
  y: number;
}

interface MiroProps {
  onInteract?: () => void;
  dialogueActive?: boolean;
  joystick?: React.RefObject<JoystickState>;
}

const Miro = forwardRef<RapierRigidBody, MiroProps>(
  ({ onInteract, dialogueActive = false, joystick }, ref) => {
    const { nodes, materials } = useGLTF(MODEL_PATH) as any;
    const rigidBodyRef = ref as React.RefObject<RapierRigidBody>;
    const groupRef = useRef<THREE.Group>(null);
    const keys = useRef<Record<string, boolean>>({});

    useEffect(() => {
      const onKeyDown = (e: KeyboardEvent) => {
        keys.current[e.code] = true;
        if (e.code === "KeyE") onInteract?.();
      };
      const onKeyUp = (e: KeyboardEvent) => {
        keys.current[e.code] = false;
      };
      window.addEventListener("keydown", onKeyDown);
      window.addEventListener("keyup", onKeyUp);
      return () => {
        window.removeEventListener("keydown", onKeyDown);
        window.removeEventListener("keyup", onKeyUp);
      };
    }, [onInteract]);

    useFrame(() => {
      if (!rigidBodyRef.current) return;

      if (dialogueActive) {
        rigidBodyRef.current.setLinvel(
          { x: 0, y: rigidBodyRef.current.linvel().y, z: 0 },
          true
        );
        return;
      }

      let vx = 0;
      let vz = 0;

      if (keys.current["KeyW"] || keys.current["ArrowUp"])    vz -= SPEED;
      if (keys.current["KeyS"] || keys.current["ArrowDown"])  vz += SPEED;
      if (keys.current["KeyA"] || keys.current["ArrowLeft"])  vx -= SPEED;
      if (keys.current["KeyD"] || keys.current["ArrowRight"]) vx += SPEED;

      if (joystick?.current) {
        const jx = joystick.current.x;
        const jy = joystick.current.y;
        if (Math.abs(jx) > 0.05 || Math.abs(jy) > 0.05) {
          vx = jx * SPEED;
          vz = jy * SPEED;
        }
      }

      const currentVel = rigidBodyRef.current.linvel();
      rigidBodyRef.current.setLinvel({ x: vx, y: currentVel.y, z: vz }, true);

      if (vx !== 0 || vz !== 0) {
        const angle = Math.atan2(vx, vz);
        if (groupRef.current) {
          groupRef.current.rotation.y = angle;
        }
      }
    });

    return (
      <RigidBody
        ref={rigidBodyRef}
        colliders={false}
        mass={1}
        position={[0, 1, 0]}
        enabledRotations={[false, false, false]}
      >
        <CapsuleCollider args={[0.5, 0.3]} />
        <group ref={groupRef} dispose={null}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mesh_0.geometry}
            material={materials.Material_0}
          />
        </group>
      </RigidBody>
    );
  }
);

Miro.displayName = "Miro";
export default Miro;