import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";

export const Route = createFileRoute("/datenschutz")({
  head: () => ({
    meta: [
      { title: "Datenschutz · UNBOND" },
      { name: "description", content: "DSGVO-Hinweise – Daten in der EU (Frankfurt)." },
    ],
  }),
  component: () => (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <h1 className="text-3xl" style={{ color: "var(--bordeaux)" }}>Datenschutz</h1>
        <div className="glass mt-6 space-y-3 p-6 text-sm text-muted-foreground">
          <p>
            Deine Daten werden DSGVO-konform in der Europäischen Union (Frankfurt) verarbeitet.
            Du kannst sie jederzeit exportieren oder löschen.
          </p>
          <p className="italic">Vollständiger Text folgt in Schritt 3.</p>
        </div>
      </main>
    </div>
  ),
});
