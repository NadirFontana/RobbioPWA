import { useFrame } from "@react-three/fiber";
import { RapierRigidBody } from "@react-three/rapier";
import { useRef } from "react";
import * as THREE from "three";
import { Portal } from "./mapConfig";

interface Props {
  portal: Portal;
  miroRef: React.RefObject<RapierRigidBody | null>;
  onEnter: (portal: Portal) => void;
  radius?: number;
}

const _miroPos = new THREE.Vector3();
const _portalPos = new THREE.Vector3();

export default function PortalTrigger({ portal, miroRef, onEnter, radius = 2 }: Props) {
  const triggered = useRef(false);

  useFrame(() => {
    if (!miroRef.current || triggered.current) return;

    const t = miroRef.current.translation();
    _miroPos.set(t.x, t.y, t.z);
    _portalPos.set(...portal.position);

    if (_miroPos.distanceTo(_portalPos) < radius) {
      triggered.current = true;

      // Ferma Miro immediatamente
      miroRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);

      onEnter(portal);

      // Cooldown lungo — reset solo dopo che la nuova mappa è caricata
      setTimeout(() => { triggered.current = false; }, 4000);
    }
  });

  return null;
}