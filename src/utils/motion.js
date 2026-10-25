/**
 * motion.js
 * Centralized motion accessibility and media query helpers.
 */

/**
 * Returns true if the user has requested reduced motion.
 * @returns {boolean}
 */
export function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Listen for reduced motion preference changes.
 * @param {Function} callback 
 * @returns {Function} cleanup function
 */
export function onReducedMotionChange(callback) {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  const handler = (e) => callback(e.matches);
  if (typeof mq.addEventListener === "function") {
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  } else if (typeof mq.addListener === "function") {
    mq.addListener(handler);
    return () => mq.removeListener(handler);
  }
  return () => {};
}

/**
 * Standard breakpoints used across the portfolio.
 */
export const breakpoints = {
  desktop: "(min-width: 901px)",
  tablet: "(min-width: 521px) and (max-width: 900px)",
  mobile: "(max-width: 520px)",
  canHover: "(hover: hover) and (pointer: fine)",
  reduceMotion: "(prefers-reduced-motion: reduce)"
};
