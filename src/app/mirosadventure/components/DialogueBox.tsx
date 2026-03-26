"use client";
import { DialogueState } from "../hooks/useDialogue";

interface Props {
  dialogue: DialogueState;
  onAdvance: () => void;
}

export default function DialogueBox({ dialogue, onAdvance }: Props) {
  if (!dialogue.active || !dialogue.npc) return null;

  const { npc, lineIndex } = dialogue;
  const isLast = lineIndex >= npc.dialogues.length - 1;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none">
      <div className="max-w-2xl mx-auto pointer-events-auto">
        {/* Fumetto container */}
        <div className="relative bg-white border-4 border-gray-800 rounded-2xl shadow-2xl p-5">

          {/* Triangolino fumetto in basso al centro */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0
            border-l-[12px] border-l-transparent
            border-r-[12px] border-r-transparent
            border-t-[16px] border-t-gray-800" />
          <div className="absolute -bottom-[13px] left-1/2 -translate-x-1/2 w-0 h-0
            border-l-[10px] border-l-transparent
            border-r-[10px] border-r-transparent
            border-t-[14px] border-t-white" />

          {/* Nome NPC */}
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide">
              {npc.name}
            </span>
            <span className="text-xs text-gray-400">
              {lineIndex + 1} / {npc.dialogues.length}
            </span>
          </div>

          {/* Testo del dialogo */}
          <p className="text-gray-900 text-base leading-relaxed font-medium min-h-[3rem]">
            {npc.dialogues[lineIndex]}
          </p>

          {/* Bottone avanti */}
          <div className="flex justify-end mt-3">
            <button
              onClick={onAdvance}
              className="bg-gray-800 hover:bg-gray-700 active:scale-95 text-white text-sm font-bold
                px-5 py-2 rounded-xl transition-all flex items-center gap-2"
            >
              {isLast ? "Fine" : "Avanti"}
              <span className="text-xs opacity-70">[E]</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}