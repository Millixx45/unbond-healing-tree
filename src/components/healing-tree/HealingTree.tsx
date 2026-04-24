import { Link } from "@tanstack/react-router";
import type { ModuleProgress } from "@/lib/storage";
import { MODULE_TITLES } from "@/lib/storage";

type Props = {
  modules: ModuleProgress[];
  className?: string;
};

/**
 * UNBOND – Healing Tree
 *
 * Bildsprache: edles Fineline-Botanik-Tattoo, inspiriert von einer runden,
 * fraktalen Baum-Silhouette (Referenz: Aquarell-„Tree of Life").
 *
 *  • Organische, fraktale Verzweigung aus einem eleganten Stamm.
 *  • Runde, dichte Krone aus feinen Chaos-Ästen + sanftem Laub im Hintergrund.
 *  • 11 deutlich sichtbare, KAHLE Pfad-Äste (M0..M10) – der Weg der Nutzerin.
 *    Sie liegen vor dem Chaos, sind dicker und bleiben unbelaubt, bis ein
 *    Modul abgeschlossen ist.
 *  • Sage-Blatt erscheint bei abgeschlossenem Modul, Mauve-Blüte bei ≥3/5 Zielen.
 */

const VIEW_W = 600;
const VIEW_H = 720;

// Graphite-Palette als oklch-Äquivalente von #4A4E52
const GRAPHITE = "oklch(0.36 0.005 240)";
const GRAPHITE_SOFT = "oklch(0.36 0.005 240 / 0.55)";
const GRAPHITE_FAINT = "oklch(0.36 0.005 240 / 0.3)";
const GRAPHITE_GHOST = "oklch(0.36 0.005 240 / 0.18)";

// Spitze des Pfad-Asts, an der Blatt/Blüte ansetzt — von unten nach oben
type Slot = { id: number; tip: { x: number; y: number }; rotate: number };

// Krone reicht von ca. y=80 (Krone oben) bis y=520 (Krone unten),
// Stammgabelung bei ca. y=470. Pfad-Äste fächern sich kreisförmig auf.
const SLOTS: Slot[] = [
  { id: 0,  tip: { x: 300, y: 500 }, rotate:   0 }, // Auftakt – kurz, mittig unten in der Krone
  { id: 1,  tip: { x: 196, y: 470 }, rotate: -55 }, // links unten
  { id: 2,  tip: { x: 404, y: 470 }, rotate:  55 }, // rechts unten
  { id: 3,  tip: { x: 138, y: 380 }, rotate: -75 }, // links außen
  { id: 4,  tip: { x: 462, y: 380 }, rotate:  75 }, // rechts außen
  { id: 5,  tip: { x: 130, y: 280 }, rotate: -82 }, // links Mitte
  { id: 6,  tip: { x: 470, y: 280 }, rotate:  82 }, // rechts Mitte
  { id: 7,  tip: { x: 178, y: 168 }, rotate: -42 }, // links oben
  { id: 8,  tip: { x: 422, y: 168 }, rotate:  42 }, // rechts oben
  { id: 9,  tip: { x: 246, y:  96 }, rotate: -18 }, // Krone links
  { id: 10, tip: { x: 354, y:  88 }, rotate:  18 }, // Krone rechts (höchster Punkt)
];

// Bezier-Kurven der 11 dicken Pfad-Äste – fraktal verzweigt aus dem Stamm
// Stammgabelung bei ca. (300, 470). Jede Kurve nutzt geschwungene Bezier-Linien.
const PATH_BRANCHES: string[] = [
  // M0 – kurzer Auftakt-Ast nach oben aus der Stammgabelung
  "M 300 478 C 300 488, 300 494, 300 500",
  // M1 – schwingt nach links unten
  "M 286 472 C 260 470, 230 470, 196 470",
  // M2 – schwingt nach rechts unten
  "M 314 472 C 340 470, 370 470, 404 470",
  // M3 – steigt links außen, sanfter Bogen
  "M 282 460 C 230 446, 180 420, 138 380",
  // M4 – steigt rechts außen
  "M 318 460 C 370 446, 420 420, 462 380",
  // M5 – nach links zur Mitte der Krone
  "M 280 440 C 220 400, 170 350, 130 280",
  // M6 – Spiegelung nach rechts
  "M 320 440 C 380 400, 430 350, 470 280",
  // M7 – steigt diagonal nach links oben
  "M 290 420 C 260 350, 220 250, 178 168",
  // M8 – steigt diagonal nach rechts oben
  "M 310 420 C 340 350, 380 250, 422 168",
  // M9 – streckt sich zur linken Krone
  "M 296 400 C 280 320, 270 220, 246 96",
  // M10 – streckt sich zur rechten Krone (Spitze)
  "M 304 400 C 320 320, 340 200, 354 88",
];

// Dünne Chaos-Äste – fraktales Geflecht im Hintergrund (alte Bindungen)
const CHAOS_BRANCHES: string[] = [
  // primäre Chaos-Äste, die aus dem Stamm wachsen (etwas anders als Pfad-Äste)
  "M 300 470 C 250 460, 210 440, 170 410",
  "M 300 470 C 350 460, 390 440, 430 410",
  "M 300 460 C 240 420, 200 360, 170 290",
  "M 300 460 C 360 420, 400 360, 430 290",
  "M 300 450 C 270 380, 250 280, 230 180",
  "M 300 450 C 330 380, 350 280, 370 180",
  "M 300 440 C 290 350, 290 240, 290 130",
  "M 300 440 C 310 350, 310 240, 310 130",
  // sekundäre Verzweigungen (fraktal)
  "M 220 400 C 200 380, 184 354, 172 326",
  "M 380 400 C 400 380, 416 354, 428 326",
  "M 200 350 C 178 332, 162 308, 152 282",
  "M 400 350 C 422 332, 438 308, 448 282",
  "M 240 280 C 222 252, 210 220, 204 188",
  "M 360 280 C 378 252, 390 220, 396 188",
  "M 270 200 C 258 168, 250 134, 248 104",
  "M 330 200 C 342 168, 350 134, 352 104",
  // tertiäre, ganz feine Verzweigungen (Fraktal-Tiefe)
  "M 172 326 C 158 318, 144 312, 128 308",
  "M 428 326 C 442 318, 456 312, 472 308",
  "M 152 282 C 138 274, 124 268, 110 264",
  "M 448 282 C 462 274, 476 268, 490 264",
  "M 204 188 C 192 174, 184 156, 178 138",
  "M 396 188 C 408 174, 416 156, 422 138",
  "M 248 104 C 240 88, 234 72, 232 58",
  "M 352 104 C 360 88, 366 72, 368 58",
  // Querverzweigungen für runde Silhouette
  "M 230 180 C 210 196, 196 216, 188 240",
  "M 370 180 C 390 196, 404 216, 412 240",
  "M 290 130 C 274 142, 264 158, 258 178",
  "M 310 130 C 326 142, 336 158, 342 178",
];

// Sanfte Laub-Cluster (ellipsen) im Chaos – ruhige Hintergrund-Belaubung
type LeafDot = { x: number; y: number; r: number };
const CHAOS_LEAVES: LeafDot[] = [
  // äußere Krone – runde Silhouette
  { x: 128, y: 308, r: 4 }, { x: 116, y: 298, r: 3 }, { x: 140, y: 320, r: 3 },
  { x: 472, y: 308, r: 4 }, { x: 484, y: 298, r: 3 }, { x: 460, y: 320, r: 3 },
  { x: 110, y: 264, r: 3.5 }, { x: 100, y: 254, r: 2.5 },
  { x: 490, y: 264, r: 3.5 }, { x: 500, y: 254, r: 2.5 },
  // mittlere linke/rechte Seite
  { x: 152, y: 282, r: 3 }, { x: 140, y: 270, r: 2.5 },
  { x: 448, y: 282, r: 3 }, { x: 460, y: 270, r: 2.5 },
  { x: 172, y: 326, r: 3 }, { x: 428, y: 326, r: 3 },
  // oben
  { x: 178, y: 138, r: 3 }, { x: 168, y: 124, r: 2.5 },
  { x: 422, y: 138, r: 3 }, { x: 432, y: 124, r: 2.5 },
  { x: 232, y: 58, r: 3 }, { x: 222, y: 46, r: 2.5 },
  { x: 368, y: 58, r: 3 }, { x: 378, y: 46, r: 2.5 },
  { x: 204, y: 188, r: 3 }, { x: 396, y: 188, r: 3 },
  // mittlere Krone
  { x: 188, y: 240, r: 3 }, { x: 412, y: 240, r: 3 },
  { x: 258, y: 178, r: 2.8 }, { x: 342, y: 178, r: 2.8 },
  { x: 248, y: 104, r: 2.8 }, { x: 352, y: 104, r: 2.8 },
  // untere Krone
  { x: 170, y: 410, r: 3.5 }, { x: 430, y: 410, r: 3.5 },
  { x: 188, y: 396, r: 2.5 }, { x: 412, y: 396, r: 2.5 },
  // diffuse innere Belaubung (sehr leicht)
  { x: 270, y: 320, r: 2.2 }, { x: 330, y: 320, r: 2.2 },
  { x: 280, y: 240, r: 2 }, { x: 320, y: 240, r: 2 },
  { x: 290, y: 160, r: 2 }, { x: 310, y: 160, r: 2 },
  { x: 260, y: 380, r: 2.2 }, { x: 340, y: 380, r: 2.2 },
];

export function HealingTree({ modules, className }: Props) {
  const byId = new Map(modules.map((m) => [m.id, m]));

  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        role="img"
        aria-label="Healing Tree – dein Weg in die Freiheit"
      >
        <defs>
          <radialGradient id="ground-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="oklch(0.61 0.06 320 / 0.18)" />
            <stop offset="100%" stopColor="oklch(0.61 0.06 320 / 0)" />
          </radialGradient>
          {/* Sanftes Aura-Glühen hinter der Krone, damit der Pfad davorliegend wirkt */}
          <radialGradient id="crown-aura" cx="0.5" cy="0.45" r="0.55">
            <stop offset="0%" stopColor="oklch(0.96 0.02 80 / 0.55)" />
            <stop offset="100%" stopColor="oklch(0.96 0.02 80 / 0)" />
          </radialGradient>
          <filter id="leaf-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMerge in="blur" />
              <feMerge in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Boden-Glühen */}
        <ellipse cx="300" cy="678" rx="240" ry="36" fill="url(#ground-glow)" />

        {/* Sanfte Krone-Aura, damit Chaos-Geflecht zurücktritt */}
        <ellipse cx="300" cy="270" rx="240" ry="230" fill="url(#crown-aura)" />

        {/* Wurzeln – feines Linework, organisch verzweigt */}
        <g
          stroke={GRAPHITE_SOFT}
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
        >
          <path d="M 300 660 C 250 668, 200 674, 150 686" />
          <path d="M 300 660 C 350 668, 400 674, 450 686" />
          <path d="M 300 660 C 270 674, 240 686, 200 700" />
          <path d="M 300 660 C 330 674, 360 686, 400 700" />
          <path d="M 300 660 L 300 700" />
          <path d="M 220 678 C 200 686, 184 692, 168 700" />
          <path d="M 380 678 C 400 686, 416 692, 432 700" />
          {/* feinere Wurzel-Verzweigungen */}
          <path d="M 250 684 C 240 692, 232 698, 222 704" />
          <path d="M 350 684 C 360 692, 368 698, 378 704" />
          <path d="M 180 692 C 168 698, 158 702, 148 706" />
          <path d="M 420 692 C 432 698, 442 702, 452 706" />
        </g>

        {/* Stamm – elegant, leicht organisch, gabelt sich oben in die Krone */}
        <path
          d="M 290 660
             C 286 600, 282 540, 290 490
             L 296 478
             L 304 478
             C 312 540, 314 600, 312 660 Z"
          fill={GRAPHITE}
        />

        {/* Subtile Stamm-Maserung */}
        <g stroke="oklch(0.30 0.005 240 / 0.45)" strokeWidth="0.6" fill="none">
          <path d="M 296 640 C 294 580, 300 530, 296 490" />
          <path d="M 304 620 C 306 560, 302 510, 308 480" />
        </g>

        {/* CHAOS – fraktales Geflecht (Hintergrund, sehr fein) */}
        <g
          stroke={GRAPHITE_FAINT}
          strokeWidth="0.9"
          strokeLinecap="round"
          fill="none"
        >
          {CHAOS_BRANCHES.map((d, i) => (
            <path key={`c-${i}`} d={d} />
          ))}
        </g>

        {/* CHAOS – ganz feine zusätzliche Linien für Tattoo-Dichte */}
        <g
          stroke={GRAPHITE_GHOST}
          strokeWidth="0.6"
          strokeLinecap="round"
          fill="none"
        >
          <path d="M 188 240 C 174 256, 164 274, 158 294" />
          <path d="M 412 240 C 426 256, 436 274, 442 294" />
          <path d="M 258 178 C 248 162, 240 144, 236 126" />
          <path d="M 342 178 C 352 162, 360 144, 364 126" />
          <path d="M 172 326 C 162 340, 156 354, 152 368" />
          <path d="M 428 326 C 438 340, 444 354, 448 368" />
          <path d="M 204 188 C 196 204, 192 220, 190 238" />
          <path d="M 396 188 C 404 204, 408 220, 410 238" />
        </g>

        {/* CHAOS – feine Blätter (Graphite, klein, ruhig) */}
        <g fill={GRAPHITE_SOFT}>
          {CHAOS_LEAVES.map((l, i) => (
            <ellipse
              key={`cl-${i}`}
              cx={l.x}
              cy={l.y}
              rx={l.r}
              ry={l.r * 1.6}
              transform={`rotate(${(i % 2 === 0 ? -25 : 25)} ${l.x} ${l.y})`}
            />
          ))}
        </g>

        {/* PFAD – 11 dicke, kahle Pfad-Äste (DAVOR — der Weg in die Freiheit) */}
        <g
          stroke={GRAPHITE}
          strokeLinecap="round"
          fill="none"
        >
          {PATH_BRANCHES.map((d, i) => {
            const slot = SLOTS[i];
            const m = byId.get(slot.id);
            const active = !!m?.completed;
            return (
              <path
                key={`p-${i}`}
                d={d}
                strokeWidth={active ? 4.8 : 4}
                stroke={active ? "oklch(0.30 0.01 240)" : GRAPHITE}
              />
            );
          })}
        </g>

        {/* Slot-Marker, Blätter, Blüten */}
        {SLOTS.map((slot) => {
          const m = byId.get(slot.id);
          const completed = !!m?.completed;
          const bloomed = !!m?.bloomed;
          return (
            <SlotEnd
              key={slot.id}
              slot={slot}
              moduleId={slot.id}
              title={MODULE_TITLES[slot.id] ?? `Modul ${slot.id}`}
              completed={completed}
              bloomed={bloomed}
            />
          );
        })}
      </svg>
    </div>
  );
}

function SlotEnd({
  slot,
  moduleId,
  title,
  completed,
  bloomed,
}: {
  slot: Slot;
  moduleId: number;
  title: string;
  completed: boolean;
  bloomed: boolean;
}) {
  const tooltip = `Modul ${moduleId}: ${title}`;

  return (
    <Link
      to="/modul/$id"
      params={{ id: String(moduleId) }}
      aria-label={tooltip}
      style={{ display: "contents" }}
    >
      <g
        transform={`translate(${slot.tip.x} ${slot.tip.y}) rotate(${slot.rotate})`}
        className="cursor-pointer"
      >
        <title>{tooltip}</title>

        {/* Leerer, kahler Endpunkt – feiner Graphite-Ring (zeigt Pfad-Spitze) */}
        {!completed && (
          <circle
            r="5"
            fill="oklch(0.96 0.02 80)"
            stroke={GRAPHITE}
            strokeWidth="1.2"
          />
        )}

        {/* Sage-Green Blatt – wenn Modul abgeschlossen */}
        {completed && (
          <g className="leaf-enter" filter="url(#leaf-glow)">
            <path
              d="M 0 -18
                 C 11 -16, 16 -4, 9 10
                 C 4 16, -6 16, -12 8
                 C -16 0, -12 -14, 0 -18 Z"
              fill="var(--sage)"
              stroke="oklch(0.50 0.04 155)"
              strokeWidth="0.8"
            />
            <path
              d="M -2 12 Q 0 0 2 -16"
              stroke="oklch(0.50 0.04 155 / 0.7)"
              strokeWidth="0.7"
              fill="none"
            />
          </g>
        )}

        {/* Mauve Blüte – wenn ≥3 von 5 Zielen erfüllt sind */}
        {bloomed && (
          <g className="bloom-enter" transform="translate(11 -11)">
            {[0, 72, 144, 216, 288].map((a) => (
              <ellipse
                key={a}
                cx="0"
                cy="-5.5"
                rx="3.4"
                ry="6"
                fill="var(--mauve)"
                opacity="0.92"
                transform={`rotate(${a})`}
              />
            ))}
            <circle r="2.4" fill="var(--orange-soft)" />
          </g>
        )}
      </g>
    </Link>
  );
}
