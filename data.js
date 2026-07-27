/* ==========================================================================
   YOUR CONTENT — this is the only file you normally need to edit.
   Change anything here, save, then commit + push to GitHub — your live
   site updates automatically. See README.md for examples (adding a new
   project, a new certificate, etc).
   ========================================================================== */
window.PORTFOLIO_DATA = {
  profile: {
    name: "Gubbala P V Durga Malleswara Rao",
    shortName: "Pavan",
    initials: "GP",
    handle: "Pavan.dev",
    roles: [
      "Cloud Developer",
      "Generative AI Developer",
      "Data Analyst",
      "Python Developer",
      "Software Engineer",
    ],
    summary:
      "B.Tech CSE graduate building cloud-backed, AI-powered systems — from REST APIs and databases to LLM integrations that turn raw data into decisions. AWS Certified, product-minded, and most at home where backend engineering meets applied AI and data analysis.",
    aboutParagraphs: [
      "B.Tech in Computer Science Engineering at Swarnandhra College of Engineering & Technology (2022–2026), CGPA 8.74/10.",
      "I build scalable backends with FastAPI and Flask, ship full-stack apps with React, and design data pipelines and AI assistants powered by Google Gemini and classic ML. As a Generative AI Intern at NIVUNA Labs, I shipped GenAI-powered applications, cut manual processing time by 40%, and improved API response time by 35% by resolving 20+ backend bugs.",
      "Certified AWS Cloud Practitioner, comfortable across PostgreSQL/MySQL/MongoDB, and genuinely curious about where cloud infrastructure, backend engineering, data analysis, and applied AI intersect.",
    ],
    location: "Narsapur, Andhra Pradesh, India",
    email: "gubbalapavan9347@gmail.com",
    phone: "+91 93478 46836",
    whatsapp: "919347846836",
    resumeUrl: "assets/resume.pdf",
    photoUrl: "assets/profile.jpg",
    github: "https://github.com/PAVANTECH-06",
    linkedin: "https://www.linkedin.com/in/gubbalapavan/",
    availability: "Available for opportunities",
  },

  stats: [
    { value: "4+", label: "Projects shipped" },
    { value: "8+", label: "REST APIs designed" },
    { value: "93%", label: "ML model accuracy" },
    { value: "40%", label: "Manual work cut via GenAI" },
  ],

  skills: [
    { category: "Languages", items: ["Python", "JavaScript", "SQL", "HTML", "CSS"] },
    { category: "Backend & Frontend", items: ["FastAPI", "Flask", "Streamlit", "React.js", "Node.js", "REST APIs", "JWT Auth"] },
    { category: "Generative AI", items: ["LLM Applications", "Prompt Engineering", "AI Agents", "Gemini API", "GitHub Copilot"] },
    { category: "Data Analysis & ML", items: ["Scikit-learn", "Pandas", "NumPy", "NLP", "EDA", "Matplotlib / Seaborn", "Power BI"] },
    { category: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"] },
    { category: "Cloud & Tools", items: ["AWS EC2 / S3 / IAM", "Git & GitHub", "GitHub Actions CI/CD", "Linux"] },
  ],

  education: [
    {
      period: "2022 — 2026",
      title: "B.Tech, Computer Science Engineering",
      org: "Swarnandhra College of Engineering & Technology",
      detail: "CGPA 8.74 / 10",
      points: [],
    },
    {
      period: "2020 — 2022",
      title: "Intermediate (MPC)",
      org: "Aditya Junior College",
      detail: "Percentage 92",
      points: [],
    },
    {
      period: "2019 — 2020",
      title: "SSC (10th)",
      org: "ST.Ann's High School",
      detail: "Percentage 94",
      points: [],
    },
  ],

  experience: [
    {
      period: "Sep 2025 — Mar 2026",
      title: "Generative AI Intern",
      org: "NIVUNA Labs",
      points: [
        "Developed 3+ Generative AI-powered applications using Python, REST APIs, and automation workflows, cutting manual processing time by 40%.",
        "Optimized backend performance by resolving 20+ bugs, improving API response time by 35% for scalable AI-driven solutions.",
        "Integrated APIs and automation processes to improve workflow efficiency, gaining exposure to cloud deployment workflows.",
      ],
    },
    {
      period: "2026",
      title: "Graduated & open to opportunities",
      org: "Backend · Cloud · Data · Applied AI / GenAI",
      points: [],
    },
  ],

  projects: [
    {
      title: "Smart City Assistant",
      status: "DEPLOYED",
      description:
        "AI-powered urban governance platform processing 10,000+ data points in real time, with Gemini LLM integrated into ML forecasting models for sustainability and KPI decision support.",
      metrics: ["8+ REST APIs", "Sub-200ms response", "+30% forecast accuracy"],
      tech: ["Python", "FastAPI", "Streamlit", "Gemini", "PostgreSQL"],
      link: "https://github.com/PAVANTECH-06/smart_city_assistant",
      image: "assets/projects/smart-city.jpeg",
    },
    {
      title: "IntelliSQL — AI SQL Assistant",
      status: "DEPLOYED",
      description:
        "Converts natural language into optimized SQL using Google Gemini, with built-in query validation, error detection, and result visualization for non-technical users.",
      metrics: ["-60% query-writing time", "100+ query types"],
      tech: ["Python", "Streamlit", "Gemini AI", "SQLite", "Pandas"],
      link: "https://github.com/PAVANTECH-06/IntelliSQL",
      image: "assets/projects/project-intellisql.jpeg",
    },
    {
      title: "Email Spam & Fake Message Detection",
      status: "DEPLOYED",
      description:
        "NLP-based classifier trained on 50,000+ messages to flag spam and fake content, with hyperparameter tuning to sharpen precision and recall.",
      metrics: ["93% accuracy", "+12% precision", "+9% recall"],
      tech: ["Python", "Scikit-learn", "Pandas", "NLTK"],
      link: "https://github.com/PAVANTECH-06/Email-Spam-and-Fake-Message-Detector",
      image: "assets/projects/project-spam-detection.jpeg",
    },
    {
      title: "Task Management System",
      status: "DEPLOYED",
      description:
        "Full-stack task management app with JWT authentication and REST APIs for creating, updating, and deleting tasks — built to practice clean auth and API design.",
      metrics: ["JWT auth", "Full CRUD API"],
      tech: ["React.js", "FastAPI", "SQLite", "Python"],
      link: "https://github.com/PAVANTECH-06/Task_Management_System",
      image: "assets/projects/project-task-manager.jpeg",
    },
  ],

  achievements: [
    { title: "Winner — AI/ML Technical Presentation Competition", description: "Recognized for a technical presentation on applied AI/ML." },
    { title: "HackerRank — 3★ Python", description: "Verified problem-solving proficiency in Python." },
    { title: "AWS Certified Cloud Practitioner", description: "Foundational certification across AWS core services." },
    { title: "Data Analytics with Python — NPTEL (Elite)", description: "Elite-level certification in applied data analytics." },
    { title: "NSS Volunteer", description: "National Service Scheme — community engagement and service." },
  ],

  certificates: [
    { title: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", year: "2025", image: "assets/certificates/aws-cloud-practitioner.jpg" },
    { title: "Data Analytics with Python (Elite)", issuer: "NPTEL", year: "2025", image: "assets/certificates/nptel-data-analytics.jpg" },
    { title: "AI/ML Technical Presentation — Winner", issuer: "College Tech Symposium", year: "2025", image: "assets/certificates/aiml-presentation.jpg" },
    { title: "3★ Python", issuer: "HackerRank", year: "2025", image: "assets/certificates/hackerrank-python.jpg" },
  ],
};
