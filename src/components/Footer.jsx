import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="py-3 text-center ">
      <div className="flex justify-center gap-6 text-lg mb-3">
        <a
          href="https://github.com/Aakash22010"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/aakashdahiya167/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
        </a>
        <a
          href="http://instagram.com/_aakashdahiya_/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
      </div>

      <p className="text-sm opacity-60">
        © {new Date().getFullYear()} Aakash Dahiya
      </p>
    </footer>
  );
}
