import { useState } from "react";
import { LifeBuoy, X, Wind, Anchor, Heart } from "lucide-react";

/**
 * Persistent floating SOS access. Opens a calming drawer overlay
 * with placeholder grounding tools (filled with content in step 3).
 */
export function SosButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="SOS – schnelle Hilfe öffnen"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full text-orange-soft-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
        style={{
          backgroundColor: "var(--orange-soft)",
          boxShadow: "0 12px 30px -8px color-mix(in oklch, var(--orange-soft) 60%, transparent)",
        }}
      >
        <LifeBuoy className="h-6 w-6" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:items-center sm:justify-center"
          style={{ backgroundColor: "color-mix(in oklch, var(--bordeaux) 35%, transparent)" }}
          onClick={() => setOpen(false)}
        >
          <div
            className="glass-strong relative w-full max-w-md p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted"
              aria-label="Schließen"
            >
              <X className="h-4 w-4" />
            </button>

            <p
              className="text-xs tracking-brand uppercase"
              style={{ color: "var(--orange-soft-foreground)" }}
            >
              SOS · Du bist nicht allein
            </p>
            <h2
              className="mt-2 text-2xl"
              style={{ color: "var(--bordeaux)" }}
            >
              Atme. Du bist sicher.
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Drei kleine Werkzeuge, um wieder anzukommen. Wähle, was sich richtig anfühlt.
            </p>

            <div className="mt-6 space-y-3">
              <SosTool icon={<Wind className="h-5 w-5" />} title="4-7-8 Atmung" hint="2 Minuten beruhigender Atemrhythmus" />
              <SosTool icon={<Anchor className="h-5 w-5" />} title="5-4-3-2-1 Grounding" hint="Mit den Sinnen ins Hier zurückkehren" />
              <SosTool icon={<Heart className="h-5 w-5" />} title="Hand aufs Herz" hint="Selbstmitgefühl in 60 Sekunden" />
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
              In akuter Krise: Telefonseelsorge 0800 111 0 111 (DE), kostenlos & anonym.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

function SosTool({ icon, title, hint }: { icon: React.ReactNode; title: string; hint: string }) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-4 rounded-xl border border-border/50 bg-white/50 p-4 text-left transition-all hover:bg-white/80"
    >
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
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
