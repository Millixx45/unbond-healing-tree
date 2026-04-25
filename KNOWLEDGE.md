# UNBOND – Breaking Chains · KNOWLEDGE.md

> **Permanenter Referenz-Vertrag.** Dieses Dokument ist die verbindliche Quelle der Wahrheit für **alle zukünftigen Edits**. Jede neue Komponente, jedes neue Modul, jede Inhaltsiteration muss sich an die hier festgehaltenen Regeln halten. Vor jedem Commit die **Kurz-Checkliste (§ 11)** durchlaufen.

---

## 1. Mission & Tonalität

- Traumasensibles Selbstheilungs-Programm in **11 Modulen**: Modul **0 „Auftakt"** + Module **1 – 10**.
- Sprache: **Deutsch**, **„Du"-Form**, ruhig, einladend, nie wertend, nie drängend, nie belehrend.
- Zielgruppe: Menschen in oder nach toxischen Bindungen. Trigger-Sensibilität ist nicht-verhandelbar.
- **Verbote:**
  - Kein Schuld-Framing („du hättest…", „warum hast du nicht…").
  - Keine Textwüsten – Inhalt wird **immer** in interaktive UX transformiert.
  - Keine Tabellen-Layouts auf dem Dashboard – das Dashboard ist eine lebende Landschaft.
  - Keine roten / „destructive" Töne in regulären UIs.

---

## 2. Design-System (verbindliche Tokens)

### Glassmorphism-Spec (nicht ändern)
- 60 % Opacity · 10 px Blur · 12 px Radius · 1 px Innenrand `rgba(255,255,255,0.4)`.
- **Utility-Klassen** (in `src/styles.css` definiert – **nutzen, nicht neu erfinden**):
  - `.glass` – Standard-Karte
  - `.glass-strong` – stärker (75 % Opacity, 14 px Blur) für Drawer / Modals

### Hintergrund (global, fixed)
- Weicher Verlauf **Mauve → Sage → Cream** mit dezenten radialen Lichtflecken.
- `background-attachment: fixed` – darf von Routen nicht überschrieben werden.

### Typografie
| Rolle | Font | Spec |
|---|---|---|
| Headlines (h1–h6) | **Montserrat 800** | uppercase, `letter-spacing: 0.04em`, `line-height: 1.2` |
| Body | **Lato 400** | 16 px, `line-height: 1.8` |

Utility-Klassen: `.font-display`, `.font-body`, `.tracking-brand`. Keine weiteren Fonts laden.

### Farb-Tokens (immer als CSS-Variable referenzieren – **nie Hex hardcoden**)

| Token | Hex | Semantik |
|---|---|---|
| `--bordeaux` | `#6B3E44` | Story / Emotion (Mary & Sandra) |
| `--sage` | `#7A9E8A` | Wissenschaft / Diagnose / Heilungs-**Blätter** |
| `--mauve` | `#9B7FA4` | Lösung / Transformation / **Blüten** |
| `--orange-soft` | `#D4A574` | SOS / wichtige Hinweise (einzige Warnfarbe) |
| `--terracotta` | `#C4836E` | Aktive Übungen / Primary CTA |
| `--cream` | `#F5EFE6` | Background-Basis |

**Tailwind-Mapping** (über `@theme inline` in `styles.css` registriert):
`bg-sage`, `text-mauve`, `border-bordeaux`, `bg-terracotta`, `text-orange-soft-foreground`, …

**Inline-Styles** dürfen nur die Form `style={{ color: "var(--mauve)" }}` haben. Niemals `"#9B7FA4"`.

---

## 3. Die 6-Element-Regel (Modul-Hülle)

Jede Modul-Route `/modul/$id` (id 0…10) **muss** exakt diese sechs Sektionen in dieser Reihenfolge enthalten – jede mit ihrer fixen Farb-Identität und ihrem Icon (`lucide-react`):

| # | Sektion | Farbe | Icon | Zweck / Format |
|---|---|---|---|---|
| 1 | **Story** | `--bordeaux` | `BookOpen` | Mary & Sandra, Scroll-Reveal, immersiv |
| 2 | **Diagnose** | `--sage` | `Stethoscope` | Sage-Box: psychologisch / neurobiologisch |
| 3 | **Lösung · Der Shift** | `--mauve` | `Sparkles` | Perspektivwechsel, was darf neu gedacht werden |
| 4 | **3 Mikro-Übungen** | `--terracotta` | `Activity` | **exakt 3** Übungs-Karten, niemals mehr/weniger |
| 5 | **Deep Dive · Forschung** | `--sage` | `Microscope` | Akkordeon mit Studien, Quellen |
| 6 | **Checkliste · 5 Ziele** | `--mauve` | `ListChecks` | **exakt 5** Ziele, 3-von-5-Regel triggert Blüte |

- Sticky **Anchor-Nav** links auf Desktop (≥ lg), nummeriert 1–6 in Modul-Farben.
- Sektionen werden über den `<Section>`-Helper in `src/routes/modul.$id.tsx` gerendert.
- **Nichts weglassen, nichts hinzufügen.** Reihenfolge & Farbzuordnung sind Markenkern.

---

## 4. Healing-Tree (Lebensbaum)

**Komponente:** `src/components/healing-tree/HealingTree.tsx` · ein einziges `<svg viewBox="0 0 600 720">`.

### Komposition
- Kreisrunde Lebensbaum-Symbolik – Krone (oberer Halbkreis) + spiegelbildliche Wurzeln (unterer Halbkreis) bilden gemeinsam einen Kreis = Ganzheit / Heilung.
- Mittelpunkt: `(300, 360)` · `CROWN_RADIUS = 250`.
- **11 Pfad-Äste** (M0 – M10), gleichmäßig verteilt von **−85°** bis **+85°** in 17°-Schritten – die initial **kahlen** Hauptäste = der Weg in die Freiheit, im Vordergrund.
- **Chaos-Geflecht** in Graphite-Tönen im Hintergrund = alte Bindungen (dichter, dünner, beblättert).
- Kraftvoller, kompakter zentraler Stamm + Wurzelsystem als Spiegel.

### Wachstums-Regeln (zwingend)
| Trigger | Erscheint | Token | CSS-Klasse |
|---|---|---|---|
| `unbond_m{id}_complete === "1"` | **Sage-Blatt** am Pfad-Ast | `--sage` | `.leaf-enter` |
| `goalsDone >= 3` (3-von-5-Regel) | **Mauve-Blüte** am Pfad-Ast | `--mauve` | `.bloom-enter` |

- Animationen liegen zentral in `styles.css`: `@keyframes leafGrow`, `sway`, `badgePop`, `bloomPulse`. **Nicht duplizieren.**
- Jede Ast-Spitze ist ein `<Link to="/modul/$id" params={{ id: String(i) }}>` – Klick führt ins Modul.
- Leere Slots bleiben sichtbar als kahler Ast – **niemals** mit Schuld-Indikatoren markieren.

---

## 5. Persistence-Schema (Single Source of Truth)

### LocalStorage-Keys (Namensschema **fest**, nie umbenennen)
| Key | Format | Bedeutung |
|---|---|---|
| `unbond_m{id}_complete` | `"1"` \| `"0"` | Modul abgeschlossen |
| `unbond_m{id}_goals` | JSON `boolean[5]` | Status der 5 Checklist-Ziele |

### Helper – `src/lib/storage.ts` (zentral, keine Parallel-Implementierung)
- Konstanten: `TOTAL_MODULES = 11` · `MODULE_IDS = [0..10]` · `MODULE_TITLES`
- Lesen (reaktiv): `useAllProgress()` · `useModuleProgress(id)`
- Schreiben: `writeModuleComplete(id, bool)` · `writeModuleGoals(id, bool[])`
- Reaktivität: Custom Event `"unbond:progress"` + nativer `storage`-Event – Komponenten re-rendern automatisch.

### Modul-Titel (verbindlich – nicht ändern, nicht übersetzen)
```
0  Auftakt
1  Erkennen
2  Benennen
3  Verstehen
4  Spüren
5  Atmen
6  Grenzen
7  Loslassen
8  Heilen
9  Verbinden
10 Frei sein
```

### Cloud-Sync (Schritt 3, noch nicht aktiv)
- **Lovable Cloud** (Supabase EU, Frankfurt) – Tabelle `progress (user_id, module_id, completed, goals jsonb, updated_at)`.
- RLS „user kann nur eigene Zeilen sehen".
- **Rollen NIE auf der profile/users-Tabelle** speichern → separate `user_roles` + `has_role()` Security-Definer-Function.
- Sync-Strategie: Optimistic UI gegen LocalStorage, Hintergrund-Sync, Konfliktlösung „latest wins by `updated_at`".

---

## 6. Sitemap & Routing

TanStack Start v1, file-based Routing in `src/routes/` (flach, dot-separated):

| Route | Datei | Zweck |
|---|---|---|
| `/` | `index.tsx` | Landing: Hero, Pitch, Trigger-Warnung, CTA |
| `/dashboard` | `dashboard.tsx` | Healing-Tree + Seiten-Panel + Modul-Reihe |
| `/modul/$id` | `modul.$id.tsx` | Modul-Hülle (id 0…10) – 6-Element-Regel |
| `/sos` | `sos.tsx` | Notfall-Toolbox (auch via Drawer erreichbar) |
| `/profile` | `profile.tsx` | Profil, Sprache, Daten-Export, Konto löschen |
| `/about` | `about.tsx` | Über das Programm + Trigger-Warnung |
| `/impressum` | `impressum.tsx` | Impressum |
| `/datenschutz` | `datenschutz.tsx` | DSGVO |

**Regeln:**
- Geschützte Routen (Schritt 3): `/dashboard`, `/modul/$id`, `/profile` – Redirect auf `/auth` ohne Session.
- Jede Route definiert eigenes `head()` mit `title`, `description`, `og:title`, `og:description`.
- `routeTree.gen.ts` ist auto-generiert – **niemals manuell editieren**.
- Keine Hash-Anchor-Navigation zwischen Hauptseiten (nur Sektions-Sprünge **innerhalb** einer Modul-Route).

---

## 7. Globale UI-Komponenten

| Komponente | Datei | Zweck |
|---|---|---|
| `<Header />` | `src/components/site/Header.tsx` | Top-Nav, Logo „UNBOND", Profil-Link |
| `<HealingTree />` | `src/components/healing-tree/HealingTree.tsx` | Lebensbaum-SVG (siehe § 4) |
| `<SosButton />` | `src/components/sos/SosButton.tsx` | Persistenter floating Button + Drawer |

### SOS-Button – Pflicht-Verhalten
- **Persistent fixed** unten-rechts auf `/dashboard` und allen `/modul/$id`-Seiten.
- Öffnet einen **Drawer** (kein Routenwechsel im Notfall).
- Inhalt: 3 Tools – „4-7-8 Atmung", „5-4-3-2-1 Grounding", „Hand aufs Herz".
- Krisen-Footer: **Telefonseelsorge `0800 111 0 111` (DE), kostenlos & anonym**.

---

## 8. UX-Gebote & -Verbote

### Gebote
- Jeder neue Inhalt wird als **interaktive UX** transformiert: Reveal, Akkordeon, Mikro-Übung, Slider, Karten-Stapel, Drag-Reorder, Reflexions-Input. Nie reine Textspalte.
- Modul-Abschluss + 3/5 Ziele → **automatisches Wachstum** am Healing-Tree (ohne Bestätigungs-Dialog).
- Hover/Tap auf Blatt oder Blüte → Tooltip mit Modul-Titel + „Geöffnet am …".
- Mobile-First. Test-Viewport ≥ 360 px breit.

### Verbote
- Keine externen Fonts außer Montserrat & Lato.
- Keine harten Schatten, keine 90°-Ecken (immer ≥ 12 px Radius).
- Keine Inline-Hex-Werte – immer `var(--token)`.
- Kein `text-red-*`, `bg-destructive`, etc. in regulären Flows – `--orange-soft` ist die einzige Warnfarbe.
- Keine konkurrierende Storage-Schicht neben `src/lib/storage.ts`.

---

## 9. Tech-Stack-Constraints

- **React 19** + **TanStack Start v1** + **Vite 7** + **Tailwind v4** (`@theme inline` in `src/styles.css`, **kein** `tailwind.config.js`).
- Server-Functions / SSR laufen im **Cloudflare Worker** mit `nodejs_compat` → keine Node-only Pakete (`sharp`, `puppeteer`, `child_process`, native Add-ons).
- **Lovable Cloud** (Supabase EU) für DB, Auth, Storage – Aktivierung in Schritt 3.
- **Lovable AI Gateway** als Default für alle LLM-Calls (Schritt 3).
- **shadcn/ui** Komponenten in `src/components/ui/` – **nutzen**, nicht neu schreiben oder duplizieren.
- Icons ausschließlich aus `lucide-react`.

---

## 10. Workflow-Vertrag

| Schritt | Status | Lieferung |
|---|---|---|
| **1 – Plan** | ✓ erledigt | Sitemap, Design-System, Healing-Tree, Modul-Hülle, Demo-Steuerung |
| **2 – Feedback** | laufend | Design-Iteration auf Nutzerin-Feedback |
| **3 – Build** | bevorstehend | Kapitel-Inhalte einzeln – Nutzerin liefert Text, Lovable transformiert in interaktive UX |

**Regel für Schritt 3:** **Pro Iteration max. 1 Modul.** Nutzerin liefert Rohtext, Lovable baut die 6 Elemente als UX – nie umgekehrt.

---

## 11. Kurz-Checkliste vor jedem Commit

Die KI prüft selbst, bevor sie liefert:

- [ ] Alle Farben über `var(--token)` referenziert – kein Hex inline?
- [ ] Glassmorphism via `.glass` / `.glass-strong` – nicht neu erfunden?
- [ ] Modul-Seite enthält **alle 6 Elemente** in **fixer Reihenfolge & Farbe** (§ 3)?
- [ ] LocalStorage-Keys folgen exakt `unbond_m{id}_complete` / `unbond_m{id}_goals`?
- [ ] Healing-Tree-Logik unverändert: Sage = `complete`, Mauve = `bloomed` (3/5)?
- [ ] `<SosButton />` auf `/dashboard` und `/modul/$id` gemountet?
- [ ] Neue Route hat eigenes `head()` mit Titel + Description + og-Tags?
- [ ] Headlines uppercase Montserrat 800, Body Lato 1.8 line-height?
- [ ] Keine destruktiven Farben, keine Schuld-Sprache, keine Textwüste?
- [ ] `routeTree.gen.ts` **nicht** manuell editiert?

---
12 Zukünftige Spezial-Komponenten (Backlog)
Modul 7 („Loslassen“): Nutzung des SVGFollower-Patterns (Scribble-Animation).

Zweck: Visualisierung von Ballast und emotionalem „Herausschreiben“.

Vibe: Hier ist Unruhe und Chaos-Linienführung explizit erwünscht (therapeutischer Effekt).

Technik: SVGFollower-Code liegt im Projekt-Archiv/Chat-Historie bereit.
*Letzte Aktualisierung: T = 0 (Schritt 1 abgeschlossen, vor Schritt-2-Feedback).*

14. Hintergrund-System & Story-Stage (Code-Vorgaben)
Um den „Calm Luxury“-Vibe und die emotionale Trennung der Inhalte zu gewährleisten, nutzt die App zwei spezifische Hintergrund-Systeme.

A. Globaler Ebook-Hintergrund (Mesh-Gradient)
Einsatz: Standard für alle Modul-Seiten, Dashboard und Diagnose-Elemente.
Vibe: Extrem langsam, beruhigend, „hochwertiges Papier“.

TypeScript
// Implementierung via @paper-design/shaders-react (oder CSS-Fallback)
// Farben: Cream (#F5EFE6) und White (#FFFFFF)
// Konfiguration:
<MeshGradient 
  colors={["#F5EFE6", "#FFFFFF", "#FDFBF7", "#F5EFE6"]}
  speed={0.05}      // Fast statisch
  distortion={0.3}  // Sehr weiche Übergänge
  swirl={0.2} 
  opacity={0.6}     // Dezent im Hintergrund
/>
B. Story-Stage: Mary & Sandra (WebGL Smoke)
Einsatz: Exklusiv als Hintergrund für Element 1 (STORY).
Vibe: Emotional, tiefgründig, „der Nebel der Vergangenheit“.
Farbe: Bordeaux (#6B3E44)

Manus Anweisung: Erstelle die Komponente SmokeBackground.tsx mit folgendem WebGL-Shader-Kern:

OpenGL Shading Language
// Fragment Shader Ausschnitt für Manus:
precision highp float;
uniform float time;
uniform vec3 u_color; // Hier #6B3E44 einsteuern

// Nutze FBM (Fractional Brownian Motion) für organischen Rauch
// Der Rauch soll sanft wogen (time * 0.015)
// Mischung: col = mix(col, u_color, 0.4); 
// Text-Kontrast: Text über diesem Background IMMER in Cream (#F5EFE6)
C. Logik der Hintergrund-Steuerung (The Switch)
Default-Zustand: Der MeshGradient ist aktiv.

Story-Trigger: Sobald eine Sektion vom Typ STORY gerendert wird, blendet der MeshGradient auf opacity: 0 und der SmokeBackground (Bordeaux) blendet sanft ein (transition: opacity 1.5s ease).

Text-Overlay: Story-Texte liegen in einem Container mit z-index: 10 und nutzen framer-motion für ein verzögertes Einblenden der Sätze (Scroll-Reveal).
