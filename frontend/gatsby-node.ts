const path = require(`path`)
import { CreatePagesArgs } from "gatsby"

interface QueryData {
  allMarkdownRemark: {
    nodes: {
      frontmatter: {
        slug: string
      }
    }[]
  }
  allStrapiCategory: {
    nodes: {
      slug: string
    }[]
  }
}

exports.createPages = async ({ graphql, actions } : CreatePagesArgs) => {
  const { data} = await graphql<QueryData>(`
    query Articles {
      allMarkdownRemark {
        nodes {
          frontmatter {
            slug
          }
        }
      }
      allStrapiCategory {
        nodes {
          slug
        }
      }
    }
  `)

  if (data?.allMarkdownRemark?.nodes) {
    data.allMarkdownRemark.nodes.forEach((node: { frontmatter: { slug: string } }) => {
      actions.createPage({
        path: '/characters/'+ node.frontmatter.slug,
        component: path.resolve('./src/templates/character-details.tsx'),
        context: { slug: node.frontmatter.slug }
      })
    })
  }

  if (data?.allStrapiCategory?.nodes) {
    data.allStrapiCategory.nodes.forEach((node: {slug: string }) => {
      actions.createPage({
        path: '/digimons/'+ node.slug,
        component: path.resolve('./src/templates/digimons-by-level.tsx'),
        context: { slug: node.slug }
      })
    })
  }
}
