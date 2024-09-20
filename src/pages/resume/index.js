import React from 'react'
import Layout from '../../components/layout'
import SEO from '../../components/seo'

const Resume = () => (
  <Layout>
    <SEO
        title="Kapil Gorve Resume"
        description="Freelance ReactJs,Redux,NodeJs, React Native in Pune, India."
        pathname="resume/"
      />
    <div className="resume" />
    <iframe
      src="https://drive.google.com/file/d/1b9p4LRD9ubUdM6qaQh2U0oFkcHDJRMNn/preview"
      type="application/pdf"
      height="768px"
      width="100%"
      title="Kapil Gorve Resume"
      loading="lazy"
    />
    <iframe
      src="https://drive.google.com/uc?export=download&id=1b9p4LRD9ubUdM6qaQh2U0oFkcHDJRMNn"
      type="application/pdf"
      height="768px"
      width="100%"
      title="Kapil Gorave Resume"
      loading="lazy"
    />
  </Layout>
)

export default Resume
