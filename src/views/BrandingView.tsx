import { Box, Container, Typography } from "@mui/material";
import { useTranslation } from "gatsby-plugin-react-i18next";
import ShineButton from "@components/ShineButton";
import dizzyShield from "@images/dizzy-shield.ico";
import { fadeUp, popIn, pulseGlow } from "@utils/keyFrames";

const BrandingView = () => {
  const { t } = useTranslation();

  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        position: "relative",
        maxWidth: "1200px",
      }}
    >
      <Box
        component="img"
        src={dizzyShield}
        alt={t("brand.iconAlt")}
        sx={{
          width: 120,
          height: 120,
          position: "absolute",
          top: 160,
          left: 120,
          animation: `${pulseGlow} 3s ease-in-out infinite, ${popIn} 0.8s ease-out`,
          opacity: 0.9,
          border: "2px solid rgba(118,124,255,0.8)",
          borderRadius: "12px",
          filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.4))",
        }}
      />

      <Container sx={{ maxWidth: 720, mt: 30, textAlign: "start" }}>
        <Typography
          variant="h1"
          color="primary"
          sx={{
            animation: `${fadeUp} .6s ease-out`,
            animationDelay: "0.2s",
            opacity: 0,
            animationFillMode: "forwards",
          }}
        >
          {t("brand.title")}
        </Typography>

        <Typography
          variant="h2"
          sx={{
            lineHeight: 1.1,
            mb: 2,
            fontWeight: 700,
            animation: `${fadeUp} .6s ease-out`,
            animationDelay: "0.4s",
            mt: 4,
            opacity: 0,
            animationFillMode: "forwards",
          }}
        >
          {t("brand.subtitle")}
        </Typography>
      </Container>

      <Box
        sx={{
          mt: 8,
          animation: `${fadeUp} .6s ease-out`,
          animationDelay: "0.6s",
          opacity: 0,
          animationFillMode: "forwards",
        }}
      >
        <ShineButton>{t("brand.cta")}</ShineButton>
      </Box>
    </Box>
  );
};

export default BrandingView;
