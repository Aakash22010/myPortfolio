import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

async function seed() {
  console.log("Seeding database...");

  const hash = await bcrypt.hash("admin", 12);
  const { error: adminErr } = await supabase.from("admin_users")
    .upsert([{ username: "admin", password_hash: hash }], { onConflict: "username" });
  if (adminErr) console.error("Admin:", adminErr.message);
  else console.log("✓ Admin user created");

  const projects = [
    { title: "Skill Sanchaar", description: "Full-stack educational platform with authentication, payments, and admin workflows. Built end-to-end with role-based access control.", tech: ["React","Node.js","MongoDB","JWT"], github: "#", live: "#", featured: true, visible: true, order_index: 0 },
    { title: "Paradise Hotel", description: "Hotel booking website with JWT authentication and modern responsive UI.", tech: ["React","Node.js","MongoDB","JWT"], github: "https://github.com/Aakash22010/Paradise_hotel", live: "https://paradise-hotel-peach.vercel.app/", featured: false, visible: true, order_index: 1 },
    { title: "InternArea", description: "Internshala-inspired platform for browsing internships with clean UI and routing.", tech: ["React","Tailwind CSS"], github: "https://github.com/Aakash22010/internarea.git", live: "https://internarea29320.netlify.app/", featured: false, visible: true, order_index: 2 },
    { title: "Weather Forecast App", description: "Real-time weather forecasting web app using external APIs with responsive UI.", tech: ["JavaScript","Weather API","HTML","CSS"], github: "#", live: "https://aakash1402--1ca1713626cd11f09439569c3dd06744.web.val.run", featured: false, visible: true, order_index: 3 },
    { title: "Vyper – Snake Game", description: "Modern snake game with smooth controls, game logic, and responsive design.", tech: ["JavaScript","Canvas API","CSS"], github: "#", live: "http://vyper.surge.sh/", featured: false, visible: true, order_index: 4 },
    { title: "WorkflowAI", description: "AI-driven workflow automation system built as a group project.", tech: ["React","Node.js","OpenAI API"], github: "#", live: "#", featured: false, visible: true, order_index: 5 },
  ];
  const { error: projErr } = await supabase.from("projects").upsert(projects, { onConflict: "title" });
  if (projErr) console.error("Projects:", projErr.message);
  else console.log("✓ Projects seeded");

  const skills = [
    { name: "React", category: "frontend", level: "Intermediate", details: "Hooks, Context API, component architecture, state flow, performance optimization", visible: true, order_index: 0 },
    { name: "Next.js", category: "frontend", level: "Intermediate", details: "Pages router, SSR/SSG, API routes, dynamic routing, Vercel deployment", visible: true, order_index: 1 },
    { name: "TypeScript", category: "frontend", level: "Intermediate", details: "Type safety, interfaces, generics, strict mode, used across full-stack projects", visible: true, order_index: 2 },
    { name: "Tailwind CSS", category: "frontend", level: "Advanced", details: "Responsive layouts, dark/light mode, utility-first styling, v4 CSS variables", visible: true, order_index: 3 },
    { name: "Framer Motion", category: "frontend", level: "Intermediate", details: "Page animations, scroll-triggered effects, stagger containers, spring physics", visible: true, order_index: 4 },
    { name: "HTML & CSS", category: "frontend", level: "Advanced", details: "Semantic markup, flexbox, grid, responsive design, accessibility basics", visible: true, order_index: 5 },
    { name: "Node.js & Express", category: "backend", level: "Intermediate", details: "Server-side logic, routing, middleware, MVC structure, REST API design", visible: true, order_index: 6 },
    { name: "MongoDB", category: "backend", level: "Intermediate", details: "Schema design, CRUD operations, data modeling, Mongoose ODM", visible: true, order_index: 7 },
    { name: "Authentication & Authorization", category: "backend", level: "Advanced", details: "JWT-based auth, Firebase Auth, OTP flows, protected routes, role-based access", visible: true, order_index: 8 },
    { name: "Firebase", category: "backend", level: "Intermediate", details: "Firebase Auth, Firestore, integration with custom Express backends", visible: true, order_index: 9 },
    { name: "REST APIs", category: "backend", level: "Advanced", details: "Designing RESTful endpoints, CRUD operations, request/response handling, error management", visible: true, order_index: 10 },
    { name: "Cloudinary", category: "backend", level: "Intermediate", details: "Media uploads, direct client-side upload with unsigned presets, URL management", visible: true, order_index: 11 },
    { name: "Git & GitHub", category: "tools", level: "Advanced", details: "Version control, branching, collaboration, pull requests, CI/CD via Vercel", visible: true, order_index: 12 },
    { name: "Vite", category: "tools", level: "Intermediate", details: "Fast dev server, optimized production builds, plugin ecosystem", visible: true, order_index: 13 },
    { name: "Vercel & Render", category: "tools", level: "Intermediate", details: "Frontend deployment on Vercel, backend hosting on Render free tier", visible: true, order_index: 14 },
  ];
  const { error: skillErr } = await supabase.from("skills").upsert(skills, { onConflict: "name" });
  if (skillErr) console.error("Skills:", skillErr.message);
  else console.log("✓ Skills seeded");

  const experience = [
    { role: "Full-Stack Web Developer Intern", company: "NullClass", duration: "July 2024 – August 2024", type: "internship", points: ["Built InternArea, a full-stack Internshala-inspired platform from scratch","Developed frontend using React, focusing on component structure and state management","Implemented backend APIs using Node.js and Express","Integrated MongoDB for data storage and user management","Worked with authentication flows and real-world application structure"], visible: true, order_index: 0 },
    { role: "Frontend Web Developer Intern", company: "Myitronline", duration: "July 2025 – August 2025", type: "internship", points: ["Developed responsive UI components using React and Tailwind CSS","Integrated frontend components with backend APIs","Improved website responsiveness and overall user experience"], visible: true, order_index: 1 },
    { role: "President", company: "Codex – The Coding Club of GIET", duration: "2025 – Present", type: "leadership", points: ["Leading technical initiatives and mentoring junior developers","Organized coding events, workshops, and hackathons","Coordinated with faculty and students to strengthen the coding community"], visible: true, order_index: 2 },
  ];
  const { error: expErr } = await supabase.from("experience").upsert(experience, { onConflict: "role" });
  if (expErr) console.error("Experience:", expErr.message);
  else console.log("✓ Experience seeded");

  const freelance = [
    { tag: "01", title: "Frontend Development", description: "Modern, responsive UIs using React, Tailwind CSS, and Vite. Pixel-perfect, fast, and accessible.", visible: true, order_index: 0 },
    { tag: "02", title: "Full-Stack Applications", description: "End-to-end web apps with React, Node.js, Express, and MongoDB. From auth to deployment.", visible: true, order_index: 1 },
    { tag: "03", title: "Authentication & APIs", description: "Secure REST APIs, JWT authentication, OTP flows, and clean backend architecture.", visible: true, order_index: 2 },
  ];
  const { error: freErr } = await supabase.from("freelance_services").upsert(freelance, { onConflict: "title" });
  if (freErr) console.error("Freelance:", freErr.message);
  else console.log("✓ Freelance services seeded");

  console.log("\nDone!");
}

seed().catch(console.error);
