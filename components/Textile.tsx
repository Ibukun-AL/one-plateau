/* eslint-disable @next/next/no-img-element */

// m = teal/yellow, b = red/green/white, a = blue with fur
const TEXTILES = {
  m: { src: "/assets/shared/textile.png", h: 578 },
  b: { src: "/assets/section2/b-mani.png", h: 578 },
  a: { src: "/assets/section3/a-mani.png", h: 571.49 },
} as const;

export default function Textile({
  kind,
  left,
  top,
  className = "",
  dataA,
}: {
  kind: keyof typeof TEXTILES;
  left: number;
  top: number;
  className?: string;
  dataA?: string;
}) {
  const t = TEXTILES[kind];
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
