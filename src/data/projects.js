/**
 * projects.js
 * Structured data for featured portfolio projects.
 */

export const projects = [
  {
    id: "project-01",
    number: "01",
    category: "Graphic Design",
    title: "Modernist\nDialogues",
    description: "Visual identity and campaign design for a contemporary architecture and design forum, exploring geometric composition, bold typography and modernist visual language.",
    role: "Graphic Design / Art Direction",
    deliverables: "Campaign / Social Visuals",
    tools: "Canva / Photoshop",
    year: "2026",
    media: {
      primary: {
        src: "assets/images/graphic-design/graphic-modernist-primary.webp",
        alt: "Campaign primary artwork — bold geometric poster composition",
        width: 896,
        height: 1200
      },
      secondary: {
        src: "assets/images/graphic-design/graphic-modernist-secondary.webp",
        alt: "Campaign secondary artwork — social media card design",
        width: 1200,
        height: 896
      },
      detail: {
        src: "assets/images/graphic-design/graphic-modernist-detail-01.webp",
        alt: "Campaign detail — close-up typographic texture",
        width: 1024,
        height: 1024
      }
    }
  },
  {
    id: "project-02",
    number: "02",
    category: "UI UX",
    title: "A Better\nMobile\nExperience.",
    description: "Rethinking the daily banking interaction through progressive simplification and considered visual hierarchy.",
    narrative: [
      {
        step: "01 / Problem",
        text: "Existing interfaces overwhelmed users with competing actions and inconsistent navigation patterns."
      },
      {
        step: "02 / Approach",
        text: "Restructured information architecture around three core user journeys, validating each flow through iterative wireframing."
      },
      {
        step: "03 / Outcome",
        text: "A streamlined interface that reduces cognitive load while surfacing the most important actions contextually."
      }
    ],
    role: "UI/UX Design",
    tools: "Figma",
    year: "2026",
    notes: [
      "TYPE / MANROPE",
      "PRIMARY / #0057B8"
    ],
    media: {
      primary: {
        src: "assets/images/ui-ux/ui-banking-primary.webp",
        alt: "Final mobile banking interface — home dashboard",
        width: 768,
        height: 1376
      },
      process: {
        src: "assets/images/ui-ux/ui-banking-process.webp",
        alt: "Design process — wireframe to mid-fidelity to final UI",
        width: 1376,
        height: 768
      },
      screenA: {
        src: "assets/images/ui-ux/ui-transfer-screen.webp",
        alt: "Transfer money flow screen",
        width: 768,
        height: 1376
      },
      screenB: {
        src: "assets/images/ui-ux/ui-analytics-screen.webp",
        alt: "Spending analytics screen",
        width: 768,
        height: 1376
      },
      detail: {
        src: "assets/images/ui-ux/ui-banking-detail.webp",
        alt: "Design system component specimen",
        width: 1024,
        height: 1024
      }
    }
  },
  {
    id: "project-03",
    number: "03",
    category: "Motion + Video",
    duration: "00:47 — Selected Reel",
    title: ["Stories", "In", "Motion."],
    disciplines: ["Editing", "Motion", "Social Video", "AI Video"],
    media: {
      primary: {
        type: "youtube",
        youtubeId: "ld42zS98bxs",
        title: "Stories in Motion Reel",
        thumbnail: "assets/images/motion/project-03-primary.webp",
        alt: "Primary cinematic motion reel poster frame",
        width: 1376,
        height: 768
      },
      social: {
        src: "assets/images/motion/motion-stories-social.webp",
        alt: "Vertical social video frame",
        width: 768,
        height: 1376
      },
      wide: {
        type: "youtube",
        youtubeId: "5Ihu8C6zuYk",
        title: "The Last Room",
        thumbnail: "assets/images/motion/project-03-wide.webp",
        alt: "Wide atmospheric support frame",
        width: 1376,
        height: 768
      },
      detail: {
        src: "assets/images/motion/motion-stories-detail.webp",
        alt: "Macro detail texture frame",
        width: 1024,
        height: 1024
      }
    }
  },
  {
    id: "project-04",
    number: "04",
    category: "AI Visuals",
    title: ["Imagined.", "Directed.", "Made."],
    workflow: [
      "01 / Concept",
      "02 / Generation",
      "03 / Selection",
      "04 / Compositing",
      "05 / Motion"
    ],
    media: {
      primary: {
        src: "assets/images/ai-visuals/ai-fashion-primary.webp",
        alt: "Large final AI generated portrait",
        width: 1122,
        height: 1402
      },
      variation: {
        src: "assets/images/ai-visuals/ai-fashion-detail-01.webp",
        alt: "Alternative variation of AI portrait",
        width: 1122,
        height: 1402
      },
      video: {
        type: "youtube",
        youtubeId: "tVHx9i-IyuI",
        title: "NUR — AI Fashion Study",
        thumbnail: "assets/images/ai-visuals/ai-video-frame.webp",
        alt: "NUR — AI Fashion Study video thumbnail",
        width: 1672,
        height: 941
      },
      process: {
        src: "assets/images/ai-visuals/ai-fashion-process.webp",
        alt: "Process fragment or source material",
        width: 1122,
        height: 1402
      }
    }
  }
];
