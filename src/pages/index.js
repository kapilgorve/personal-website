import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import { Hero } from '../components/hero/hero'
import Blog from '../components/blog';
import ListNotes from '../components/listNotes';


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
    const blogPosts = edges.filter( ({node}) => node.frontmatter.type === 'blog' );
    const notePosts = edges.filter( ({node}) => node.frontmatter.type === 'note' );

    const { YoutubeComponent } = this.state;
    return (
      <Layout>
        <Hero />
        <Blog posts={blogPosts} />
        <ListNotes notes={notePosts}></ListNotes>
        {YoutubeComponent && <YoutubeComponent />}
      </Layout>
    )
  }
}


export const query = graphql`
query IndexQuery {
  allMarkdownRemark(
    filter: {frontmatter: {type: {in: ["note", "blog"]}}}
    sort: {frontmatter: {date: DESC}}
  ) {
    totalCount
    edges {
      node {
        id
        excerpt(pruneLength: 240)
        frontmatter {
          title
          tags
          date
          type
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
