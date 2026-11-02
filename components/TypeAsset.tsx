/* eslint-disable @next/next/no-img-element */

// "EXPIRIENCE" lettering: ten SVG glyphs placed by their left/right inset in the 1441px stage.
const GLYPHS = [
  { src: "v6", left: 59.63, right: 35.99 },
  { src: "v7", left: 69.09, right: 26.54 },
  { src: "v8", left: 27, right: 68.62 },
  { src: "v9", left: 54.91, right: 40.72 },
  { src: "v10", left: 64.36, right: 31.27 },
  { src: "v11", left: 41.14, right: 54.67 },
  { src: "v12", left: 50.37, right: 45.45 },
  { src: "v13", left: 36.46, right: 59.21 },
  { src: "v14", left: 45.68, right: 49.98 },
  { src: "v15", left: 31.73, right: 63.9 },
];

export default function TypeAsset({ className = "" }: { className?: string }) {
  return (
    <div
      data-a="type"
      role="img"
      aria-label="Experience"
      className={`pointer-events-none absolute left-0 h-[77.78px] w-[1441px] ${className}`}
    >
      {GLYPHS.map((g) => (
        <img
          key={g.src}
          src={`/assets/section2/type/${g.src}.svg`}
          alt=""
          className="absolute top-0 block max-w-none"
          style={{
            left: `${g.left}%`,
            width: `${100 - g.left - g.right}%`,
            height: "100%",
          }}
        />
      ))}
    </div>
  );
}
