"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CenturyOverlay from "./CenturyOverlay";
import { STAGE_H } from "./Stage";

gsap.registerPlugin(ScrollTrigger);

// Where the ONE beads end up: Figma's section-3 logo (53, 214.67, 413 wide)
const ONE_HERO = { left: 437, top: 212, width: 568 };
const ONE_LOGO = { left: 53, top: 214.67, width: 413 };
const ONE_SECTION2_WIDTH = 722;
const COLUMN_H = 1176;

/**
 * Owns the viewport scale (`--s`), and the timeline for the screen-pinned overlay:
 * the ONE beads grow in section 2, then shrink into section 3's logo while section 3
 * scrolls in from below. The rest of the left column is revealed by clipping.
 */
export default function ExperienceRoot({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const scale = () => window.innerHeight / STAGE_H;
    const setScale = () => el.style.setProperty("--s", String(scale()));
    setScale();
    window.addEventListener("resize", setScale);

    const ctx = gsap.context(() => {
      const scene = el.querySelector<HTMLElement>("[data-a=scene]");
      const century = el.querySelector<HTMLElement>("[data-a=century]");
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.set("[data-a=one]", { transformOrigin: "0 0" });

      // 0-1: hero -> section 2 (pinned scene). 1-2: section 2 -> section 3 scrolls in.
      if (scene) {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: scene,
            start: "top top",
            end: "bottom top",
            scrub: reduce ? true : 0.6,
            invalidateOnRefresh: true,
          },
        });

        // the PLATEAU badge lifts away at page speed, like the hero it sits on
        tl.to("[data-a=badge]", { y: -STAGE_H, ease: "none", duration: 1 }, 0).to(
          "[data-a=one]",
          {
            scale: ONE_SECTION2_WIDTH / ONE_HERO.width,
            x: -(ONE_SECTION2_WIDTH - ONE_HERO.width) / 2, // keep it centred
            ease: "power2.inOut",
            duration: 0.8,
          },
          0.1,
        )
          .to(
            "[data-a=one]",
            {
              scale: ONE_LOGO.width / ONE_HERO.width,
              x: ONE_LOGO.left - ONE_HERO.left,
              y: ONE_LOGO.top - ONE_HERO.top,
              ease: "power2.inOut",
              duration: 0.85,
            },
            1.1,
          )
          .set({}, {}, 2);
      }

      // Reveal the pinned column exactly as section 3's top edge passes over it (no smoothing,
      // so it can't drift from the real edge).
      const clip = el.querySelector<HTMLElement>("[data-a=col-clip]");
      if (scene && century && clip) {
        const updateClip = () => {
          const top = Math.max(0, century.getBoundingClientRect().top);
          clip.style.clipPath = `inset(${top / scale()}px 0 0 0)`;
        };
        ScrollTrigger.create({
          trigger: scene,
          start: "top top",
          end: "bottom top",
          onUpdate: updateClip,
          onRefresh: updateClip,
          onLeave: updateClip,
          onLeaveBack: updateClip,
        });
      }

      // The pinned column leaves with the end of section 3, like a sticky box releasing.
      if (century) {
        gsap.to("[data-a=col]", {
          y: -COLUMN_H,
          ease: "none",
          scrollTrigger: {
            trigger: century,
            start: () => `bottom ${COLUMN_H * scale()}px`,
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }
    }, el);

    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("resize", setScale);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={root} style={{ ["--s" as string]: 1 }}>
      {children}
      <CenturyOverlay />
    </div>
  );
}
