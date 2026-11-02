import LogoCrop, { LOGO_CROPS } from "./LogoCrop";

export const EVENTS_TOP = 4980; // y in the design page
const CARD_W = 568;
const CARD_GAP = 50;
const TRACK_W = 8 * CARD_W + 7 * CARD_GAP; // 4894
/** how far the track slides, in design px */
export const EVENTS_TRAVEL = TRACK_W - 1393;

type Card = { cat: string; title: string; panel: string; dark: boolean };

// Titles/labels as in the Figma (cards 7-8 are labelled "Fashion" there too).
const CARDS: Card[] = [
  { cat: "FASHION", title: "TinCity Fashion Week", panel: "#6e3cc0", dark: false },
  { cat: "ART", title: "Enchanting Plateau", panel: "#aacd3a", dark: true },
  { cat: "MUSIC", title: "Christmas Unity Carol", panel: "#fad20f", dark: true },
  { cat: "CARNIVAL", title: "Plateau Cultural Carnival", panel: "#f28c28", dark: true },
  { cat: "FOOD", title: "Jos Food Festival", panel: "#ff9db8", dark: true },
  { cat: "FASHION", title: "Style Fest", panel: "#6e3cc0", dark: false },
  { cat: "FASHION", title: "Jos Food Festival", panel: "#aacd3a", dark: true },
  { cat: "FASHION", title: "Jos Food Festival", panel: "#fad20f", dark: true },
];

function EventCard({ card }: { card: Card }) {
  const ink = card.dark ? "#18200a" : "#ffffff";
  const faint = card.dark ? "rgba(24,32,10,0.55)" : "rgba(255,255,255,0.7)";
  const rule = card.dark ? "rgba(24,32,10,0.18)" : "rgba(255,255,255,0.25)";
  return (
    <article className="relative h-[766px] w-[568px] shrink-0 rounded-[45px] border border-white/20 bg-black/20 backdrop-blur-[14px]">
      {/* media slot (black in the Figma) */}
      <div data-slot={card.title} className="absolute left-[48px] top-[48px] h-[360px] w-[472px] rounded-[34px] bg-black">
        {/* stand-in for the ONE FEST category badge */}
        <div className="absolute left-[28px] top-[30px] h-[82px] w-[108px]">
          <LogoCrop crop={LOGO_CROPS.nav} className="h-full w-full" alt="One Fest" />
          <span
            className="absolute left-[25%] top-[40%] flex h-[14%] w-[51%] items-center justify-center rounded-[2px] text-[6px] font-bold tracking-wider text-white"
            style={{ background: card.panel, color: card.dark ? "#18200a" : "#fff" }}
          >
            {card.cat}
          </span>
        </div>
      </div>

      {/* info panel */}
      <div
        className="absolute left-[48px] top-[408px] h-[310px] w-[472px] rounded-[34px]"
        style={{ background: card.panel, color: ink }}
      >
        <p className="absolute left-[33px] top-[35px] text-[11px] font-medium tracking-[0.2em]" style={{ color: faint }}>
          {card.cat}
        </p>
        <h3 className="absolute left-[33px] top-[62px] w-[406px] whitespace-nowrap text-[28px] font-light leading-[36px]">
          {card.title}
        </h3>
        <div className="absolute left-[33px] top-[104px] h-px w-[406px]" style={{ background: rule }} />

        <p className="absolute left-[33px] top-[125px] text-[10px] font-medium tracking-[0.08em]">WHEN</p>
        <p className="absolute left-[98px] top-[121px] text-[13px] leading-[22px]">
          Date to be confirmed
          <br />
          Time to be confirmed
        </p>
        <div className="absolute left-[33px] top-[173px] h-px w-[406px]" style={{ background: rule }} />
        <p className="absolute left-[33px] top-[193px] text-[10px] font-medium tracking-[0.08em]">WHERE</p>
        <p className="absolute left-[96px] top-[190px] text-[13px] leading-[18px]">Venue to be confirmed</p>
        <p className="absolute left-[33px] top-[218px] text-[11px] leading-[17px]" style={{ color: faint }}>
          Admission details coming soon
        </p>
        <a
          href="#experiences"
          className="absolute left-[33px] top-[245px] flex h-[30px] items-center gap-[8px] border-b text-[12px] leading-[18px]"
          style={{ borderColor: ink }}
        >
          View event details <span aria-hidden>→</span>
        </a>
      </div>
    </article>
  );
}

/** The sliding row of glass cards (Figma "EXPL - OPF Web 2.4"). StoryScene drives `events-track`. */
export default function EventsTrack() {
  return (
    <div className="absolute left-0 top-[213px] h-[766px] w-[1441px] overflow-hidden">
      <div data-a="events-track" className="absolute left-[51px] top-0 flex gap-[50px]">
        {CARDS.map((c, i) => (
          <EventCard key={i} card={c} />
        ))}
      </div>
    </div>
  );
}
