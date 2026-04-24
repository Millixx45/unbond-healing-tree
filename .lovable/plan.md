# UNBOND – Breaking Chains · Schritt 1: Sitemap & Dashboard-Konzept

Dieser Plan deckt **ausschließlich Schritt 1** ab: Grundgerüst der App, Design-System, Sitemap, Dashboard mit Healing-Tree und das leere Routen-Skelett für die 10 Module. Inhalte der Kapitel folgen in Schritt 3 nach deinem Feedback.

---

## 1. Design-System (global, einmalig verankert)

**Glassmorphism-Karten:** `background: rgba(255,255,255,0.6)`, `backdrop-filter: blur(10px)`, `border-radius: 12px`, weicher Schatten, 1px Innenrand `rgba(255,255,255,0.4)`.

**Fixed Background:** Sanfter Verlauf Mauve → Sage → Cream, fixiert hinter allen Routen, dezente Lichtflecken (radial gradients), leichte Körnung.

**Typografie:**
- Montserrat 800, `letter-spacing: 4px`, uppercase für Headlines
- Lato 400, 16px, `line-height: 1.8` für Body
- Beide Fonts via `<link>` in `__root.tsx`

**Farb-Tokens** (in `styles.css` als CSS-Variablen + Tailwind-Theme-Mapping):

| Token | Hex | Verwendung |
|---|---|---|
| `--bordeaux` | #6B3E44 | Story / Emotion (Mary & Sandra) |
| `--sage` | #7A9E8A | Wissenschaft / Diagnose / Blätter |
| `--mauve` | #9B7FA4 | Heilung / Transformation / Blüten |
| `--orange-soft` | #D4A574 | SOS / wichtige Hinweise |
| `--terracotta` | #C4836E | Aktive Übungen / Buttons |
| `--cream` | #F5EFE6 | Background-Basis |

Jede Farbe hat eine semantische Bedeutung – Komponenten erhalten Farb-Props per Variant statt freier Wahl.

---

## 2. Sitemap

```text
/                       Landing (Hero, Pitch, CTA „Starte deinen Weg")
/auth                   Login / Sign-up (Supabase, EU)
/dashboard              Healing-Tree + Modul-Übersicht (geschützt)
/sos                    Schnellzugriff: Notfall-Toolbox (Atmung, Grounding)
/profile                Profil, Sprache, Daten-Export, Konto löschen
/about                  Über das Programm, Trauma-Trigger-Warnung
/impressum              Impressum
/datenschutz            Datenschutz / DSGVO

/modul/$id              Modul-Hülle mit der 6-Elemente-Struktur:
                        1 Story · 2 Diagnose · 3 Lösung · 4 Übungen
                        5 Deep Dive · 6 Checkliste
                        ($id = 1…10, je eine Route-Datei modul.$id.tsx)
```

**Geschützte Routen:** `/dashboard`, `/modul/$id`, `/profile` – Redirect auf `/auth` ohne Session.

**SOS-Button:** persistent fixed unten-rechts auf jeder Modul- und Dashboard-Seite, öffnet `/sos` als Drawer (kein Routenwechsel im Notfall).

---

## 3. Dashboard – „Healing Tree" Konzept

Das Dashboard ist die emotionale Heimat der App. Kein Tabellen-Layout, sondern eine **lebende Landschaft**.

### Layout

```text
┌─────────────────────────────────────────────────────────┐
│  Header: Logo UNBOND · Username · Profil · SOS          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│            ╱╲                  Begrüßung &              │
│           ╱  ╲                 Tagesimpuls (Mauve-Card) │
│          ╱ 🌿 ╲                                         │
│         ╱ 🌸🌿 ╲                Fortschritt: 3/10        │
│        ╱  🌿🌿  ╲              ▓▓▓░░░░░░░ Sage-Bar     │
│       ╱  🌸 🌿   ╲                                      │
│      │  ░ STAMM ░ │            „Heute geschafft"-Box   │
│       \  WURZELN /             (letzte Mikro-Übung)    │
│        \ ░░░░░░ /                                       │
│                                                         │
│         HEALING TREE              SEITEN-PANEL          │
├─────────────────────────────────────────────────────────┤
│  Modul-Reihe (horizontal scrollbar, 10 Glass-Cards):    │
│  [M1 ✓] [M2 ✓] [M3 ●] [M4 ○] [M5 ○] … [M10 ○]          │
└─────────────────────────────────────────────────────────┘
```

### Healing-Tree (SVG, Kernkomponente `<HealingTree />`)

- **Stamm & Äste:** statische SVG-Pfade in warmem Bordeaux-Braun, leicht organisch.
- **10 Ast-Slots:** je ein Slot pro Modul, fest positioniert (M1 unten links → M10 oben rechts, aufsteigender Heilungspfad).
- **Blätter (Sage-Green):** erscheinen am jeweiligen Ast-Slot bei `unbond_m[X]_complete = true`. Animation: `scale 0 → 1`, leichtes Wiegen (CSS `@keyframes sway`).
- **Blüten (Mauve):** erscheinen zusätzlich, wenn die 3-von-5-Regel der Modul-Checkliste erfüllt ist (`unbond_m[X]_goals_done >= 3`). Animation: `badgePop` + sanftes Pulsieren.
- **Hover/Tap auf Blatt/Blüte:** Tooltip mit Modul-Titel + „Geöffnet am …", Klick führt zu `/modul/$id`.
- **Leere Slots:** dezente, gestrichelte Kreis-Outlines – sichtbar, aber nicht drängend (kein Schuld-Gefühl).
- **Hintergrund-Boden:** sanfte Wurzeln in Mauve, die mit jedem Fortschritt minimal kräftiger werden (Opacity-Stufen).

### Seiten-Panel (rechts neben dem Baum, auf Mobile darunter)

1. **Begrüßung** – Name + traumasensibler Tagesimpuls (rotierend aus Pool).
2. **Fortschrittsbalken** – Sage-Green, „X von 10 Modulen".
3. **Aktuelles Modul** – große CTA-Card in Terracotta: „Weiter mit Modul 3".
4. **Letzte Mikro-Übung** – kleine Glass-Card, Reflexionssatz.
5. **SOS-Shortcut** – Helles-Orange-Card, 1 Tap zur Notfall-Toolbox.

### Modul-Reihe (unten)

10 horizontal scrollbare Glass-Cards, jede zeigt:
- Modulnummer + Titel
- Status-Icon (○ offen · ● aktiv · ✓ Blatt · ✿ Blüte)
- Mini-Fortschritt (Goals 0-5/5)
- Klick → `/modul/$id`

---

## 4. Modul-Hülle (Skelett, ohne Inhalt)

`modul.$id.tsx` rendert die **6-Elemente-Struktur** als feste Sektions-Abfolge mit Anker-Navigation links (Sticky):

```text
1 ▸ STORY        (Bordeaux, Scroll-Reveal)
2 ▸ DIAGNOSE     (Sage-Green Box)
3 ▸ LÖSUNG       (Mauve, „Shift")
4 ▸ ÜBUNGEN      (3 Terracotta Micro-Tools)
5 ▸ DEEP DIVE    (Sage, Forschungs-Akkordeon)
6 ▸ CHECKLISTE   (5 Ziele, badgePop bei 3/5)
```

In Schritt 1 sind die Sektionen **leere Platzhalter mit korrekter Optik** – Inhalte folgen kapitelweise in Schritt 3.

---

## 5. Persistence-Konzept (vorbereitet, noch nicht aktiv)

- **LocalStorage-Schlüssel:** `unbond_m[X]_complete`, `unbond_m[X]_goals` (Array von 5 Booleans), `unbond_m[X]_notes`, `unbond_last_module`.
- **Cloud-Sync:** Supabase EU (Frankfurt). Tabelle `progress` (user_id, module_id, completed, goals jsonb, updated_at) mit RLS „user kann nur eigene Zeilen sehen". Rollen in separater `user_roles`-Tabelle.
- **Sync-Strategie:** Optimistic UI gegen LocalStorage, Hintergrund-Sync zu Supabase, Konfliktlösung „latest wins by updated_at".

In Schritt 1 wird **nur die Tree-Logik gegen LocalStorage** verdrahtet (mit Demo-Toggle „Modul abschließen"), damit du Blätter/Blüten live testen kannst. Supabase-Anbindung kommt in Schritt 3.

---

## 6. Was in Schritt 1 konkret gebaut wird

1. Globales Design-System (Fonts, Farb-Tokens, Glass-Utility-Klassen, fixed Background) in `styles.css` + `__root.tsx`.
2. Routen-Skelett: `/`, `/dashboard`, `/sos`, `/profile`, `/about`, `/impressum`, `/datenschutz`, `/modul/$id` (Auth-Routen folgen in Schritt 3 zusammen mit Supabase).
3. Landing-Page (`/`) – Hero mit Programm-Pitch, Trigger-Warnung, CTA „Zum Dashboard".
4. **Dashboard** mit voll funktionalem **HealingTree-SVG**, Seiten-Panel und Modul-Reihe.
5. Demo-Controls: pro Modul „Als abgeschlossen markieren" + „Goals 0-5" Slider, damit du Blätter & Blüten live siehst.
6. Modul-Hülle `modul.$id.tsx` mit der 6-Elemente-Struktur als optisch fertige, inhaltlich leere Platzhalter.
7. SOS-Drawer als globale Komponente (Inhalt = Platzhalter „Atmung / Grounding kommt in Schritt 3").
8. Statische Seiten `/about`, `/impressum`, `/datenschutz` als Platzhalter-Templates.

**Nicht in Schritt 1:** Supabase-Auth, echte Modul-Inhalte, fertige Übungen, Audio, i18n.

---

## 7. Technischer Anhang (für Entwickler)

- TanStack Start file-based Routing in `src/routes/` (flach, dot-separiert: `modul.$id.tsx`).
- `<HealingTree />` als eigene Komponente in `src/components/healing-tree/`, parametrisiert über `modules: { id, completed, goalsDone }[]`.
- Tree-Geometrie: ein einziges SVG mit fix kodierten Slot-Koordinaten (Array `LEAF_SLOTS[10]` mit `{x,y,rotate}`).
- Animationen via Tailwind + `tw-animate-css` (vorhanden) plus Custom-Keyframes `sway`, `badgePop`.
- State im Dashboard zunächst über `useLocalStorage`-Hook; später ersetzt durch TanStack Query gegen Supabase.
- Pro Route eigenes `head()` mit Titel + Description (SEO-tauglich).

---

**Nach deinem OK auf Design & Tree gehen wir in Schritt 2 (Feedback-Runde) und danach in Schritt 3 (Kapitel-Inhalte einzeln, du lieferst Text, ich baue UX).**
