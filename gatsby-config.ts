// Module dependency

require('ts-node').register({
  compilerOptions: {
      module: 'commonjs',
      target: 'es2017',
  },
})

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

let {
  CONTENTSTACK_API_KEY,
  CONTENTSTACK_DELIVERY_TOKEN,
  CONTENTSTACK_ENVIRONMENT,
  CONTENTSTACK_API_HOST,
  CONTENTSTACK_HOSTED_URL,
} = process.env

CONTENTSTACK_API_HOST = CONTENTSTACK_API_HOST.replace(/api/g, "cdn")

const hostedUrl = CONTENTSTACK_HOSTED_URL || "http://localhost:9000"
const cdnHost = CONTENTSTACK_API_HOST?.replace(/api/g, "cdn")

module.exports = {
  siteMetadata: {
    title: "Gatsby Sample App",
    description: "This is a sample app build using Gatsby and Contentstack",
    author: "Contentstack",
    siteUrl: hostedUrl,
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    "gatsby-plugin-offline",
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: hostedUrl,
        sitemap: `${hostedUrl}/sitemap.xml`,
        policy: [{ userAgent: "*" }],
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Contentstack-Gatsby-Starter-App",
        short_name: "starter",
        start_url: "/",
        background_color: "#663399",
        theme_color: "#663399",
        display: "minimal-ui",
        icon: "src/images/contentstack.png", // This path is relative to the root of the site.
        icon_options: {
          purpose: `any maskable`,
        },
      },
    },
    {
      resolve: "gatsby-source-contentstack",
      options: {
        api_key: CONTENTSTACK_API_KEY,
        delivery_token: CONTENTSTACK_DELIVERY_TOKEN,
        environment: CONTENTSTACK_ENVIRONMENT,
        cdn: `https://${cdnHost}/v3`,
        // Optional: expediteBuild set this to either true or false
        expediteBuild: true,
        enableSchemaGeneration: true,
        type_prefix: "Contentstack", // (default),
      },
    },
    {
      resolve: `gatsby-plugin-env-variables`,
      options: {
        allowList: [
          "CONTENTSTACK_API_KEY",
          "CONTENTSTACK_DELIVERY_TOKEN",
          "CONTENTSTACK_ENVIRONMENT",
          "CONTENTSTACK_MANAGEMENT_TOKEN",
          "CONTENTSTACK_API_HOST",
          "CONTENTSTACK_APP_HOST",
          "CONTENTSTACK_LIVE_PREVIEW",
        ],
      },
    },
  ],
}
