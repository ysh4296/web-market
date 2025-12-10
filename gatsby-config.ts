import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  plugins: [
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
        extensions: ["ts", "tsx", "js", "jsx", "ico"],
      },
    },
  ],
};

export default config;
