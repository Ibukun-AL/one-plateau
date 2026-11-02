"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Button from "./Button";
import LogoCrop, { LOGO_CROPS } from "./LogoCrop";

const MONTHS = ["November", "December", "January"];
const FILTERS = ["All", "Fashion", "Art", "Music", "Carnival", "Food", "Movie"];
const FILTER_X = [151, 201, 286, 339, 411, 497, 564]; // chip left edges (text sits 14px in), measured from the Figma

function LogoTile({ bg, children }: { bg: string; children: React.ReactNode }) {
  return (
    <div
      className="flex h-[72px] w-[134px] items-center justify-center overflow-hidden rounded-[12px]"
      style={{ background: bg }}
    >
      {children}
    </div>
  );
}

const Logo = ({ src, w = 110 }: { src: string; w?: number }) => (
  <img src={`/assets/section2/${src}.png`} alt="" className="max-h-[64px] object-contain" style={{ width: w }} />
);

const DAYS: { d: string; n: number; tile: React.ReactNode }[] = [
  {
    d: "MON",
    n: 24,
    tile: (
      <LogoTile bg="#fffdf4">
        {/* Tin City Fashion Week: a dark block masked by the logo's alpha */}
        <div
          role="img"
          aria-label="Tin City Fashion Week"
          className="h-[44px] w-[110px] bg-[#111]"
          style={{
            maskImage: "url(/assets/section2/logo-tcfw-mask.png)",
            maskMode: "alpha",
            maskRepeat: "no-repeat",
            maskSize: "contain",
            maskPosition: "center",
          }}
        />
      </LogoTile>
    ),
  },
  {
    d: "TUE",
    n: 25,
    tile: (
      <LogoTile bg="#fffdf4">
        {/* placeholder: logo asset not available */}
        <span className="text-center text-[11px] font-black leading-[1.05] text-[#111]">
          EXPERIENCE
          <br />
          PLATEAU
        </span>
      </LogoTile>
    ),
  },
  { d: "WED", n: 26, tile: <LogoTile bg="#eef8ee"><Logo src="logo-unity-carols" w={118} /></LogoTile> },
  { d: "THU", n: 27, tile: <LogoTile bg="#fdeadd"><Logo src="logo-cultural-carnival" w={118} /></LogoTile> },
  { d: "FRI", n: 28, tile: <LogoTile bg="#fff6d8"><Logo src="logo-jos-food" w={66} /></LogoTile> },
  {
    d: "SAT",
    n: 29,
    tile: (
      <LogoTile bg="#c9caf8">
        <LogoCrop crop={LOGO_CROPS.nav} className="h-[48px] w-[63px] opacity-90" alt="One Fest" />
      </LogoTile>
    ),
  },
  {
    d: "SUN",
    n: 30,
    tile: (
      <LogoTile bg="#eefaf3">
        {/* placeholder: logo asset not available */}
        <span className="text-center text-[13px] font-black leading-[1] text-[#0b6b34]">
          Crossover
          <br />
          Plateau
        </span>
      </LogoTile>
    ),
  },
];

/** Figma "EXPL - OPF Web 2.5" content: month/view toggles, filters, week grid. Lives in FinaleScene. */
export default function CalendarContent() {
  const [month, setMonth] = useState("December");
  const [filter, setFilter] = useState("All");
  const [view, setView] = useState<"Calendar" | "List">("Calendar");

  return (
    <>
      <h2
        data-a="fin-cal-title"
        className="absolute left-0 top-[263px] w-[1441px] text-center font-[family-name:var(--font-bungee)] text-[78px] leading-none text-[#fffdf4]"
      >
        CALENDAR
      </h2>

      <div data-a="fin-cal" className="absolute inset-0">
      {/* month + view toggles */}
      <div className="absolute left-[137px] top-[306px] flex h-[36px] items-center gap-[4px] text-[14px] font-medium">
        {MONTHS.map((m) => (
          <button
            key={m}
            onClick={() => setMonth(m)}
            className={`h-full rounded-[8px] px-[12px] transition-colors ${
              month === m ? "bg-[#151714] text-[#fffdf4]" : "text-[#fffdf4] hover:bg-white/15"
            }`}
          >
            {m}
          </button>
        ))}
      </div>
      <div className="absolute right-[136px] top-[306px] flex h-[36px] items-center gap-[4px] text-[14px] font-medium">
        {(["Calendar", "List"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`h-full rounded-[8px] px-[14px] transition-colors ${
              view === v ? "bg-[#151714] text-[#fffdf4]" : "text-[#fffdf4] hover:bg-white/15"
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      {/* filter bar */}
      <div className="absolute left-[137px] top-[353px] h-[61px] w-[1166px] rounded-[24px] border-[1.5px] border-white/35 bg-white/10">
        {FILTERS.map((f, i) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`absolute top-[12px] h-[36px] rounded-[10px] px-[14px] text-[14px] font-medium transition-colors ${
              filter === f ? "bg-white text-[#111]" : "text-[#fffdf4] hover:bg-white/15"
            }`}
            style={{ left: FILTER_X[i] - 137 - 1.5 }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* week grid */}
      <div className="absolute left-[137px] top-[427px] h-[480px] w-[1166px] rounded-[26px] border-[1.5px] border-white/35">
        <div className="grid h-[130px] grid-cols-7">
          {DAYS.map((day, i) => (
            <div key={day.n} className={`relative px-[14px] ${i > 0 ? "border-l border-white/25" : ""}`}>
              <p className="absolute left-[14px] top-[15px] text-[11px] font-medium tracking-wide text-[#fffdf4]">{day.d}</p>
              <p className="absolute right-[14px] top-[10px] text-[24px] font-bold leading-none text-[#151714]">{day.n}</p>
              <div className="absolute left-[14px] top-[68px]">{day.tile}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute left-[137px] top-[945px]">
        <Button variant="green" href="#calendar" width={281} gap={38} fontSize={14}>
          View full festival calendar
        </Button>
      </div>
      </div>
    </>
  );
}
