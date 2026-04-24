import { Link } from "@tanstack/react-router";
import type { ModuleProgress } from "@/lib/storage";
import { MODULE_TITLES } from "@/lib/storage";

type Props = {
  modules: ModuleProgress[];
  className?: string;
};

/**
 * UNBOND – Healing Tree (Lebensbaum / Tree of Life)
 *
 * Klassische Lebensbaum-Symbolik:
 *  • Kreisrunde Komposition: Krone (oben) und Wurzeln (unten) bilden zusammen
 *    einen Kreis – das Symbol für Ganzheit, Kreislauf und Heilung.
 *  • Kraftvoller, zentraler Stamm – Erdung & Stabilität.
 *  • Symmetrische, dichte Krone aus fraktal verzweigten Ästen.
 *  • Verwurzelung als Spiegelbild der Krone (Wurzeln nach unten).
 *  • 11 sichtbare, KAHLE Pfad-Äste (M0..M10) – der Weg in die Freiheit,
 *    fächern symmetrisch in die Krone, liegen vor dem Chaos-Geflecht.
 *  • Sage-Blatt erscheint bei abgeschlossenem Modul.
 *  • Mauve-Blüte erscheint bei erfüllter 3-von-5-Regel.
 */

const VIEW_W = 600;
const VIEW_H = 720;

// Komposition – kreisrunde Lebensbaum-Anordnung:
//   Mittelpunkt:        (300, 360)
//   Krone (Halbkreis):  Radius ≈ 250, Mittelpunkt (300, 360), oberer Halbraum
//   Wurzeln:            spiegelbildlicher unterer Halbkreis, gleicher Radius
//   Stamm:              kurz, kompakt um (300, 360)

const GRAPHITE = "oklch(0.36 0.005 240)";
const GRAPHITE_DEEP = "oklch(0.28 0.005 240)";
const GRAPHITE_SOFT = "oklch(0.36 0.005 240 / 0.55)";
const GRAPHITE_FAINT = "oklch(0.36 0.005 240 / 0.32)";
const GRAPHITE_GHOST = "oklch(0.36 0.005 240 / 0.18)";

type Slot = { id: number; tip: { x: number; y: number }; rotate: number };

// 11 Pfad-Äste, gleichmäßig auf Halbkreis verteilt (von links nach rechts)
// Winkel: -85° (links) bis +85° (rechts), Spitzen am Kronenrand (Radius 250)
const CENTER = { x: 300, y: 360 };
const CROWN_RADIUS = 250;

const SLOTS: Slot[] = Array.from({ length: 11 }, (_, i) => {
  // Verteile von -85° bis +85° in 17°-Schritten → kreisrunde Krone
  const angleDeg = -85 + i * 17;
  const angleRad = (angleDeg - 90) * (Math.PI / 180); // -90 = nach oben drehen
  const tipX = CENTER.x + Math.cos(angleRad) * CROWN_RADIUS;
  const tipY = CENTER.y + Math.sin(angleRad) * CROWN_RADIUS;
  return { id: i, tip: { x: tipX, y: tipY }, rotate: angleDeg };
});

// Bezier-Kurven der 11 Pfad-Äste – wachsen aus der Stammbasis (300, 360)
// und biegen organisch zur jeweiligen Spitze am Kronenrand
const PATH_BRANCHES: string[] = SLOTS.map((slot) => {
  const { x: tx, y: ty } = slot.tip;
  // Kontrollpunkt 1: leicht über Stammbasis, in Richtung Spitze gezogen
  const cp1x = CENTER.x + (tx - CENTER.x) * 0.15;
  const cp1y = CENTER.y - 30 + (ty - CENTER.y) * 0.1;
  // Kontrollpunkt 2: ca. 60% zur Spitze, sanfte Kurve
  const cp2x = CENTER.x + (tx - CENTER.x) * 0.55;
  const cp2y = CENTER.y - 60 + (ty - CENTER.y) * 0.55;
  return `M ${CENTER.x} ${CENTER.y - 10} C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${tx.toFixed(1)} ${ty.toFixed(1)}`;
});

// Chaos-Äste – fraktales Geflecht, fächern symmetrisch in die Krone
// (zwischen den Pfad-Ästen, etwas dünner & dichter)
const CHAOS_BRANCHES: string[] = [];
for (let i = 0; i < 22; i++) {
  // Verteile zwischen den Pfad-Ästen (offset um halben Schritt)
  const angleDeg = -88 + i * 8.4;
  const angleRad = (angleDeg - 90) * (Math.PI / 180);
  const r = 230 + (i % 3) * 8;
  const tx = CENTER.x + Math.cos(angleRad) * r;
  const ty = CENTER.y + Math.sin(angleRad) * r;
  const cp1x = CENTER.x + (tx - CENTER.x) * 0.2;
  const cp1y = CENTER.y - 20 + (ty - CENTER.y) * 0.15;
  const cp2x = CENTER.x + (tx - CENTER.x) * 0.6;
  const cp2y = CENTER.y - 40 + (ty - CENTER.y) * 0.6;
  CHAOS_BRANCHES.push(
    `M ${CENTER.x} ${CENTER.y - 5} C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${tx.toFixed(1)} ${ty.toFixed(1)}`,
  );
}

// Sekundäre, feinste Verzweigungen am Kronenrand für fraktale Tiefe
const FINE_BRANCHES: string[] = [];
for (let i = 0; i < 36; i++) {
  const angleDeg = -90 + i * 5;
  const angleRad = (angleDeg - 90) * (Math.PI / 180);
  const innerR = 200;
  const outerR = 248 + ((i * 7) % 11);
  const ix = CENTER.x + Math.cos(angleRad) * innerR;
  const iy = CENTER.y + Math.sin(angleRad) * innerR;
  const ox = CENTER.x + Math.cos(angleRad) * outerR;
  const oy = CENTER.y + Math.sin(angleRad) * outerR;
  // leichte Kurve
  const mx = (ix + ox) / 2 + (i % 2 === 0 ? 4 : -4);
  const my = (iy + oy) / 2 - 2;
  FINE_BRANCHES.push(
    `M ${ix.toFixed(1)} ${iy.toFixed(1)} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${ox.toFixed(1)} ${oy.toFixed(1)}`,
  );
}

// Wurzeln – spiegelbildlicher Halbkreis nach unten (Lebensbaum-Symbolik)
const ROOT_BRANCHES: string[] = [];
for (let i = 0; i < 11; i++) {
  const angleDeg = -85 + i * 17;
  const angleRad = (angleDeg + 90) * (Math.PI / 180); // +90 = nach unten
  const tx = CENTER.x + Math.cos(angleRad) * CROWN_RADIUS;
  const ty = CENTER.y + Math.sin(angleRad) * CROWN_RADIUS;
  const cp1x = CENTER.x + (tx - CENTER.x) * 0.15;
  const cp1y = CENTER.y + 30 + (ty - CENTER.y) * 0.1;
  const cp2x = CENTER.x + (tx - CENTER.x) * 0.55;
  const cp2y = CENTER.y + 60 + (ty - CENTER.y) * 0.55;
  ROOT_BRANCHES.push(
    `M ${CENTER.x} ${CENTER.y + 10} C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${tx.toFixed(1)} ${ty.toFixed(1)}`,
  );
}

// Feine Wurzel-Verzweigungen
const FINE_ROOTS: string[] = [];
for (let i = 0; i < 28; i++) {
  const angleDeg = -88 + i * 6.5;
  const angleRad = (angleDeg + 90) * (Math.PI / 180);
  const innerR = 180;
  const outerR = 240 + ((i * 5) % 14);
  const ix = CENTER.x + Math.cos(angleRad) * innerR;
  const iy = CENTER.y + Math.sin(angleRad) * innerR;
  const ox = CENTER.x + Math.cos(angleRad) * outerR;
  const oy = CENTER.y + Math.sin(angleRad) * outerR;
  const mx = (ix + ox) / 2 + (i % 2 === 0 ? 3 : -3);
  const my = (iy + oy) / 2 + 2;
  FINE_ROOTS.push(
    `M ${ix.toFixed(1)} ${iy.toFixed(1)} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${ox.toFixed(1)} ${oy.toFixed(1)}`,
  );
}

// Sanftes Hintergrund-Laub (kleine Punkte am Kronenrand für Fülle)
type LeafDot = { x: number; y: number; r: number };
const CHAOS_LEAVES: LeafDot[] = [];
for (let i = 0; i < 60; i++) {
  const angleDeg = -90 + i * 3;
  const angleRad = (angleDeg - 90) * (Math.PI / 180);
  const r = 240 + ((i * 11) % 18);
  CHAOS_LEAVES.push({
    x: CENTER.x + Math.cos(angleRad) * r,
    y: CENTER.y + Math.sin(angleRad) * r,
    r: 2 + (i % 3) * 0.6,
  });
}

export function HealingTree({ modules, className }: Props) {
  const byId = new Map(modules.map((m) => [m.id, m]));

  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        role="img"
        aria-label="Lebensbaum – dein Weg in die Freiheit"
      >
        <defs>
          {/* Heiligenschein hinter der Krone – Kreis-Aura */}
          <radialGradient id="circle-aura" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="oklch(0.96 0.02 80 / 0.7)" />
            <stop offset="60%" stopColor="oklch(0.96 0.02 80 / 0.25)" />
            <stop offset="100%" stopColor="oklch(0.96 0.02 80 / 0)" />
          </radialGradient>
          {/* Sanftes Glühen am Boden */}
          <radialGradient id="ground-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="oklch(0.61 0.06 320 / 0.18)" />
            <stop offset="100%" stopColor="oklch(0.61 0.06 320 / 0)" />
          </radialGradient>
          <filter id="leaf-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMerge in="blur" />
              <feMerge in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Kreis-Aura – heiliger Kreis hinter dem ganzen Baum */}
        <circle
          cx={CENTER.x}
          cy={CENTER.y}
          r={CROWN_RADIUS + 30}
          fill="url(#circle-aura)"
        />

        {/* Symbolischer äußerer Kreis – fein, ruhig, „Tree of Life" */}
        <circle
          cx={CENTER.x}
          cy={CENTER.y}
          r={CROWN_RADIUS + 18}
          fill="none"
          stroke={GRAPHITE_FAINT}
          strokeWidth="0.8"
          strokeDasharray="2 4"
        />
        <circle
          cx={CENTER.x}
          cy={CENTER.y}
          r={CROWN_RADIUS + 6}
          fill="none"
          stroke={GRAPHITE_GHOST}
          strokeWidth="0.6"
        />

        {/* WURZELN – feine Verzweigungen (Hintergrund) */}
        <g
          stroke={GRAPHITE_GHOST}
          strokeWidth="0.6"
          strokeLinecap="round"
          fill="none"
        >
          {FINE_ROOTS.map((d, i) => (
            <path key={`fr-${i}`} d={d} />
          ))}
        </g>

        {/* WURZELN – Hauptverzweigungen (sichtbar, mittlere Stärke) */}
        <g
          stroke={GRAPHITE_SOFT}
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        >
          {ROOT_BRANCHES.map((d, i) => (
            <path key={`r-${i}`} d={d} />
          ))}
        </g>

        {/* CHAOS – feinste Verzweigungen am Kronenrand (Fraktal-Tiefe) */}
        <g
          stroke={GRAPHITE_GHOST}
          strokeWidth="0.55"
          strokeLinecap="round"
          fill="none"
        >
          {FINE_BRANCHES.map((d, i) => (
            <path key={`f-${i}`} d={d} />
          ))}
        </g>

        {/* CHAOS – mittlere Verzweigungen (Hintergrund-Geflecht) */}
        <g
          stroke={GRAPHITE_FAINT}
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        >
          {CHAOS_BRANCHES.map((d, i) => (
            <path key={`c-${i}`} d={d} />
          ))}
        </g>

        {/* Sanftes Hintergrund-Laub – kleine Punkte am Kronenrand */}
        <g fill={GRAPHITE_SOFT}>
          {CHAOS_LEAVES.map((l, i) => (
            <ellipse
              key={`cl-${i}`}
              cx={l.x}
              cy={l.y}
              rx={l.r}
              ry={l.r * 1.5}
              transform={`rotate(${(i % 2 === 0 ? -25 : 25)} ${l.x} ${l.y})`}
            />
          ))}
        </g>

        {/* STAMM – kraftvoll, kompakt, zentral (Verbindung Krone ↔ Wurzeln) */}
        <path
          d={`M ${CENTER.x - 14} ${CENTER.y + 10}
              C ${CENTER.x - 12} ${CENTER.y - 5}, ${CENTER.x - 12} ${CENTER.y - 5}, ${CENTER.x - 14} ${CENTER.y - 12}
              L ${CENTER.x + 14} ${CENTER.y - 12}
              C ${CENTER.x + 12} ${CENTER.y - 5}, ${CENTER.x + 12} ${CENTER.y - 5}, ${CENTER.x + 14} ${CENTER.y + 10}
              Z`}
          fill={GRAPHITE_DEEP}
        />
        {/* Stamm-Maserung */}
        <g stroke="oklch(0.22 0.005 240 / 0.55)" strokeWidth="0.5" fill="none">
          <path d={`M ${CENTER.x - 4} ${CENTER.y - 10} Q ${CENTER.x - 5} ${CENTER.y} ${CENTER.x - 4} ${CENTER.y + 8}`} />
          <path d={`M ${CENTER.x + 4} ${CENTER.y - 10} Q ${CENTER.x + 5} ${CENTER.y} ${CENTER.x + 4} ${CENTER.y + 8}`} />
        </g>

        {/* PFAD – 11 dicke, kahle Pfad-Äste (DAVOR — der Weg in die Freiheit) */}
        <g
          stroke={GRAPHITE_DEEP}
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
                strokeWidth={active ? 4.4 : 3.6}
                stroke={active ? "oklch(0.22 0.01 240)" : GRAPHITE_DEEP}
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

        {/* Boden-Glühen ganz unten */}
        <ellipse cx={CENTER.x} cy={690} rx="200" ry="20" fill="url(#ground-glow)" />
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
            stroke="oklch(0.22 0.01 240)"
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
