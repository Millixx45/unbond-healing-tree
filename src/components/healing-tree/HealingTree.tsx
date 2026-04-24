import { Link } from "@tanstack/react-router";
import type { ModuleProgress } from "@/lib/storage";
import { MODULE_TITLES } from "@/lib/storage";

type Props = {
  modules: ModuleProgress[];
  className?: string;
};

/**
 * Each module owns a fixed slot on the tree (sorted bottom-left → top-right
 * to symbolise an ascending healing path). Coordinates are in a 600×640 viewBox.
 */
const SLOTS: { x: number; y: number; rotate: number }[] = [
  { x: 180, y: 470, rotate: -25 }, // M1
  { x: 420, y: 460, rotate: 22 },  // M2
  { x: 130, y: 380, rotate: -20 }, // M3
  { x: 470, y: 365, rotate: 18 },  // M4
  { x: 200, y: 300, rotate: -15 }, // M5
  { x: 400, y: 290, rotate: 14 },  // M6
  { x: 150, y: 220, rotate: -12 }, // M7
  { x: 450, y: 215, rotate: 12 },  // M8
  { x: 240, y: 145, rotate: -8 },  // M9
  { x: 360, y: 110, rotate: 6 },   // M10
];

export function HealingTree({ modules, className }: Props) {
  return (
    <div className={className}>
      <svg
        viewBox="0 0 600 640"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        role="img"
        aria-label="Healing Tree mit Fortschritt der 10 Module"
      >
        <defs>
          <linearGradient id="trunk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.45 0.06 30)" />
            <stop offset="100%" stopColor="oklch(0.30 0.05 25)" />
          </linearGradient>
          <radialGradient id="ground" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="oklch(0.61 0.06 320 / 0.25)" />
            <stop offset="100%" stopColor="oklch(0.61 0.06 320 / 0)" />
          </radialGradient>
        </defs>

        {/* Ground / roots glow */}
        <ellipse cx="300" cy="600" rx="240" ry="40" fill="url(#ground)" />

        {/* Roots */}
        <g
          stroke="oklch(0.61 0.06 320 / 0.55)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        >
          <path d="M300 580 Q220 600 140 615" />
          <path d="M300 580 Q380 600 460 615" />
          <path d="M300 580 Q260 610 200 625" />
          <path d="M300 580 Q340 610 400 625" />
          <path d="M300 580 L300 615" />
        </g>

        {/* Trunk */}
        <path
          d="M285 580 C 280 500, 275 420, 290 340 C 300 280, 295 220, 305 160 C 310 130, 308 110, 312 90 L 320 90 C 325 130, 330 200, 320 270 C 310 340, 320 430, 318 520 C 316 555, 318 575, 315 580 Z"
          fill="url(#trunk)"
        />

        {/* Branches */}
        <g
          stroke="oklch(0.40 0.05 28)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        >
          <path d="M298 470 Q250 470 190 472" />
          <path d="M308 460 Q360 460 415 460" />
          <path d="M295 380 Q220 382 140 382" />
          <path d="M310 365 Q400 365 465 365" />
          <path d="M300 300 Q250 298 205 300" />
          <path d="M310 290 Q360 288 398 290" />
          <path d="M302 220 Q220 220 155 222" />
          <path d="M312 215 Q390 215 448 215" />
          <path d="M308 145 Q280 145 245 145" />
          <path d="M312 110 Q340 110 358 110" />
        </g>

        {/* Slots: empty placeholder, leaf or leaf+bloom */}
        {modules.map((m, i) => {
          const slot = SLOTS[i];
          if (!slot) return null;
          return (
            <Slot
              key={m.id}
              cx={slot.x}
              cy={slot.y}
              rotate={slot.rotate}
              moduleId={m.id}
              title={MODULE_TITLES[m.id] ?? `Modul ${m.id}`}
              completed={m.completed}
              bloomed={m.bloomed}
            />
          );
        })}
      </svg>
    </div>
  );
}

function Slot({
  cx,
  cy,
  rotate,
  moduleId,
  title,
  completed,
  bloomed,
}: {
  cx: number;
  cy: number;
  rotate: number;
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
      <g transform={`translate(${cx} ${cy}) rotate(${rotate})`} className="cursor-pointer">
        <title>{tooltip}</title>

        {/* Empty placeholder when nothing earned yet */}
        {!completed && (
          <circle
            r="14"
            fill="none"
            stroke="oklch(0.66 0.04 155 / 0.45)"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
        )}

        {/* Leaf (Sage-Green) when module is complete */}
        {completed && (
          <g className="leaf-enter">
            <path
              d="M0 -16 C 14 -14, 18 0, 8 14 C -2 18, -14 12, -16 0 C -16 -10, -8 -16, 0 -16 Z"
              fill="oklch(0.66 0.04 155)"
              stroke="oklch(0.50 0.04 155)"
              strokeWidth="1"
            />
            <path
              d="M0 -14 L 0 14"
              stroke="oklch(0.50 0.04 155 / 0.6)"
              strokeWidth="1"
              fill="none"
            />
          </g>
        )}

        {/* Bloom (Mauve) when 3-of-5 checklist goals hit */}
        {bloomed && (
          <g className="bloom-enter" transform="translate(10 -10)">
            {[0, 72, 144, 216, 288].map((a) => (
              <ellipse
                key={a}
                cx="0"
                cy="-6"
                rx="4"
                ry="7"
                fill="oklch(0.61 0.06 320)"
                transform={`rotate(${a})`}
              />
            ))}
            <circle r="3" fill="oklch(0.76 0.09 70)" />
          </g>
        )}
      </g>
    </Link>
  );
}
