import { useGLTF } from "@react-three/drei";
import { ComponentPropsWithoutRef } from "react";

// Nota: il path deve corrispondere esattamente al nome file in /public/models/characters/
// Gli spazi nel nome file sono validi ma assicurati che il file sia in quella cartella
const MODEL_PATH = "/models/characters/25. Lia.glb";

useGLTF.preload(MODEL_PATH);

export default function Lia(props: ComponentPropsWithoutRef<"group">) {
  const { nodes, materials } = useGLTF(MODEL_PATH) as any;

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh_0.geometry}
        material={materials.Material_0}
      />
    </group>
  );
}