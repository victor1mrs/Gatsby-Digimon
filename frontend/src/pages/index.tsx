import * as React from "react"
import Layout from '../components/Layout';
import { graphql, PageProps } from "gatsby"
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image"
import { header }  from './home.module.scss'

type HomeProps = {
  file: {
    id: string
    name: string
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
  }
}

const Home = ({ data: { file } }: PageProps<HomeProps>) => {
  const image = getImage(file)
  return (
    <Layout>
      <section className={header} >
        <div>
          <h1>Digimon?</h1>
          <h3>sure, why not?</h3>
          <p>Project example to test Gatsby / Ts / Strapi</p>
        </div>
        {image && <GatsbyImage image={image} alt={file?.name} />}
      </section>
    </Layout>
  )
}

export default Home

export const query = graphql`
query Banner {
    file(relativePath: {eq: "digi.jpg"}) {
      id
      name
      childImageSharp {
        gatsbyImageData
      }
    }
  }
`