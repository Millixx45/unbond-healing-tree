# Plan: KNOWLEDGE.md – Permanenter Referenz-Vertrag für UNBOND

Ich lege eine einzige Datei `KNOWLEDGE.md` im Projekt-Root an. Sie ist die verbindliche Quelle der Wahrheit für **alle zukünftigen Edits** – jede neue Komponente, jedes neue Modul muss sich an dieses Dokument halten.

## Datei: `KNOWLEDGE.md` (Root)

### Inhalt (Gliederung)

**1. Mission & Tonalität**
- Traumasensibles 10-Modul-Programm + Modul 0 „Auftakt".
- Sprache: Deutsch, „Du"-Form, ruhig, nie wertend, nie drängend.
- Verbote: kein Schuld-Framing, keine Textwüsten, keine Tabellen-Layouts auf dem Dashboard.

**2. Design-System (verbindliche Tokens)**
- Glassmorphism-Spec: 60 % Opacity, 10 px Blur, 12 px Radius, 1 px Innenrand `rgba(255,255,255,0.4)`.
- Utility-Klassen: `.glass`, `.glass-strong` (in `src/styles.css` definiert – nicht neu erfinden).
- Fixed Background: Mauve → Sage → Cream Verlauf, `background-attachment: fixed`.
- Typografie: **Montserrat 800** uppercase + `letter-spacing: 0.04em` für Headlines, **Lato 400** 16 px / Line-Height 1.8 für Body. Utility: `.font-display`, `.font-body`, `.tracking-brand`.
- Farb-Tokens (immer als CSS-Variablen via `var(--token)` referenzieren, nie Hex hardcoden):
  | Token | Hex | Bedeutung |
  |---|---|---|
  | `--bordeaux` | #6B3E44 | Story / Emotion |
  | `--sage` | #7A9E8A | Diagnose / Wissenschaft / Blätter |
  | `--mauve` | #9B7FA4 | Lösung / Transformation / Blüten |
  | `--orange-soft` | #D4A574 | SOS / Warnungen |
  | `--terracotta` | #C4836E | Aktive Übungen / CTAs |
  | `--cream` | #F5EFE6 | Background-Basis |
- Tailwind-Mapping: `bg-sage`, `text-mauve`, `border-bordeaux` etc. (über `@theme inline` registriert).

**3. Die 6-Element-Regel (Modul-Hülle)**
Jedes Modul (`/modul/$id`) **muss** exakt diese sechs Sektionen in dieser Reihenfolge enthalten – jede mit ihrer fixen Farb-Identität und Icon (lucide-react):

| # | Sektion | Farbe | Icon | Zweck |
|---|---|---|---|---|
| 1 | Story | `--bordeaux` | `BookOpen` | Mary & Sandra, Scroll-Reveal, immersiv |
| 2 | Diagnose | `--sage` | `Stethoscope` | Sage-Box, was passiert psychologisch/neurobiologisch |
| 3 | Lösung · Der Shift | `--mauve` | `Sparkles` | Perspektivwechsel |
| 4 | 3 Mikro-Übungen | `--terracotta` | `Activity` | exakt 3 Übungs-Karten |
| 5 | Deep Dive · Forschung | `--sage` | `Microscope` | Akkordeon, Studien, Quellen |
| 6 | Checkliste · 5 Ziele | `--mauve` | `ListChecks` | exakt 5 Ziele, 3-von-5-Regel triggert Blüte |

Sticky Anchor-Nav links (Desktop), Sektionen gerendert via `<Section>`-Helper in `modul.$id.tsx`. **Keine Sektion weglassen, keine zusätzlichen einfügen.**

**4. Healing-Tree (Lebensbaum)**
- Komponente: `src/components/healing-tree/HealingTree.tsx`, einziges SVG `viewBox 0 0 600 720`.
- Komposition: kreisrunde Lebensbaum-Symbolik – Krone (Halbkreis Radius 250 um (300, 360)) + spiegelbildliche Wurzeln.
- 11 Pfad-Äste (M0..M10), gleichmäßig auf -85° bis +85° verteilt, sichtbar **kahl** = der Weg in die Freiheit.
- Hintergrund: Chaos-Geflecht in Graphite-Tönen = alte Bindungen.
- Wachstums-Regeln (zwingend):
  - **Sage-Blatt** (`--sage`) erscheint am Ast wenn `unbond_m{id}_complete = "1"` → CSS-Klasse `.leaf-enter`.
  - **Mauve-Blüte** (`--mauve`) erscheint am Ast wenn `goalsDone >= 3` (3-von-5-Regel) → CSS-Klasse `.bloom-enter`.
- Animationen sind in `styles.css` definiert: `leafGrow`, `sway`, `badgePop`, `bloomPulse`. **Nicht duplizieren.**
- Jeder Ast-Tip ist ein `<Link to="/modul/$id">` zum jeweiligen Modul.

**5. Persistence-Schema (Single Source of Truth)**
- LocalStorage-Keys – Namensschema **fest**, nicht ändern:
  - `unbond_m{id}_complete` → `"1"` | `"0"`
  - `unbond_m{id}_goals` → JSON `boolean[5]`
- Helper in `src/lib/storage.ts`:
  - `TOTAL_MODULES = 11`, `MODULE_IDS = [0..10]`, `MODULE_TITLES` (Map id → Titel).
  - Lesen: `useAllProgress()`, `useModuleProgress(id)`.
  - Schreiben: `writeModuleComplete(id, bool)`, `writeModuleGoals(id, bool[])`.
  - Reaktivität: Custom Event `"unbond:progress"` + `storage` Event.
- Modul-Titel (verbindlich):
  `0 Auftakt · 1 Erkennen · 2 Benennen · 3 Verstehen · 4 Spüren · 5 Atmen · 6 Grenzen · 7 Loslassen · 8 Heilen · 9 Verbinden · 10 Frei sein`.
- Cloud-Sync (Schritt 3, noch nicht aktiv): Supabase EU, Tabelle `progress`, RLS via `user_roles` (Rollen NIE auf profile/users-Tabelle).

**6. Sitemap & Routing**
- TanStack Start, file-based in `src/routes/` (flach, dot-separated):
  `/`, `/dashboard`, `/sos`, `/profile`, `/about`, `/impressum`, `/datenschutz`, `/modul/$id` (id 0..10).
- Geschützte Routen (Schritt 3): `/dashboard`, `/modul/$id`, `/profile`.
- Jede Route hat eigenes `head()` mit Titel + Description + og:title/description.
- Keine Hash-Anchor-Navigation zwischen Hauptseiten.

**7. Globale UI-Komponenten**
- `<Header />` (`src/components/site/Header.tsx`) – auf jeder Seite außer Landing optional.
- `<SosButton />` (`src/components/sos/SosButton.tsx`) – persistent fixed unten-rechts auf `/dashboard` und `/modul/$id`. Öffnet Drawer, kein Routenwechsel im Notfall. Notfall-Telefon: `0800 111 0 111`.

**8. UX-Gebote & -Verbote**
- Gebot: Jeder neue Inhalt wird als interaktive UX transformiert (Reveal, Akkordeon, Mikro-Übung, Slider) – nie als reine Textspalte.
- Gebot: Bei Modul-Abschluss + 3/5 Zielen → automatisches Wachstum am Baum.
- Verbot: keine roten/destructive Töne in regulären UIs – `--orange-soft` ist die einzige Warnfarbe.
- Verbot: keine harten Schatten / keine 90°-Ecken (immer 12 px Radius).
- Verbot: keine externen Fonts außer Montserrat & Lato.
- Verbot: keine Inline-Hex-Werte – immer Tokens.

**9. Tech-Stack-Constraints**
- React 19 + TanStack Start v1 + Vite 7 + Tailwind v4 (`@theme inline` in `styles.css`, **kein** `tailwind.config.js`).
- Server-Functions laufen im Worker → keine Node-only Pakete (sharp, puppeteer, child_process).
- Lovable Cloud (Supabase EU) für DB; Lovable AI Gateway für LLM-Calls (Schritt 3).
- shadcn/ui-Komponenten in `src/components/ui/` – nutzen, nicht neu schreiben.

**10. Workflow-Vertrag**
- Schritt 1 (✓ erledigt): Sitemap, Design-System, Healing-Tree, Modul-Hülle, Demo-Steuerung.
- Schritt 2: Design-Feedback der Nutzerin.
- Schritt 3: Kapitel-Inhalte einzeln – Nutzerin liefert Text, Lovable transformiert in interaktive UX. **Pro Iteration max. 1 Modul.**

**11. Kurz-Checkliste vor jedem Commit** (für die KI selbst)
- [ ] Alle Farben über `var(--token)` referenziert?
- [ ] Glassmorphism via `.glass` / `.glass-strong` (nicht neu erfunden)?
- [ ] Module mit allen 6 Elementen in fixer Reihenfolge & Farbe?
- [ ] Storage-Keys folgen `unbond_m{id}_…`?
- [ ] Healing-Tree-Logik unverändert (Sage = complete, Mauve = bloomed)?
- [ ] SOS-Button auf Modul- & Dashboard-Seiten gemountet?
- [ ] Neue Route hat eigenes `head()`?

---

Nach deiner Freigabe schreibe ich diese Datei genau einmal als `KNOWLEDGE.md` ins Projekt-Root – keine weiteren Code-Änderungen in diesem Schritt.
