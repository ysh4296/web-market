import useInView from "@hooks/useInView";
import { Box, Card, Container, Typography } from "@mui/material";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { fadeUp } from "@utils/keyFrames";

const DescriptionView = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  const { t } = useTranslation();

  return (
    <section style={{ width: "100%", padding: "60px 0" }}>
      <Container ref={ref} maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: 6,
          }}
        >
          <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
            <Typography
              variant="h4"
              sx={{
                animation: inView ? `${fadeUp} .6s ease-out` : "none",
                opacity: inView ? 1 : 0,
                mb: 2,
              }}
            >
              {t("description.title")}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "grey.300",
                animation: inView ? `${fadeUp} .6s ease-out` : "none",
                opacity: inView ? 1 : 0,
                lineHeight: 1.7,
              }}
            >
              {t("description.body")}
            </Typography>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Card
              sx={{
                p: 4,
                borderRadius: 3,
                background: "paper",
                backdropFilter: "blur(4px)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 0 16px rgba(99,102,241,0.2)",
                animation: inView ? `${fadeUp} .6s ease-out` : "none",
                opacity: inView ? 1 : 0,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  mb: 3,
                  textAlign: "left",
                  animation: inView ? `${fadeUp} .6s ease-out` : "none",
                  opacity: inView ? 1 : 0,
                }}
              >
                {t("description.cardTitle")}
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    animation: inView ? `${fadeUp} .6s ease-out` : "none",
                    opacity: inView ? 1 : 0,
                  }}
                >
                  {t("description.item1.title")}
                </Typography>
                <Typography
                  sx={{
                    color: "grey.300",
                    lineHeight: 1.6,
                    animation: inView ? `${fadeUp} .6s ease-out` : "none",
                    opacity: inView ? 1 : 0,
                  }}
                >
                  {t("description.item1.body")}
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    animation: inView ? `${fadeUp} .6s ease-out` : "none",
                    opacity: inView ? 1 : 0,
                  }}
                >
                  {t("description.item2.title")}
                </Typography>
                <Typography
                  sx={{
                    color: "grey.300",
                    lineHeight: 1.6,
                    animation: inView ? `${fadeUp} .6s ease-out` : "none",
                    opacity: inView ? 1 : 0,
                  }}
                >
                  {t("description.item2.body")}
                </Typography>
              </Box>
            </Card>
          </Box>
        </Box>
      </Container>
    </section>
  );
};

export default DescriptionView;
