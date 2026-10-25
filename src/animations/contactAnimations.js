/**
 * contactAnimations.js
 * GSAP ScrollTrigger transition into the final Contact section (#contact).
 *
 * Conceptual timeline (scrub: 1, pinned):
 * - 0–20%:   Thin horizontal red line draws from ~8% width to 100vw
 * - 20–65%:  Full-width line thickens vertically from center
 * - 65–85%:  Red band expands upward (overlapping #about) and downward to 100vh
 * - 76–100%: Contact typography and links reveal once red covers ~75–80% of viewport
 */

export function initContactAnimations() {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (!gsap || !ScrollTrigger) return;

  const about = document.querySelector("#about");
  const contact = document.querySelector("#contact");
  if (!about || !contact) return;

  const bgLine = contact.querySelector(".contact__bg-line");
  if (!bgLine) return;

  const mm = gsap.matchMedia();

  mm.add(
    {
      isDesktop: "(min-width: 769px)",
      isMobile: "(max-width: 768px)",
      reduceMotion: "(prefers-reduced-motion: reduce)"
    },
    (context) => {
      const { reduceMotion } = context.conditions;

      const metaBar = contact.querySelector(".project__meta-bar");
      const rule = contact.querySelector(".project__rule");
      const titleLines = gsap.utils.toArray(".contact__title-line", contact);
      const desc = contact.querySelector(".contact__desc");
      const emailLink = contact.querySelector("#contact-email-link");
      const socialLinks = gsap.utils.toArray(".contact__socials .contact__link", contact);
      const metaSpans = gsap.utils.toArray(".contact__meta span", contact);

      const rightItems = [desc, emailLink, ...socialLinks, ...metaSpans].filter(Boolean);
      const topChrome = [metaBar, rule].filter(Boolean);

      if (reduceMotion) {
        about.classList.remove("is-transition-active");
        contact.classList.remove("is-transition-active", "is-interactive");
        gsap.set([bgLine, ...topChrome, ...titleLines, ...rightItems], {
          clearProps: "transform,opacity"
        });
        return;
      }

      // Activate overlapping transition stage geometry
      about.classList.add("is-transition-active");
      contact.classList.add("is-transition-active");

      const getContactHeight = () => contact.offsetHeight || window.innerHeight || 900;
      const getInitialScaleY = () => 2 / getContactHeight();
      const getDrawEndScaleY = () => 8 / getContactHeight();
      const getThickScaleY = () => Math.min(0.16, 140 / getContactHeight());
      const getScrollDistance = () => Math.round((window.innerHeight || 900) * 1.85);

      // Initial states
      gsap.set(bgLine, {
        scaleX: 0.08,
        scaleY: getInitialScaleY,
        transformOrigin: "center center"
      });

      if (topChrome.length) {
        gsap.set(topChrome, { y: 24, opacity: 0 });
      }
      if (titleLines.length) {
        gsap.set(titleLines, { y: 80, opacity: 0 });
      }
      if (rightItems.length) {
        gsap.set(rightItems, { y: 30, opacity: 0 });
      }

      // Hold #about stationary in the upper viewport while the expanding red line overlaps it
      const aboutPin = ScrollTrigger.create({
        trigger: contact,
        start: "top top",
        end: () => `+=${getScrollDistance()}`,
        pin: about,
        pinSpacing: false,
        invalidateOnRefresh: true
      });

      // Main scrubbed timeline pinned on #contact
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: contact,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            contact.classList.toggle("is-interactive", self.progress >= 0.72);
          }
        }
      });

      // 1. Scroll 0–20%: Line draws horizontally (8% -> 100vw) and slightly thickens (2px -> 8px)
      tl.to(
        bgLine,
        {
          scaleX: 1,
          scaleY: getDrawEndScaleY,
          duration: 0.2,
          ease: "none"
        },
        0
      );

      // 2. Scroll 20–65%: Full-width line becomes thicker from center
      tl.to(
        bgLine,
        {
          scaleY: getThickScaleY,
          duration: 0.45,
          ease: "power1.in"
        },
        0.2
      );

      // 3. Scroll 65–85%: Line expands vertically upward (overlapping #about) and downward to 100vh
      tl.to(
        bgLine,
        {
          scaleY: 1,
          duration: 0.2,
          ease: "power2.inOut"
        },
        0.65
      );

      // 4. Scroll 76–100%: Reveal Contact content once red covers ~75–80% of the viewport
      if (topChrome.length) {
        tl.to(
          topChrome,
          {
            y: 0,
            opacity: 1,
            duration: 0.12,
            stagger: 0.02,
            ease: "power2.out"
          },
          0.76
        );
      }

      if (titleLines.length) {
        tl.to(
          titleLines,
          {
            y: 0,
            opacity: 1,
            duration: 0.14,
            stagger: 0.028,
            ease: "power2.out"
          },
          0.76
        );
      }

      if (rightItems.length) {
        tl.to(
          rightItems,
          {
            y: 0,
            opacity: 1,
            duration: 0.1,
            stagger: 0.015,
            ease: "power2.out"
          },
          0.84
        );
      }

      // Ensure anchor links to #contact scroll to the fully-revealed end state
      const anchorLinks = document.querySelectorAll('a[href="#contact"]');
      const handleAnchorClick = (e) => {
        if (tl.scrollTrigger) {
          e.preventDefault();
          window.scrollTo({
            top: tl.scrollTrigger.end,
            behavior: "smooth"
          });
        }
      };
      anchorLinks.forEach((link) => link.addEventListener("click", handleAnchorClick));

      return () => {
        aboutPin.kill();
        anchorLinks.forEach((link) => link.removeEventListener("click", handleAnchorClick));
        about.classList.remove("is-transition-active");
        contact.classList.remove("is-transition-active", "is-interactive");
      };
    },
    contact
  );

  return mm;
}
