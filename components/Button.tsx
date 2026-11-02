import Image from "next/image";

const VARIANTS = {
  yellow: {
    className: "bg-fest-yellow border-fest-yellow text-fest-forest gap-[44px]",
    arrow: "/assets/shared/arrow-dark.svg",
  },
  green: {
    className: "bg-fest-green border-fest-green text-white gap-[22px]",
    arrow: "/assets/shared/arrow-light.svg",
  },
} as const;

export default function Button({
  variant,
  href,
  children,
  className = "",
  gap,
  width,
  fontSize,
}: {
  variant: keyof typeof VARIANTS;
  href: string;
  children: React.ReactNode;
  className?: string;
  /** override the text-to-arrow gap (px) for longer labels */
  gap?: number;
  /** override the 250px width (px) */
  width?: number;
  /** override the 16px label size (px) */
  fontSize?: number;
}) {
  const v = VARIANTS[variant];
  return (
    <a
      href={href}
      style={{ ...(gap !== undefined && { gap }), ...(width !== undefined && { width }), ...(fontSize !== undefined && { fontSize }) }}
      className={`group flex h-[56px] min-h-[52px] w-[250px] items-center rounded-[8.633px] border border-solid px-[22px] text-[16px] font-medium leading-[18px] transition-[transform,filter] duration-300 ease-out hover:-translate-y-0.5 hover:brightness-105 ${v.className} ${className}`}
    >
      <span className="whitespace-nowrap">{children}</span>
      <Image
        src={v.arrow}
        alt=""
        width={16}
        height={16}
        className="shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1"
      />
    </a>
  );
}
