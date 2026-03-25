import { useFrame, useThree } from "@react-three/fiber";
import { RapierRigidBody } from "@react-three/rapier";
import { RefObject } from "react";
import * as THREE from "three";

// Offset della camera rispetto a Miro (dietro e sopra)
const CAMERA_OFFSET = new THREE.Vector3(0, 5, 10);
const LOOK_OFFSET = new THREE.Vector3(0, 1, 0); // punto leggermente sopra Miro
const LERP_SPEED = 0.1; // smoothing: più basso = più morbido

const _targetPos = new THREE.Vector3();
const _lookAt = new THREE.Vector3();
const _miroPos = new THREE.Vector3();

export function useFollowCamera(miroRef: RefObject<RapierRigidBody | null>) {
  const { camera } = useThree();

  useFrame(() => {
    if (!miroRef.current) return;

    const translation = miroRef.current.translation();
    _miroPos.set(translation.x, translation.y, translation.z);

    // Posizione target della camera = Miro + offset fisso (stile top-down dietro)
    _targetPos.copy(_miroPos).add(CAMERA_OFFSET);

    // Smooth della camera verso la posizione target
    camera.position.lerp(_targetPos, LERP_SPEED);

    // La camera guarda sempre leggermente sopra Miro
    _lookAt.copy(_miroPos).add(LOOK_OFFSET);
    camera.lookAt(_lookAt);
  });
}