/* eslint-disable @next/next/no-img-element */

type Crop = { w: string; h: string; left: string };
const CROP_A: Crop = { w: "278.53%", h: "100.01%", left: "-91.1%" };
const CROP_B: Crop = { w: "274.33%", h: "99.98%", left: "-88.65%" };

// The master string, cut into slices. `top` is the slice's y in the 9736px-tall design page.
const SLICES = [
  { top: 717.65, h: 1003.69, src: "/assets/section2/string-01.png", crop: CROP_A },
  { top: 1721.34, h: 1003.69, src: "/assets/section2/string-02.png", crop: CROP_A },
  { top: 2725.02, h: 1003.69, src: "/assets/section3/string-03.png", crop: CROP_A },
  { top: 3728.71, h: 1003.69, src: "/assets/section3/string-04.png", crop: CROP_A },
  { top: 4733.39, h: 1003.69, src: "/assets/section3/string-05.png", crop: CROP_A },
  { top: 5737.07, h: 1003.69, src: "/assets/section4/string-06.png", crop: CROP_A },
  { top: 6739.77, h: 988.9, src: "/assets/section4/string-08.png", crop: CROP_B },
  { top: 7727.68, h: 988.9, src: "/assets/section4/string-09.png", crop: CROP_B },
  { top: 8715.6, h: 988.9, src: "/assets/section4/string-10.png", crop: CROP_B },
];

/**
 * The part of the bead string that falls inside a section. `sectionTop` is the section's
 * y in the design page, so the string stays continuous from section to section.
 * Render inside the section's Stage.
 */
export default function BeadString({
  sectionTop,
  height,
  className = "",
}: {
  sectionTop: number;
  height: number;
  className?: string;
}) {
  return (
    <>
      {SLICES.filter((s) => s.top < sectionTop + height && s.top + s.h > sectionTop).map((s) => (
        <div
          key={s.src}
          className={`pointer-events-none absolute left-[465.13px] w-[509.73px] overflow-hidden ${className}`}
          style={{ top: s.top - sectionTop, height: s.h }}
        >
          <img
            src={s.src}
            alt=""
            className="absolute top-0 max-w-none"
            style={{ left: s.crop.left, width: s.crop.w, height: s.crop.h }}
          />
        </div>
      ))}
    </>
  );
}
