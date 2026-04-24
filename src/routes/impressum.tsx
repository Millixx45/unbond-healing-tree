import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";

export const Route = createFileRoute("/impressum")({
  head: () => ({
    meta: [
      { title: "Impressum · UNBOND" },
      { name: "description", content: "Impressum und Anbieterkennzeichnung." },
    ],
  }),
  component: () => (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <h1 className="text-3xl" style={{ color: "var(--bordeaux)" }}>Impressum</h1>
        <div className="glass mt-6 p-6 text-sm text-muted-foreground">
          <p className="italic">Platzhalter – Inhalt folgt in Schritt 3.</p>
        </div>
      </main>
    </div>
  ),
});
