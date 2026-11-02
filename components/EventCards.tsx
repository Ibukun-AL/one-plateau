/* eslint-disable @next/next/no-img-element */

const CARD_X = [-105.93, 153.07, 412.07, 668.57, 977, 1236];

type Crop = { w: string; h: string; left: string; top: string };

const LOGOS: { src: string; x: number; y: number; w: number; h: number; crop: Crop }[] = [
  {
    src: "logo-jos-food",
    x: -32.09, y: 774.75, w: 58.83, h: 62.5,
    crop: { w: "120.23%", h: "113.18%", left: "-10.07%", top: "-10.11%" },
  },
  {
    src: "logo-cultural-carnival",
    x: 160.93, y: 768.17, w: 190.78, h: 75.67,
    crop: { w: "103.02%", h: "129.87%", left: "-2.03%", top: "-17.57%" },
  },
  {
    src: "logo-enchanting",
    x: 435.73, y: 771.64, w: 159.19, h: 68.71,
    crop: { w: "100%", h: "154.45%", left: "0", top: "-28.51%" },
  },
  {
    src: "logo-family-christmas",
    x: 990.09, y: 766.32, w: 97.79, h: 75.36,
    crop: { w: "100%", h: "129.77%", left: "0", top: "-15.56%" },
  },
  {
    src: "logo-unity-carols",
    x: 1244.54, y: 772.29, w: 189.43, h: 67.42,
    crop: { w: "100%", h: "130.03%", left: "0", top: "0" },
  },
];

/** Festival logo cards, section 2 (Figma "Group 1000009120"). */
export default function EventCards() {
  return (
    <>
      {CARD_X.map((x) => (
        <div
          key={x}
          data-a="card"
          className="absolute top-[750px] h-[112px] w-[206.5px] rounded-[21.7px] bg-[rgba(6,39,20,0.2)]"
          style={{ left: x }}
        />
      ))}

      {LOGOS.map((l) => (
        <div
          key={l.src}
          data-a="card"
          className="pointer-events-none absolute overflow-hidden"
          style={{ left: l.x, top: l.y, width: l.w, height: l.h }}
        >
          <img
            src={`/assets/section2/${l.src}.png`}
            alt=""
            className="absolute max-w-none"
            style={{ width: l.crop.w, height: l.crop.h, left: l.crop.left, top: l.crop.top }}
          />
        </div>
      ))}

      {/* Tin City Fashion Week: a cream block masked by the logo's alpha */}
      <div
        data-a="card"
        role="img"
        aria-label="Tin City Fashion Week"
        className="pointer-events-none absolute bg-[#fffdf4]"
        style={{
          left: 685.64,
          top: 781.79,
          width: 172.36,
          height: 56.82,
          maskImage: "url(/assets/section2/logo-tcfw-mask.png)",
          maskMode: "alpha",
          maskRepeat: "no-repeat",
          maskSize: "181.13px 72.44px",
          maskPosition: "-4.38px -8.85px",
        }}
      />

      <p
        data-a="card"
        className="absolute left-[883.92px] top-[782.76px] w-[94.08px] text-[16px] font-medium leading-[1.1] text-[#fffdf4]"
      >
        4th
        <br />
        Edition
        <br />
        (Biannual)
      </p>
      <p
        data-a="card"
        className="absolute left-[1099px] top-[786.2px] w-[82.41px] text-[12px] font-medium leading-[1.1] text-[#fffdf4]"
      >
        JOS FAMILY CHRISTMAS
        <br />
        FESTIVAL
      </p>
    </>
  );
}
