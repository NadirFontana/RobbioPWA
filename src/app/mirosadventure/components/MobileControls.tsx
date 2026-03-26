"use client";
import { useRef, useEffect, useCallback } from "react";
import { JoystickState } from "../characters/Miro";

export type { JoystickState };

interface Props {
  onJoystick: (state: JoystickState) => void;
  onAction: () => void;
  visible: boolean;
}

const JOYSTICK_RADIUS = 50;
const KNOB_RADIUS = 24;

export default function MobileControls({ onJoystick, onAction, visible }: Props) {
  const baseRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);
  const touchIdRef = useRef<number | null>(null);
  const centerRef = useRef({ x: 0, y: 0 });

  const resetKnob = useCallback(() => {
    if (knobRef.current) {
      knobRef.current.style.transform = "translate(-50%, -50%)";
    }
    onJoystick({ x: 0, y: 0 });
    touchIdRef.current = null;
  }, [onJoystick]);

  useEffect(() => {
    const base = baseRef.current;
    if (!base) return;

    const onTouchStart = (e: TouchEvent) => {
      if (touchIdRef.current !== null) return;
      const touch = e.changedTouches[0];
      touchIdRef.current = touch.identifier;
      const rect = base.getBoundingClientRect();
      centerRef.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
    };

    const onTouchMove = (e: TouchEvent) => {
      if (touchIdRef.current === null) return;
      let touch: Touch | null = null;
      for (let i = 0; i < e.changedTouches.length; i++) {
        if (e.changedTouches[i].identifier === touchIdRef.current) {
          touch = e.changedTouches[i];
          break;
        }
      }
      if (!touch) return;

      const dx = touch.clientX - centerRef.current.x;
      const dy = touch.clientY - centerRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const clamp = Math.min(dist, JOYSTICK_RADIUS);
      const angle = Math.atan2(dy, dx);

      const kx = Math.cos(angle) * clamp;
      const ky = Math.sin(angle) * clamp;

      if (knobRef.current) {
        knobRef.current.style.transform = `translate(calc(-50% + ${kx}px), calc(-50% + ${ky}px))`;
      }

      onJoystick({
        x: kx / JOYSTICK_RADIUS,
        y: ky / JOYSTICK_RADIUS,
      });
    };

    const onTouchEnd = (e: TouchEvent) => {
      for (let i = 0; i < e.changedTouches.length; i++) {
        if (e.changedTouches[i].identifier === touchIdRef.current) {
          resetKnob();
          break;
        }
      }
    };

    base.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      base.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [onJoystick, resetKnob]);

  if (!visible) return null;

  return (
    <>
      {/* Joystick sinistro */}
      <div style={{ position: "fixed", bottom: 40, left: 40, zIndex: 100, userSelect: "none", touchAction: "none" }}>
        <div
          ref={baseRef}
          style={{
            width: JOYSTICK_RADIUS * 2,
            height: JOYSTICK_RADIUS * 2,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            border: "2px solid rgba(255,255,255,0.4)",
            position: "relative",
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            ref={knobRef}
            style={{
              width: KNOB_RADIUS * 2,
              height: KNOB_RADIUS * 2,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.6)",
              border: "2px solid rgba(255,255,255,0.9)",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>

      {/* Tasto azione destro */}
      <div style={{ position: "fixed", bottom: 40, right: 40, zIndex: 100, userSelect: "none", touchAction: "none" }}>
        <button
          onTouchStart={(e) => { e.preventDefault(); onAction(); }}
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "rgba(99, 179, 237, 0.7)",
            border: "2px solid rgba(255,255,255,0.6)",
            color: "white",
            fontWeight: "bold",
            backdropFilter: "blur(4px)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            cursor: "pointer",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          <span style={{ fontSize: 20, lineHeight: 1 }}>💬</span>
          <span style={{ fontSize: 10, opacity: 0.9 }}>Parla</span>
        </button>
      </div>
    </>
  );
}