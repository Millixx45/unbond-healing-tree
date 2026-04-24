import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { Header } from "@/components/site/Header";
import { SosButton } from "@/components/sos/SosButton";
import { HealingTree } from "@/components/healing-tree/HealingTree";
import {
  MODULE_TITLES,
  TOTAL_MODULES,
  useAllProgress,
  writeModuleComplete,
  writeModuleGoals,
} from "@/lib/storage";
import { Sparkles, Leaf, Flower2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard · UNBOND" },
      {
        name: "description",
        content: "Dein Healing-Tree: Sieh deinen Fortschritt durch das 10-Modul-Programm wachsen.",
      },
      { property: "og:title", content: "Dashboard · UNBOND" },
      {
        property: "og:description",
        content: "Dein Healing-Tree zeigt jeden Schritt – Blätter für abgeschlossene Module, Blüten für gelebte Ziele.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const modules = useAllProgress();
  const completed = useMemo(() => modules.filter((m) => m.completed).length, [modules]);
  const blooms = useMemo(() => modules.filter((m) => m.bloomed).length, [modules]);
  const nextModule = modules.find((m) => !m.completed) ?? modules[modules.length - 1];

  return (
    <div className="min-h-screen pb-24">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Greeting */}
        <section className="mb-6">
          <p className="text-xs tracking-brand uppercase" style={{ color: "var(--mauve)" }}>
            Willkommen zurück
          </p>
          <h1 className="mt-2 text-2xl sm:text-3xl" style={{ color: "var(--bordeaux)" }}>
            Dein Healing Tree
          </h1>
        </section>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* Tree */}
          <div className="glass relative overflow-hidden p-4 sm:p-6">
            <HealingTree modules={modules} className="mx-auto aspect-[600/640] w-full max-w-[560px]" />

            <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-3 text-[10px] tracking-brand uppercase text-muted-foreground">
              <Legend swatch="var(--sage)" label="Blatt = Modul abgeschlossen" />
              <Legend swatch="var(--mauve)" label="Blüte = 3 / 5 Ziele gelebt" />
            </div>
          </div>

          {/* Side panel */}
          <aside className="space-y-4">
            {/* Daily impulse */}
            <div
              className="glass p-5"
              style={{ borderColor: "color-mix(in oklch, var(--mauve) 40%, transparent)" }}
            >
              <span className="flex items-center gap-2 text-xs tracking-brand uppercase" style={{ color: "var(--mauve)" }}>
                <Sparkles className="h-3.5 w-3.5" /> Tagesimpuls
              </span>
              <p className="mt-3 text-sm leading-relaxed">
                „Du musst nicht stark sein, um zu heilen. Du musst nur ehrlich sein – mit dir selbst."
              </p>
            </div>

            {/* Progress */}
            <div className="glass p-5">
              <div className="flex items-baseline justify-between">
                <span className="text-xs tracking-brand uppercase text-muted-foreground">Fortschritt</span>
                <span className="font-display text-lg" style={{ color: "var(--bordeaux)" }}>
                  {completed} / {TOTAL_MODULES}
                </span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full" style={{ backgroundColor: "color-mix(in oklch, var(--sage) 18%, white)" }}>
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${(completed / TOTAL_MODULES) * 100}%`,
                    backgroundColor: "var(--sage)",
                  }}
                />
              </div>
              <div className="mt-3 flex items-center gap-4 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Leaf className="h-3.5 w-3.5" style={{ color: "var(--sage)" }} /> {completed} Blätter
                </span>
                <span className="flex items-center gap-1.5">
                  <Flower2 className="h-3.5 w-3.5" style={{ color: "var(--mauve)" }} /> {blooms} Blüten
                </span>
              </div>
            </div>

            {/* Next CTA */}
            {nextModule && (
              <Link
                to="/modul/$id"
                params={{ id: String(nextModule.id) }}
                className="block rounded-xl p-5 text-primary-foreground shadow-md transition-transform hover:scale-[1.02]"
                style={{ backgroundColor: "var(--terracotta)" }}
              >
                <span className="text-[11px] tracking-brand uppercase opacity-90">
                  {nextModule.completed ? "Wiederholen" : "Weiter mit"}
                </span>
                <div className="mt-1 flex items-center justify-between gap-3">
                  <span className="font-display text-lg tracking-brand">
                    Modul {nextModule.id} · {MODULE_TITLES[nextModule.id]}
                  </span>
                  <ArrowRight className="h-5 w-5 shrink-0" />
                </div>
              </Link>
            )}
          </aside>
        </div>

        {/* Module row */}
        <section className="mt-10">
          <h2 className="mb-4 text-sm tracking-brand uppercase" style={{ color: "var(--bordeaux)" }}>
            Alle Module
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {modules.map((m) => (
              <ModuleCard key={m.id} id={m.id} completed={m.completed} bloomed={m.bloomed} goalsDone={m.goalsDone} />
            ))}
          </div>
        </section>

        {/* Demo controls (Step 1 only — removed once Supabase + real exercises land) */}
        <section className="mt-10">
          <details className="glass p-4 text-sm">
            <summary className="cursor-pointer font-display text-xs tracking-brand uppercase text-muted-foreground">
              Demo-Steuerung (zum Testen von Blättern &amp; Blüten)
            </summary>
            <p className="mt-2 text-xs text-muted-foreground">
              Diese Bedienung wird in Schritt 3 durch echte Modul-Inhalte und Supabase-Sync ersetzt.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {modules.map((m) => (
                <div key={m.id} className="rounded-lg border border-border/60 bg-white/40 p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xs tracking-brand uppercase" style={{ color: "var(--bordeaux)" }}>
                      M{m.id} · {MODULE_TITLES[m.id]}
                    </span>
                    <label className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <input
                        type="checkbox"
                        checked={m.completed}
                        onChange={(e) => writeModuleComplete(m.id, e.target.checked)}
                      />
                      abgeschlossen
                    </label>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[11px] text-muted-foreground">Ziele:</span>
                    {m.goals.map((g, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          const next = [...m.goals];
                          next[i] = !next[i];
                          writeModuleGoals(m.id, next);
                        }}
                        className="h-5 w-5 rounded border transition-colors"
                        style={{
                          backgroundColor: g ? "var(--mauve)" : "transparent",
                          borderColor: g ? "var(--mauve)" : "var(--border)",
                        }}
                        aria-label={`Ziel ${i + 1}`}
                      />
                    ))}
                    <span className="ml-auto text-[11px] text-muted-foreground">{m.goalsDone}/5</span>
                  </div>
                </div>
              ))}
            </div>
          </details>
        </section>
      </main>

      <SosButton />
    </div>
  );
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <span className="hidden items-center gap-1.5 sm:inline-flex">
      <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: swatch }} />
      {label}
    </span>
  );
}

function ModuleCard({
  id,
  completed,
  bloomed,
  goalsDone,
}: {
  id: number;
  completed: boolean;
  bloomed: boolean;
  goalsDone: number;
}) {
  const status = completed ? (bloomed ? "✿" : "✓") : "○";
  return (
    <Link
      to="/modul/$id"
      params={{ id: String(id) }}
      className="glass group flex flex-col gap-2 p-4 transition-transform hover:-translate-y-0.5"
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] tracking-brand uppercase text-muted-foreground">Modul {id}</span>
        <span
          className="font-display text-base"
          style={{ color: bloomed ? "var(--mauve)" : completed ? "var(--sage)" : "var(--muted-foreground)" }}
        >
          {status}
        </span>
      </div>
      <h3 className="text-sm" style={{ color: "var(--bordeaux)" }}>
        {MODULE_TITLES[id]}
      </h3>
      <div className="mt-1 flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className="h-1 flex-1 rounded-full"
            style={{
              backgroundColor:
                i < goalsDone ? "var(--mauve)" : "color-mix(in oklch, var(--mauve) 15%, white)",
            }}
          />
        ))}
      </div>
    </Link>
  );
}
