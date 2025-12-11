import { Button, Box } from "@mui/material";
import { borderPulse, shineMain, shineTrail } from "@utils/keyFrames";

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
