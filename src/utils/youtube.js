/**
 * youtube.js
 * Helpers for accessible, privacy-friendly YouTube embed management.
 */

const YOUTUBE_NOHOST = "https://www.youtube-nocookie.com/embed/";

/**
 * Builds a secure, privacy-conscious YouTube embed URL.
 * @param {string} videoId 
 * @param {boolean} autoplay 
 * @returns {string}
 */
export function buildYouTubeEmbedUrl(videoId, autoplay = true) {
  if (!videoId) return "";
  const params = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    enablejsapi: "1",
    rel: "0",
    modestbranding: "1",
    playsinline: "1"
  });
  return `${YOUTUBE_NOHOST}${encodeURIComponent(videoId)}?${params.toString()}`;
}

/**
 * Post a command to the YouTube iframe API
 * @param {HTMLIFrameElement} iframe 
 * @param {string} func 
 * @param {Array} args 
 */
export function sendPlayerCommand(iframe, func, args = []) {
  if (!iframe || !iframe.contentWindow) return;
  try {
    iframe.contentWindow.postMessage(
      JSON.stringify({
        event: "command",
        func,
        args
      }),
      "*"
    );
  } catch (err) {
    // Gracefully handle any cross-origin communication restriction
  }
}
