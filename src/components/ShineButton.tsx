import { Button, Box } from "@mui/material";
import { keyframes } from "@mui/system";

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

const ShineButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-block",
        borderRadius: "14px",
        p: "3px",
        background:
          "linear-gradient(120deg, #6366f1 0%, #818cf8 40%, #c7d2fe 100%)",
        overflow: "hidden",
        animation: `${borderPulse} 3s infinite ease-in-out`,
      }}
    >
      {/* 메인 강광 */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: "-120%",
          width: "120%",
          height: "100%",
          background:
            "linear-gradient(120deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.1) 100%)",
          filter: "blur(14px)",
          animation: `${shineMain} 1.2s infinite ease-out`,
        }}
      />

      {/* 잔광 */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: "-150%",
          width: "150%",
          height: "100%",
          background:
            "linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%)",
          filter: "blur(22px)",
          animation: `${shineTrail} 1.8s infinite ease-out`,
        }}
      />

      <Button
        sx={{
          borderRadius: "12px",
          px: 5,
          py: 1.8,
          fontSize: "20px",
          fontWeight: 700,
          textTransform: "none",
          background: "rgba(30, 41, 59, 0.92)",
          color: "white",
          position: "relative",
          zIndex: 2,
          overflow: "hidden",
          backdropFilter: "blur(6px)",

          // hover 시 폭발적인 빛 확장
          "&:hover": {
            background: "rgba(51, 65, 85, 0.95)",
            boxShadow: "0 0 40px rgba(158,164,255,1)",
          },
        }}
      >
        {children}
      </Button>
    </Box>
  );
};

export default ShineButton;
