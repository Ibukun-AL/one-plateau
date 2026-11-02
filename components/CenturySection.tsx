"use client";

/* eslint-disable @next/next/no-img-element */
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Stage from "./Stage";
import Textile from "./Textile";

gsap.registerPlugin(ScrollTrigger);

export const CENTURY_H = 2932;

const STRING_SLICES = ["string-02", "string-03", "string-04", "string-05"];

const YEARS = [
  { label: "ORIGINS", year: "1926", caption: "Establishment of Plateau Province", captionClass: "text-[16px] leading-[1.2]" },
  { label: "IDENTITY", year: "1976", caption: "Creation of Plateau State", captionClass: "text-[18px] leading-[27px]" },
  { label: "NOW", year: "2026", caption: "A centenary—and 50 years of Plateau State", captionClass: "text-[18px] leading-[1.2]" },
  { label: "POSSIBILTY", year: "2126", caption: "The Next 100 years", captionClass: "text-[18px] leading-[1.2]" },
];

/**
 * Figma "EXPL - OPF Web 2.3": green, 1441 x 2932. The left column (logo, copy, CTA) is
 * pinned and lives in CenturyOverlay; this holds the string, cap, textiles and cards.
 */
export default function CenturySection() {
  const section = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-a=year-card]").forEach((card) => {
        gsap.from(card, {
          autoAlpha: 0,
          y: 80,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none reverse" },
        });
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={section}
      data-a="century"
      id="plateau-in-100"
      className="relative z-10 w-full overflow-hidden bg-fest-green"
      style={{ height: `calc(var(--s, 1) * ${CENTURY_H}px)` }}
    >
      <Stage height={CENTURY_H}>
        {/* bead string continues from section 2: slice 02 starts above this section */}
        <div className="pointer-events-none absolute left-[465.13px] top-[-326.66px] w-[509.73px]">
          {STRING_SLICES.map((name) => (
            <div key={name} className="relative h-[1003.69px] w-full overflow-hidden">
              <img
                src={`/assets/${name === "string-02" ? "section2" : "section3"}/${name}.png`}
                alt=""
                className="absolute left-[-91.1%] top-0 h-[100.01%] w-[278.53%] max-w-none"
              />
            </div>
          ))}
        </div>

        {/* cap threaded on the string */}
        <div className="pointer-events-none absolute left-[422px] top-[861.5px] h-[538px] w-[592px] overflow-hidden">
          <img
            src="/assets/section3/cap.png"
            alt=""
            className="absolute left-[-10.6%] top-[-20.05%] h-[142.82%] w-[121.68%] max-w-none"
          />
        </div>

        {/* side dresses (the other four Figma layers sit fully off-canvas) */}
        <Textile kind="b" side="r" top={987} className="blur-[1.65px]" />
        <Textile kind="b" side="l" top={987} />

        {/* timeline cards */}
        <div className="absolute left-[778px] top-[160px] flex w-[568.11px] flex-col gap-[48px]">
          {YEARS.map((y) => (
            <article
              key={y.year}
              data-a="year-card"
              className="flex flex-col gap-[18px] overflow-clip rounded-b-[45px] rounded-t-[30px] bg-[rgba(6,39,20,0.78)] p-[40px]"
            >
              <div className="flex flex-col gap-[12px]">
                <p className="text-[14px] font-bold leading-[1.2] text-[#fffdf4]">{y.label}</p>
                <div className="flex flex-col">
                  <p className="flex h-[169.11px] items-center text-[128px] font-light leading-[1.2] text-[#fffdf4]">
                    {y.year}
                  </p>
                  <p className={`font-normal text-white ${y.captionClass}`}>{y.caption}</p>
                </div>
              </div>
              {/* media slot: a black placeholder in the Figma */}
              <div data-slot={y.year} className="h-[281.11px] rounded-[30px] bg-black p-[48px]" />
            </article>
          ))}
        </div>
      </Stage>
    </section>
  );
}
