import { Box, Divider, ThemeProvider, createTheme } from "@mui/material";
import { type HeadFC, graphql } from "gatsby";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTranslation } from "gatsby-plugin-react-i18next";
import LanguageSwitcher from "@components/LanguageSwitcher";
import Seo from "@components/Seo";
import BrandingView from "@views/BrandingView";
import DemoPanel from "@views/DemoPanel";
import DescriptionView from "@views/DescriptionView";
import FooterView from "@views/FooterView";
import { Analytics } from "@vercel/analytics/react";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#6366f1" },
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

export default function App() {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            px: { xs: 2, md: 4 },
            pt: { xs: 2, md: 3 },
          }}
        >
          <LanguageSwitcher />
        </Box>

        <BrandingView />

        <Divider sx={{ width: "100%", opacity: 0.1 }} />

        <DescriptionView />

        <Divider sx={{ width: "100%", opacity: 0.1 }} />

        {isMobile ? null : (
          <>
            <DemoPanel />
            <Divider sx={{ width: "100%", opacity: 0.1 }} />
          </>
        )}

        <FooterView />
      </main>
      <Analytics />
    </ThemeProvider>
  );
}

export const Head: HeadFC = ({
  data,
  pageContext,
}: { data: any; pageContext: any }) => {
  const { t } = useTranslation(["seo"]);
  const seoNode = data.locales.edges.find((edge) => edge.node.ns === "seo");

  let seo: { title?: string; description?: string; keywords?: string } = {};
  if (seoNode) {
    try {
      seo = JSON.parse(seoNode.node.data);
    } catch {
      // ignore parse errors
    }
  }

  return (
    <Seo
      title={seo.title ?? t("title")}
      description={seo.description ?? t("description")}
      keywords={seo.keywords ?? t("keywords", { defaultValue: "" })}
      language={pageContext.language}
    />
  );
};

export const query = graphql`
  query IndexPage($language: String!) {
    locales: allLocale(
      filter: { language: { eq: $language }, ns: { in: ["translation", "seo"] } }
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
