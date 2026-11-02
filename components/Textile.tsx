/* eslint-disable @next/next/no-img-element */

// m = teal/yellow, b = red/green/white, a = blue with fur.
// l/r = where the dress's opaque pixels start/end inside its 457px box (measured from the PNGs).
const TEXTILES = {
  m: { src: "/assets/shared/textile.png", h: 578, l: 115.9, r: 340.2 },
  b: { src: "/assets/section2/b-mani.png", h: 578, l: 128.3, r: 327.8 },
  a: { src: "/assets/section3/a-mani.png", h: 571.49, l: 83.6, r: 365.7 },
} as const;

const STAGE_W = 1441;

/**
 * A side dress that peeks in from the SCREEN edge (not the design canvas edge), so only a sliver
 * of `peek` design-px shows at any window width. `--ex` (set by ExperienceRoot) is the extra
 * width the screen has beyond the canvas, in design px.
 */
export default function Textile({
  kind,
  side,
  top,
  peek = 105,
  className = "",
  dataA,
}: {
  kind: keyof typeof TEXTILES;
  side: "l" | "r";
  top: number;
  peek?: number;
  className?: string;
  dataA?: string;
}) {
  const t = TEXTILES[kind];
  const left =
    side === "l"
      ? `calc(${peek - t.r}px - var(--ex, 0px))`
      : `calc(${STAGE_W - peek - t.l}px + var(--ex, 0px))`;
  return (
    <img
      data-a={dataA}
      src={t.src}
      alt=""
      className={`pointer-events-none absolute max-w-none object-cover ${className}`}
      style={{ left, top, width: 457.22, height: t.h }}
    />
  );
}
