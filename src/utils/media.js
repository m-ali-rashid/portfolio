/**
 * media.js
 * Image preloading and asset lifecycle helpers.
 */

/**
 * Preload an array of image URLs and return a promise that resolves when they are loaded or decoded.
 * @param {string[]} urls 
 * @returns {Promise<HTMLImageElement[]>}
 */
export function preloadImages(urls) {
  return Promise.all(
    urls.map((url) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        if (typeof img.decode === "function") {
          img.decode().then(() => resolve(img)).catch(() => resolve(img));
        } else {
          img.onload = () => resolve(img);
          img.onerror = () => resolve(img);
        }
      });
    })
  );
}
