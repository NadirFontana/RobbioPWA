import { useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { RapierRigidBody } from "@react-three/rapier";

export interface NPC {
  id: string;
  name: string;
  position: THREE.Vector3;
  dialogues: string[];
}

export interface DialogueState {
  active: boolean;
  npc: NPC | null;
  lineIndex: number;
}

const INTERACTION_RADIUS = 2.5;

export function useDialogue(
  miroRef: React.RefObject<RapierRigidBody | null>,
  npcs: NPC[]
) {
  const [dialogue, setDialogue] = useState<DialogueState>({
    active: false,
    npc: null,
    lineIndex: 0,
  });

  // Trova l'NPC più vicino entro il raggio
  const getNearestNPC = useCallback((): NPC | null => {
    if (!miroRef.current) return null;
    const t = miroRef.current.translation();
    const miroPos = new THREE.Vector3(t.x, t.y, t.z);

    let nearest: NPC | null = null;
    let minDist = Infinity;

    for (const npc of npcs) {
      const dist = miroPos.distanceTo(npc.position);
      if (dist < INTERACTION_RADIUS && dist < minDist) {
        minDist = dist;
        nearest = npc;
      }
    }
    return nearest;
  }, [miroRef, npcs]);

  // Avanza il dialogo o lo chiude
  const advance = useCallback(() => {
    setDialogue((prev) => {
      if (!prev.active || !prev.npc) return prev;
      const nextIndex = prev.lineIndex + 1;
      if (nextIndex >= prev.npc.dialogues.length) {
        return { active: false, npc: null, lineIndex: 0 };
      }
      return { ...prev, lineIndex: nextIndex };
    });
  }, []);

  // Avvia il dialogo con l'NPC più vicino
  const startDialogue = useCallback(() => {
    const npc = getNearestNPC();
    if (!npc) return;
    setDialogue({ active: true, npc, lineIndex: 0 });
  }, [getNearestNPC]);

  return { dialogue, startDialogue, advance };
}