import { useFrame, useThree } from "@react-three/fiber";
import { RapierRigidBody } from "@react-three/rapier";
import { RefObject } from "react";
import * as THREE from "three";
import { DialogueState, NPC } from "./useDialogue";

const FOLLOW_OFFSET = new THREE.Vector3(0, 5, 10);
const LOOK_OFFSET   = new THREE.Vector3(0, 1, 0);
const LERP_SPEED    = 0.08;

// Camera dialogo stile Zelda TP:
// si posiziona lateralmente tra i due personaggi, leggermente in alto
const DIALOGUE_HEIGHT   = 2.5;   // altezza della camera durante il dialogo
const DIALOGUE_SIDE     = 4;     // distanza laterale dal centro
const DIALOGUE_DISTANCE = 3;     // distanza in profondità

const _miroPos    = new THREE.Vector3();
const _npcPos     = new THREE.Vector3();
const _midPoint   = new THREE.Vector3();
const _targetPos  = new THREE.Vector3();
const _lookAt     = new THREE.Vector3();
const _right      = new THREE.Vector3();
const _forward    = new THREE.Vector3();

export function useFollowCamera(
  miroRef: RefObject<RapierRigidBody | null>,
  dialogue: DialogueState
) {
  const { camera } = useThree();

  useFrame(() => {
    if (!miroRef.current) return;

    const t = miroRef.current.translation();
    _miroPos.set(t.x, t.y, t.z);

    if (dialogue.active && dialogue.npc) {
      // --- Modalità dialogo stile Zelda TP ---
      _npcPos.copy(dialogue.npc.position);

      // Punto medio tra Miro e NPC
      _midPoint.addVectors(_miroPos, _npcPos).multiplyScalar(0.5);

      // Vettore che va da Miro all'NPC (forward della conversazione)
      _forward.subVectors(_npcPos, _miroPos).normalize();

      // Vettore laterale (perpendicolare al forward, sul piano XZ)
      _right.set(-_forward.z, 0, _forward.x).normalize();

      // Camera: laterale rispetto ai due personaggi, leggermente davanti e in alto
      _targetPos
        .copy(_midPoint)
        .addScaledVector(_right, DIALOGUE_SIDE)
        .addScaledVector(_forward, -DIALOGUE_DISTANCE);
      _targetPos.y = _miroPos.y + DIALOGUE_HEIGHT;

      // Guarda il punto medio tra i due (leggermente alzato)
      _lookAt.copy(_midPoint);
      _lookAt.y = _miroPos.y + 1;
    } else {
      // --- Modalità follow normale ---
      _targetPos.copy(_miroPos).add(FOLLOW_OFFSET);
      _lookAt.copy(_miroPos).add(LOOK_OFFSET);
    }

    camera.position.lerp(_targetPos, LERP_SPEED);
    camera.lookAt(_lookAt);
  });
}