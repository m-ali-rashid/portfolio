/**
 * motionAnimations.js
 * Scoped Project 03 — Stories in Motion section animations (entrance, title reveal, parallax).
 */

export function initMotionAnimations() {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (!gsap || !ScrollTrigger) return;

  const section = document.querySelector("#project-03");
  if (!section) return;

  const mm = gsap.matchMedia();

  mm.add(
    {
      isDesktop: "(min-width: 901px)",
      isTablet: "(min-width: 521px) and (max-width: 900px)",
      isMobile: "(max-width: 520px)",
      canHover: "(hover: hover) and (pointer: fine)",
      reduceMotion: "(prefers-reduced-motion: reduce)"
    },
    (context) => {
      const { isDesktop, isMobile, canHover, reduceMotion } = context.conditions;

      const rule = section.querySelector(".project__rule--motion");
      const header = section.querySelector(".project-motion__header");
      const titleLines = gsap.utils.toArray(".project-motion__title-line", section);
      const primaryMask = section.querySelector(".project-motion__primary-mask");
      const primaryImg = section.querySelector(".project-motion__primary-mask img");

      const supportVertical = section.querySelector(".project-motion__support--vertical");
      const supportWide = section.querySelector(".project-motion__support--wide");
      const supportDetail = section.querySelector(".project-motion__support--detail");

      const supportImg1 = supportVertical ? supportVertical.querySelector("img") : null;
      const supportWideTarget = supportWide
        ? supportWide.querySelector(".project-motion__video-trigger") || supportWide.querySelector("img")
        : null;
      const supportImg3 = supportDetail ? supportDetail.querySelector("img") : null;

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

      // 1. Section rule line expand
      if (rule) {
        gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });
        gsap.to(rule, {
          scaleX: 1,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        });
      }

      // 2 & 3. Title Reveal & Primary Cinematic Image
      gsap.set(titleLines, { yPercent: 110 });
      if (primaryMask && primaryImg) {
        gsap.set(primaryMask, { clipPath: "inset(100% 0% 0% 0%)" });
        gsap.set(primaryImg, { scale: 1.08 });
      }

      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: header || section,
          start: "top 55%",
          toggleActions: "play none none reverse"
        }
      });

      if (titleLines.length) {
        entranceTl.to(
          titleLines,
          {
            yPercent: 0,
            duration: 1.15,
            stagger: 0.1,
            ease: "power4.out"
          },
          0
        );
      }

      if (primaryMask && primaryImg) {
        entranceTl
          .to(primaryMask, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.35, ease: "power4.out" }, 0.12)
          .to(primaryImg, { scale: 1, duration: 1.35, ease: "power4.out" }, 0.12);
      }

      // 4. Secondary Images Reveal
      const yOffset1 = isMobile ? 35 : 50;
      const yOffset2 = isMobile ? 50 : 70;

      if (supportImg1) gsap.set(supportImg1, { y: yOffset1, opacity: 0 });
      if (supportWideTarget) gsap.set(supportWideTarget, { y: yOffset2, opacity: 0 });
      if (supportImg3) gsap.set(supportImg3, { scale: 0.94, opacity: 0 });

      if (isDesktop) {
        const row2Tl = gsap.timeline({
          scrollTrigger: {
            trigger: supportVertical || section,
            start: "top 60%",
            toggleActions: "play none none reverse"
          },
          defaults: { duration: 1.05, ease: "power3.out" }
        });

        if (supportImg1) row2Tl.to(supportImg1, { y: 0, opacity: 1 }, 0);
        if (supportWideTarget) row2Tl.to(supportWideTarget, { y: 0, opacity: 1 }, 0.1);

        if (supportImg3 && supportDetail) {
          gsap.to(supportImg3, {
            scale: 1,
            opacity: 1,
            duration: 1.05,
            delay: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: supportDetail,
              start: "top 78%",
              toggleActions: "play none none reverse"
            }
          });
        }
      } else {
        if (supportImg1 && supportVertical) {
          gsap.to(supportImg1, {
            y: 0,
            opacity: 1,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: supportVertical,
              start: "top 70%",
              toggleActions: "play none none reverse"
            }
          });
        }
        if (supportWideTarget && supportWide) {
          gsap.to(supportWideTarget, {
            y: 0,
            opacity: 1,
            duration: 1.0,
            delay: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: supportWide,
              start: "top 72%",
              toggleActions: "play none none reverse"
            }
          });
        }
        if (supportImg3 && supportDetail) {
          gsap.to(supportImg3, {
            scale: 1,
            opacity: 1,
            duration: 1.0,
            delay: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: supportDetail,
              start: "top 75%",
              toggleActions: "play none none reverse"
            }
          });
        }
      }

      // Parallax scrubs
      if (isDesktop) {
        if (supportVertical) {
          gsap.to(supportVertical, {
            y: -40,
            ease: "none",
            scrollTrigger: {
              trigger: supportVertical,
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          });
        }

        if (supportWide) {
          gsap.to(supportWide, {
            y: -25,
            ease: "none",
            scrollTrigger: {
              trigger: supportWide,
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          });
        }
      }

      // Desktop Hover on Video Triggers (scale 1 -> 1.02 + subtle play indicator reveal)
      if (isDesktop && canHover) {
        const triggers = section.querySelectorAll(".project-motion__video-trigger");
        triggers.forEach((trigger) => {
          const scaleEl = trigger.querySelector(".project-motion__video-scale");
          const indicator = trigger.querySelector(".project-motion__play-indicator");

          trigger.addEventListener("mouseenter", () => {
            if (scaleEl) gsap.to(scaleEl, { scale: 1.02, duration: 0.5, ease: "power3.out" });
            if (indicator) gsap.to(indicator, { opacity: 1, duration: 0.35, ease: "power2.out" });
          });

          trigger.addEventListener("mouseleave", () => {
            if (scaleEl) gsap.to(scaleEl, { scale: 1, duration: 0.5, ease: "power3.out" });
            if (indicator) gsap.to(indicator, { opacity: 0.8, duration: 0.35, ease: "power2.out" });
          });
        });
      }
    },
    section
  );

  return mm;
}
