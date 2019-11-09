import React from 'react'

import './hero.css'
import myPic from '../../assets/pic.jpg'
import htmlIcon from '../../assets/html.svg'
import webIcon from '../../assets/web.svg'
import designIcon from '../../assets/design.svg'
import mobileIcon from '../../assets/mobile.svg'
import teachingIcon from '../../assets/teaching.svg'

const titleStyle = {
  background: 'linear-gradient(to right, #cc2b5e, rgba(24, 0, 80, 0.89))',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}

export const Hero = () => (
  <React.Fragment>
    <section className="hero">
      <div className="container">
        <div className="row">
          <div className="col-md-6 pic">
            <img className="img-fluid" src={myPic} alt=" Kapil Gorve" />
          </div>
          <div className="col-md-6 me">
            <h1>Hi, I'm Kapil.</h1>
            <p>
            Freelance Web developer working in Javascript stack.
            My journey with web started from tinkering css in dev tools.
            Then I did some design work and came back to web dev.
            I have worked on variety of
            projects on web and mobile apps from design to development. I am a
            full stack developer and designer.
            </p>
            <p>
              Need a Resume ?{' '}
              <a target="_blank" href="/resume">
                Kapil Gorve Resume
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
    <section className="about">
      <div className="container">
        <div className="row">
          <div className="col-md-6 title">
            <h2 style={titleStyle}>What I do</h2>
          </div>
          <div className="col-md-6 me">
            <p>
              {' '}
              I provide freelance services specializing in frontend development.
              I started my frontend career with AngularJS and right now working
              with ReactJS. I'm also familiar with other frontend frameworks.
              I build MVPs, prototypes. I believe in choosing best tool for the job.
              I build backends using NodeJs and NoSql databse MongoDb.
              <br/>
              <br/>
              <b>Tech Stack:</b> React,Redux,ReactNative, GatsbyJs, NodeJs, MongoDB, Typescript,.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section className="why">
      <div className="container">
        <div className="row">
          <div className="col-md-6 title">
            <h2>Why hire me?</h2>
          </div>
          <div className="col-md-6 me">
            <p>
              Hiring freelancers and getting work done isn't easy.
              Not everyone has had good experience dealing with freelancers.
              There are lot of obstacles in communication, process and progress tracking.
              I am a good listener and has observed complaints in freelance space.
              Having worked with startups, I have realized painpoints of hiring
              freelancers. I have modified my work style, ethics, pricing
              structure, tools, delievery methods to address these issues. So
              when you consider to hire me, you have to only worry about the
              product itself.{' '}
            </p>
          </div>
        </div>
      </div>
    </section>
    <section className="services">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h2 style={titleStyle}>Services</h2>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img src={htmlIcon} alt="Frontend Development" />
              <div className="card-body">
                <h3 className="card-title">Frontend Development</h3>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img src={webIcon} alt="Web Development" />
              <div className="card-body">
                <h3 className="card-title">Web Development</h3>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img src={designIcon} alt="UI/UX Design" />
              <div className="card-body">
                <h3 className="card-title">UI/UX Design</h3>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img
                src={mobileIcon}
                alt="Mobile App Developement using Ionic,React Native , Corodva"
              />
              <div className="card-body">
                <h3 className="card-title">Mobile Apps</h3>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img src={teachingIcon} alt="Training" />
              <div className="card-body">
                <h3 className="card-title">Training</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </React.Fragment>
)

export default Hero
