import React from 'react'
import Layout from '../components/Layout'
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image"
import { graphql, PageProps } from 'gatsby'
// import { card, title, imageStyle, profile, header, description } from "./digimons-by-level.module.scss"
import * as styles from './digimons-by-level.module.scss'

type DigimonsByLevelProps = {
  allStrapiArticle: {
    nodes : [{
      category: {
        category: string
      }
      title: string
      content: {
        data: {
          childMarkdownRemark: {
            html: any
            id: string
          }
        }
      }
      image : {
        localFile: {
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData
          }
        }
      }
    }]
  }
}

const DigimonsByLevel = ({ data }: PageProps<DigimonsByLevelProps>) => {
  const type = data.allStrapiArticle.nodes[0].category.category
  const digimons = data.allStrapiArticle.nodes
  console.log(styles)
  return (
    <Layout>
      <div>
        <div className={styles.header}>
          <h2>Digimons of type: {type}</h2>
          <h4>Some examples bellow</h4>
        </div>
        <div>
          {digimons.map(digimon => {
            const image = getImage(digimon.image.localFile)
            return (
              <div className={styles.card} key={digimon.content.data.childMarkdownRemark.id}>
                <div className={styles.profile}>
                  <h2 className={styles.title}>{digimon.title}</h2>
                  {image && <GatsbyImage className={styles.imageStyle} image={image} alt={digimon.title} />}
                </div>
                <div className={styles.description} dangerouslySetInnerHTML={{__html: digimon.content.data.childMarkdownRemark.html}} />
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export default DigimonsByLevel

// export const query = graphql`
//   query ProjectDetails($slug: String) {
//     markdownRemark(frontmatter: {slug: {eq: $slug}}) {
//       html
//       frontmatter {
//         title
//         featuredImg {
//           childImageSharp {
//             gatsbyImageData
//           }
//         }
//       }
//     }
//   }
// `
export const query = graphql`
  query DigimonsPage($slug: String) {
    allStrapiArticle(filter: {category: {slug: {eq: $slug}}}) {
      nodes {
        category {
          category
        }
        title
        content {
          data {
            childMarkdownRemark {
              html
              id
            }
          }
        }
        image {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  }
`
