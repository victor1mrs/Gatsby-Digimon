import { GatsbyImageProps } from "gatsby-plugin-image"

interface Article {
  node: {
    id: number
    strapiId: string
    image: {
      childImageSharp: {
        fixed: GatsbyImageProps
        fluid: GatsbyImageProps
      }
    }
    category: {
      name: string
    }
    title: string
    content: string
  }
}
