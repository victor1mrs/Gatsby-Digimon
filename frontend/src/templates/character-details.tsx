import React from 'react'
import Layout from '../components/Layout'
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image"
import { graphql } from 'gatsby'
import * as styles from './character-details.module.scss'

type CharacterDetailsProps = {
  data: {
    markdownRemark: {
      html : any
      frontmatter: {
        title: string
        featuredImg: {
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData
          }
        }
      }
    }
  }
}

const CharacterDetails = (data: CharacterDetailsProps) => {
  const { html } = data.data.markdownRemark
  const { title, featuredImg } = data.data.markdownRemark.frontmatter
  const image = getImage(featuredImg)
  return (
    <Layout>
      <div className={styles.details}>
        <h2>{title}</h2>
        <h3>This is a random sub-title</h3>
        <div className={styles.featured}>
          {image && <GatsbyImage image={image} alt={title} />}
        </div>
        <div className={styles.htmlStyle} dangerouslySetInnerHTML={{__html: html}} />
      </div>
    </Layout>
  )
}

export default CharacterDetails

export const query = graphql`
  query ProjectDetails($slug: String) {
    markdownRemark(frontmatter: {slug: {eq: $slug}}) {
      html
      frontmatter {
        title
        featuredImg {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`
