import React from 'react'

import linkedin from '../../assets/linkedin.svg'
import twitter from '../../assets/twitter.svg'
import quora from '../../assets/quora.svg'
import github from '../../assets/github-sign.svg'

import './contact.css'

const titleStyle = {
  background: 'linear-gradient(to right, #cc2b5e, rgba(24, 0, 80, 0.89))',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}

const Contact = () => (
  <React.Fragment>
    <section className="contact">
      <div className="container">
        <div className="row">
          <div className="col-md-4" />
          <div className="col-md-8">
            <h2 style={titleStyle}>Connect With Me!!</h2>
          </div>
          <div className="col-md-4">
            <p>Pune,India.</p>
            <p>+91 9922234778</p>
            <p>kapilsg186@gmail.com</p>
            <p>Skype-kapil.gorve</p>
          </div>
          <div className="col-md-8">
            <div className="icons">
              <a href="https://www.linkedin.com/in/kapil-gorve/" target="blank">
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
    </section>
  </React.Fragment>
)

export default Contact
