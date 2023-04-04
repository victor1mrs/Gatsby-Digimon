import React from 'react'
import Layout from '../components/Layout'
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image"
import { graphql, PageProps } from 'gatsby'
import { card, title, imageStyle, profile, header, description, question } from './digimons-by-level.module.scss'

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
  return (
    <Layout>
      <div>
        <div className={header}>
          <h2>Digimons of type: {type}</h2>
          <h4>Some examples bellow</h4>
        </div>
        <div>
          {digimons.map(digimon => {
            const image = getImage(digimon.image.localFile)
            return (
              <div className={card} key={digimon.content.data.childMarkdownRemark.id}>
                <div className={profile}>
                  <h2 className={title}>{digimon.title}</h2>
                  {image && <GatsbyImage className={imageStyle} image={image} alt={digimon.title} />}
                </div>
                {console.log('HTML :: ', digimon.content.data.childMarkdownRemark.html )}
                <div className={description} dangerouslySetInnerHTML={{__html: digimon.content.data.childMarkdownRemark.html}} />
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
