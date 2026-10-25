/**
 * aiVisualAnimations.js
 * Scoped Project 04 — AI Visuals animations (headline reveal, primary portrait clip, contact sheet).
 */

export function initAIVisualAnimations() {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (!gsap || !ScrollTrigger) return;

  const section = document.querySelector("#project-04");
  if (!section) return;

  const mm = gsap.matchMedia();

  mm.add(
    {
      isDesktop: "(min-width: 769px)",
      isMobile: "(max-width: 768px)",
      canHover: "(hover: hover) and (pointer: fine)",
      reduceMotion: "(prefers-reduced-motion: reduce)"
    },
    (context) => {
      const { isDesktop, isMobile, canHover, reduceMotion } = context.conditions;

      const metaIndex = section.querySelector(".project__index");
      const header = section.querySelector(".project-ai__header");
      const titleLines = gsap.utils.toArray(".project-ai__title-line", section);
      const workflow = section.querySelector(".project-ai__workflow");

      const primaryItem = section.querySelector(".project-ai__item--primary");
      const primaryMask = section.querySelector(".project-ai__primary-mask");
      const primaryImg = primaryMask ? primaryMask.querySelector("img") : null;

      const variationItem = section.querySelector(".project-ai__item--variation");
      const variationImg = variationItem ? variationItem.querySelector("img") : null;

      const videoItem = section.querySelector(".project-ai__item--video");
      const videoImg = videoItem
        ? videoItem.querySelector(".project-motion__video-trigger") || videoItem.querySelector("img")
        : null;

      const fragmentItem = section.querySelector(".project-ai__item--fragment");
      const fragmentImg = fragmentItem ? fragmentItem.querySelector("img") : null;

      const supportingItems = [variationItem, videoItem, fragmentItem].filter(Boolean);

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

      // 1. Metadata
      if (metaIndex) {
        gsap.set(metaIndex, { opacity: 0, x: -12 });
        gsap.to(metaIndex, {
          opacity: 0.55,
          x: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
      }

      // 2. Headline & Primary Image Timeline
      gsap.set(titleLines, { yPercent: 110 });
      if (workflow) gsap.set(workflow, { opacity: 0, y: 12 });

      if (primaryMask && primaryImg) {
        gsap.set(primaryMask, { clipPath: "inset(0% 0% 100% 0%)" });
        gsap.set(primaryImg, { scale: 1.08, yPercent: 4 });
      }

      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: header || section,
          start: "top 60%",
          toggleActions: "play none none reverse"
        }
      });

      if (titleLines.length >= 3) {
        mainTl
          .to(titleLines[0], { yPercent: 0, duration: 1.0, ease: "power4.out" }, 0)
          .to(titleLines[1], { yPercent: 0, duration: 1.0, ease: "power4.out" }, 0.14)
          .to(titleLines[2], { yPercent: 0, duration: 1.0, ease: "power4.out" }, 0.28);
      } else if (titleLines.length) {
        mainTl.to(titleLines, { yPercent: 0, duration: 1.0, stagger: 0.14, ease: "power4.out" }, 0);
      }

      if (workflow) {
        mainTl.to(workflow, { opacity: 0.8, y: 0, duration: 0.85, ease: "power3.out" }, 0.18);
      }

      if (primaryMask && primaryImg) {
        mainTl
          .to(primaryMask, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power3.out" }, 0.28)
          .to(primaryImg, { scale: 1, yPercent: 0, duration: 1.2, ease: "power3.out" }, 0.28);
      }

      // 3. Supporting Images Entrance
      const dist = isMobile
        ? { aX: -16, aY: 12, bY: 20, cX: 14, cY: 10 }
        : { aX: -30, aY: 20, bY: 35, cX: 25, cY: 15 };

      if (variationImg && variationItem) {
        gsap.set(variationImg, { x: dist.aX, y: dist.aY, opacity: 0 });
        gsap.to(variationImg, {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: {
            trigger: variationItem,
            start: "top 78%",
            toggleActions: "play none none reverse"
          }
        });
      }

      if (videoImg && videoItem) {
        gsap.set(videoImg, { y: dist.bY, opacity: 0 });
        gsap.to(videoImg, {
          y: 0,
          opacity: 1,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: {
            trigger: videoItem,
            start: "top 78%",
            toggleActions: "play none none reverse"
          }
        });
      }

      if (fragmentImg && fragmentItem) {
        gsap.set(fragmentImg, { x: dist.cX, y: dist.cY, opacity: 0 });
        gsap.to(fragmentImg, {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: {
            trigger: fragmentItem,
            start: "top 78%",
            toggleActions: "play none none reverse"
          }
        });
      }

      // 4. Parallax Drift (Desktop)
      if (isDesktop) {
        if (variationItem) {
          gsap.fromTo(
            variationItem,
            { yPercent: -4 },
            {
              yPercent: 4,
              ease: "none",
              scrollTrigger: {
                trigger: variationItem,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
              }
            }
          );
        }

        if (videoItem) {
          gsap.fromTo(
            videoItem,
            { yPercent: 3 },
            {
              yPercent: -3,
              ease: "none",
              scrollTrigger: {
                trigger: videoItem,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
              }
            }
          );
        }

        if (fragmentItem) {
          gsap.fromTo(
            fragmentItem,
            { yPercent: -3 },
            {
              yPercent: 3,
              ease: "none",
              scrollTrigger: {
                trigger: fragmentItem,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
              }
            }
          );
        }
      }

      // 5. Desktop Hover Interactions
      if (isDesktop && canHover) {
        supportingItems.forEach((item) => {
          const img = item.querySelector(".project-motion__video-scale") || item.querySelector("img");
          const indicator = item.querySelector(".project-motion__play-indicator");
          const others = supportingItems.filter((other) => other !== item);

          item.addEventListener("mouseenter", () => {
            if (img) gsap.to(img, { scale: 1.025, duration: 0.5, ease: "power3.out", overwrite: "auto" });
            if (indicator) gsap.to(indicator, { opacity: 1, duration: 0.35, ease: "power2.out", overwrite: "auto" });
            if (others.length) gsap.to(others, { opacity: 0.76, duration: 0.5, ease: "power3.out", overwrite: "auto" });
          });

          item.addEventListener("mouseleave", () => {
            if (img) gsap.to(img, { scale: 1, duration: 0.5, ease: "power3.out", overwrite: "auto" });
            if (indicator) gsap.to(indicator, { opacity: 0.8, duration: 0.35, ease: "power2.out", overwrite: "auto" });
            if (others.length) gsap.to(others, { opacity: 1, duration: 0.5, ease: "power3.out", overwrite: "auto" });
          });
        });

        if (primaryMask && primaryImg) {
          primaryMask.addEventListener("mouseenter", () => {
            if (!mainTl.isActive()) gsap.to(primaryImg, { scale: 1.02, duration: 0.5, ease: "power3.out", overwrite: "auto" });
          });
          primaryMask.addEventListener("mouseleave", () => {
            if (!mainTl.isActive()) gsap.to(primaryImg, { scale: 1, duration: 0.5, ease: "power3.out", overwrite: "auto" });
          });
        }
      }
    },
    section
  );

  return mm;
}
