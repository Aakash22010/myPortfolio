// components/AnimatedEmailButton.jsx
import { motion } from "framer-motion";
import { useState } from "react";

const wrapperVariants = {
  initial: { y: 0 },
  hover: {
    y: [-0.1, 0.1],
    transition: {
      y: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  },
};

export default function AnimatedEmailButton({ href }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={href}
      className="inline-flex items-center gap-2 px-6 py-4 rounded-xl text-sm font-medium mono"
      style={{ background: "var(--accent)", color: "#fff" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "tween", duration: 0.2 }}
    >
      {/* SVG wrapper with bouncing animation */}
      <motion.div
        className="svg-wrapper-1"
        variants={wrapperVariants}
        animate={isHovered ? "hover" : "initial"}
      >
        <div className="svg-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              fill="currentColor"
              d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
            />
          </svg>
        </div>
      </motion.div>

      {/* Text with slide animation */}
      <motion.span
        animate={isHovered ? { x: 5 } : { x: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        Send me an email
      </motion.span>

      {/* Arrow that moves and rotates on hover */}
      <motion.span
        animate={
          isHovered
            ? { x: 1.2, rotate: 45, scale: 1.1 }
            : { x: 0, rotate: 0, scale: 1 }
        }
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ display: "inline-block" }}
      >
        →
      </motion.span>
    </motion.a>
  );
}