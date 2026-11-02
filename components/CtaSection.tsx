import Button from "./Button";

/**
 * Figma "EXPL - OPF Web 2.7" content: the PLATEAU wordmark, tagline and button. The ONE beads
 * and cap are shared elements owned by StoryScene. The wordmark is a stand-in font.
 */
export default function CtaContent() {
  return (
    <>
      <h2
        data-a="fin-cta-title"
        className="absolute left-0 top-[618px] w-[1441px] text-center font-[family-name:var(--font-bungee)] text-[140px] leading-none text-[#fffdf4]"
      >
        PLATEAU
      </h2>
      <p
        data-a="fin-cta-sub"
        className="absolute left-0 top-[759px] w-[1441px] text-center text-[40px] font-bold leading-[1.19] text-[#fffdf4]"
      >
        MANY EXPERIENCES
      </p>
      <div data-a="fin-cta-btn" className="absolute left-[594.5px] top-[856px]">
        <Button variant="yellow" href="#experiences" width={253} gap={23} fontSize={14}>
          Find your experience
        </Button>
      </div>
    </>
  );
}
