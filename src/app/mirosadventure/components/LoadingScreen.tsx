"use client";

interface Props {
  visible: boolean;
}

export default function LoadingScreen({ visible }: Props) {
  if (!visible) return null;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "black",
      zIndex: 200,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
    }}>
      <p style={{ color: "white", fontSize: 24, fontWeight: "bold", letterSpacing: 2 }}>
        Caricamento...
      </p>
      <div style={{ display: "flex", gap: 8 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{
            width: 10, height: 10,
            borderRadius: "50%",
            background: "white",
            animation: `pulse 1s ease-in-out ${i * 0.2}s infinite`,
          }} />
        ))}
      </div>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}