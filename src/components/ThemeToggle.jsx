import useTheme from "../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <>
      <style>{`
        .theme-switch {
          font-size: 17px;
          position: relative;
          display: inline-block;
          width: 4em;
          height: 2.2em;
          border-radius: 30px;
          box-shadow: 0 0 10px rgba(0,0,0,0.15);
        }
        .theme-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .theme-slider {
          position: absolute;
          cursor: pointer;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: #2a2a2a;
          transition: 0.4s;
          border-radius: 30px;
          overflow: hidden;
        }
        .theme-slider:before {
          position: absolute;
          content: "";
          height: 1.2em;
          width: 1.2em;
          border-radius: 20px;
          left: 0.5em;
          bottom: 0.5em;
          transition: 0.4s;
          transition-timing-function: cubic-bezier(0.81, -0.04, 0.38, 1.5);
          box-shadow: inset 8px -4px 0px 0px #fff;
        }
        .theme-switch input:checked + .theme-slider {
          background-color: #00a6ff;
        }
        .theme-switch input:checked + .theme-slider:before {
          transform: translateX(1.8em);
          box-shadow: inset 15px -4px 0px 15px #ffcf48;
        }
        .theme-star {
          background-color: #fff;
          border-radius: 50%;
          position: absolute;
          width: 5px;
          height: 5px;
          transition: all 0.4s;
        }
        .theme-star-1 { left: 2.5em; top: 0.5em; }
        .theme-star-2 { left: 2.2em; top: 1.2em; }
        .theme-star-3 { left: 3em;   top: 0.9em; }
        .theme-switch input:checked ~ .theme-slider .theme-star {
          opacity: 0;
        }
        .theme-cloud {
          width: 3.5em;
          position: absolute;
          bottom: -1.4em;
          left: -1.1em;
          opacity: 0;
          transition: all 0.4s;
        }
        .theme-switch input:checked ~ .theme-slider .theme-cloud {
          opacity: 1;
        }
      `}</style>

      <label className="theme-switch">
        <input
          type="checkbox"
          checked={!isDark}
          onChange={toggleTheme}
        />
        <span className="theme-slider">
          <div className="theme-star theme-star-1" />
          <div className="theme-star theme-star-2" />
          <div className="theme-star theme-star-3" />
          <svg viewBox="0 0 16 16" className="theme-cloud theme-cloud-1">
            <path
              transform="matrix(.77976 0 0 .78395-299.99-418.63)"
              fill="#fff"
              d="m391.84 540.91c-.421-.329-.949-.524-1.523-.524-1.351 0-2.451 1.084-2.485 2.435-1.395.526-2.388 1.88-2.388 3.466 0 1.874 1.385 3.423 3.182 3.667v.034h12.73v-.006c1.775-.104 3.182-1.584 3.182-3.395 0-1.747-1.309-3.186-2.994-3.379.007-.106.011-.214.011-.322 0-2.707-2.271-4.901-5.072-4.901-2.073 0-3.856 1.202-4.643 2.925"
            />
          </svg>
        </span>
      </label>
    </>
  );
}