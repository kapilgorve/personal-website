import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import { Hero } from '../components/hero/hero'
import Blog from '../components/blog';


class IndexPage extends React.Component {
  state = {
    YoutubeComponent: null,
  };

  componentDidMount() {
    import('../components/youtubeList')
      .then(component => {
        this.setState({ YoutubeComponent: component.default });
      });
  }

  render() {
    const { edges } = this.props.data.allMarkdownRemark;
    const { YoutubeComponent } = this.state;
    return (
      <Layout>
        <Hero />
        <Blog posts={edges} />
        {YoutubeComponent && <YoutubeComponent />}
      </Layout>
    )
  }
}


export const query = graphql`
query IndexQuery {
  allMarkdownRemark(filter: { frontmatter: { type: { eq: "blog" } } },
  sort: { fields: [frontmatter___date], order: DESC }) {
    totalCount
    edges {
      node {
        id
        excerpt(pruneLength: 240)
        frontmatter {
          title
          tags
          date
        }
        fields {
          slug
        }
      }
    }
  }
}
`

export default IndexPage
