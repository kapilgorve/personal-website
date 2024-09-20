import React from 'react'

import linkedin from '../../assets/linkedin.svg'
import twitter from '../../assets/twitter.svg'
import github from '../../assets/github-sign.svg'

import './contact.css'

const titleStyle = {
  background: 'linear-gradient(to right, #cc2b5e, rgba(24, 0, 80, 0.89))',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}

const Contact = () => {
  return (
    <React.Fragment>
      <section id="contact" className="contact">
        <div className="container-fluid">
          <div className="row justify-content-md-center">
            <div className="col-md-8 col-lg-6">
              <h2 style={titleStyle}>Connect With Me!!</h2>
              <div className="row">
                <div className="col-md-4">
                  <p>
                    <a href="tel:+9199222778">+91 9922234778</a>
                  </p>
                  <p>
                    <a href="mailto:hi@kapil.io">hi@kapil.io</a>
                  </p>
                </div>
                <div className="col-md-8">
                  <div className="icons">
                    <a
                      href="https://www.linkedin.com/in/kapilgorve/"
                      target="blank"
                    >
                      <img src={linkedin} alt="Kapil Gorve LinkedIn Profile" />
                    </a>
                    <a href="https://twitter.com/kapilgorve/" target="blank">
                      <img src={twitter} alt="Kapil Gorve Twitter Account" />
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
