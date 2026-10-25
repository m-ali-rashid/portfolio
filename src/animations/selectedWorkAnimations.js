/**
 * selectedWorkAnimations.js
 * Scoped Selected Work Intro headline and metadata reveal animations.
 */

export function initSelectedWorkAnimations() {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (!gsap || !ScrollTrigger) return;

  const section = document.querySelector("#work");
  if (!section) return;

  const mm = gsap.matchMedia();

  mm.add(
    {
      isDesktop: "(min-width: 901px)",
      isMobile: "(max-width: 900px)",
      reduceMotion: "(prefers-reduced-motion: reduce)"
    },
    (context) => {
      const { isDesktop, reduceMotion } = context.conditions;

      if (reduceMotion) {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 85%"
          },
          opacity: 0,
          duration: 0.6,
          ease: "power2.out"
        });
        return;
      }

      const distances = isDesktop
        ? { y1: 70, y2: 85, y3: 100, metaY: 15, asideY: 25 }
        : { y1: 50, y2: 60, y3: 70, metaY: 10, asideY: 15 };

      const titleLines = gsap.utils.toArray(".work-intro__title-line", section);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "center 45%",
          scrub: 1,
          markers: false
        }
      });

      // 1. Metadata
      tl.from(
        ".work-intro__meta-bar",
        {
          opacity: 0,
          y: distances.metaY,
          ease: "none"
        },
        0
      );

      // 2. Headline Lines
      if (titleLines.length >= 3) {
        tl.from(
          titleLines[0],
          {
            y: distances.y1,
            clipPath: "inset(100% 0% 0% 0%)",
            ease: "none"
          },
          0.1
        )
          .from(
            titleLines[1],
            {
              y: distances.y2,
              clipPath: "inset(100% 0% 0% 0%)",
              ease: "none"
            },
            0.2
          )
          .from(
            titleLines[2],
            {
              y: distances.y3,
              clipPath: "inset(100% 0% 0% 0%)",
              ease: "none"
            },
            0.3
          );
      }

      // 3. Right-side Metadata
      tl.from(
        ".work-intro__aside",
        {
          opacity: 0,
          y: distances.asideY,
          ease: "none"
        },
        0.35
      );
    },
    section
  );

  return mm;
}
