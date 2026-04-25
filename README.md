# 🌐 Aakash Dahiya — Developer Portfolio

A modern, fully responsive **personal portfolio website** built to showcase my skills, projects, and experience as a **Full-Stack Web Developer**. Features a 3D interactive background, admin panel for live content management, and a complete MERN-style backend.

![Portfolio Preview](https://my-portfolio-blush-kappa-88.vercel.app/og-image.webp)

🔗 **Live Website:** [https://my-portfolio-blush-kappa-88.vercel.app/](https://my-portfolio-blush-kappa-88.vercel.app/)
📄 **Resume:** Download available on the website
📂 **GitHub Repository:** [https://github.com/Aakash22010/myPortfolio](https://github.com/Aakash22010/myPortfolio)

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Sections](#-sections)
- [Admin Panel](#-admin-panel)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Connect With Me](#-connect-with-me)

---

## 🚀 About the Project

This portfolio is designed to present my **real-world development experience**, including internships, full-stack projects, and leadership roles. It goes beyond a typical static portfolio — all content is stored in a **Supabase (PostgreSQL) database** and managed through a **password-protected admin panel** accessible at `/admin`.

### Key Goals:
- Showcase practical skills with real project links
- Highlight internships and leadership experience
- Be recruiter-friendly and fully mobile-responsive
- Allow live content edits without touching code
- Maintain high performance with smooth animations

---

## ✨ Features

- ⚡ **Fast Performance** — Vite + rolldown build for optimal loading
- 🌗 **Dark/Light Mode** — Smooth theme toggle with persistent preference
- 🎥 **Smooth Animations** — Framer Motion scroll-triggered effects
- 🧊 **3D Background** — Interactive icosahedron that responds to mouse movement (pure Canvas API, no Three.js)
- 💓 **Heartbeat Preloader** — EKG-style animation on page load
- 📱 **Fully Responsive** — Mobile, tablet, and desktop optimized
- 🧭 **Active Nav Tracking** — IntersectionObserver highlights current section
- 📊 **Scroll Progress Bar** — Spring-animated reading indicator
- 🖥️ **Terminal Block** — Code-style developer card in Hero section
- 🔐 **Admin Panel** — JWT-authenticated CMS at `/admin`
- 🗄️ **Supabase Backend** — All data fetched from PostgreSQL via Express API
- 📄 **Animated Download Button** — Progress fill + checkmark on resume download
- 🔍 **SEO Optimized** — OpenGraph meta tags

---

## 🛠 Tech Stack

### **Frontend**
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

### **Backend**
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

### **Deployment**
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

---

## 📁 Project Structure

```
myPortfolio/
├── public/                        # Static assets
│   ├── profile.png                # Profile photo
│   └── Aakash_Dahiya_Resume.pdf   # Resume
├── src/
│   ├── components/                # Portfolio sections
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Experience.jsx
│   │   ├── Freelance.jsx
│   │   ├── Projects.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── Background3D.jsx       # Canvas 3D icosahedron
│   │   ├── Preloader.jsx          # Heartbeat loader
│   │   ├── DownloadButton.jsx     # Animated download
│   │   └── ThemeToggle.jsx
│   ├── pages/
│   │   └── admin/
│   │       ├── AdminLogin.jsx     # /admin route
│   │       ├── AdminDashboard.jsx # /admin/dash route
│   │       └── AdminSection.jsx   # Reusable CRUD UI
│   ├── hooks/
│   │   └── useTheme.jsx           # Theme context
│   ├── lib/
│   │   └── api.js                 # All API calls
│   ├── animations.js              # Framer Motion variants
│   ├── App.jsx                    # Router + layout
│   ├── index.css                  # Global styles + CSS vars
│   └── main.jsx
├── server/                        # Express backend
│   ├── db/
│   │   └── supabase.js
│   ├── middleware/
│   │   └── auth.js                # JWT middleware
│   ├── routes/
│   │   ├── auth.js
│   │   ├── projects.js
│   │   ├── skills.js
│   │   ├── experience.js
│   │   └── freelance.js
│   ├── server.js
│   ├── seed.js                    # Populate Supabase
│   ├── supabase_schema.sql        # Run in Supabase SQL Editor
│   └── package.json
├── vercel.json                    # SPA routing fix
└── package.json
```

---

## 📁 Sections

1. **Hero** — Name, typed role animation, terminal code block, stat chips, stack pills
2. **About** — Bio with inline highlights, stat grid
3. **Skills** — Categorized cards (Frontend / Backend / Tools) fetched from DB
4. **Experience** — Vertical timeline with type badges, fetched from DB
5. **Freelancing** — Service cards, fetched from DB
6. **Projects** — Featured card + numbered grid, fetched from DB
7. **Contact** — Social link rows + animated send button
8. **Footer** — Social icons with spring hover + tooltips

---

## 🔐 Admin Panel

Visit `/admin` to access the content management panel.

| Route | Description |
|---|---|
| `/admin` | Login page (JWT auth) |
| `/admin/dash` | Dashboard — full CRUD for all sections |

**Capabilities:**
- Add, edit, delete projects / skills / experience / freelance services
- Toggle visibility (hide items without deleting)
- Changes reflect on the live portfolio instantly

---

## 📦 Installation & Setup

### Frontend

```bash
# Clone the repo
git clone https://github.com/Aakash22010/myPortfolio.git
cd myPortfolio

# Install dependencies
npm install

# Create .env in root
echo "VITE_API_URL=http://localhost:5000" > .env

# Start dev server
npm run dev
# → http://localhost:5173
```

### Backend

```bash
cd server

# Install dependencies
npm install

# Create server/.env (see Environment Variables below)

# Run schema in Supabase SQL Editor first, then:
npm run seed   # populates all tables + creates admin user

# Start server
npm start
# → http://localhost:5000
```

---

## 🔑 Environment Variables

### `server/.env`
```
SUPABASE_URL=https://yourproject.supabase.co
SUPABASE_SERVICE_KEY=your_service_role_key
JWT_SECRET=your_random_secret_min_32_chars
PORT=5000
FRONTEND_URL=https://your-vercel-url.vercel.app
```

### `.env` (root — frontend)
```
VITE_API_URL=https://your-render-backend.onrender.com
```

> ⚠️ Never commit `.env` files. Both are listed in `.gitignore`.

---

## 🚀 Deployment

### Backend → Render
1. New Web Service → connect GitHub repo
2. Root Directory: `server`
3. Build: `npm install` / Start: `npm start`
4. Add all 5 env vars in Render dashboard

### Frontend → Vercel
1. Import GitHub repo on Vercel
2. Add `VITE_API_URL` environment variable
3. `vercel.json` handles SPA routing automatically

---

## 📄 License

MIT License — feel free to use this as inspiration. Attribution appreciated! 🙌

---

## 📬 Connect With Me

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/aakashdahiya167)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Aakash22010)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:aakashdahiya167@gmail.com)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/_aakashdahiya_)

---
Last updated: April 25, 2026
*Built with React, Tailwind CSS, Framer Motion, Express, and Supabase*
