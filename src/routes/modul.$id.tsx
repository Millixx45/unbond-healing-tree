import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { SosButton } from "@/components/sos/SosButton";
import { MODULE_TITLES, useModuleProgress, writeModuleGoals, writeModuleComplete } from "@/lib/storage";
import { ArrowLeft, BookOpen, Stethoscope, Sparkles, Activity, Microscope, ListChecks } from "lucide-react";

export const Route = createFileRoute("/modul/$id")({
  head: ({ params }) => {
    const id = Number(params.id);
    const title = MODULE_TITLES[id] ?? "Modul";
    return {
      meta: [
        { title: `Modul ${id} · ${title} – UNBOND` },
        { name: "description", content: `Modul ${id} (${title}): Story, Diagnose, Lösung, Übungen, Deep Dive und Checkliste.` },
        { property: "og:title", content: `Modul ${id} · ${title}` },
        { property: "og:description", content: `Modul ${id} im UNBOND-Programm.` },
      ],
    };
  },
  loader: ({ params }) => {
    const id = Number(params.id);
    if (!Number.isInteger(id) || id < 1 || id > 10) throw notFound();
    return { id };
  },
  component: ModulePage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass max-w-md p-8 text-center">
        <h1 className="text-3xl" style={{ color: "var(--bordeaux)" }}>Modul nicht gefunden</h1>
        <p className="mt-3 text-sm text-muted-foreground">Es gibt nur Module 1 bis 10.</p>
        <Link to="/dashboard" className="mt-6 inline-block rounded-full px-5 py-2 text-sm font-display tracking-brand uppercase text-primary-foreground" style={{ backgroundColor: "var(--terracotta)" }}>
          Zum Dashboard
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass max-w-md p-8 text-center">
        <h1 className="text-2xl" style={{ color: "var(--bordeaux)" }}>Etwas ist schiefgelaufen</h1>
        <p className="mt-3 text-xs text-muted-foreground">{error.message}</p>
      </div>
    </div>
  ),
});

const SECTIONS = [
  { id: "story", label: "Story", color: "var(--bordeaux)", icon: BookOpen },
  { id: "diagnose", label: "Diagnose", color: "var(--sage)", icon: Stethoscope },
  { id: "loesung", label: "Lösung", color: "var(--mauve)", icon: Sparkles },
  { id: "uebungen", label: "Übungen", color: "var(--terracotta)", icon: Activity },
  { id: "deepdive", label: "Deep Dive", color: "var(--sage)", icon: Microscope },
  { id: "checkliste", label: "Checkliste", color: "var(--mauve)", icon: ListChecks },
] as const;

function ModulePage() {
  const { id } = Route.useParams();
  const numericId = Number(id);
  const progress = useModuleProgress(numericId);
  const title = MODULE_TITLES[numericId] ?? "Modul";

  return (
    <div className="min-h-screen pb-24">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Module header */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-xs tracking-brand uppercase text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Zurück zum Healing Tree
        </Link>

        <header className="mt-4 mb-10">
          <p className="text-xs tracking-brand uppercase" style={{ color: "var(--mauve)" }}>
            Modul {numericId} von 10
          </p>
          <h1 className="mt-2 text-3xl sm:text-5xl" style={{ color: "var(--bordeaux)" }}>
            {title}
          </h1>
        </header>

        <div className="grid gap-8 lg:grid-cols-[180px_minmax(0,1fr)]">
          {/* Sticky anchor nav */}
          <nav className="hidden lg:block">
            <ol className="glass sticky top-24 space-y-1 p-3 text-xs">
              {SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="flex items-center gap-2 rounded-md px-2 py-1.5 tracking-brand uppercase text-muted-foreground transition-colors hover:bg-white/60 hover:text-foreground"
                  >
                    <span
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-display"
                      style={{ backgroundColor: s.color, color: "white" }}
                    >
                      {i + 1}
                    </span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Sections */}
          <div className="space-y-6">
            <Section id="story" label="Story" color="var(--bordeaux)" step={1}>
              <p className="text-sm text-muted-foreground italic">
                Hier entsteht eine immersive Geschichte mit Scroll-Reveal — Mary &amp; Sandra teilen das Erlebte.
                Inhalt folgt in Schritt 3.
              </p>
            </Section>

            <Section id="diagnose" label="Diagnose" color="var(--sage)" step={2}>
              <div className="rounded-lg p-4" style={{ backgroundColor: "color-mix(in oklch, var(--sage) 15%, white)" }}>
                <p className="text-sm text-muted-foreground italic">
                  Sage-Green Diagnose-Box: Was passiert hier psychologisch &amp; neurobiologisch? Inhalt folgt in Schritt 3.
                </p>
              </div>
            </Section>

            <Section id="loesung" label="Lösung · Der Shift" color="var(--mauve)" step={3}>
              <p className="text-sm text-muted-foreground italic">
                Der Perspektivwechsel — was darf jetzt anders gedacht werden? Inhalt folgt in Schritt 3.
              </p>
            </Section>

            <Section id="uebungen" label="3 Mikro-Übungen" color="var(--terracotta)" step={4}>
              <div className="grid gap-3 sm:grid-cols-3">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="rounded-lg border border-border/60 bg-white/50 p-4">
                    <span className="text-[10px] tracking-brand uppercase text-muted-foreground">Übung {n}</span>
                    <p className="mt-2 text-xs text-muted-foreground italic">Folgt in Schritt 3.</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="deepdive" label="Deep Dive · Forschung" color="var(--sage)" step={5}>
              <p className="text-sm text-muted-foreground italic">
                Aufklappbare Akkordeons mit Studien, Quellen, weiterführender Lektüre. Inhalt folgt in Schritt 3.
              </p>
            </Section>

            <Section id="checkliste" label="Deine 5 Ziele" color="var(--mauve)" step={6}>
              <p className="mb-4 text-xs text-muted-foreground">
                Hake ab, was du in dieser Woche tatsächlich gelebt hast. Bei 3 von 5 erblüht eine Blüte an deinem Baum.
              </p>
              <ul className="space-y-2">
                {progress.goals.map((checked, i) => (
                  <li key={i}>
                    <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border/60 bg-white/50 p-3 text-sm transition-colors hover:bg-white/80">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => {
                          const next = [...progress.goals];
                          next[i] = e.target.checked;
                          writeModuleGoals(numericId, next);
                        }}
                        className="h-4 w-4 accent-[color:var(--mauve)]"
                      />
                      <span className="text-muted-foreground italic">Ziel {i + 1} – Inhalt folgt in Schritt 3.</span>
                    </label>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-lg p-4" style={{ backgroundColor: "color-mix(in oklch, var(--mauve) 12%, white)" }}>
                <span className="text-xs text-muted-foreground">
                  {progress.goalsDone} / 5 Zielen erfüllt {progress.bloomed && "· Blüte aktiv ✿"}
                </span>
                <button
                  type="button"
                  onClick={() => writeModuleComplete(numericId, !progress.completed)}
                  className="rounded-full px-5 py-2 text-xs font-display tracking-brand uppercase text-primary-foreground"
                  style={{ backgroundColor: progress.completed ? "var(--sage)" : "var(--terracotta)" }}
                >
                  {progress.completed ? "Modul abgeschlossen ✓" : "Modul abschließen"}
                </button>
              </div>
            </Section>
          </div>
        </div>
      </main>

      <SosButton />
    </div>
  );
}

function Section({
  id,
  label,
  color,
  step,
  children,
}: {
  id: string;
  label: string;
  color: string;
  step: number;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="glass scroll-mt-24 p-6 sm:p-8">
      <div className="mb-4 flex items-center gap-3">
        <span
          className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-display text-white"
          style={{ backgroundColor: color }}
        >
          {step}
        </span>
        <h2 className="text-lg sm:text-xl" style={{ color }}>
          {label}
        </h2>
      </div>
      {children}
    </section>
  );
}
