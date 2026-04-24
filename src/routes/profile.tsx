import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { SosButton } from "@/components/sos/SosButton";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profil · UNBOND" },
      { name: "description", content: "Profil, Sprache, Daten-Export und Konto-Einstellungen." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <div className="min-h-screen pb-24">
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <h1 className="text-3xl" style={{ color: "var(--bordeaux)" }}>Dein Profil</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Profil, Sprache, Daten-Export und Konto-Einstellungen folgen in Schritt 3 (zusammen mit der DSGVO-konformen Anbindung in der EU).
        </p>

        <div className="glass mt-8 space-y-4 p-6 text-sm">
          <Row label="Name" value="—" />
          <Row label="E-Mail" value="—" />
          <Row label="Sprache" value="Deutsch" />
          <Row label="Datenstandort" value="EU · Frankfurt" />
        </div>
      </main>
      <SosButton />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/40 pb-3 last:border-0 last:pb-0">
      <span className="text-xs tracking-brand uppercase text-muted-foreground">{label}</span>
      <span>{value}</span>
    </div>
  );
}
