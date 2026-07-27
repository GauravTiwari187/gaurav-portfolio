// Fallback data shown instantly while the API call resolves (or if the
// backend is unreachable in a demo/offline preview). The live site always
// prefers data returned from /api/profile, /api/certificates, /api/projects.

export const fallbackProfile = {
  name: "Gaurav Tiwari",
  tagline: "Aspiring MERN + AI Developer",
  email: "gaurav@example.com",
  github: "https://github.com/gauravtiwari",
  linkedin: "https://linkedin.com/in/gauravtiwari",
  whatsapp: "https://wa.me/910000000000",
  photoUrl:  "/assets/gaurav.jpeg",
  resumeUrl: "/assets/Gaurav_Tiwari_Resume14.pdf",
  bio: "B.Tech IT student building full-stack MERN applications enhanced with AI.",
  skills: [
    "JavaScript",
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Mongoose",
    "Stripe API",
    "Python",
    "C",
    "C++",
    "SQL",
  ],
  education: [
    {
      degree: "B.Tech in Information Technology",
      university: "Deen Dayal Upadhyaya Gorakhpur University",
      year: "2022 - 2026",
      cgpa: "7.6 / 10",
      details: "Core coursework across programming, DBMS, and networks.",
    },
  ],
  experience: [
    {
      title: "Python Programming Trainee",
      organization: "Samsung Innovation Campus",
      duration: "2023",
      description: "Structured training in Python programming fundamentals.",
      type: "training",
    },
    {
      title: "Summer Vocational Trainee",
      organization: "Signal & Telecom Training Center, Indian Railways",
      duration: "2023",
      description: "Hands-on training on railway signal and telecom systems.",
      type: "training",
    },
    {
      title: "B.Tech IT Coursework",
      organization: "Deen Dayal Upadhyaya Gorakhpur University",
      duration: "2022 - 2026",
      description: "Ongoing undergraduate coursework in IT fundamentals.",
      type: "education",
    },
  ],
};

export const fallbackCertificates = [
  {
    _id: "cert-1",
    title: "Python Programming Trainee",
    issuer: "Samsung Innovation Campus",
    imageUrl: "/assets/certificates/samsung-innovation-campus.jpg",
    dateIssued: "2023",
    description:
      "Structured Python training covering core syntax, data structures, and applied mini-projects.",
    skillsGained: ["Python", "Problem Solving", "Data Structures"],
  },
  {
    _id: "cert-2",
    title: "Summer Vocational Training",
    issuer: "Signal & Telecom Training Center, Indian Railways",
    imageUrl: "/assets/certificates/railways-vocational-training.jpg",
    dateIssued: "2023",
    description:
      "Vocational training on railway signaling and telecommunication systems.",
    skillsGained: ["Signal Systems", "Telecom Systems"],
  },
  {
    _id: "cert-3",
    title: "B.Tech IT Coursework Certification",
    issuer: "Deen Dayal Upadhyaya Gorakhpur University",
    imageUrl: "/assets/certificates/ddugu-coursework.jpg",
    dateIssued: "2022 - 2026",
    description: "Coursework certificates from the B.Tech IT curriculum.",
    skillsGained: ["DBMS", "Computer Networks", "Software Engineering"],
  },
];

export const fallbackProjects = [
  {
    _id: "proj-1",
    title: "MERN + AI Automation Website",
    description:
      "A full-stack MERN app integrating AI-powered automation workflows.",
    imageUrl: "/assets/projects/mern-ai-automation.jpg",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Gemini API"],
    githubUrl: "https://github.com/gauravtiwari/mern-ai-automation",
    liveUrl: "",
  },
  {
    _id: "proj-2",
    title: "Stripe API Integration Demo",
    description:
      "A demo checkout flow showcasing secure payments using the Stripe API.",
    imageUrl: "/assets/projects/stripe-demo.jpg",
    techStack: ["React", "Node.js", "Express", "Stripe API"],
    githubUrl: "https://github.com/gauravtiwari/stripe-integration-demo",
    liveUrl: "",
  },
  {
    _id: "proj-3",
    title: "Interactive Animated Web App",
    description:
      "An interactive UI showcase built with Framer Motion micro-animations.",
    imageUrl: "/assets/projects/interactive-web-app.jpg",
    techStack: ["React", "TailwindCSS", "Framer Motion"],
    githubUrl: "https://github.com/gauravtiwari/interactive-animated-app",
    liveUrl: "",
  },
];
