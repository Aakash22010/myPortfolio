import { useState } from "react";

export default function DownloadButton({ href, filename }) {
  const [clicked, setClicked] = useState(false);
  const [done, setDone] = useState(false);

  function handleClick() {
    if (clicked || done) return;
    setClicked(true);
    setTimeout(() => setDone(true), 3900);
  }

  return (
    <>
      <style>{`
        .dl-label {
          background-color: transparent;
          border: 2px solid var(--accent);
          display: flex;
          align-items: center;
          border-radius: 50px;
          width: 160px;
          cursor: pointer;
          transition: all 0.4s ease;
          padding: 5px;
          position: relative;
          text-decoration: none;
        }
        .dl-label::before {
          content: "";
          position: absolute;
          top: 0; bottom: 0; left: 0; right: 0;
          background-color: #fff;
          width: 8px; height: 8px;
          transition: all 0.4s ease;
          border-radius: 100%;
          margin: auto;
          opacity: 0;
          visibility: hidden;
        }
        .dl-title {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          color: var(--text);
          transition: all 0.4s ease;
          position: absolute;
          right: 18px;
          bottom: 14px;
          text-align: center;
          white-space: nowrap;
        }
        .dl-title:last-child {
          opacity: 0;
          visibility: hidden;
        }
        .dl-circle {
          height: 45px;
          width: 45px;
          border-radius: 50%;
          background-color: var(--accent);
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.4s ease;
          position: relative;
          box-shadow: 0 0 0 0 rgba(255,255,255,0);
          overflow: hidden;
          flex-shrink: 0;
        }
        .dl-icon {
          color: #fff;
          width: 26px;
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.4s ease;
        }
        .dl-square {
          aspect-ratio: 1;
          width: 15px;
          border-radius: 2px;
          background-color: #fff;
          opacity: 0;
          visibility: hidden;
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.4s ease;
        }
        .dl-circle::before {
          content: "";
          position: absolute;
          left: 0; top: 0;
          background-color: var(--accent2);
          width: 100%;
          height: 0;
          transition: all 0.4s ease;
        }
        .dl-label.clicked {
          width: 57px;
          animation: dl-installed 0.4s ease 3.5s forwards;
        }
        .dl-label.clicked::before {
          animation: dl-rotate 3s ease-in-out 0.4s forwards;
        }
        .dl-label.clicked .dl-circle {
          animation: dl-pulse 1s forwards, dl-circleDelete 0.2s ease 3.5s forwards;
          rotate: 180deg;
        }
        .dl-label.clicked .dl-circle::before {
          animation: dl-installing 3s ease-in-out forwards;
        }
        .dl-label.clicked .dl-icon {
          opacity: 0;
          visibility: hidden;
        }
        .dl-label.clicked .dl-square {
          opacity: 1;
          visibility: visible;
        }
        .dl-label.clicked .dl-title {
          opacity: 0;
          visibility: hidden;
        }
        .dl-label.clicked .dl-title:last-child {
          animation: dl-showDone 0.4s ease 3.5s forwards;
        }
        .dl-label.done {
          width: 150px;
          border-color: #22c55e;
        }
        @keyframes dl-pulse {
          0%   { scale: 0.95; box-shadow: 0 0 0 0 rgba(255,255,255,0.7); }
          70%  { scale: 1;    box-shadow: 0 0 0 16px rgba(255,255,255,0); }
          100% { scale: 0.95; box-shadow: 0 0 0 0 rgba(255,255,255,0); }
        }
        @keyframes dl-installing {
          from { height: 0; }
          to   { height: 100%; }
        }
        @keyframes dl-rotate {
          0%   { transform: rotate(-90deg) translate(27px) rotate(0); opacity: 1; visibility: visible; }
          99%  { transform: rotate(270deg) translate(27px) rotate(270deg); opacity: 1; visibility: visible; }
          100% { opacity: 0; visibility: hidden; }
        }
        @keyframes dl-installed {
          100% { width: 150px; border-color: #22c55e; }
        }
        @keyframes dl-circleDelete {
          100% { opacity: 0; visibility: hidden; }
        }
        @keyframes dl-showDone {
          100% { opacity: 1; visibility: visible; right: 56px; }
        }
      `}</style>

      <a
        href={href}
        download={filename}
        onClick={handleClick}
        className={`dl-label ${clicked ? "clicked" : ""} ${done ? "done" : ""}`}
      >
        <span className="dl-circle">
          <svg className="dl-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 19V5m0 14-4-4m4 4 4-4" />
          </svg>
          <div className="dl-square" />
        </span>
        <p className="dl-title">resume.pdf</p>
        <p className="dl-title">Open ✓</p>
      </a>
    </>
  );
}