import { graphql, useStaticQuery } from "gatsby";
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next";

type SeoProps = {
  descriptionKey?: string;
};

export default function Seo({ descriptionKey = "brand.subtitle" }: SeoProps) {
  const { language } = useI18next();
  const { t } = useTranslation();
  const data = useStaticQuery<{
    site: { siteMetadata: { title?: string; siteUrl?: string } | null };
  }>(graphql`
    query SeoMetadata {
      site {
        siteMetadata {
          title
          siteUrl
        }
      }
    }
  `);

  const title = "Dizzy-Shield";
  const description = t(descriptionKey);
  const keywords = t("seo.keywords", { defaultValue: "" });
  const siteTitle = data.site?.siteMetadata?.title ?? "Dizzy-Shield";
  const siteUrl = window.location.origin;
  const image = `${siteUrl}/favicon.ico`;

  return (
    <>
      <html lang={language} />
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <link rel="icon" href={image} />
    </>
  );
}
