import type { GatsbyConfig } from "gatsby";
const path = require(`path`);
import { CreateWebpackConfigArgs } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Gatsby-Ts`,
    siteUrl: `https://www.yourdomain.tld`,
    contact: 'victor1mrs@hotmail.com'
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: ["gatsby-transformer-remark", "gatsby-plugin-sass", "gatsby-plugin-image", "gatsby-plugin-mdx", "gatsby-plugin-sharp", "gatsby-transformer-sharp", "gatsby-plugin-tslint", {
    resolve: 'gatsby-source-filesystem',
    options: {
     name: `images`,
     path: `${__dirname}/src/images/`,
    },
    __key: "images"
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": "./src/pages/"
    },
    __key: "pages"
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      // The unique name for each instance
      name: `characters`,
      // Path to the directory
      path: `${__dirname}/src/characters/`,
    },
  },]
};

export default config;

exports.onCreateWebpackConfig = ({ actions }: CreateWebpackConfigArgs) => {
  actions.setWebpackConfig({
    resolve: {
      extensions: [`.ts`, `.tsx`, `.js`, `.jsx`, `.json`, `.scss`],
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            {
              loader: `sass-loader`,
              options: {
                sassOptions: {
                  includePaths: [path.resolve(__dirname, "src")],
                },
              },
            },
            {
              loader: `css-modules-typescript-loader`,
              options: {
                mode: process.env.NODE_ENV === `production` ? `verify` : `emit`,
              },
            },
            {
              loader: `css-loader`,
              options: {
                modules: {
                  localIdentName: `[local]--[hash:base64:5]`,
                },
                importLoaders: 1,
              },
            },
            {
              loader: `postcss-loader`,
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      `autoprefixer`,
                      {
                        // Options
                      },
                    ],
                  ],
                },
              },
            },
          ],
        },
      ],
    },
  });
};

