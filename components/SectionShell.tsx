import Stage from "./Stage";

/** A full-width section with a scaled design canvas inside. Height is in design px. */
export default function SectionShell({
  id,
  height,
  bg,
  children,
}: {
  id?: string;
  height: number;
  bg: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`relative w-full overflow-hidden ${bg}`}
      style={{ height: `calc(var(--s, 1) * ${height}px)` }}
    >
      <Stage height={height}>{children}</Stage>
    </section>
  );
}
