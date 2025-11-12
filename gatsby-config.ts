import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  plugins: [
    "gatsby-plugin-typescript",
    {
      resolve: "gatsby-plugin-babel",
      options: {
        presets: [["@babel/preset-react", { runtime: "automatic" }]],
      },
    },
  ],
};

export default config;
