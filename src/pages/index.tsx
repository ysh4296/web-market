import { ThemeProvider, createTheme, Divider } from "@mui/material";
import BrandingView from "@views/BrandingView";
import DemoPanel from "@views/DemoPanel";
import DescriptionView from "@views/DescriptionView";
import FooterView from "@views/FooterView";

// MUI 다크 테마 설정
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#6366f1" }, // indigo
    grey: { 200: "#cbd5e1", 300: "#94a3b8", 700: "#334155" },
    background: { default: "#0a1124ff", paper: "#1e293b" },
  },
  typography: {
    fontFamily: `"Inter", "Pretendard", sans-serif`,
    h1: {
      color: "#f1f5f9",
    },
    h2: {
      color: "#f1f5f9",
    },
    h3: {
      color: "#e2e8f0",
    },
    h4: {
      color: "#e2e8f0",
    },
    h5: {
      color: "#cbd5e1",
    },
    h6: {
      color: "#cbd5e1",
    },
    body1: {
      color: "#e2e8f0",
    },
    body2: {
      color: "#cbd5e1",
    },
  },
});

export default function AntiMotionSicknessLanding() {
  return (
    <ThemeProvider theme={theme}>
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 64,
          width: "100%",
          background: theme.palette.background.default,
        }}
      >
        {/* Hero Section */}
        <BrandingView />

        <Divider sx={{ width: "100%", opacity: 0.1 }} />

        <DescriptionView />

        <Divider sx={{ width: "100%", opacity: 0.1 }} />

        {/* Demo Section */}
        <DemoPanel />

        <Divider sx={{ width: "100%", opacity: 0.1 }} />

        {/* Footer */}
        <FooterView />
      </main>
    </ThemeProvider>
  );
}
