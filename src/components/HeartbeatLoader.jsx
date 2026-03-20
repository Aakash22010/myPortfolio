export default function HeartbeatLoader({ size = 1 }) {
  return (
    <>
      <style>{`
        .hb-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem 0;
        }
        .hb-heart-rate {
          width: ${150 * size}px;
          height: ${73 * size}px;
          position: relative;
        }
        .hb-fade-in {
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: var(--bg, #040d0e);
          top: 0;
          right: 0;
          animation: hbFadeIn 2.5s linear infinite;
        }
        .hb-fade-out {
          position: absolute;
          width: 120%;
          height: 100%;
          top: 0;
          right: -120%;
          animation: hbFadeOut 2.5s linear infinite;
          background: linear-gradient(
            to right,
            var(--bg, #040d0e) 0%,
            var(--bg, #040d0e) 80%,
            transparent 100%
          );
        }
        @keyframes hbFadeIn {
          0%   { width: 100%; }
          50%  { width: 0; }
          100% { width: 0; }
        }
        @keyframes hbFadeOut {
          0%   { left: -120%; }
          30%  { left: -120%; }
          100% { left: 0; }
        }
      `}</style>

      <div className="hb-wrap">
        <div className="hb-heart-rate">
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width={`${150 * size}px`}
            height={`${73 * size}px`}
            viewBox="0 0 150 73"
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
          <div className="hb-fade-in" />
          <div className="hb-fade-out" />
        </div>
      </div>
    </>
  );
}