import { graphql, Link, PageProps } from 'gatsby'
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image"
import React from 'react'
import Layout from '../../components/Layout'
import { categories, otherDigimons,htmlStyle } from './digimons.module.scss'


type DigimonsProps = {
  allStrapiCategory: {
    nodes : [{
      category: string
      slug: string
      content: {
        data: {
          childMarkdownRemark: {
            html: any
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


const Digimons = ({ data }: PageProps<DigimonsProps>) => {
  const digimonsData = data.allStrapiCategory.nodes
  return (
    <Layout>
      <div className={otherDigimons}>
        <h2>Digimons</h2>
        <h3>Separated by Level</h3>
        <div className={categories}>
          {digimonsData.map(level => {
            const image = getImage(level.image.localFile)
            const html = level.content.data.childMarkdownRemark.html
            return (
              <Link to={level.slug} key={level.category}>
                <div>
                  {image && <GatsbyImage image={image} alt={level.category} />}
                  <h3>{level.category}</h3>
                  <div className={htmlStyle} dangerouslySetInnerHTML={{__html: html}} />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export default Digimons

export const query = graphql`
  query DigimonsPage {
  allStrapiCategory {
    nodes {
      category
      slug
      content {
        data {
          childMarkdownRemark {
            html
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
