type Crop = { width: string; height: string; left: string; top: string };

// The logo lives in one 4096x4096 sprite sheet; Figma crops it with these offsets.
export const LOGO_CROPS = {
  fest: { width: "152.67%", height: "426.66%", left: "-25.78%", top: "-219.35%" },
  plateau: { width: "297.16%", height: "1194.36%", left: "-98.55%", top: "-528.67%" },
  nav: { width: "152.67%", height: "200.98%", left: "-25.78%", top: "-50.43%" },
} satisfies Record<string, Crop>;

export default function LogoCrop({
  crop,
  className = "",
  alt = "",
}: {
  crop: Crop;
  className?: string;
  alt?: string;
}) {
  return (
    <div className={`pointer-events-none ${className}`}>
      <div className="relative h-full w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/shared/logo-sheet.png"
          alt={alt}
          className="absolute max-w-none"
          style={crop}
        />
      </div>
    </div>
  );
}
