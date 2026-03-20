import { useEffect, useState } from "react";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer  = setTimeout(() => setFading(true),  2800);
    const removeTimer = setTimeout(() => setVisible(false), 3500);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <style>{`
        .preloader-wrap {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg, #040d0e);
          transition: opacity 0.7s ease;
        }
        .preloader-wrap.fading {
          opacity: 0;
          pointer-events: none;
        }
        .heart-rate {
          width: 150px;
          height: 73px;
          position: relative;
        }
        .hr-fade-in {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          right: 0;
          background-color: var(--bg, #040d0e);
          animation: hrFadeIn 2.5s linear infinite;
        }
        .hr-fade-out {
          position: absolute;
          width: 120%;
          height: 100%;
          top: 0;
          right: -120%;
          animation: hrFadeOut 2.5s linear infinite;
          background: linear-gradient(
            to right,
            var(--bg, #040d0e) 0%,
            var(--bg, #040d0e) 80%,
            transparent 100%
          );
        }
        @keyframes hrFadeIn {
          0%   { width: 100%; }
          50%  { width: 0; }
          100% { width: 0; }
        }
        @keyframes hrFadeOut {
          0%   { left: -120%; }
          30%  { left: -120%; }
          100% { left: 0; }
        }
        .preloader-label {
          margin-top: 20px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent, #0fa4af);
          opacity: 0.7;
          animation: labelPulse 2.5s ease-in-out infinite;
        }
        @keyframes labelPulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.9; }
        }
      `}</style>

      <div className={`preloader-wrap${fading ? " fading" : ""}`}>
        <div style={{ textAlign: "center" }}>
          <div className="heart-rate">
            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              x="0px" y="0px"
              width="150px" height="73px"
              viewBox="0 0 150 73"
              enableBackground="new 0 0 150 73"
            >
              <polyline
                fill="none"
                stroke="var(--accent, #0fa4af)"
                strokeWidth="3"
                strokeMiterlimit="10"
                points="0,45.486 38.514,45.486 44.595,33.324 50.676,45.486 
                        57.771,45.486 62.838,55.622 71.959,9 80.067,63.729 
                        84.122,45.486 97.297,45.486 103.379,40.419 
                        110.473,45.486 150,45.486"
              />
            </svg>
            <div className="hr-fade-in" />
            <div className="hr-fade-out" />
          </div>
          <div className="preloader-label">loading</div>
        </div>
      </div>
    </>
  );
}