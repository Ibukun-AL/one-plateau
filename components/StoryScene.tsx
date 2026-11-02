"use client";

/* eslint-disable @next/next/no-img-element */
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BeadString from "./BeadString";
import CalendarContent from "./CalendarSection";
import CtaContent from "./CtaSection";
import EventsTrack, { EVENTS_TOP, EVENTS_TRAVEL } from "./EventsSection";
import SocialsContent from "./SocialsSection";
import Stage, { STAGE_H } from "./Stage";
import Textile from "./Textile";

gsap.registerPlugin(ScrollTrigger);

// Timeline units are design px of scroll. R: section 3 lifts away and this scene is revealed.
// E: the event cards slide sideways. M: each hand-off (events > calendar > socials > CTA).
const R = STAGE_H;
const E = 2800;
const M = 1200;
const T1 = R + E; // events  -> calendar
const T2 = T1 + M; // calendar -> socials
const T3 = T2 + M; // socials  -> CTA
const END = T3 + M;

const RED = "#e3171d";
const YELLOW = "#fad20f";
const GREEN = "#059c45";

const FG = ["[data-a=fg-cap]", "[data-a=fg-dress-l]", "[data-a=fg-dress-r]"];

/**
 * Figma 2.4 (events) > 2.5 (calendar) > 2.6 (socials) > 2.7 (CTA) as one pinned scene.
 * The cap, the side dresses and the ONE beads are shared elements that travel between the
 * states; the background colour and the bead string carry the hand-offs.
 *
 *  - reveal: the previous section lifts away; the cap and dresses come in together
 *  - events: cap and dresses float together in front of the sliding glass cards
 *  - events > calendar: cap and dresses leave together, the ONE beads rise from the bottom
 *  - calendar > socials: same glass panel and ONE; content swaps, colour goes green
 *  - socials > CTA: ONE grows and drops, the cap falls onto it, colour goes red
 */
export default function StoryScene() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const bg = "[data-a=story-bg]";
      const str = "[data-a=story-string]";
      const [cap, dressL, dressR] = FG;
      const one = "[data-a=fin-one]";
      const panel = "[data-a=fin-panel]";

      gsap.set(one, { transformOrigin: "0 0", y: 1100 }); // waits below the screen

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom bottom",
          scrub: reduce ? true : 0.6,
          invalidateOnRefresh: true,
        },
      });

      // ---- reveal: the cards rise, the cap and dresses arrive together
      tl.fromTo(str, { y: STAGE_H }, { y: 0, duration: R }, 0)
        .fromTo(
          "[data-a=events-track]",
          { y: 260, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, ease: "power2.out", duration: R * 0.8 },
          0,
        )
        .fromTo(
          cap,
          { y: -460, rotation: -6, autoAlpha: 0 },
          { y: 0, rotation: 0, autoAlpha: 1, ease: "power3.out", duration: R * 0.7 },
          R * 0.3,
        )
        .fromTo(dressL, { x: -300, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power3.out", duration: R * 0.7 }, R * 0.3)
        .fromTo(dressR, { x: 300, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power3.out", duration: R * 0.7 }, R * 0.3);

      // ---- events: cards slide, cap + dresses drift together
      tl.to("[data-a=events-track]", { x: -EVENTS_TRAVEL, duration: E }, R).to(FG, { y: 40, duration: E }, R);

      // ---- events > calendar
      tl.to("[data-a=events-track]", { y: 240, autoAlpha: 0, ease: "power2.in", duration: M * 0.45 }, T1)
        .to(cap, { y: -480, rotation: 8, autoAlpha: 0, ease: "power2.in", duration: M * 0.55 }, T1)
        .to(dressL, { x: -320, autoAlpha: 0, ease: "power2.in", duration: M * 0.55 }, T1)
        .to(dressR, { x: 320, autoAlpha: 0, ease: "power2.in", duration: M * 0.55 }, T1)
        .to(str, { y: -STAGE_H, duration: M }, T1)
        .to(bg, { backgroundColor: YELLOW, duration: M * 0.6 }, T1 + M * 0.25)
        .fromTo(one, { y: 1100 }, { y: 0, ease: "power3.out", duration: M * 0.7 }, T1 + M * 0.1)
        .fromTo(panel, { y: 260, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: "power2.out", duration: M * 0.5 }, T1 + M * 0.4)
        .fromTo(
          "[data-a=fin-cal-title],[data-a=fin-cal]",
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, ease: "power2.out", duration: M * 0.35 },
          T1 + M * 0.6,
        )
        .fromTo("[data-a=tx-m-l]", { x: -340, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power2.out", duration: M * 0.6 }, T1 + M * 0.35)
        .fromTo("[data-a=tx-m-r]", { x: 340, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power2.out", duration: M * 0.6 }, T1 + M * 0.35);

      // ---- calendar > socials: same panel and ONE, the content swaps
      tl.to("[data-a=fin-cal]", { autoAlpha: 0, y: -40, duration: M * 0.35 }, T2)
        .to("[data-a=fin-cal-title]", { autoAlpha: 0, y: -30, duration: M * 0.3 }, T2)
        .to(bg, { backgroundColor: GREEN, duration: M * 0.7 }, T2 + M * 0.15)
        .to(str, { y: -2 * STAGE_H, duration: M }, T2)
        .fromTo("[data-a=fin-soc-title]", { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, ease: "power2.out", duration: M * 0.3 }, T2 + M * 0.5)
        .fromTo("[data-a=fin-soc]", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, ease: "power2.out", duration: M * 0.3 }, T2 + M * 0.55)
        .to("[data-a=tx-m-l]", { x: -340, autoAlpha: 0, ease: "power2.in", duration: M * 0.5 }, T2)
        .to("[data-a=tx-m-r]", { x: 340, autoAlpha: 0, ease: "power2.in", duration: M * 0.5 }, T2)
        .fromTo("[data-a=tx-b-l]", { x: -340, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power2.out", duration: M * 0.6 }, T2 + M * 0.4)
        .fromTo("[data-a=tx-b-r]", { x: 340, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power2.out", duration: M * 0.6 }, T2 + M * 0.4);

      // tiles: one tween each, so every tile gets its hidden starting state
      const tiles = Array.from(el.querySelectorAll<HTMLElement>("[data-a=soc-tile]"));
      tiles.forEach((tile, i) => {
        tl.fromTo(
          tile,
          { autoAlpha: 0, y: 60, scale: 0.96 },
          { autoAlpha: 1, y: 0, scale: 1, ease: "power2.out", duration: M * 0.25 },
          T2 + M * 0.5 + i * M * 0.025,
        );
        tl.to(tile, { autoAlpha: 0, y: -40, duration: M * 0.25 }, T3 + i * M * 0.02);
      });

      // ---- socials > CTA: ONE grows and drops, the cap falls onto it
      tl.to("[data-a=fin-soc]", { autoAlpha: 0, y: -30, duration: M * 0.3 }, T3)
        .to("[data-a=fin-soc-title]", { autoAlpha: 0, y: -30, duration: M * 0.3 }, T3)
        .to(panel, { autoAlpha: 0, scale: 0.94, transformOrigin: "50% 50%", ease: "power2.in", duration: M * 0.5 }, T3 + M * 0.1)
        .to(bg, { backgroundColor: RED, duration: M * 0.7 }, T3 + M * 0.15)
        // the string settles 166px higher than the page position, so the blue bead sits behind
        // "MANY EXPERIENCES" (as in the Figma) and the white text stays readable
        .to(str, { y: -3 * STAGE_H - 166, duration: M }, T3)
        .fromTo(
          one,
          { scale: 1, x: 0, y: 0 },
          {
            scale: 714 / 452,
            x: 363 - 494,
            y: 346.8 - 97,
            ease: "power2.inOut",
            duration: M * 0.7,
            immediateRender: false, // read from the "to" vars: don't apply the start state at creation
          },
          T3 + M * 0.15,
        )
        .fromTo(
          cap,
          { y: -520, rotation: -12, autoAlpha: 0 },
          { y: 20, rotation: 0, autoAlpha: 1, ease: "back.out(1.3)", duration: M * 0.5 },
          T3 + M * 0.5,
        )
        .to("[data-a=tx-b-l]", { x: -340, autoAlpha: 0, ease: "power2.in", duration: M * 0.5 }, T3)
        .to("[data-a=tx-b-r]", { x: 340, autoAlpha: 0, ease: "power2.in", duration: M * 0.5 }, T3)
        .fromTo(dressL, { x: -320, y: 0, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power2.out", duration: M * 0.6 }, T3 + M * 0.4)
        .fromTo(dressR, { x: 320, y: 0, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power2.out", duration: M * 0.6 }, T3 + M * 0.4)
        .fromTo("[data-a=fin-cta-title]", { autoAlpha: 0, y: 90 }, { autoAlpha: 1, y: 0, ease: "power3.out", duration: M * 0.35 }, T3 + M * 0.6)
        .fromTo("[data-a=fin-cta-sub]", { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, ease: "power3.out", duration: M * 0.3 }, T3 + M * 0.7)
        .fromTo("[data-a=fin-cta-btn]", { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, ease: "power3.out", duration: M * 0.3 }, T3 + M * 0.8)
        .set({}, {}, END);

    }, el);

    return () => ctx.revert();
  }, []);

  const at = (t: number) => ({ top: `calc(var(--s, 1) * ${t}px)` });

  return (
    <section
      ref={root}
      className="relative z-0 w-full"
      style={{
        height: `calc(var(--s, 1) * ${STAGE_H + END}px)`,
        marginTop: `calc(var(--s, 1) * ${-STAGE_H}px)`, // starts under the previous section
      }}
    >
      {/* in-page anchors: each sits where its state is fully formed */}
      <span id="experiences" className="absolute left-0 w-px" style={at(R)} />
      <span id="calendar" className="absolute left-0 w-px" style={at(T1 + M)} />
      <span id="socials" className="absolute left-0 w-px" style={at(T2 + M)} />
      <span id="plan-your-visit" className="absolute left-0 w-px" style={at(END)} />

      <div data-a="story-bg" className="sticky top-0 h-screen overflow-hidden bg-fest-red">
        <Stage>
          {/* bead string for design page y 4980 > 9076; carries the hand-offs */}
          <div data-a="story-string" className="absolute inset-0">
            <BeadString sectionTop={EVENTS_TOP} height={4 * STAGE_H} />
          </div>

          {/* calendar / socials side textiles sit behind the glass panel */}
          <Textile dataA="tx-m-l" kind="m" side="l" top={223} />
          <Textile dataA="tx-m-r" kind="m" side="r" top={223} />
          <Textile dataA="tx-b-l" kind="b" side="l" top={223} />
          <Textile dataA="tx-b-r" kind="b" side="r" top={223} />

          <EventsTrack />

          <div
            data-a="fin-panel"
            className="absolute left-[83px] top-[213px] h-[782px] w-[1274px] rounded-[45px] border border-white/15 bg-[rgba(6,39,20,0.2)] backdrop-blur-[22px]"
          />
          <CalendarContent />
          <SocialsContent />

          {/*
            The ONE is drawn twice so the cap can sit between the letters, as in the Figma CTA:
            the "O" (left 32.5% of the image) is behind the cap, the "N" and "E" are in front.
            32.5% is the empty gap between the O and the N in the PNG. Both copies get the same tweens.
          */}
          <img
            data-a="fin-one"
            src="/assets/hero/one-beads.png"
            alt="One"
            className="pointer-events-none absolute left-[494px] top-[97px] h-[172.8px] w-[452px] max-w-none object-cover"
            style={{ clipPath: "inset(0 67.5% 0 0)" }}
          />
          <div
            data-a="fg-cap"
            className="pointer-events-none absolute left-[510px] top-[57px] h-[383.54px] w-[422px] overflow-hidden"
          >
            <img
              src="/assets/section4/cap-2.png"
              alt=""
              className="absolute left-[-10.6%] top-[-20.05%] h-[142.82%] w-[121.68%] max-w-none"
            />
          </div>

          <img
            data-a="fin-one"
            src="/assets/hero/one-beads.png"
            alt=""
            aria-hidden
            className="pointer-events-none absolute left-[494px] top-[97px] h-[172.8px] w-[452px] max-w-none object-cover"
            style={{ clipPath: "inset(0 0 0 32.5%)" }}
          />
          <CtaContent />

          {/* foreground: the A dresses travel with the cap, in front of the cards */}
          <Textile dataA="fg-dress-l" kind="a" side="l" top={226} />
          <Textile dataA="fg-dress-r" kind="a" side="r" top={226} />
        </Stage>
      </div>
    </section>
  );
}
