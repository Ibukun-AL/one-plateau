"use client";

/* eslint-disable @next/next/no-img-element */
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LogoCrop, { LOGO_CROPS } from "./LogoCrop";
import SectionShell from "./SectionShell";
import Textile from "./Textile";

gsap.registerPlugin(ScrollTrigger);

const EXPLORE = [
  { label: "Experiences", href: "#experiences" },
  { label: "Calendar", href: "#calendar" },
  { label: "Plateau in 100", href: "#plateau-in-100" },
];
const VISIT = [
  { label: "Plan your visit", href: "#plan-your-visit" },
  { label: "News & stories", href: "#socials" },
  { label: "Partners", href: "#" },
];

function LinkColumn({ title, x, links }: { title: string; x: number; links: typeof EXPLORE }) {
  return (
    <>
      <p className="absolute top-[195px] text-[12px] font-bold tracking-[0.2em] text-[#96c93d]" style={{ left: x }}>
        {title}
      </p>
      {links.map((l, i) => (
        <a
          key={l.label}
          href={l.href}
          className="absolute text-[18px] font-medium leading-[24px] text-[#fffdf4] transition-opacity hover:opacity-70"
          style={{ left: x, top: 227 + i * 38 }}
        >
          {l.label}
        </a>
      ))}
    </>
  );
}

/**
 * Figma "Footer 2": yellow, a dark glass card over an angled bead string.
 * The angled string is a rotated slice of the master string (the Figma uses a separate image).
 */
export default function SiteFooter() {
  const wrap = useRef<HTMLDivElement>(null);

  // Entrance: the string swings from vertical to its diagonal while the card rises.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: wrap.current, start: "top bottom", end: "top 20%", scrub: reduce ? true : 0.6 },
        })
        .fromTo(
          "[data-a=foot-string]",
          { rotation: 86, scale: 0.5, autoAlpha: 0 },
          { rotation: 50, scale: 0.62, autoAlpha: 1, ease: "power2.out", duration: 1 },
          0,
        )
        .fromTo("[data-a=foot-card]", { y: 150, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: "power3.out", duration: 1 }, 0)
        .fromTo("[data-a=foot-dress-l]", { x: -260 }, { x: 0, ease: "power2.out", duration: 1 }, 0)
        .fromTo("[data-a=foot-dress-r]", { x: 260 }, { x: 0, ease: "power2.out", duration: 1 }, 0);
    }, wrap);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrap} className="relative z-10">
    <SectionShell height={660} bg="bg-fest-yellow">
      <Textile dataA="foot-dress-l" kind="a" left={-277} top={62} />
      <Textile dataA="foot-dress-r" kind="a" left={1288} top={62} />

      <div
        data-a="foot-string"
        className="pointer-events-none absolute left-[465px] top-[-659px] w-[509.73px]"
        style={{ height: 1977.8 }}
      >
        {["string-09", "string-10"].map((name) => (
          <div key={name} className="relative h-[988.9px] w-full overflow-hidden">
            <img
              src={`/assets/section4/${name}.png`}
              alt=""
              className="absolute left-[-88.65%] top-0 h-[99.98%] w-[274.33%] max-w-none"
            />
          </div>
        ))}
      </div>

      <footer data-a="foot-card" className="absolute inset-0">
        <div className="absolute left-[82px] top-[133px] h-[395px] w-[1276px] rounded-[36px] border border-white/10 bg-[rgba(24,20,6,0.82)] backdrop-blur-[18px]" />

        <h2 className="absolute left-[146px] top-[190px] text-[56px] font-bold leading-[60px] text-[#fffdf4]">
          One Plateau.
          <br />
          Many Experiences.
        </h2>
        <p className="absolute left-[146px] top-[333px] text-[14px] font-medium text-[#fad20f]">
          22 NOV 2026 — 01 JAN 2027
        </p>
        <p className="absolute left-[358px] top-[333px] text-[14px] text-white/60">Plateau State, Nigeria</p>

        <LinkColumn title="EXPLORE" x={830} links={EXPLORE} />
        <LinkColumn title="VISIT" x={1094} links={VISIT} />

        <div className="absolute left-[146px] top-[399px] h-px w-[1148px] bg-white/15" />
        <p className="absolute left-[146px] top-[449px] text-[12px] text-white/50">© 2026 One Plateau Fest</p>
        <a href="#top" aria-label="One Plateau Fest" className="absolute left-[1217px] top-[426px]">
          <LogoCrop crop={LOGO_CROPS.nav} className="h-[57px] w-[75px]" alt="One Plateau Fest" />
        </a>
      </footer>
    </SectionShell>
    </div>
  );
}
