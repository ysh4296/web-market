import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: "Dizzy-Shield",
    siteUrl: "https://web-market-xi.vercel.app/",
  },
  plugins: [
    "gatsby-plugin-typescript",
    "gatsby-theme-material-ui",
    "gatsby-plugin-image",
    {
      resolve: "gatsby-plugin-alias-imports",
      options: {
        alias: {
          "@components": "src/components",
          "@views": "src/views",
          "@images": "src/images",
          "@utils": "src/utils",
          "@hooks": "src/hooks",
          "@locale": "src/locale",
        },
        extensions: [".ts", ".tsx", ".js", ".jsx"],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "locales",
        path: `${__dirname}/locales`,
      },
    },
    {
      resolve: "gatsby-plugin-react-i18next",
      options: {
        localeJsonSourceName: "locales",
        languages: ["ko", "en", "ja", "es", "zh"],
        defaultLanguage: "ko",
        fallbackLanguage: "en",
        siteUrl: "https://example.com",
        i18nextOptions: {
          supportedLngs: ["ko", "en", "ja", "es", "zh"],
          ns: ["translation", "seo"],
          defaultNS: "translation",
          interpolation: {
            escapeValue: false,
          },
        },
      },
    },
  ],
};

export default config;
