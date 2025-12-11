import { type HeadFC, Link, graphql } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import LanguageSwitcher from "@components/LanguageSwitcher";
import Seo from "@components/Seo";

const pageStyles = {
  color: "#232129",
  padding: "96px",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
};
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
};

const paragraphStyles = {
  marginBottom: 48,
};

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <main style={pageStyles}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 24 }}>
        <LanguageSwitcher />
      </div>
      <h1 style={headingStyles}>{t("notFound.title")}</h1>
      <p style={paragraphStyles}>
        {t("notFound.message")}
        <br />
        {process.env.NODE_ENV === "development" ? (
          <>
            <br />
            {t("notFound.hint")}
            <br />
          </>
        ) : null}
        <br />
        <Link to="/">{t("notFound.home")}</Link>.
      </p>
    </main>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => <Seo titleKey="notFound.headTitle" descriptionKey="notFound.message" />;

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
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
