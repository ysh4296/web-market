import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  plugins: [
    "gatsby-plugin-typescript",
    "gatsby-theme-material-ui",
    "gatsby-plugin-image",
    {
      resolve: "gatsby-plugin-babel",
      options: {
        presets: [["@babel/preset-react", { runtime: "automatic" }]],
      },
    },
    {
      resolve: "gatsby-plugin-alias-imports",
      options: {
        alias: {
          "@views": "src/views",
          "@images": "src/images",
        },
        extensions: ["ts", "tsx", "js", "jsx"],
      },
    },
  ],
};

export default config;
