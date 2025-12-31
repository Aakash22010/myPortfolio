import { motion } from "framer-motion";

/* ---------- SOCIAL LINKS ---------- */
const socials = [
  {
    name: "GitHub",
    href: "https://github.com/Aakash22010",
    icon: (
      <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.7-.7 2.1-1.1.1-.7.4-1.1.7-1.4-2.6-.3-5.4-1.3-5.4-5.8 0-1.3.5-2.4 1.1-3.3-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 .1a10.5 10.5 0 015.5 0c2.1-.4 3-.1 3-.1.6 1.5.2 2.6.1 2.9.7.9 1.1 2 1.1 3.3 0 4.5-2.8 5.5-5.4 5.8.4.3.8 1 .8 2v3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/aakashdahiya167/",
    icon: (
      <path d="M4.98 3.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zM3 9h4v12H3zM9 9h3.8v1.6h.1c.5-.9 1.8-1.9 3.6-1.9 3.9 0 4.6 2.6 4.6 5.9V21h-4v-5.2c0-1.2 0-2.7-1.7-2.7s-2 1.3-2 2.6V21H9z" />
    ),
  },
  {
    name: "Instagram",
    href: "http://instagram.com/_aakashdahiya_/",
    icon: (
      <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-.9a1.1 1.1 0 110 2.2 1.1 1.1 0 010-2.2z" />
    ),
  },
  {
    name: "Email",
    href: "mailto:aakashdahiya167@gmail.com",
    icon: (
      <path d="M2 4h20v16H2V4zm10 7L4 6v12h16V6l-8 5z" />
    ),
  },
];

/* ---------- CLICK TRACKING ---------- */
const trackClick = (label) => {
  console.log(`Social link clicked: ${label}`);

  // 🔥 Later you can replace this with:
  // window.gtag("event", "click", { event_label: label });
};

export default function Footer() {
  return (
    <footer className="py-3 text-center">
      <div className="flex justify-center gap-8 mb-4">
        {socials.map((social) => (
          <motion.a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackClick(social.name)}
            className="relative group opacity-70 hover:opacity-100"
            whileHover={{ scale: 1.2, y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
            aria-label={social.name}
          >
            {/* ICON */}
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              {social.icon}
            </svg>

            {/* TOOLTIP */}
            <span
              className="absolute -top-9 left-1/2 -translate-x-1/2
              px-2 py-1 text-xs rounded bg-black text-white
              opacity-0 group-hover:opacity-100 transition pointer-events-none"
            >
              {social.name}
            </span>
          </motion.a>
        ))}
      </div>

      <p className="text-sm opacity-60">
        © {new Date().getFullYear()} Aakash Dahiya
      </p>
    </footer>
  );
}
