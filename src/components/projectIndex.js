/**
 * projectIndex.js
 * Direction-aware preview interactions for "A FEW MORE THINGS."
 */

import { projectIndex } from "../data/projectIndex.js";
import { preloadImages } from "../utils/media.js";
import { prefersReducedMotion } from "../utils/motion.js";

export function initProjectIndex() {
  const section = document.getElementById("more-work");
  if (!section) return;

  const rows = Array.from(section.querySelectorAll(".more-work__row"));
  const previewFrame = section.querySelector(".more-work__preview-frame");
  const previewInner = section.querySelector(".more-work__preview-inner");

  if (!rows.length || !previewFrame || !previewInner) return;

  // Preload all 6 images immediately using our media utility
  preloadImages(projectIndex.map((p) => p.src));

  const COBALT = "#2855E7";
  const INK = "#141414";

  let activeIndex = 0;
  let activeImageTl = null;

  const applyRowVisualState = (selectedIdx) => {
    const gsap = window.gsap;
    const reducedMotion = prefersReducedMotion();

    rows.forEach((row, idx) => {
      const isSelected = idx === selectedIdx;
      const name = row.querySelector(".more-work__name");
      const arrow = row.querySelector(".more-work__arrow");

      row.classList.toggle("is-active", isSelected);
      row.setAttribute("aria-selected", isSelected ? "true" : "false");

      if (gsap) {
        gsap.killTweensOf([row, name, arrow].filter(Boolean));
        if (isSelected) {
          gsap.to(row, { color: COBALT, duration: 0.3, ease: "power3.out" });
          if (!reducedMotion) {
            if (name) gsap.to(name, { x: 8, duration: 0.3, ease: "power3.out" });
            if (arrow) gsap.to(arrow, { x: 4, y: -4, duration: 0.3, ease: "power3.out" });
          }
        } else {
          gsap.to(row, { color: INK, duration: 0.25, ease: "power3.out" });
          if (name) gsap.to(name, { x: 0, duration: 0.25, ease: "power3.out" });
          if (arrow) gsap.to(arrow, { x: 0, y: 0, duration: 0.25, ease: "power3.out" });
        }
      } else {
        row.style.color = isSelected ? COBALT : INK;
        if (name) name.style.transform = isSelected ? "translateX(8px)" : "none";
      }
    });
  };

  // Set initial state
  applyRowVisualState(0);

  const initialImg = previewInner.querySelector("img");
  if (initialImg && projectIndex[0]) {
    initialImg.src = projectIndex[0].src;
    initialImg.alt = projectIndex[0].alt;
    initialImg.style.objectPosition = projectIndex[0].objectPosition;
    initialImg.style.zIndex = "1";
  }

  // Activate project with direction-aware reveal
  const activateProject = (newIndex) => {
    if (newIndex === activeIndex || !projectIndex[newIndex]) return;

    const prevIndex = activeIndex;
    const movingDown = newIndex > prevIndex;
    activeIndex = newIndex;

    applyRowVisualState(newIndex);

    const gsap = window.gsap;
    const reducedMotion = prefersReducedMotion();

    if (activeImageTl) {
      activeImageTl.kill();
      activeImageTl = null;
    }

    // Prune any stale transition images
    const existingImgs = Array.from(previewInner.querySelectorAll("img"));
    while (existingImgs.length > 1) {
      const stale = existingImgs.shift();
      if (gsap) gsap.killTweensOf(stale);
      stale.remove();
    }

    const outgoingImg = existingImgs[0] || null;
    if (outgoingImg && gsap) {
      gsap.killTweensOf(outgoingImg);
      gsap.set(outgoingImg, {
        clipPath: "inset(0% 0% 0% 0%)",
        opacity: 1,
        zIndex: 1
      });
    }

    const projectData = projectIndex[newIndex];
    const incomingImg = document.createElement("img");
    incomingImg.src = projectData.src;
    incomingImg.alt = projectData.alt;
    incomingImg.width = projectData.width || 1669;
    incomingImg.height = projectData.height || 942;
    incomingImg.style.objectPosition = projectData.objectPosition || "center center";
    incomingImg.style.zIndex = "2";
    previewInner.appendChild(incomingImg);

    if (!gsap || reducedMotion) {
      if (outgoingImg) outgoingImg.remove();
      incomingImg.style.zIndex = "1";
      return;
    }

    // Direction-aware reveal:
    // Moving downward through list: reveals bottom -> top (inset(100% 0 0 0) -> inset(0 0 0 0))
    // Moving upward through list: reveals top -> bottom (inset(0 0 100% 0) -> inset(0 0 0 0))
    const startClip = movingDown ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)";

    gsap.set(incomingImg, {
      clipPath: startClip,
      scale: 1.055,
      yPercent: movingDown ? 3 : -3
    });

    activeImageTl = gsap.timeline({
      onComplete: () => {
        const remaining = Array.from(previewInner.querySelectorAll("img"));
        remaining.forEach((el) => {
          if (el !== incomingImg) {
            gsap.killTweensOf(el);
            el.remove();
          }
        });
        incomingImg.style.zIndex = "1";
        activeImageTl = null;
      }
    });

    if (outgoingImg) {
      activeImageTl.to(
        outgoingImg,
        {
          scale: 1.025,
          yPercent: movingDown ? -3 : 3,
          opacity: 0,
          duration: 0.38,
          ease: "power2.in"
        },
        0
      );
    }

    activeImageTl.to(
      incomingImg,
      {
        clipPath: "inset(0% 0% 0% 0%)",
        scale: 1,
        yPercent: 0,
        duration: 0.7,
        ease: "power4.out"
      },
      0.04
    );
  };

  // Attach hover, click, and keyboard focus handlers
  rows.forEach((row, index) => {
    // Mouse hover for desktop
    row.addEventListener("mouseenter", () => activateProject(index));

    // Tap / Click for mobile and tablet
    row.addEventListener("click", () => activateProject(index));

    // Accessible keyboard focus navigation
    row.addEventListener("focus", () => activateProject(index));
    row.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activateProject(index);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        const nextIdx = (index + 1) % rows.length;
        rows[nextIdx]?.focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prevIdx = (index - 1 + rows.length) % rows.length;
        rows[prevIdx]?.focus();
      }
    });
  });

  return {
    activateProject
  };
}
