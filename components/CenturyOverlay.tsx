/* eslint-disable @next/next/no-img-element */
import Button from "./Button";
import LogoCrop, { LOGO_CROPS } from "./LogoCrop";
import Stage from "./Stage";

/**
 * Screen-pinned layer above the page. Holds the "ONE" beads (hero -> section 2 -> small
 * logo of section 3) and the left column of section 3, which stays put while cards scroll.
 * ExperienceRoot drives it. Coordinates are Figma's.
 */
export default function CenturyOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[80]">
      <Stage>
        <div data-a="col" className="absolute inset-0">
          <img
            data-a="one"
            src="/assets/hero/one-beads.png"
            alt="One"
            className="absolute left-[437px] top-[212px] h-[217.09px] w-[568px] max-w-none object-cover"
          />

          {/* PLATEAU badge: in front of the ONE beads and the FEST wordmark. It lifts away with the hero. */}
          <div data-a="badge" className="absolute left-[601.18px] top-[370.99px] h-[60.68px] w-[243.89px]">
            <LogoCrop crop={LOGO_CROPS.plateau} className="h-full w-full" alt="Plateau" />
          </div>

          {/* clipped to section 3's top edge by ExperienceRoot, so it is revealed as the green slides over */}
          <div data-a="col-clip" className="absolute inset-0" style={{ clipPath: "inset(100% 0 0 0)" }}>
            <p className="absolute left-[53px] top-[148px] whitespace-nowrap text-[15px] font-bold leading-[1.191] text-white">
              03 · A CENTURY IN MOTION
            </p>

            <img
              src="/assets/section3/hundred.svg"
              alt="Hundred"
              className="absolute left-[70.8px] top-[342.5px] h-[116.97px] w-[377.38px] max-w-none"
            />

            <p className="absolute left-[53px] top-[486.5px] whitespace-nowrap text-[20px] font-bold leading-[24px] text-white">
              100 Years Behind Us.
              <br />
              100 Years Ahead of Us.
            </p>

            <div className="pointer-events-auto absolute left-[53px] top-[561.5px]">
              <Button variant="yellow" href="#plateau-in-100">
                Discover Plateau
              </Button>
            </div>
          </div>
        </div>
      </Stage>
    </div>
  );
}
