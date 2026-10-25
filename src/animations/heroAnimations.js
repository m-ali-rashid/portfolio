/**
 * heroAnimations.js
 * Scoped hero section entrance and scroll-out parallax animations.
 */

export function initHeroAnimations() {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (!gsap || !ScrollTrigger) return;

  const section = document.querySelector("#hero");
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
          opacity: 0,
          duration: 0.4,
          ease: "power1.out"
        });
        return;
      }

      // 1. Initial Hero Entrance Timeline
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" }
      });

      tl.from(
        ".hero__portrait",
        {
          opacity: 0,
          scale: 1.04,
          y: 15,
          duration: 1.4,
          ease: "power4.out"
        },
        0
      )
        .from(
          ".hero__cobalt-field",
          {
            scaleY: 0,
            transformOrigin: "bottom center",
            duration: 1.0,
            ease: "power4.out"
          },
          0.2
        )
        .from(
          ".hero__title-line",
          {
            y: 50,
            clipPath: "inset(100% 0% 0% 0%)",
            stagger: 0.15,
            duration: 1.2
          },
          0.3
        )
        .from(
          [".hero__meta-bar", ".hero__rule"],
          {
            opacity: 0,
            y: 10,
            duration: 0.8,
            stagger: 0.1
          },
          0.4
        )
        .from(
          ".hero__name",
          {
            opacity: 0,
            y: 10,
            duration: 0.8
          },
          0.6
        )
        .from(
          ".hero__discipline",
          {
            opacity: 0,
            y: 10,
            duration: 0.6,
            stagger: 0.05
          },
          0.7
        )
        .from(
          [".hero__cta-primary", ".hero__cta-secondary"],
          {
            opacity: 0,
            y: 10,
            duration: 0.8,
            stagger: 0.1
          },
          0.8
        );

      // 2. Desktop Hero Scroll-Out Parallax (clean scrub, no markers)
      if (isDesktop) {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
            markers: false
          }
        });

        scrollTl
          .to(".hero__title", { y: -40, ease: "none" }, 0)
          .to(".hero__portrait", { y: 30, ease: "none" }, 0)
          .to(".hero__cobalt-field", { y: 50, ease: "none" }, 0)
          .to(".hero__bottom", { y: -15, ease: "none" }, 0)
          .to(".hero__name", { y: -20, ease: "none" }, 0);
      }
    },
    section
  );

  return mm;
}
