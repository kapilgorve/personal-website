import React, { useState } from 'react'

import linkedin from '../../assets/linkedin.svg'
import twitter from '../../assets/twitter.svg'
import quora from '../../assets/quora.svg'
import github from '../../assets/github-sign.svg'

import './contact.css'
import { createContact } from '../../utils/createContact'

const titleStyle = {
  background: 'linear-gradient(to right, #cc2b5e, rgba(24, 0, 80, 0.89))',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}

const Contact = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState()

  const handleSubmit = async () => {
    if (email && name) {
      try {
        await createContact({ email, name })
        setMessage('You are subscribed.')
      } catch (error) {
        setMessage(error.message)
      }
    }
  }

  return (
    <React.Fragment>
      <section className="contact">
        <div className="container-fluid">
          <div className="row justify-content-md-center">
            <div className="col-md-8 col-lg-6">
              <h2 style={titleStyle}>Connect With Me!!</h2>
              {message && <h4 className="message">{message}</h4>}
              {!message && (
                <>
                  <h3>Get updates about React, React Native, NodeJs, Web Development, Freelancing and Business. No Spam.</h3>
                  <div className="form-inline form">
                    <div className="form-group input-group-lg">
                      <label htmlFor="name" className="sr-only">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Name"
                        onChange={e => setName(e.target.value)}
                      />
                    </div>
                    <div className="form-group input-group-lg">
                      <label htmlFor="email" className="sr-only">
                        Email
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        placeholder="Email"
                        onChange={e => setEmail(e.target.value)}
                      />
                    </div>
                    <button
                      className="btn btn-primary btn-lg"
                      onClick={() => handleSubmit()}
                      disabled={!(email && name)}
                    >
                      Subscribe
                    </button>
                  </div>
                </>
              )}
              <div className="row">
                <div className="col-md-4">
                  <p>+91 9922234778</p>
                  <p>kapilsg186@gmail.com</p>
                </div>
                <div className="col-md-8">
                  <div className="icons">
                    <a
                      href="https://www.linkedin.com/in/kapil-gorve/"
                      target="blank"
                    >
                      <img src={linkedin} alt="Kapil Gorve LinkedIn Profile" />
                    </a>
                    <a href="https://twitter.com/kapilgorve/" target="blank">
                      <img src={twitter} alt="Kapil Gorve Twitter Account" />
                    </a>
                    <a
                      href="https://www.quora.com/profile/Kapil-Gorve"
                      target="blank"
                    >
                      <img src={quora} alt="Kapil Gorve Quora Profile" />
                    </a>
                    <a href="https://github.com/kapilgorve" target="blank">
                      <img src={github} alt="Kapil Gorve Github Account" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default Contact
