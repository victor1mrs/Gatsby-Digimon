import { graphql, Link, PageProps } from 'gatsby'
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image"
import React from 'react'
import Layout from '../../components/Layout'
import { projects, portfolio } from './characters.module.scss'

export type NodesType = {
  nodes : [{
    id: string
    frontmatter: {
      slug: string
      title: string
      thumb: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData
        }
      }
    }
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
  }]
}

type CharactersProps = {
  characters: NodesType
  contact: {
    siteMetadata: {
      contact: string
    }
  }
}


const Characters = ({ data }: PageProps<CharactersProps>) => {
  const projectsData = data.characters.nodes
  const contact = data.contact.siteMetadata.contact
  return (
    <Layout>
      <div className={portfolio}>
        <h2>Characters</h2>
        <h3>DigiDestined and their Digimon</h3>
        <div className={projects}>
          {projectsData.map(project => {
            const image = getImage(project.frontmatter.thumb)
            return (
              <Link to={project.frontmatter.slug} key={project.id}>
                <div>
                  {image && <GatsbyImage image={image} alt={project.frontmatter.title} />}
                  <h3>{project.frontmatter.title}</h3>
                </div>
              </Link>
            )
          })}
        </div>
        <p>Like what you see? Email me at <b>{contact}</b> for a quote!</p>
      </div>
    </Layout>
  )
}

export default Characters

export const query = graphql`
  query CharactersPage {
    characters: allMarkdownRemark {
      nodes {
        id
        frontmatter {
          title
          slug
          thumb {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
    contact: site {
      siteMetadata {
        contact
      }
    }
  }
` 
