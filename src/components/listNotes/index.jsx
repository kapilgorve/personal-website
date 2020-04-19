import React from 'react'
import { Link } from 'gatsby'


const titleStyle = {
  background: 'linear-gradient(to right, #cc2b5e, rgba(24, 0, 80, 0.89))',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}

const ListNotes = ({ notes }) => {
  return (
    <div>
      <section className="portfolio">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h2>My Notes</h2>
            </div>
              {notes.map(({ node: note }) => {
                const { frontmatter } = note;
                return (
                  <div className="col-md-4 d-flex" key={note.id}>
                  <div className="card">
                    <Link to={`${note.fields.slug}`}>
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
                  </div>
                )
              })}
           </div>
        </div>
      </section>
    </div>
  )
}

export default ListNotes
