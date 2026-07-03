/**
 * PORTFOLIO CONTENT CONFIG
 * ------------------------
 * Every editable string on the site lives here. To update the site,
 * edit this file only — never touch the HTML structure.
 */

const PORTFOLIO_DATA = {

  meta: {
    name: "Aditya Parashar",
    shortName: "Adi",
    role: "B.Tech Student · AI/ML Enthusiast · Embedded Systems Builder · Developer · Programmer · Innovation Focused · Problem Solver · Coding Enthusiast · HackerRank Certified JAVA",
    tagline: "Engineering meets storytelling.",
    location: "Kanpur, Uttar Pradesh, India",
    email: "aparashar0807@gmail.com",
    resumeUrl: "assets/Aditya_Parashar_Resume.pdf",
    year: new Date().getFullYear(),
  },

  socials: {
    linkedin: "https://www.linkedin.com/in/adityaparashar-2a5091315",
    github: "https://github.com/Parashar12441",
    leetcode: "https://leetcode.com/u/cW0Glb0iyy/",
    googleDeveloper: "https://g.dev/AdityaCodes5",
  },

  // Used to drive the live GitHub stats widgets. Public API, no key needed.
  integrations: {
    githubUsername: "Parashar12441",
    leetcodeUsername: "cW0Glb0iyy",
  },

  hero: {
    eyebrow: "Portfolio / 2026",
    heroTagline: "Google Cloud Innovator · NVIDIA Developer",
    headline: ["Building intelligent", "systems."],
    sub: "B.Tech IT Student at PSIT Kanpur (AKTU), Actively building across embedded systems, cloud AI, and real-time software — from a radar-guided Arduino launcher to a live tourist-safety platform.",
    roles: [
      "B.Tech Student",
      "AI/ML Enthusiast",
      "Embedded Systems Builder",
      "Developer",
      "Programmer",
      "Innovation Focused",
      "Problem Solver",
      "Coding Enthusiast",
      "HackerRank Certified JAVA"
    ],
    stats: [
      { value: 4, suffix: "", label: "Shipped builds" },
      { value: 3, suffix: "", label: "Dev programs" },
      { value: 7, suffix: "", label: "Certifications" },
      { value: 2029, suffix: "", label: "Graduating" },
    ],
  },

  about: {
    kicker: "About",
    paragraphs: [
      "I'm a B.Tech Information Technology student at Dr. A.P.J. Abdul Kalam Technical University, studying at PSIT Kanpur. My work sits at the intersection of hardware and software — I like systems that observe the physical world and respond to it in real time.",
      "That shows up as an ultrasonic-radar-guided Arduino launcher on one end, and a Firebase-backed emergency response platform with live geo-fencing on the other. In between: open-source contribution, cloud AI deployment, and a steady habit of finishing what I start.",
      "Right now I'm deep in the NVIDIA Developer Program and Google Cloud's developer community, learning to take generative AI models from notebook to production — on GKE and on the edge with Jetson Nano.",
    ],
    focusAreas: [
      { title: "Embedded Systems", detail: "Arduino, sensor fusion, servo control, real-time control loops" },
      { title: "Cloud & AI", detail: "GCP, NVIDIA NIM, Generative AI on GKE, edge inference" },
      { title: "Front-End Engineering", detail: "HTML/CSS/JS, React (in progress), REST APIs" },
      { title: "Open Source", detail: "GSSoC 2026 contributor — PR review, feature work, Git workflow" },
    ],
  },

  education: [
    {
      degree: "Bachelor of Technology — Information Technology",
      institution: "Dr. A.P.J. Abdul Kalam Technical University (AKTU) · PSIT Kanpur",
      period: "Sep 2025 – Aug 2029",
      detail: "B.Tech undergraduate. Coursework in progress alongside independent embedded systems and AI/cloud projects.",
    },
    {
      degree: "Intermediate School Diploma (Class XII)",
      institution: "GD Goenka School, Varanasi",
      period: "2023 – 2025",
      detail: null,
    },
    {
      degree: "Junior & High School Diploma (Class X)",
      institution: "St. John's School B.L.W., Varanasi",
      period: "2012 – 2023",
      detail: null,
    },
  ],

  experience: [
    {
      role: "Contributor / Mentee",
      org: "GirlScript Summer of Code (GSSoC 2026)",
      type: "Open-Source Program · Remote",
      period: "May 2026 – Present",
      points: [
        "Contributing to open-source repositories under mentorship, reviewing pull requests and submitting feature additions in a collaborative GitHub-based workflow.",
        "Developing practical skills in version control, code review, and community-driven software development.",
      ],
    },
    {
      role: "Google Cloud & NVIDIA Community Member",
      org: "Google for Developers",
      type: "Google Developer Group Member · Google Cloud Innovator",
      period: "Jan 2026 – Present",
      points: [
        "Active member of Google Developer Groups (GDG), participating in workshops, study jams, and developer events focused on cloud and AI technologies.",
        "Recognised as a Google Cloud Innovator — enhanced access to Google experts and resources for accelerating cloud skill development.",
        "Engaging with the broader cloud community to share knowledge and stay current with GCP advancements.",
      ],
    },
    {
      role: "NVIDIA Developer",
      org: "NVIDIA Developer Program",
      type: "Remote",
      period: "Feb 2026 – Present",
      points: [
        "Completed certified training on deploying Generative AI models with NVIDIA NIM on GKE and edge AI on Jetson Nano.",
        "Exploring NVIDIA's AI and GPU computing ecosystem to build optimised, production-ready AI pipelines.",
      ],
    },
  ],

  projects: [
    {
      id: "safe-yatra",
      title: "Safe Yatra",
      badge: {
        text: "Protech Hackathon Winning Project",
        type: "gold",
        icon: "trophy"
      },
      subtitle: "AI-Powered Tourist Safety & Monitoring System",
      period: "Apr 2026 – May 2026",
      category: "Full-Stack / AI",
      status: "Active",
      description: "A real-time tourist safety platform with live GPS tracking, geo-fence breach alerts, and one-tap SOS for travellers across India — built with an admin dashboard for rapid emergency intervention.",
      points: [
        "Built an AI-driven real-time tourist safety platform using Firebase, Firestore, and Leaflet.js, enabling live GPS tracking, geo-fence breach alerts, and 1-click SOS.",
        "Integrated Google News RSS feeds with AI-powered keyword extraction to continuously analyse region-specific threats — crime, weather hazards, civil unrest, overcrowding.",
        "Developed an admin dashboard with real-time map rendering, geo-fence creation tools, and an SOS queue management system.",
        "Architected for future expansion to drones, wearable SOS devices, and smart tourism infrastructure.",
      ],
      tech: ["Firebase", "Firestore", "JavaScript", "Leaflet.js", "Geo-fencing", "AI Integration"],
      links: { github: null, demo: null },
      accent: "blue",
    },
    {
      id: "project-iron-sky",
      title: "Project Iron Sky",
      badge: {
        text: "Reached Final Round",
        type: "silver",
        icon: "award"
      },
      subtitle: "Arduino Radar Missile Launcher System",
      period: "Nov 2025",
      category: "Embedded Systems / Robotics",
      status: "Complete",
      description: "An automated smart-defence prototype: a dual-servo turret that scans with an ultrasonic radar sweep, tracks a target, and engages autonomously — accompanied by a patent paper and live prototype.",
      points: [
        "Designed and built an automated smart-defence prototype using an Arduino microcontroller as the central command unit, integrating sensor intelligence, precision aiming, and automated response.",
        "Engineered a dual-servo platform: a targeting servo for horizontal launcher rotation and a scanning servo sweeping an ultrasonic sensor as short-range radar.",
        "Programmed a continuous detection-and-engagement loop in C/C++ — scanning, analysing distance readings, aligning the launcher, and triggering fire autonomously.",
        "Real-time fusion of robotics, embedded programming, and sensor systems, accompanied by a patent paper, prototype model, and presentation.",
      ],
      tech: ["Arduino (C/C++)", "Ultrasonic Sensors", "Servo Control", "Embedded Systems", "Robotics"],
      links: { github: null, demo: null },
      accent: "emerald",
    },
    {
      id: "duniyadekho",
      title: "DuniyaDekho.com",
      subtitle: "Local Hotel Booking Website",
      period: "2023 – 2025",
      category: "Web Development · School Exhibition",
      status: "Prototype",
      description: "A hotel booking web interface for simplifying tourist reservations, presented at a school exhibition to demonstrate real-world problem solving through technology.",
      points: [
        "Built entirely in HTML as a functional prototype demonstrating the core booking flow.",
        "Documented planned enhancements including CSS styling, JavaScript interactivity, and server-side dynamic content management.",
      ],
      tech: ["HTML", "UI/UX Planning", "Project Management"],
      links: { github: null, demo: null },
      accent: "purple",
    },
    {
      id: "electromagnetic-train",
      title: "Electromagnetic Train",
      subtitle: "Metro System Concept Model",
      period: "2023 – 2025",
      category: "Engineering / Physics",
      status: "Complete",
      description: "A working electromagnetic train prototype using neodymium magnets and hand-wound copper coils to simulate urban metro propulsion — an educational exhibit on electromagnetism in transportation.",
      points: [
        "Designed and assembled a working electromagnetic train prototype using neodymium magnets and hand-wound copper coils.",
        "Demonstrated precise control over speed and direction via AAA battery-powered electromagnets, with miniature station platforms modelling real metro infrastructure.",
        "Served as an educational exhibit illustrating the transformative potential of electromagnetism in transportation engineering.",
      ],
      tech: ["Electromagnetics", "Technical Prototyping", "Physics Application"],
      links: { github: null, demo: null },
      accent: "gold",
    },
  ],

  skills: {
    languages: [
      { name: "Java", note: "HackerRank Certified" },
      { name: "C", note: "HackerRank Certified" },
      { name: "Python", note: null },
      { name: "HTML / CSS", note: null },
      { name: "JavaScript", note: null },
    ],
    frameworks: [
      { name: "Firebase", note: null },
      { name: "React", note: "learning" },
      { name: "Node.js", note: "learning" },
    ],
    cloud: [
      { name: "Google Cloud Platform", note: null },
      { name: "NVIDIA NIM", note: null },
      { name: "Generative AI on GKE", note: null },
    ],
    tools: [
      { name: "Git / GitHub", note: null },
      { name: "VS Code", note: null },
      { name: "Jetson Nano", note: null },
      { name: "Android Studio", note: null },
    ],
    core: ["Front-End Development", "REST APIs", "Open-Source Contribution"],
    soft: ["Problem Solving", "Continuous Learning", "Collaboration", "Communication"],
  },

  certifications: [
    { name: "Java Certified", issuer: "HackerRank" },
    { name: "C Certified", issuer: "HackerRank" },
    { name: "Advanced Software Engineering Job Simulation", issuer: "Walmart USA / Forage" },
    { name: "Introduction to Generative AI", issuer: "Google Cloud" },
    { name: "Introduction to Claude Cowork", issuer: "Anthropic" },
    { name: "Getting Started with AI on Jetson Nano", issuer: "NVIDIA" },
    { name: "Deploy Faster Generative AI Models with NVIDIA NIM on GKE", issuer: "NVIDIA / Google" },
  ],

  achievements: [
    { title: "National Cyber Olympiad (SOF)", detail: "School Rank #1 · Gold Medalist", tier: "gold" },
    { title: "ICAS Digital Technologies", detail: "Top 23% of participants, Indian Subcontinent Region", tier: "silver" },
    { title: "Protech Hackathon — 1st Year", detail: "Winner, Outstanding Grade · Safe Yatra", tier: "gold" },
    { title: "Inter-House Basketball Tournament", detail: "Gold Medalist", tier: "gold" },
    { title: "Inter-College Cricket Tournament", detail: "Gold Medalist", tier: "gold" },
    { title: "Chitrahaar Photography Competition", detail: "People's Choice Award · District-Level", tier: "gold" },
  ],

  competencies: [
    "Cloud-native development (GCP)",
    "Generative AI & LLM integration",
    "Firebase & real-time databases",
    "Front-end engineering (HTML/CSS/JS)",
    "Open-source collaboration (Git/GitHub)",
    "NVIDIA edge AI & GPU computing",
    "Agile & remote team workflows",
    "Self-directed learner & fast adapter",
  ],

  contact: {
    kicker: "Get in touch",
    headline: "Let's build something.",
    sub: "Open to co-op and internship opportunities in cloud, front-end, and applied AI/ML.",
  },
};
