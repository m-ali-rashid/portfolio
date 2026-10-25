/**
 * videoModal.js
 * Single, unified, accessible video modal for all portfolio video triggers.
 */

import { buildYouTubeEmbedUrl, sendPlayerCommand } from "../utils/youtube.js";
import { prefersReducedMotion } from "../utils/motion.js";

export function initVideoModal() {
  const modal = document.getElementById("video-modal");
  const playerContainer = document.getElementById("video-modal-player");
  if (!modal || !playerContainer) return;

  const backdrop = modal.querySelector(".video-modal__backdrop");
  const closeBtn = modal.querySelector(".video-modal__close");
  const playerWrap = modal.querySelector(".video-modal__player-wrap");

  let isOpen = false;
  let activeTrigger = null;
  let modalTl = null;
  let isPlaying = false;

  const clearIframe = () => {
    playerContainer.innerHTML = "";
    isPlaying = false;
  };

  const openModal = (videoId, triggerElement) => {
    if (!videoId) return;

    activeTrigger = triggerElement || null;
    clearIframe();

    // Create responsive iframe using youtube-nocookie.com
    const iframe = document.createElement("iframe");
    iframe.src = buildYouTubeEmbedUrl(videoId, true);
    iframe.title = triggerElement?.getAttribute("aria-label") || "Portfolio Video Player";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    iframe.setAttribute("loading", "eager");

    playerContainer.appendChild(iframe);
    isPlaying = true;

    // State & accessibility
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    isOpen = true;

    if (modalTl) {
      modalTl.kill();
      modalTl = null;
    }

    const gsap = window.gsap;
    const reducedMotion = prefersReducedMotion();

    if (!gsap || reducedMotion) {
      if (backdrop) backdrop.style.opacity = "1";
      if (playerWrap) {
        playerWrap.style.opacity = "1";
        playerWrap.style.transform = "none";
      }
      if (closeBtn) {
        closeBtn.style.opacity = "0.85";
        closeBtn.focus({ preventScroll: true });
      }
      return;
    }

    gsap.set(backdrop, { opacity: 0 });
    gsap.set(playerWrap, { opacity: 0, scale: 0.97 });
    gsap.set(closeBtn, { opacity: 0 });

    modalTl = gsap.timeline({
      onComplete: () => {
        if (closeBtn) closeBtn.focus({ preventScroll: true });
      }
    });

    modalTl
      .to(backdrop, { opacity: 1, duration: 0.35, ease: "power2.out" }, 0)
      .to(playerWrap, { opacity: 1, scale: 1, duration: 0.45, ease: "power3.out" }, 0.04)
      .to(closeBtn, { opacity: 0.85, duration: 0.35, ease: "power2.out" }, 0.1);
  };

  const closeModal = () => {
    if (!isOpen) return;
    isOpen = false;

    if (modalTl) {
      modalTl.kill();
      modalTl = null;
    }

    const finalizeClose = () => {
      // Completely stops video and audio
      clearIframe();
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";

      // Sensible focus restoration
      if (activeTrigger && typeof activeTrigger.focus === "function") {
        activeTrigger.focus({ preventScroll: true });
      }
      activeTrigger = null;
    };

    const gsap = window.gsap;
    const reducedMotion = prefersReducedMotion();

    if (!gsap || reducedMotion) {
      if (backdrop) backdrop.style.opacity = "0";
      if (playerWrap) playerWrap.style.opacity = "0";
      if (closeBtn) closeBtn.style.opacity = "0";
      finalizeClose();
      return;
    }

    modalTl = gsap.timeline({
      onComplete: finalizeClose
    });

    modalTl
      .to(playerWrap, { opacity: 0, scale: 0.98, duration: 0.25, ease: "power2.inOut" }, 0)
      .to([backdrop, closeBtn], { opacity: 0, duration: 0.25, ease: "power2.inOut" }, 0);
  };

  // Prevent clicks inside the player from closing the modal, toggle play/pause via postMessage
  playerContainer.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!isOpen) return;
    const iframe = playerContainer.querySelector("iframe");
    if (!iframe) return;

    if (isPlaying) {
      sendPlayerCommand(iframe, "pauseVideo");
      isPlaying = false;
    } else {
      sendPlayerCommand(iframe, "playVideo");
      isPlaying = true;
    }
  });

  // Query ALL video triggers throughout the document (including Motion and AI Visuals)
  const triggers = document.querySelectorAll("[data-video-id]");
  triggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      const videoId = trigger.getAttribute("data-video-id");
      openModal(videoId, trigger);
    });
  });

  // Close targets: close button and backdrop
  const closeTargets = modal.querySelectorAll("[data-modal-close]");
  closeTargets.forEach((target) => {
    target.addEventListener("click", (e) => {
      e.preventDefault();
      closeModal();
    });
  });

  // Keyboard navigation & accessibility trap
  document.addEventListener("keydown", (e) => {
    if (!isOpen) return;

    if (e.key === "Escape") {
      e.preventDefault();
      closeModal();
    } else if (e.key === "Tab") {
      const iframe = playerContainer.querySelector("iframe");
      const focusable = [closeBtn, iframe].filter(Boolean);
      if (focusable.length <= 1) {
        e.preventDefault();
        closeBtn?.focus({ preventScroll: true });
      }
    }
  });

  return {
    open: openModal,
    close: closeModal
  };
}
