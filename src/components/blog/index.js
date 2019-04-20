import React from 'react'
import { Link } from 'gatsby'


const titleStyle = {
  background: 'linear-gradient(to right, #cc2b5e, rgba(24, 0, 80, 0.89))',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}

const Blog = ({ posts }) => {
  return (
    <div>
      <section className="portfolio">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h2>My Blog</h2>
            </div>
           <div className="col-md-12">
           <div className="card-columns">
              {posts.map(({ node: post }) => {
                const { frontmatter } = post;
                return (
                  <div className="card" key={post.id}>
                    <Link to={`${post.fields.slug}`}>
                        <div className="card-body">
                          <h3 className="card-title" style={titleStyle}>
                            {frontmatter.title}
                          </h3>
                          {frontmatter.tags.map(tag => {
                            return (
                              <div className="chip" key={tag}>
                                {tag}
                              </div>
                            )
                          })}
                        </div>
                    </Link>
                  </div>
                )
              })}
            </div>
           </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Blog
