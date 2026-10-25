/**
 * graphicAnimations.js
 * Scoped Project 01 — Modernist Dialogues animations (reveal & parallax).
 */

export function initGraphicAnimations() {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (!gsap || !ScrollTrigger) return;

  const section = document.querySelector("#project-01");
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
            start: "top 80%"
          },
          opacity: 0,
          duration: 0.6,
          ease: "power2.out"
        });
        return;
      }

      // Phase 1: Left-to-right title reveal
      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: `${"#project-01"} .project__sticky-stage`,
          start: "top 80%",
          end: "top 20%",
          scrub: 2.5
        }
      });

      if (isDesktop) {
        revealTl
          .fromTo(
            `${"#project-01"} .project__title`,
            { x: -150, opacity: 0, clipPath: "inset(0 100% 0 0)" },
            { x: 0, opacity: 1, clipPath: "inset(0 0% 0 0)", ease: "power3.out" },
            0
          )
          .fromTo(
            `${"#project-01"} .project__meta-bar`,
            { x: -30, opacity: 0 },
            { x: 0, opacity: 1, ease: "power3.out" },
            0
          );
      } else {
        revealTl
          .fromTo(
            `${"#project-01"} .project__title`,
            { x: -60, opacity: 0 },
            { x: 0, opacity: 1, ease: "power3.out" },
            0
          )
          .fromTo(
            `${"#project-01"} .project__meta-bar`,
            { x: -15, opacity: 0 },
            { x: 0, opacity: 1, ease: "power3.out" },
            0
          );
      }

      // Phase 1.5: Description reveal
      const descRevealTl = gsap.timeline({
        scrollTrigger: {
          trigger: `${"#project-01"} .project__sticky-stage`,
          start: "top 0%",
          end: "top -40%",
          scrub: 2.5
        }
      });

      descRevealTl.fromTo(
        `${"#project-01"} .project__desc`,
        { x: isDesktop ? 80 : 40, opacity: 0 },
        { x: 0, opacity: 1, ease: "power3.out" },
        0
      );

      // Phase 2: Parallax scrub timeline
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      const stickyStageTl = gsap.timeline({
        scrollTrigger: {
          trigger: `${"#project-01"} .project__sticky-stage`,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      if (isDesktop) {
        stickyStageTl
          .fromTo(`${"#project-01"} .project__title-parallax`, { y: 0 }, { y: 100, ease: "none" }, 0)
          .fromTo(`${"#project-01"} .project__desc-parallax`, { y: 0 }, { y: 45, ease: "none" }, 0)
          .fromTo(`${"#project-01"} .project__artwork--primary`, { y: 30 }, { y: -60, ease: "none" }, 0);

        scrollTl
          .fromTo(`${"#project-01"} .project__artwork--secondary`, { y: 70, x: -10 }, { y: -30, x: 5, ease: "none" }, 0)
          .fromTo(`${"#project-01"} .project__artwork--detail`, { y: -15, x: -10, rotation: 1.5 }, { y: 45, x: 15, rotation: 0, ease: "none" }, 0);
      } else {
        stickyStageTl.fromTo(`${"#project-01"} .project__artwork--primary`, { y: 20 }, { y: -25, ease: "none" }, 0);
        scrollTl
          .fromTo(`${"#project-01"} .project__artwork--secondary`, { y: 25 }, { y: -15, ease: "none" }, 0)
          .fromTo(`${"#project-01"} .project__artwork--detail`, { y: -10 }, { y: 20, ease: "none" }, 0);
      }

      // Entrance reveal for metadata
      gsap.from(`${"#project-01"} .project__info-item`, {
        scrollTrigger: {
          trigger: section,
          start: "top 65%"
        },
        opacity: 0,
        y: 15,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out"
      });
    },
    section
  );

  return mm;
}
