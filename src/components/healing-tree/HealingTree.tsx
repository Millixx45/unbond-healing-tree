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
 * Bildsprache: edles Fineline-Botanik-Tattoo.
 *
 *  • Organische, leicht fraktale Verzweigung (keine geometrischen Kegel).
 *  • 11 dicke, kahle "Pfad-Äste" für Module 0–10 = der klare Weg in die Freiheit.
 *  • Dünne, belaubte "Chaos-Äste" als ruhiger Hintergrund (alte Bindungen).
 *  • Initial-Palette: Graphite (#4A4E52) für Stamm, Pfad-Äste und Belaubung.
 *  • Pfad-Äste tragen erst dann Sage-Blätter & Mauve-Blüten, wenn der/die
 *    Nutzer:in den jeweiligen Modul-Fortschritt gemacht hat.
 */

const VIEW_W = 600;
const VIEW_H = 720;

// Graphite-Palette als oklch-Äquivalente von #4A4E52
const GRAPHITE = "oklch(0.36 0.005 240)";
const GRAPHITE_SOFT = "oklch(0.36 0.005 240 / 0.55)";
const GRAPHITE_FAINT = "oklch(0.36 0.005 240 / 0.35)";

// Spitze des Pfad-Asts, an der Blatt/Blüte ansetzen — von unten (Wurzel) nach oben (Krone)
type Slot = { id: number; tip: { x: number; y: number }; rotate: number };

const SLOTS: Slot[] = [
  { id: 0,  tip: { x: 300, y: 612 }, rotate:   0 }, // Auftakt – am Ansatz, mittig
  { id: 1,  tip: { x: 188, y: 540 }, rotate: -28 },
  { id: 2,  tip: { x: 412, y: 530 }, rotate:  26 },
  { id: 3,  tip: { x: 142, y: 438 }, rotate: -22 },
  { id: 4,  tip: { x: 458, y: 428 }, rotate:  20 },
  { id: 5,  tip: { x: 196, y: 348 }, rotate: -16 },
  { id: 6,  tip: { x: 408, y: 338 }, rotate:  14 },
  { id: 7,  tip: { x: 158, y: 252 }, rotate: -12 },
  { id: 8,  tip: { x: 446, y: 244 }, rotate:  10 },
  { id: 9,  tip: { x: 244, y: 158 }, rotate:  -6 },
  { id: 10, tip: { x: 360, y: 110 }, rotate:   4 },
];

// Bezier-Kurven der 11 dicken Pfad-Äste (vom Stamm zur Spitze)
const PATH_BRANCHES: string[] = [
  // M0 – kurzer, mittiger Auftakt-Ast aus dem Stammansatz
  "M 300 638 C 300 628, 300 622, 300 612",
  // M1
  "M 296 568 C 270 562, 230 552, 188 540",
  // M2
  "M 304 558 C 332 552, 372 544, 412 530",
  // M3
  "M 294 470 C 240 460, 188 450, 142 438",
  // M4
  "M 306 460 C 360 450, 412 440, 458 428",
  // M5
  "M 296 380 C 262 370, 226 358, 196 348",
  // M6
  "M 304 372 C 340 364, 376 354, 408 338",
  // M7
  "M 294 290 C 244 278, 196 264, 158 252",
  // M8
  "M 306 282 C 358 270, 408 258, 446 244",
  // M9
  "M 300 200 C 286 188, 264 174, 244 158",
  // M10
  "M 304 150 C 322 138, 344 122, 360 110",
];

// Dünne, belaubte "Chaos-Äste" – feines Botanik-Geflecht im Hintergrund
const CHAOS_BRANCHES: string[] = [
  "M 295 590 C 250 600, 215 605, 178 612",
  "M 305 585 C 348 596, 388 602, 430 612",
  "M 296 510 C 248 514, 210 522, 168 532",
  "M 304 508 C 348 514, 390 522, 432 530",
  "M 295 445 C 252 444, 214 446, 174 452",
  "M 305 440 C 350 442, 392 446, 434 452",
  "M 295 378 C 248 384, 212 392, 174 402",
  "M 305 372 C 352 376, 388 384, 430 396",
  "M 296 320 C 248 316, 214 314, 176 314",
  "M 304 316 C 348 318, 388 322, 426 326",
  "M 295 248 C 254 252, 220 258, 184 268",
  "M 305 240 C 348 246, 386 254, 422 264",
  "M 296 188 C 268 192, 244 200, 220 212",
  "M 304 184 C 332 188, 358 196, 384 208",
  "M 298 126 C 282 132, 268 142, 256 154",
  "M 302 118 C 320 124, 336 134, 350 146",
  // ein paar feinere "Verzweigungen" auf bestehenden Chaos-Ästen
  "M 220 532 C 198 540, 178 548, 158 558",
  "M 380 530 C 402 538, 422 546, 442 556",
  "M 200 454 C 178 462, 160 470, 144 480",
  "M 400 452 C 422 460, 440 468, 458 478",
  "M 200 392 C 184 400, 170 408, 158 416",
  "M 392 388 C 412 394, 428 402, 444 412",
];

// Mehrere kleine Blatt-Cluster pro Chaos-Ast für dichten Hintergrund
type LeafDot = { x: number; y: number; r: number };
const CHAOS_LEAVES: LeafDot[] = [
  // unten
  { x: 178, y: 612, r: 4 }, { x: 200, y: 608, r: 3 }, { x: 158, y: 615, r: 3 },
  { x: 430, y: 612, r: 4 }, { x: 410, y: 608, r: 3 }, { x: 450, y: 614, r: 3 },
  // mittel-unten
  { x: 168, y: 532, r: 3.5 }, { x: 188, y: 528, r: 3 },
  { x: 432, y: 530, r: 3.5 }, { x: 412, y: 526, r: 3 },
  // mittel
  { x: 174, y: 452, r: 3.5 }, { x: 196, y: 450, r: 3 },
  { x: 434, y: 452, r: 3.5 }, { x: 414, y: 450, r: 3 },
  // mittel-oben
  { x: 174, y: 402, r: 3 }, { x: 196, y: 398, r: 2.5 },
  { x: 430, y: 396, r: 3 }, { x: 410, y: 394, r: 2.5 },
  // oberer Bereich
  { x: 176, y: 314, r: 3 }, { x: 198, y: 316, r: 2.5 },
  { x: 426, y: 326, r: 3 }, { x: 406, y: 322, r: 2.5 },
  { x: 184, y: 268, r: 3 }, { x: 204, y: 264, r: 2.5 },
  { x: 422, y: 264, r: 3 }, { x: 402, y: 260, r: 2.5 },
  { x: 220, y: 212, r: 2.5 }, { x: 384, y: 208, r: 2.5 },
  { x: 256, y: 154, r: 2.5 }, { x: 350, y: 146, r: 2.5 },
  // feine Verzweigungs-Spitzen
  { x: 158, y: 558, r: 2.5 }, { x: 442, y: 556, r: 2.5 },
  { x: 144, y: 480, r: 2.5 }, { x: 458, y: 478, r: 2.5 },
  { x: 158, y: 416, r: 2 }, { x: 444, y: 412, r: 2 },
];

export function HealingTree({ modules, className }: Props) {
  // Map id → progress (Module sind 0..10)
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
          {/* leichtes Glühen für aktive Pfad-Äste */}
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

        {/* Wurzeln – feines Linework */}
        <g
          stroke={GRAPHITE_SOFT}
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
        >
          <path d="M 300 660 C 250 668, 200 674, 150 682" />
          <path d="M 300 660 C 350 668, 400 674, 450 682" />
          <path d="M 300 660 C 270 672, 240 680, 200 690" />
          <path d="M 300 660 C 330 672, 360 680, 400 690" />
          <path d="M 300 660 L 300 692" />
          <path d="M 220 678 C 200 684, 184 688, 168 694" />
          <path d="M 380 678 C 400 684, 416 688, 432 694" />
        </g>

        {/* Stamm – elegant, leicht organisch */}
        <path
          d="M 290 660
             C 286 600, 282 540, 290 470
             C 296 410, 290 350, 296 290
             C 300 240, 296 190, 302 130
             C 304 110, 304 95, 306 80
             L 314 80
             C 318 100, 320 140, 316 200
             C 312 260, 318 320, 314 380
             C 310 440, 318 510, 316 580
             C 314 620, 316 645, 312 660 Z"
          fill={GRAPHITE}
        />

        {/* Subtile Stamm-Maserung */}
        <g stroke="oklch(0.30 0.005 240 / 0.45)" strokeWidth="0.6" fill="none">
          <path d="M 300 640 C 298 580, 304 510, 300 440" />
          <path d="M 305 600 C 308 540, 302 470, 308 400" />
          <path d="M 302 380 C 300 320, 306 250, 304 180" />
        </g>

        {/* CHAOS – dünne, belaubte Hintergrund-Äste */}
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

        {/* PFAD – 11 dicke, kahle Pfad-Äste (der Weg in die Freiheit) */}
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
                strokeWidth={active ? 4.5 : 3.8}
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
