---
title: 'Forget HOC and render props, Use React hooks to share state and state logic between components'
tags: ['ReactJs', 'Javascript']
type: 'blog'
date: '2021-03-05'
description: 'How to use React hooks to share state'
---

!['cover'](https://kapilgorve.s3.ap-south-1.amazonaws.com/blog/covers/react-hooks-man.jpg)
<sub><sup>Photo by Lucas Sankey on Unsplash</sup></sub>

You can share state between parent-child components using `props`. What if the components you are trying to share state don't have parent child relationship. Couple of ways that come to mind:

- Share using global state solution like Redux
- Share using inbuilt React state sharing mechnaism as React `context`
- Move the state to top component and pass to bottom (unrealistic)

These above solutions are applicable where you need something global present across your apps.

What if you need to share some state which will be only used in couple of places ? Isn't using Redux or Context an overkill here ?

In class components we use [Higher-Order Components](https://reactjs.org/docs/higher-order-components.html) or [Render Props](https://reactjs.org/docs/render-props.html) to achieve that. I have used these in past. The thing is they are a bit a bit difficult to get your mind around. I had hard time remebering the syntax and how to use them. Any easy way to do this ?

# Welcome to functional components with state

With help of React hooks functional components can have a state. You can directly share this state with other functional components. You return a state varible from your source function. Import it inside the consumer function components. This is as much as easy it can get. 😍 😍 😍

```jsx
function sourceFunction() {
  return { stateVariable }
}

import { sourceFunction } from './sourceFunction'
function consumerFuntion() {
  const { stateVariable } = sourceFunction()
  // Use however you like the shared state here in functional component
}
```

Didn't this pseudo code make sense ? Let's take a real world example.

We create a functional component named `useWindowSize`. This component will maintain your browser window width. We are using `resize` event listener to detect changes to window size. We return an object containing `windowSize` property from this function.

```jsx
// filename: useWindowSize.js
import { useState, useEffect } from 'react'

export function useWindowSize() {
  const getSize = () => window.innerWidth

  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(() => {
    const handleResize = () => setWindowSize(getSize())

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { windowSize }
}
```
```jsx
// filename: App.js
export function App(){
  function App() {
  const { windowSize } = useWindowSize();
  return (
    <div className="App">
      <h2>Window size: {windowSize} </h2>
      <WindowsClass />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
}
```
Now you can access this `windowSize` data in any component of your app. No more sliding it down through props.

## What's the gotcha ?
You won't be able to set this shared state from multiple components. You can access the value in multiple components, but you won't be able to change it from multiple components. Shared state changing must happen in one place.
