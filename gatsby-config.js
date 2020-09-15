/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: 'gatsby-plugin-html-attributes',
      options: {
        lang: 'en'
      }
    },
    {
      resolve: `gatsby-plugin-react-helmet`
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },
    {
      resolve: `gatsby-transformer-csv`,
      options: {
        typeName: () => `Murphs`,
        nodePerFile: `results`,
      },
    },
  ],
}
