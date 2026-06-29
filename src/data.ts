/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, ExperienceItem, EducationItem, SkillCategory } from './types';

export const PERSONAL_INFO = {
  name: "Tamoharini R",
  title: "JavaScript Developer | Frontend Engineer",
  subTitle: "Advancing into Full-Stack MERN Development",
  email: "tamoharini2005@gmail.com",
  phone: "+91 93455 97211",
  location: "Tiruppur, Tamil Nadu, India",
  github: "https://github.com/Tamoharini",
  linkedin: "https://www.linkedin.com/in/tamoharini",
  bio: "Hi, I'm Tamoharini — a JavaScript Developer based in Tamil Nadu, India. I build responsive, performant web interfaces using React.js and modern JavaScript. I've shipped production UI during a real-world fintech internship, and I'm currently expanding into full-stack MERN development. I love writing clean code, solving UI problems, and building systems that work seamlessly from database to viewport.",
  summary: "JavaScript Developer with hands-on experience building production-ready React.js applications, integrating REST APIs, and delivering responsive, cross-browser-compatible interfaces. Completed a software engineering internship where I shipped 4 UI screens and integrated 5+ backend endpoints in a remote Agile team. Proficient in React.js, JavaScript (ES6+), Tailwind CSS, and state management; actively advancing into full-stack MERN development. Adept at writing clean, maintainable code and collaborating effectively in distributed team environments."
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Languages & Core",
    skills: [
      { name: "JavaScript (ES6+)", level: 90, info: "Async/Await, Arrays, API integration, ES Modules" },
      { name: "HTML5", level: 95, info: "Semantic markups, accessibility, responsive forms" },
      { name: "CSS3", level: 90, info: "Flexbox, Grid, custom styling, keyframes" },
      { name: "SQL", level: 85, info: "Relational queries, Joins, sub-queries" }
    ]
  },
  {
    title: "Frontend Engineering",
    skills: [
      { name: "React.js", level: 90, info: "Functional components, custom Hooks, Context, State" },
      { name: "Tailwind CSS", level: 92, info: "Utility-first design, mobile responsive layouts, themes" },
      { name: "Responsive Web Design", level: 95, info: "Viewport mastery from 320px to 1440px wide" },
      { name: "Component Architecture", level: 90, info: "Modular, dry, highly reusable blocks" }
    ]
  },
  {
    title: "Backend & Databases",
    skills: [
      { name: "Node.js", level: 88, info: "Server-side runtimes, WebSocket servers, real-time sync with ws" },
      { name: "Express.js", level: 88, info: "REST APIs, custom middleware, MongoDB/Mongoose integration" },
      { name: "MySQL", level: 85, info: "3NF normalisation, databases, stored procedures, joins" },
      { name: "MongoDB", level: 90, info: "Mongoose schemas, aggregation pipelines, collections modeling" }
    ]
  },
  {
    title: "Tools & Concepts",
    skills: [
      { name: "Git & GitHub", level: 88, info: "Branches, PRs, version history, release flows" },
      { name: "Postman", level: 85, info: "Request testing, collection variables, endpoint mapping" },
      { name: "Agile/Scrum", level: 85, info: "Sprint planning, standups, remote reviews" },
      { name: "AI Tools & Prompting", level: 92, info: "Full-stack development with Gemini, Claude, and modern AI tools" },
      { name: "Performance Basics", level: 80, info: "Debouncing inputs, visual transitions, component load" }
    ]
  }
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: "Software Engineering Intern – Frontend",
    company: "Bluestock Fintech",
    duration: "Mar 2026 – Apr 2026",
    type: "Remote / Agile Team",
    location: "Pune, India (Remote)",
    highlights: [
      "Built and delivered 4 production-ready UI screens (onboarding, user profile, discovery feed, chat interface) using React.js, JavaScript ES6+, HTML5, and CSS3 — shipped to production within a 2-month contract.",
      "Integrated frontend components with 5+ backend REST API endpoints, ensuring accurate data binding, error handling, and smooth user flow across the platform.",
      "Improved mobile responsiveness across all screens to ensure compatibility with viewports from 320px to 1440px, applying cross-browser testing throughout.",
      "Collaborated in a 5-member remote Agile team, participating in weekly standups, developer code reviews, and iterative UI improvements based on stakeholder feedback.",
      "Wrote clean, well-structured React components following component-based architecture principles, enabling easy review, reuse, and future maintenance."
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "moviemate",
    name: "MovieMate – Movie Search App",
    stack: ["React.js", "JavaScript (ES6+)", "OMDB API", "CSS3 / Tailwind"],
    links: {
      live: "https://cinemadatahub.netlify.app/",
      github: "https://github.com/Tamoharini/Movie-search-app"
    },
    description: "A fully responsive movie search application that connects to the OMDB API with built-in real-time debounced search queries and beautiful favorite bookmark states.",
    category: "frontend",
    highlights: [
      "Built a fully responsive movie search app consuming the OMDB REST API; implemented real-time search with debounced input to reduce unnecessary API calls by ~60% and improve client performace.",
      "Engineered a persistent favorites management system using React local state (useState, useEffect) and memory, allowing users to save, view, and remove titles without page reload.",
      "Ensured thorough cross-browser compatibility and pixel-accurate responsive layouts across mobile, tablet, and desktop viewports (320px to 1440px)."
    ]
  },
  {
    id: "shopdb",
    name: "ShopDB – E-Commerce Database System",
    stack: ["SQL", "MySQL", "Relational Schemas", "Stored Procedures"],
    links: {
      github: "https://github.com/Tamoharini/ecommerce-sql-project"
    },
    description: "A fully normalized 3rd Normal Form (3NF) e-commerce system hosting high-performance relationships and views designed for optimized inventory tracking.",
    category: "database-sql",
    highlights: [
      "Designed a fully normalised (3NF) relational database with 8+ tables covering users, products, orders, payments, reviews, and categories.",
      "Wrote complex JOIN queries, indexes, and stored procedures that reduced sample data query search times by ~40%.",
      "Applied strict indexing strategies and view optimisation techniques to enable scalable product filtering, aggregate stock levels, and order reporting."
    ]
  },
  {
    id: "zenclass",
    name: "Zen Class Programme – Database Management System",
    stack: ["NoSQL", "MongoDB", "Data Modeling", "Aggregation Pipelines"],
    links: {
      github: "https://github.com/Tamoharini/Database-project-Mongodb"
    },
    description: "An educational platform database architecture structured in MongoDB modeling students, courses, assignments, mentors, placements, and attendances.",
    category: "database-nosql",
    highlights: [
      "Designed a comprehensive 7-collection NoSQL database model representing structured ed-tech program layers with high data integrity.",
      "Gained end-to-end understanding of data flow from MongoDB collections to REST API responses, which accelerated my masteries in frontend API integrations.",
      "Learned document referencing & subdocument embedding models to structure high-performance user task submissions and placement milestones."
    ]
  },
  {
    id: "collabnote",
    name: "Collaborative Note-Taking Web Application",
    stack: ["React 19", "Node.js", "Express", "MongoDB", "WebSockets (ws)", "Tailwind CSS"],
    links: {
      live:"https://mern-stack-project-note-taking-platform.onrender.com/",
      github: "https://github.com/Tamoharini/MERN-STACK-PROJECT-NOTE-TAKING-PLATFORM"
    },
    description: "A modern, real-time, full-stack collaborative note-taking application. This platform enables teams to create, organize, search, and co-edit notes simultaneously in real-time.",
    category: "database-nosql",
    highlights: [
      "Real-Time Collaboration: Edit notes concurrently with other users. Live cursors and presence indicators show who is currently editing.",
      "MERN & WebSocket Stack: Built on a React 19 SPA frontend with an Express backend server and real-time syncing using WebSockets (ws).",
      "Robust Fallbacks & UX: Implemented resilient fallback local storage configurations for browser safety alongside responsive online/offline visual indicators."
    ]
  }
];

export const EDUCATION: EducationItem[] = [
  {
    degree: "B.E. in Mechatronics Engineering",
    institution: "KPR Institute of Engineering and Technology, Coimbatore",
    duration: "Aug 2023 – May 2027",
    score: "CGPA: 8.04 / 10"
  },
  {
    degree: "Class 12 – Computer Science",
    institution: "AVP Trust National Matric Higher Secondary School, Tiruppur",
    duration: "Completed May 2023",
    score: "90%",
    stream: "Computer Science State Board"
  }
];

export const CERTIFICATIONS = [
  "IITM Pravartak certified Full Stack Development Course with AI Tools",
  "Claude Code in Action — Anthropic",
  "Learn HTML and CSS: Basics to Advanced — Udemy",
  "Built and deployed 15+ web development projects across HTML, CSS, JavaScript, React.js, MongoDB, and SQL."
];
