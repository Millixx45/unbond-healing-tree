/**
 * UNBOND localStorage helpers.
 * Keys follow the brand spec: unbond_m[X]_[element]
 *
 *   unbond_m{id}_complete   -> "1" when the module is finished
 *   unbond_m{id}_goals      -> JSON array of 5 booleans (the checklist)
 */

import { useCallback, useEffect, useState } from "react";

const KEY_COMPLETE = (id: number) => `unbond_m${id}_complete`;
const KEY_GOALS = (id: number) => `unbond_m${id}_goals`;

export const TOTAL_MODULES = 11; // Modul 0 (Auftakt) + Module 1–10
export const MODULE_IDS = Array.from({ length: TOTAL_MODULES }, (_, i) => i); // [0..10]

export type ModuleProgress = {
  id: number;
  completed: boolean;
  goals: boolean[]; // length 5
  goalsDone: number;
  bloomed: boolean; // >= 3 of 5 goals
};

const emptyGoals = (): boolean[] => [false, false, false, false, false];

function safeRead(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeWrite(key: string, value: string) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // ignore quota / privacy mode errors
  }
}

export function readModuleProgress(id: number): ModuleProgress {
  const completed = safeRead(KEY_COMPLETE(id)) === "1";
  let goals = emptyGoals();
  const raw = safeRead(KEY_GOALS(id));
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length === 5) {
        goals = parsed.map((v) => Boolean(v));
      }
    } catch {
      /* keep defaults */
    }
  }
  const goalsDone = goals.filter(Boolean).length;
  return { id, completed, goals, goalsDone, bloomed: goalsDone >= 3 };
}

export function writeModuleComplete(id: number, completed: boolean) {
  safeWrite(KEY_COMPLETE(id), completed ? "1" : "0");
  window.dispatchEvent(new CustomEvent("unbond:progress", { detail: { id } }));
}

export function writeModuleGoals(id: number, goals: boolean[]) {
  safeWrite(KEY_GOALS(id), JSON.stringify(goals));
  window.dispatchEvent(new CustomEvent("unbond:progress", { detail: { id } }));
}

/** Reactive hook that re-renders when any module's progress changes. */
export function useAllProgress(): ModuleProgress[] {
  const read = useCallback(
    () => MODULE_IDS.map((i) => readModuleProgress(i)),
    [],
  );
  const [state, setState] = useState<ModuleProgress[]>(read);

  useEffect(() => {
    const refresh = () => setState(read());
    refresh(); // hydrate on mount (SSR safety)
    window.addEventListener("unbond:progress", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("unbond:progress", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [read]);

  return state;
}

export function useModuleProgress(id: number): ModuleProgress {
  const all = useAllProgress();
  return all.find((m) => m.id === id) ?? { id, completed: false, goals: emptyGoals(), goalsDone: 0, bloomed: false };
}

export const MODULE_TITLES: Record<number, string> = {
  0: "Auftakt",
  1: "Erkennen",
  2: "Benennen",
  3: "Verstehen",
  4: "Spüren",
  5: "Atmen",
  6: "Grenzen",
  7: "Loslassen",
  8: "Heilen",
  9: "Verbinden",
  10: "Frei sein",
};
