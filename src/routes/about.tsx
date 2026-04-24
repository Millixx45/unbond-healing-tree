import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { SosButton } from "@/components/sos/SosButton";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Über UNBOND" },
      { name: "description", content: "Über das Programm, die 6-Elemente-Struktur und unsere Trauma-Trigger-Warnung." },
      { property: "og:title", content: "Über UNBOND" },
      { property: "og:description", content: "Wie das 10-Modul-Programm aufgebaut ist und für wen es gedacht ist." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen pb-24">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <p className="text-xs tracking-brand uppercase" style={{ color: "var(--mauve)" }}>Über das Programm</p>
        <h1 className="mt-2 text-3xl sm:text-4xl" style={{ color: "var(--bordeaux)" }}>Wie UNBOND funktioniert</h1>

        <div
          className="glass mt-8 p-5 text-sm"
          style={{ borderColor: "color-mix(in oklch, var(--orange-soft) 50%, transparent)" }}
        >
          <p className="font-display text-xs tracking-brand uppercase" style={{ color: "var(--bordeaux)" }}>
            Trauma-Trigger-Warnung
          </p>
          <p className="mt-2 text-muted-foreground">
            Dieses Programm berührt sensible Themen wie toxische Beziehungen, emotionale Gewalt und alte Wunden.
            Du bestimmst Tempo und Tiefe – und kannst jederzeit pausieren oder die SOS-Werkzeuge nutzen.
          </p>
        </div>

        <h2 className="mt-10 text-lg" style={{ color: "var(--bordeaux)" }}>Die 6-Elemente-Struktur</h2>
        <p className="mt-2 text-sm text-muted-foreground">Jedes der 10 Module folgt derselben Choreographie:</p>
        <ol className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            { n: 1, t: "Story", c: "var(--bordeaux)", d: "Eine echte Geschichte zum Erkennen." },
            { n: 2, t: "Diagnose", c: "var(--sage)", d: "Was passiert hier wissenschaftlich?" },
            { n: 3, t: "Lösung", c: "var(--mauve)", d: "Der Perspektiv-Shift." },
            { n: 4, t: "3 Übungen", c: "var(--terracotta)", d: "Mikro-Tools für den Alltag." },
            { n: 5, t: "Deep Dive", c: "var(--sage)", d: "Forschung &amp; Quellen." },
            { n: 6, t: "Checkliste", c: "var(--mauve)", d: "5 Ziele · 3 davon = Blüte." },
          ].map((s) => (
            <li key={s.n} className="glass flex items-start gap-3 p-4">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-display text-white"
                style={{ backgroundColor: s.c }}
              >
                {s.n}
              </span>
              <span className="text-sm">
                <span className="block font-display text-xs tracking-brand uppercase" style={{ color: s.c }}>{s.t}</span>
                <span className="block text-muted-foreground" dangerouslySetInnerHTML={{ __html: s.d }} />
              </span>
            </li>
          ))}
        </ol>
      </main>
      <SosButton />
    </div>
  );
}
