"use client";

interface Props {
  label: string;
  visible: boolean;
}

// Label del nome area — appare in alto al centro quando cambi mappa
export default function MapLabel({ label, visible }: Props) {
  if (!visible) return null;
  return (
    <div style={{
      position: "fixed",
      top: 32,
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 150,
      background: "rgba(0,0,0,0.6)",
      color: "white",
      padding: "8px 24px",
      borderRadius: "999px",
      fontSize: 16,
      fontWeight: "bold",
      letterSpacing: 1,
      backdropFilter: "blur(4px)",
      border: "1px solid rgba(255,255,255,0.2)",
      animation: "fadeInOut 3s ease forwards",
    }}>
      {label}
      <style>{`
        @keyframes fadeInOut {
          0%   { opacity: 0; transform: translateX(-50%) translateY(-8px); }
          15%  { opacity: 1; transform: translateX(-50%) translateY(0); }
          70%  { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}