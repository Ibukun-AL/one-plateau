"use client";

/* eslint-disable @next/next/no-img-element */
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "./Button";
import EventCards from "./EventCards";
import LogoCrop, { LOGO_CROPS } from "./LogoCrop";
import Stage, { STAGE_H } from "./Stage";
import TypeAsset from "./TypeAsset";

gsap.registerPlugin(ScrollTrigger);

const NAV = [
  { label: "Experiences", href: "#experiences", width: "w-[92.49px]" },
  { label: "Calender", href: "#calendar", width: "w-[68.75px]" },
  { label: "Plateau in 100", href: "#plateau-in-100", width: "w-[106.16px]" },
  { label: "Plan your visit", href: "#plan-your-visit", width: "w-[107.48px]" },
];

// Fade of the bottom of the frame, shared by hero (red -> black) and section 2 (yellow -> olive).
const FADE_STYLE = {
  top: "calc(var(--s, 1) * 508.37px)",
  height: "calc(var(--s, 1) * 745.63px)",
  filter: "blur(calc(var(--s, 1) * 13.5px))",
  backgroundImage:
    "linear-gradient(to bottom, rgba(102,102,102,0) 0%, rgba(0,0,0,0.6) 68.105%)",
} as const;

/**
 * Hero (Figma "EXPL - OPF Web 2.1") scrolling into section 2 ("EXPL - OPF Web 2.2").
 *
 * One 100vh sticky viewport, 200vh of scroll. Two layers (the ONE beads and PLATEAU badge sit in
 * CenturyOverlay so they stay in front of everything):
 *   under  - section 2, pinned, uncovered as the hero leaves
 *   hero   - scrolls up and away
 */
export default function IntroScene() {
  const scene = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = scene.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: reduce ? true : 0.6,
          invalidateOnRefresh: true,
        },
      });

      // Things that travel with the page
      tl.to("[data-a=hero]", { y: () => -window.innerHeight, duration: 1 }, 0)
        .to("[data-a=string]", { y: -STAGE_H, duration: 1 }, 0);

      // (The ONE beads are animated by ExperienceRoot, in a pinned overlay.)

      // EXPIRIENCE rises from behind the photo (y 837 -> 500)
      tl.to("[data-a=type]", { y: 500.32 - 837, ease: "power1.out", duration: 1 }, 0);

      // Side textiles slide inward
      tl.to("[data-a=mani-l]", { x: 175.37, ease: "power2.out", duration: 1 }, 0)
        .to("[data-a=mani-r]", { x: -170.6, ease: "power2.out", duration: 1 }, 0)
        .fromTo("[data-a=b-l]", { x: -60 }, { x: 0, ease: "power2.out", duration: 1 }, 0)
        .fromTo("[data-a=b-r]", { x: 60 }, { x: 0, ease: "power2.out", duration: 1 }, 0);

      // Section 2 content settles in as the hero clears
      tl.fromTo("[data-a=olive]", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.7 }, 0.3)
        .fromTo(
          "[data-a=celebrating]",
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.2 },
          0.8,
        )
        .fromTo(
          "[data-a=tagline]",
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.2 },
          0.8,
        );

      // Event cards: one tween each (GSAP only gave the first staggered target its hidden start
      // state), all finishing by progress 1 so the timeline is exactly one scroll-length long.
      const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-a=card]"));
      cards.forEach((card, i) => {
        tl.fromTo(
          card,
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.18 },
          0.7 + (i * 0.1) / Math.max(1, cards.length - 1),
        );
      });
      tl.set({}, {}, 1);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={scene} data-a="scene" className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-fest-yellow">
        {/* ---------- under: section 2 ---------- */}
        <div
          data-a="olive"
          className="pointer-events-none absolute inset-x-[-5%] z-10"
          style={FADE_STYLE}
        />

        <Stage className="z-20">
          {/* textiles */}
          <img
            data-a="mani-l"
            src="/assets/shared/textile.png"
            alt=""
            className="absolute left-[-403.98px] top-[223px] h-[578px] w-[457.22px] max-w-none object-cover"
          />
          <img
            data-a="mani-r"
            src="/assets/shared/textile.png"
            alt=""
            className="absolute left-[1381.99px] top-[223px] h-[578px] w-[457.22px] max-w-none object-cover"
          />
          <img
            data-a="b-l"
            src="/assets/section2/b-mani.png"
            alt=""
            className="absolute left-[-400.84px] top-[223px] h-[578px] w-[457.22px] max-w-none object-cover"
          />
          <img
            data-a="b-r"
            src="/assets/section2/b-mani.png"
            alt=""
            className="absolute left-[1390.63px] top-[223px] h-[578px] w-[457.22px] max-w-none object-cover"
          />

          {/* bead string, two 509 x 1004 slices of the master artwork */}
          <div
            data-a="string"
            className="pointer-events-none absolute left-[465.13px] top-[717.65px] w-[509.73px]"
          >
            {["string-01", "string-02"].map((name) => (
              <div key={name} className="relative h-[1003.69px] w-full overflow-hidden">
                <img
                  src={`/assets/section2/${name}.png`}
                  alt=""
                  className="absolute left-[-91.1%] top-0 h-[100.01%] w-[278.53%] max-w-none"
                />
              </div>
            ))}
          </div>

          <TypeAsset className="top-[837px]" />
          <EventCards />

          <h2
            data-a="celebrating"
            className="absolute left-[1px] top-[119.03px] w-[1441px] text-center text-[72px] font-bold leading-[1.191] text-[#fffdf4]"
          >
            CELEBRATING
          </h2>
          <p
            data-a="tagline"
            className="absolute left-[70px] top-[915.58px] w-[641px] text-[18px] font-medium leading-[1.191] text-black"
          >
            A celebration of Plateau’s people, cultures and creative industries, bringing
            generations together through shared experiences.
          </p>
        </Stage>

        {/* ---------- hero ---------- */}
        <div
          data-a="hero"
          className="absolute inset-x-0 top-0 z-[60] h-full overflow-hidden bg-fest-red"
        >
          <Stage>
            <LogoCrop
              crop={LOGO_CROPS.fest}
              className="absolute left-[483.23px] top-[414.56px] h-[169.86px] w-[474.71px]"
              alt="Fest"
            />
            <img
              src="/assets/hero/people.png"
              alt="Five people in traditional Plateau attire"
              className="absolute left-[-95.76px] top-[123.83px] h-[1228.61px] w-[1535.76px] max-w-none object-cover"
            />
            <p className="absolute left-[51.41px] top-[383.7px] text-[16px] font-bold leading-[30px] text-white">
              ONE PLATEAU
            </p>
            <p className="absolute right-[49.58px] top-[383.7px] text-right text-[16px] font-bold leading-[30px] text-white">
              MANY EXPERIENCES
            </p>
          </Stage>

          <div className="pointer-events-none absolute inset-x-[-5%]" style={FADE_STYLE} />

          <Stage>
            <p
              data-a="hero-dates"
              className="absolute left-0 top-[828px] w-[1441px] text-center text-[12px] font-semibold uppercase tracking-[0.14em] text-white/75"
            >
              22 Nov 2026 — 01 Jan 2027 · Plateau State, Nigeria
            </p>
            <Button variant="yellow" href="#experiences" className="absolute left-[464px] top-[862px]">
              Explore events
            </Button>
            <Button variant="green" href="#plan-your-visit" className="absolute left-[727px] top-[862px]">
              Plan your experience
            </Button>

            <header className="absolute left-[50px] top-[27px] flex w-[933.93px] items-center justify-between">
              <a href="#top" aria-label="One Plateau Fest">
                <LogoCrop crop={LOGO_CROPS.nav} className="h-[79px] w-[104px]" alt="One Plateau Fest" />
              </a>
              <nav className="flex gap-[50px] text-[14px] font-medium leading-[22px] text-white">
                {NAV.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`relative ${item.width} after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </header>
          </Stage>
        </div>
      </div>
    </div>
  );
}
