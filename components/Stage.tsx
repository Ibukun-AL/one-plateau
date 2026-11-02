export const STAGE_W = 1441;
export const STAGE_H = 1024;

/**
 * A 1441px-wide design canvas, scaled to the viewport height and centred.
 * `--s` is set on an ancestor by ExperienceRoot. Children use Figma coordinates directly.
 * Pass `height` for tall sections; the parent must set its own height to `height * --s`.
 */
export default function Stage({
  children,
  className = "",
  height = STAGE_H,
}: {
  children: React.ReactNode;
  className?: string;
  height?: number;
}) {
  return (
    <div
      className={`absolute left-1/2 top-0 origin-top ${className}`}
      style={{
        width: STAGE_W,
        height,
        transform: "translateX(-50%) scale(var(--s, 1))",
      }}
    >
      {children}
    </div>
  );
}
