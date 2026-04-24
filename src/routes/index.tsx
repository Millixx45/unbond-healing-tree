import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { SosButton } from "@/components/sos/SosButton";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UNBOND – Breaking Chains" },
      {
        name: "description",
        content:
          "Ein traumasensibles 10-Modul-Programm, das dir hilft, toxische Bindungen zu lösen – in deinem Tempo, mit fundierten Werkzeugen.",
      },
      { property: "og:title", content: "UNBOND – Breaking Chains" },
      {
        property: "og:description",
        content: "Traumasensibles 10-Modul-Programm zum Lösen toxischer Bindungen.",
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-20">
        {/* Trigger warning */}
        <div
          className="glass mx-auto mb-10 max-w-2xl px-5 py-3 text-center text-xs"
          style={{ borderColor: "color-mix(in oklch, var(--orange-soft) 50%, transparent)" }}
        >
          <span
            className="font-display tracking-brand uppercase"
            style={{ color: "var(--bordeaux)" }}
          >
            Hinweis ·{" "}
          </span>
          <span className="text-muted-foreground">
            Dieses Programm berührt sensible Themen. Du bestimmst Tempo und Tiefe.
          </span>
        </div>

        <section className="text-center">
          <p
            className="text-xs tracking-brand uppercase"
            style={{ color: "var(--mauve)" }}
          >
            Mary &amp; Sandra · 10 Module
          </p>
          <h1
            className="mt-4 text-4xl sm:text-6xl"
            style={{ color: "var(--bordeaux)" }}
          >
            Breaking Chains
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground">
            Toxische Bindungen lösen heißt nicht, jemanden zu hassen. Es heißt,
            dich selbst wiederzufinden – Schicht für Schicht, Atemzug für Atemzug.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/dashboard"
              className="rounded-full px-6 py-3 text-sm font-display tracking-brand uppercase text-primary-foreground shadow-md transition-transform hover:scale-105"
              style={{ backgroundColor: "var(--terracotta)" }}
            >
              Starte deinen Weg
            </Link>
            <Link
              to="/about"
              className="rounded-full border border-border bg-white/40 px-6 py-3 text-sm font-display tracking-brand uppercase backdrop-blur transition-colors hover:bg-white/70"
              style={{ color: "var(--bordeaux)" }}
            >
              Wie es funktioniert
            </Link>
          </div>
        </section>

        {/* Three pillars */}
        <section className="mt-20 grid gap-5 sm:grid-cols-3">
          <Pillar
            color="var(--bordeaux)"
            label="Story"
            text="Echte Geschichten von Mary & Sandra, die zeigen: Du bist nicht allein, nicht verrückt, nicht zu spät."
          />
          <Pillar
            color="var(--sage)"
            label="Wissenschaft"
            text="Trauma-Forschung, Bindungstheorie und Neurobiologie – verständlich, einordnend, entlastend."
          />
          <Pillar
            color="var(--mauve)"
            label="Heilung"
            text="Mikro-Übungen, Reflexion und ein wachsender Healing-Tree, der jeden Schritt sichtbar macht."
          />
        </section>

        <p className="mt-16 text-center text-xs text-muted-foreground">
          Daten in der EU (Frankfurt), DSGVO-konform · Du kannst jederzeit pausieren.
        </p>
      </main>

      <SosButton />
    </div>
  );
}

function Pillar({ color, label, text }: { color: string; label: string; text: string }) {
  return (
    <div className="glass p-6">
      <span
        className="font-display text-xs tracking-brand uppercase"
        style={{ color }}
      >
        {label}
      </span>
      <p className="mt-3 text-sm text-foreground/80">{text}</p>
    </div>
  );
}
