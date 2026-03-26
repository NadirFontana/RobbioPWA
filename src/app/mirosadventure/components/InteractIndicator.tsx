import { Html } from "@react-three/drei";
import * as THREE from "three";

interface Props {
  position: THREE.Vector3;
  name: string;
  visible: boolean;
}

export default function InteractIndicator({ position, name, visible }: Props) {
  if (!visible) return null;

  return (
    <Html
      position={[position.x, position.y + 2, position.z]}
      center
      occlude={false}
      style={{ pointerEvents: "none" }}
    >
      <div
        style={{
          background: "rgba(0,0,0,0.75)",
          color: "white",
          padding: "4px 10px",
          borderRadius: "999px",
          fontSize: "12px",
          fontWeight: "bold",
          whiteSpace: "nowrap",
          border: "2px solid white",
          animation: "bounce 1s infinite",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <span
          style={{
            background: "white",
            color: "black",
            borderRadius: "4px",
            padding: "1px 5px",
            fontSize: "11px",
            fontWeight: "900",
          }}
        >
          E
        </span>
        Parla con {name}
      </div>
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </Html>
  );
}