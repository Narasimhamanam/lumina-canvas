// Default values for editable site content. Used as fallback when DB row missing.
export const DEFAULT_CONTENT = {
  hero: {
    badge: "Available for Projects",
    title_top: "Premium",
    title_bottom: "Video Editor",
    description:
      "I'm Narasimha Manam — a mobile-first video editor crafting premium commercials, cinematic birthday edits, viral Reels & Shorts, and brand promos that move people.",
    stat1_value: "50",
    stat1_label: "Projects",
    stat2_value: "2 Yrs",
    stat2_label: "Experience",
    stat3_value: "90%",
    stat3_label: "Satisfaction",
  },
  about: {
    headline_quote:
      "I sculpt raw footage into emotional, cinematic narratives — the kind that linger long after the screen fades.",
    paragraph_1:
      "Over the last 2+ years, I've worked as a mobile video editor, creating engaging content for many clients using tools like Alight Motion, CapCut, Node Video, VN, InShot, KineMaster, and Premiere Pro. My passion is turning raw clips into smooth, eye-catching edits with creativity, rhythm, and impact.",
    paragraph_2:
      "I work end-to-end — from offline edit and sound design to grade and finishing — so the vision arrives intact.",
    based_in: "Guntur - India · Remote",
    specialty: "Commercials · Birthday · Promotions · Music Videos · Short Films",
    toolkit: "Capcut · Alight motion · Node Video · VN · Premiere Pro",
    languages: "English · Telugu · Hindi",
  },
  skills: {
    items: [
      { name: "Capcut", level: 98 },
      { name: "Alight Motion", level: 95 },
      { name: "Node Video", level: 90 },
      { name: "VN", level: 82 },
      { name: "Topography", level: 76 },
      { name: "Picsart", level: 70 },
    ],
  },
  stats: {
    items: [
      { value: 50, suffix: "+", label: "Projects Delivered" },
      { value: 2, suffix: " Yrs", label: "Industry Experience" },
      { value: 90, suffix: "%", label: "Client Satisfaction" },
    ],
  },
  testimonials: {
    items: [
      { quote: "Anna, thank you so much for the edit. Video came out super clean and exactly how I wanted.", name: "Akhila Bevara", role: "Client", avatar: "" },
      { quote: "Bro, really happy with the final output. Effects and transitions were too good. Thanks a lot!", name: "Ajith Kumar", role: "Client", avatar: "" },
      { quote: "Thanks brother, video edit was awesome. Everyone liked it and quality was top class.", name: "Pavan Kumar", role: "Client", avatar: "" },
    ],
  },
  clients: {
    items: [
      "RVR & JC College of Engineering",
      "Ganesh Youth Assoc.",
      "Stories by Vihaa",
      "Santosh Infra",
      "Ravi Productions",
    ],
  },
  contact: {
    whatsapp: "917386464170",
    email: "narasimhamanam6014@gmail.com",
    instagram: "https://instagram.com/narasimhachowdary_",
    youtube: "https://www.youtube.com/@Flickfusion_beats",
  },
} as const;

export type ContentKey = keyof typeof DEFAULT_CONTENT;
