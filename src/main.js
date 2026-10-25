/**
 * main.js
 * Application entry point: coordinates modular components, unified video modal,
 * direction-aware project index, and scoped GSAP animations.
 */

import { initVideoModal } from "./components/videoModal.js";
import { initProjectIndex } from "./components/projectIndex.js";
import { initHeroAnimations } from "./animations/heroAnimations.js";
import { initSelectedWorkAnimations } from "./animations/selectedWorkAnimations.js";
import { initGraphicAnimations } from "./animations/graphicAnimations.js";
import { initUXAnimations } from "./animations/uxAnimations.js";
import { initMotionAnimations } from "./animations/motionAnimations.js";
import { initAIVisualAnimations } from "./animations/aiVisualAnimations.js";
import { initIndexAnimations } from "./animations/indexAnimations.js";
import { initContactAnimations } from "./animations/contactAnimations.js";

function setupContactInteractions() {
  const emailLink = document.getElementById("contact-email-link");
  if (!emailLink) return;

  let resetTimer = null;
  emailLink.addEventListener("click", () => {
    const email = "ali.rashed@live.com";
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).catch(() => {});
    }
    emailLink.textContent = `${email} (Copied) ↗`;
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      emailLink.textContent = "Email Me ↗";
    }, 2500);
  });
}

function setupScrollTriggerRefresh() {
  if (typeof window.ScrollTrigger === "undefined") return;

  // Refresh ScrollTrigger once DOM images finish loading to prevent layout offset shifts
  const images = document.querySelectorAll("img");
  let pendingCount = 0;

  images.forEach((img) => {
    if (!img.complete) {
      pendingCount++;
      img.addEventListener(
        "load",
        () => {
          pendingCount--;
          if (pendingCount === 0) {
            window.ScrollTrigger.refresh();
          }
        },
        { once: true }
      );
      img.addEventListener(
        "error",
        () => {
          pendingCount--;
          if (pendingCount === 0) {
            window.ScrollTrigger.refresh();
          }
        },
        { once: true }
      );
    }
  });

  // Debounced resize refresh
  let resizeTimer = null;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      window.ScrollTrigger.refresh();
    }, 150);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // 1. Unified interactive components
  initVideoModal();
  initProjectIndex();
  setupContactInteractions();

  // 2. Scoped section animations
  if (typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined") {
    window.gsap.registerPlugin(window.ScrollTrigger);

    initHeroAnimations();
    initSelectedWorkAnimations();
    initGraphicAnimations();
    initUXAnimations();
    initMotionAnimations();
    initAIVisualAnimations();
    initIndexAnimations();
    initContactAnimations();

    setupScrollTriggerRefresh();
  }
});
