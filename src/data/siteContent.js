/**
 * siteContent.js
 * Editorial copy, metadata, and site configuration.
 */

export const siteContent = {
  meta: {
    title: "AMMARA RAFEEQUE — Multimedia Designer",
    description: "Portfolio of Ammara Rafeeque — Multimedia Designer specializing in UI/UX, Graphic Design, Motion, and AI Visuals. Based in Dubai.",
    location: "2026 / DXB"
  },
  hero: {
    metaLeft: "Portfolio",
    metaRight: "2026 / DXB",
    title: ["Multimedia", "Designer"],
    designerName: "AMMARA RAFEEQUE",
    disciplines: ["UI/UX", "Graphic", "Motion", "AI Visuals"],
    portrait: {
      src: "assets/images/hero/hero-portrait.webp",
      alt: "Portrait of Ammara Rafeeque, Multimedia Designer",
      width: 1084,
      height: 1451
    },
    ctaPrimary: {
      label: "View Selected Work",
      href: "#work"
    },
    ctaSecondary: {
      label: "Download CV",
      href: "#about"
    }
  },
  workIntro: {
    index: "01 / Selected Work",
    title: ["Things", "I've", "Made."],
    years: "2024—2026",
    categories: ["Graphic", "UI/UX", "Motion", "AI Visuals"]
  },
  capabilities: {
    index: "06 / Capabilities",
    title: ["What I", "Work", "Across."],
    rows: [
      {
        num: "01 /",
        name: "Graphic Design",
        skills: "Brand identities / Campaign visuals / Social content / Digital design"
      },
      {
        num: "02 /",
        name: "UI UX",
        skills: "Wireframes / Interface design / Prototyping / Figma workflows"
      },
      {
        num: "03 /",
        name: "Motion + Video",
        skills: "Video editing / Short-form content / Motion graphics / Social video"
      },
      {
        num: "04 /",
        name: "AI Visuals",
        skills: "AI image generation / AI video / Creative compositing / Visual direction"
      }
    ],
    tools: {
      label: "Tools I Use",
      list: "Figma / Canva / Adobe Creative Cloud / AI Tools"
    }
  },
  about: {
    index: "07 / About",
    title: ["I Design", "With", "Curiosity."],
    bio: "I am a multimedia designer based in Dubai, focused on the intersection of graphic design, UI/UX, and motion. I build brand systems, design functional digital products, and direct cinematic video content. By integrating AI-assisted creative workflows, I aim to expand visual possibilities while keeping human intent at the core of every project.",
    cvLink: "#",
    portrait: {
      src: "assets/images/about/about-portrait.webp",
      alt: "Editorial portrait of the designer",
      width: 896,
      height: 1200
    }
  },
  contact: {
    index: "08 / Contact",
    availability: "Available for select projects",
    title: ["Let's", "Make", "Something", "Great."],
    desc: "Have a project in mind?\nLet's talk.",
    email: "ali.rashed@live.com",
    phone: "+971508373279",
    whatsappUrl: "https://wa.me/971508373279",
    location: "Dubai / UAE",
    year: "2026"
  }
};
