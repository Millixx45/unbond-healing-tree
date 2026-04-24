import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Wind, Anchor, Heart, Phone } from "lucide-react";

export const Route = createFileRoute("/sos")({
  head: () => ({
    meta: [
      { title: "SOS · UNBOND" },
      { name: "description", content: "Schnelle Werkzeuge zum Beruhigen, Erden und Ankommen im Hier." },
      { property: "og:title", content: "SOS · UNBOND" },
      { property: "og:description", content: "Notfall-Werkzeuge für akute emotionale Belastung." },
    ],
  }),
  component: SosPage,
});

function SosPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <p className="text-xs tracking-brand uppercase" style={{ color: "var(--orange-soft-foreground)" }}>
          SOS · Du bist nicht allein
        </p>
        <h1 className="mt-2 text-3xl sm:text-4xl" style={{ color: "var(--bordeaux)" }}>
          Atme. Du bist sicher.
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Drei Werkzeuge, um wieder anzukommen. Inhalt folgt in Schritt 3 – die Struktur steht bereit.
        </p>

        <div className="mt-8 space-y-3">
          <Tool icon={<Wind className="h-5 w-5" />} title="4-7-8 Atmung" hint="2 Minuten beruhigender Atemrhythmus" />
          <Tool icon={<Anchor className="h-5 w-5" />} title="5-4-3-2-1 Grounding" hint="Mit den Sinnen ins Hier zurückkehren" />
          <Tool icon={<Heart className="h-5 w-5" />} title="Hand aufs Herz" hint="Selbstmitgefühl in 60 Sekunden" />
        </div>

        <div
          className="glass mt-10 flex items-start gap-3 p-5"
          style={{ borderColor: "color-mix(in oklch, var(--orange-soft) 50%, transparent)" }}
        >
          <Phone className="mt-0.5 h-5 w-5 shrink-0" style={{ color: "var(--orange-soft-foreground)" }} />
          <div className="text-sm">
            <p className="font-display tracking-brand uppercase text-xs" style={{ color: "var(--bordeaux)" }}>
              In akuter Krise
            </p>
            <p className="mt-1 text-muted-foreground">
              Telefonseelsorge (DE): <strong>0800 111 0 111</strong> oder <strong>0800 111 0 222</strong> – kostenlos, anonym, rund um die Uhr.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link to="/dashboard" className="text-xs tracking-brand uppercase text-muted-foreground hover:text-foreground">
            ← Zurück zum Healing Tree
          </Link>
        </div>
      </main>
    </div>
  );
}

function Tool({ icon, title, hint }: { icon: React.ReactNode; title: string; hint: string }) {
  return (
    <button
      type="button"
      className="glass flex w-full items-center gap-4 p-5 text-left transition-transform hover:-translate-y-0.5"
    >
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: "color-mix(in oklch, var(--orange-soft) 30%, white)", color: "var(--bordeaux)" }}
      >
        {icon}
      </span>
      <span>
        <span className="block font-display text-sm tracking-brand uppercase" style={{ color: "var(--bordeaux)" }}>
          {title}
        </span>
        <span className="block text-xs text-muted-foreground">{hint}</span>
      </span>
    </button>
  );
}
