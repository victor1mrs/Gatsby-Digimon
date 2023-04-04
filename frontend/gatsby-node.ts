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
}

// exports.createResolvers = ({ createResolvers }) => {
//   const resolvers = {
//     Query: {
//       allStrapiPost: {
//         type: `[Strapi_Post]`,
//         resolve: async (source, args, context, info) => {
//           const { allStrapiPost } = await context.nodeModel.runQuery({
//             query: {
//               filter: {
//                 published: {
//                   eq: true
//                 }
//               }
//             },
//             type: "Strapi_Post"
//           });
//           return allStrapiPost;
//         }
//       }
//     }
//   };

//   createResolvers(resolvers);
// };
