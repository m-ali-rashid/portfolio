/**
 * indexAnimations.js
 * Scoped entrance timeline for the "A FEW MORE THINGS" section.
 */

export function initIndexAnimations() {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (!gsap || !ScrollTrigger) return;

  const section = document.querySelector("#more-work");
  if (!section) return;

  const mm = gsap.matchMedia();

  mm.add(
    {
      isDesktop: "(min-width: 769px)",
      isMobile: "(max-width: 768px)",
      reduceMotion: "(prefers-reduced-motion: reduce)"
    },
    (context) => {
      const { reduceMotion } = context.conditions;
      const rows = gsap.utils.toArray(".more-work__row", section);
      const initialImg = section.querySelector(".more-work__preview-inner img");

      if (reduceMotion) {
        gsap.set(rows, { clearProps: "transform,opacity" });
        if (initialImg) gsap.set(initialImg, { clearProps: "transform,clipPath,opacity" });
        return;
      }

      gsap.set(rows, { y: 18, opacity: 0 });
      if (initialImg) {
        gsap.set(initialImg, {
          clipPath: "inset(100% 0% 0% 0%)",
          scale: 1.06,
          yPercent: 3
        });
      }

      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          once: true
        }
      });

      entranceTl.to(
        rows,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "power3.out"
        },
        0
      );

      if (initialImg) {
        entranceTl.to(
          initialImg,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            yPercent: 0,
            duration: 0.75,
            ease: "power4.out"
          },
          0.08
        );
      }
    },
    section
  );

  return mm;
}
