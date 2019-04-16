import React from 'react'
import { Link } from 'gatsby'

import './portfolio.css'

const titleStyle = {
  background: 'linear-gradient(to right, #cc2b5e, rgba(24, 0, 80, 0.89))',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}

const PortFolio = ({ posts }) => {
  return (
    <div>
      <section className="portfolio">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h2>Portfolio</h2>
            </div>
            <div className="card-columns">
              {posts.filter( p => p.node.frontmatter.thumb !== null ).map(({ node: post }) => {
                const { frontmatter } = post;
                return (
                  <div className="card" key={post.id}>
                    <Link to={`/details?id=${post.id}`}>
                      <div>
                        <div className="overlay">
                          <div />
                          <img
                            className="card-img-top"
                            src={frontmatter.thumb}
                            alt="`${frontmatter.title} logo`"
                          />
                        </div>

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
                      </div>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PortFolio
