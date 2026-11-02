"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import {
  HeartIcon,
  InstagramIcon,
  PlayIcon,
  ReplyIcon,
  RepostIcon,
  TikTokIcon,
  XIcon,
} from "./icons";
import LogoCrop, { LOGO_CROPS } from "./LogoCrop";

type Platform = "Instagram" | "TikTok" | "X";
const TABS = ["All", "Instagram", "TikTok", "X"] as const;
const TAB_X = [131, 201, 317, 403]; // chip left edges, as in the Figma

function Tile({
  platform,
  tab,
  x,
  y,
  w,
  h,
  className = "",
  style,
  children,
}: {
  platform: Platform;
  tab: string;
  x: number;
  y: number;
  w: number;
  h: number;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const on = tab === "All" || tab === platform;
  return (
    <div data-a="soc-tile" className="absolute" style={{ left: x, top: y, width: w, height: h }}>
      <div
        data-platform={platform}
        className={`relative h-full w-full overflow-hidden rounded-[28px] transition-all duration-500 ${
          on ? "opacity-100" : "pointer-events-none scale-[0.97] opacity-20"
        } ${className}`}
        style={style}
      >
        {children}
      </div>
    </div>
  );
}

const Badge = () => (
  <span className="absolute right-[14px] top-[14px] flex h-[40px] w-[40px] items-center justify-center rounded-[12px] bg-black/55 text-white">
    <InstagramIcon className="h-[22px] w-[22px]" />
  </span>
);

const Likes = ({ n, dark = true }: { n: string; dark?: boolean }) => (
  <span
    className={`absolute bottom-[14px] left-[14px] flex h-[34px] items-center gap-[7px] rounded-full px-[14px] text-[13px] font-medium text-white ${
      dark ? "bg-black/55" : "bg-black/40"
    }`}
  >
    <HeartIcon className="h-[15px] w-[15px]" />
    {n}
  </span>
);

function Post({ light, text, time, meta }: { light: boolean; text: string; time: string; meta: [string, string, string] }) {
  const ink = light ? "text-[#151714]" : "text-white";
  const faint = light ? "text-[#151714]/55" : "text-white/65";
  return (
    <div className="relative h-full w-full p-[24px]">
      <div className="flex items-center gap-[12px]">
        <div className="flex h-[40px] w-[40px] items-center justify-center overflow-hidden rounded-full bg-[#0d3b2a]">
          <LogoCrop crop={LOGO_CROPS.nav} className="h-[26px] w-[34px]" alt="One Plateau Fest" />
        </div>
        <div className="leading-tight">
          <p className={`text-[15px] font-bold ${ink}`}>One Plateau Fest</p>
          <p className={`text-[12px] ${faint}`}>@oneplateaufest · {time}</p>
        </div>
        <XIcon className={`ml-auto mr-[6px] h-[18px] w-[18px] ${ink}`} />
      </div>
      <p className={`mt-[18px] text-[18px] leading-[23px] ${ink}`}>{text}</p>
      <div className={`absolute bottom-[24px] left-[24px] flex gap-[20px] text-[13px] font-medium ${light ? "text-[#151714]/70" : "text-white"}`}>
        <span className="flex items-center gap-[6px]"><ReplyIcon className="h-[16px] w-[16px]" />{meta[0]}</span>
        <span className="flex items-center gap-[6px]"><RepostIcon className="h-[16px] w-[16px]" />{meta[1]}</span>
        <span className="flex items-center gap-[6px]"><HeartIcon className="h-[16px] w-[16px]" />{meta[2]}</span>
      </div>
    </div>
  );
}

function VideoCaption({ text, views }: { text: string; views: string }) {
  return (
    <div className="absolute inset-x-[18px] bottom-[16px] text-white">
      <p className="text-[15px] font-bold">@oneplateaufest</p>
      <p className="mt-[3px] text-[14px] leading-[1.25]">{text}</p>
      <p className="mt-[6px] flex items-center gap-[6px] text-[12px] font-medium">
        <PlayIcon className="h-[10px] w-[10px]" />
        {views}
      </p>
    </div>
  );
}

const PlayButton = () => (
  <span className="absolute left-1/2 top-1/2 flex h-[62px] w-[62px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-black/35 text-white backdrop-blur-sm">
    <PlayIcon className="ml-[3px] h-[22px] w-[22px]" />
  </span>
);

/**
 * Figma "EXPL - OPF Web 2.6" with the "Socials - V1 Tabbed Glass Wall" content: title, tabs and a
 * filterable tile wall. Lives in StoryScene, over the glass panel.
 * Photos other than the ONE-letters shot are stand-ins until the real assets are available.
 */
export default function SocialsContent() {
  const [tab, setTab] = useState<string>("All");

  return (
    <>
      <div data-a="fin-soc-title" className="pointer-events-none absolute inset-0">
        <h2 className="absolute left-0 top-[256px] w-[1441px] text-center font-[family-name:var(--font-bungee)] text-[78px] leading-none text-[#fffdf4]">
          SOCIALS
        </h2>
      </div>

      <div data-a="fin-soc" className="absolute inset-0">
      {/* tabs */}
      {TABS.map((t, i) => (
        <button
          key={t}
          onClick={() => setTab(t)}
          className={`absolute top-[313px] h-[36px] rounded-[10px] px-[14px] text-[15px] font-medium transition-colors ${
            tab === t ? "bg-[#111] text-[#fffdf4]" : "text-[#fffdf4] hover:bg-white/15"
          }`}
          style={{ left: TAB_X[i] }}
        >
          {t}
        </button>
      ))}
      <p className="absolute left-[1108px] top-[321px] text-[15px] font-medium text-[#fffdf4]">Follow</p>
      {[InstagramIcon, TikTokIcon, XIcon].map((Icon, i) => (
        <a
          key={i}
          href="#socials"
          aria-label={["Instagram", "TikTok", "X"][i]}
          className="absolute top-[310px] flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#111] text-white transition-transform hover:scale-110"
          style={{ left: 1170 + i * 49.5 }}
        >
          <Icon className="h-[18px] w-[18px]" />
        </a>
      ))}
      <div className="absolute left-[130px] top-[372px] h-px w-[1179px] bg-white/20" />
      </div>

      {/* column 1 */}
      <Tile platform="Instagram" tab={tab} x={130} y={392} w={283} h={236}>
        <img src="/assets/section4/one-photo.png" alt="" className="h-full w-full object-cover" />
        <Badge />
        <Likes n="3,912" />
      </Tile>
      <Tile platform="X" tab={tab} x={130} y={645} w={283} h={255} className="bg-[#fffdf4]">
        <Post light text="21 days to go. Food, fashion, carols and carnival. Plateau is getting ready to welcome you home." time="2h" meta={["84", "312", "1.2K"]} />
      </Tile>

      {/* column 2: tall video */}
      <Tile platform="TikTok" tab={tab} x={429} y={392} w={283} h={508} className="bg-[#141414]">
        <img
          src="/assets/hero/people.png"
          alt=""
          className="absolute max-w-none"
          style={{ width: 520, height: 416, left: -140, top: 90 }}
        />
        <span className="absolute left-[24px] top-[24px] flex items-center gap-[6px] text-[13px] font-medium text-white">
          <TikTokIcon className="h-[14px] w-[14px]" /> TikTok
        </span>
        <PlayButton />
        <div className="absolute inset-x-0 bottom-0 h-[170px] bg-gradient-to-t from-black/80 to-transparent" />
        <VideoCaption text="Meet the faces of One Plateau Fest. Many people, one Plateau." views="48.2K views" />
      </Tile>

      {/* column 3 */}
      <Tile platform="X" tab={tab} x={728} y={392} w={283} h={256} className="bg-[#6e3cc0]">
        <Post light={false} text="TinCity Fashion Week line-up drops Friday. Designers from Jos and beyond, one runway. Who are you coming to see?" time="5h" meta={["126", "540", "2.9K"]} />
      </Tile>
      <Tile platform="Instagram" tab={tab} x={728} y={663} w={283} h={237} className="bg-[#fad20f]">
        <img src="/assets/section3/cap.png" alt="" className="absolute left-[40px] top-[22px] h-[190px] w-[200px] object-contain" />
        <Badge />
        <Likes n="1,204" />
      </Tile>

      {/* column 4 */}
      <Tile platform="Instagram" tab={tab} x={1027} y={392} w={283} h={247} className="bg-[#d92b24]">
        <img src="/assets/hero/one-beads.png" alt="" className="absolute left-[34px] top-[76px] w-[215px] object-contain" />
        <Badge />
        <Likes n="2,077" />
      </Tile>
      <Tile
        platform="TikTok"
        tab={tab}
        x={1027}
        y={654}
        w={283}
        h={246}
        style={{ background: "linear-gradient(180deg,#8cab2f 0%,#42631a 60%,#1f2e0f 100%)" }}
      >
        <img src="/assets/section3/a-mani.png" alt="" className="absolute left-[78px] top-[30px] h-[170px] object-contain" />
        <span className="absolute left-[14px] top-[14px] flex h-[32px] items-center gap-[6px] rounded-full bg-black/45 px-[12px] text-[13px] font-medium text-white">
          <TikTokIcon className="h-[13px] w-[13px]" /> TikTok
        </span>
        <PlayButton />
        <div className="absolute inset-x-0 bottom-0 h-[130px] bg-gradient-to-t from-black/70 to-transparent" />
        <VideoCaption text="Weaving the story of Plateau, thread by thread." views="21.7K views" />
      </Tile>

      {/* footer row */}
      <div data-a="fin-soc" className="absolute inset-0">
      <a
        href="#socials"
        className="absolute left-[130px] top-[921px] flex h-[50px] w-[359px] items-center justify-between rounded-[10px] bg-[#111] px-[22px] text-[14px] text-[#fffdf4] transition-colors hover:bg-black"
      >
        Follow @oneplateaufest everywhere <span aria-hidden>→</span>
      </a>
      <p className="absolute right-[133px] top-[935px] text-[15px] font-medium text-[#fffdf4]">
        #OnePlateauFest &nbsp; #OneExperience
      </p>
      </div>
    </>
  );
}
