import { keyframes } from "@emotion/react";

const pulseGlow = keyframes`
  0% { box-shadow: 0 0 10px rgba(118,124,255,0.6); }
  50% { box-shadow: 0 0 25px rgba(158,164,255,1); }
  100% { box-shadow: 0 0 10px rgba(118,124,255,0.6); }
`;

const fadeUp = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const popIn = keyframes`
  0% { opacity: 0; transform: scale(0.8); }
  80% { opacity: 1; transform: scale(1.05); }
  100% { opacity: 1; transform: scale(1); }
`;

// 메인 shine (빠르게 지나가는 빛)
const shineMain = keyframes`
  0% { transform: translateX(-150%) skewX(-25deg); opacity: 0; }
  20% { opacity: 1; }
  50% { opacity: 0.9; transform: translateX(50%) skewX(-25deg); }
  100% { opacity: 0; transform: translateX(200%) skewX(-25deg); }
`;

// 잔광 (follow-up glow trail)
const shineTrail = keyframes`
  0% { transform: translateX(-180%) skewX(-25deg); opacity: 0; }
  30% { opacity: 0.4; }
  70% { opacity: 0.15; transform: translateX(120%) skewX(-25deg); }
  100% { opacity: 0; transform: translateX(220%) skewX(-25deg); }
`;

// 테두리 펄스 (살짝 살아 움직이는)
const borderPulse = keyframes`
  0% { box-shadow: 0 0 10px rgba(118,124,255,0.6); }
  50% { box-shadow: 0 0 24px rgba(158,164,255,1); }
  100% { box-shadow: 0 0 10px rgba(118,124,255,0.6); }
`;
export { pulseGlow, fadeUp, popIn, shineMain, shineTrail, borderPulse };
