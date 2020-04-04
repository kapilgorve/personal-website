<!-- ---
title: 'React dynamically load components and libraries'
tags: ['ReactJs', 'Javascript']
type: 'blog'
date: '2020-03-10'
description: 'How to dynamically import components and libraries in ReactDOMServer, Next.js, GatsbyJs. ReactDOMServer does not yet support Suspense.'
---

!['cover'](https://kapilgorve.s3.ap-south-1.amazonaws.com/blog/covers/traffic-light.jpg)
<sub><sup>Photo by Hermes Rivera on Unsplash</sup></sub>


## Why not use `React.lazy()` ?
`React.lazy` and Suspense is not supported yet by ReactDOMServer. So dynamic import is the way to go for now if you are doing SSR and using `ReactDOMServer`. Discovered this issue while working on a github [issue](https://github.com/styled-components/styled-components-website/issues/582). If you look at the details, the `LiveEdit` library is about 300KB unzipped. That's around 30% of page load you don't initially. There are two ways for doing this. One for importing components and one for importing libraries.

## How to dynamically import a component
```jsx

// filename: ./src/App.jsx
class App extends Component {
    state: {
        WelcomeComponent: null
    };

    componentDidMount(){
        import('./Welcome')
        .then( component => WelcomeComponent= component )
    }

    render(){
        const {WelcomeComponent} = this.state;
        return(
            <div>
            {WelcomeComponent && <WelcomeComponent />}
            </div>
        );
    }
}

// filename: ./src/Welcome.jsx
import React from 'react';
export const Welcome = () => (
    <div><h2>Welcome user !!</h2></div>
)

```
## How to dynamically import a library
This one is a bit tricky
 -->
