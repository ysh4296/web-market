import { graphql, useStaticQuery } from "gatsby";

type SeoProps = {
  title: string;
  description: string;
  keywords: string;
  language: string;
};

export default function Seo({
  title,
  description,
  keywords,
  language,
}: SeoProps) {
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

  const siteTitle = data.site?.siteMetadata?.title ?? "Dizzy-Shield";
  const siteUrl = data.site?.siteMetadata?.siteUrl ?? "";
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
      <meta
        name="google-site-verification"
        content="iHNHzPKgmM6oER9klgMGHOkOrVxQXuLaO8GNVjLCqGc"
      />
      <link rel="icon" href={image} />
    </>
  );
}
