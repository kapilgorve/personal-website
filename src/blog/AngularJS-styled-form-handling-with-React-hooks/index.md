---
title: "AngularJs styled form handling with ReactJs Hooks"
tags: ['ReactJs','UX']
type : "blog"
date : "2019-04-12"
description: "Form input validation using ReactJs hooks."
---
### I loved AngularJs Form Validations
I am biased to AngularJs (not to be confused by later version called as Angular). I started working in frontend space with AngularJs. I liked how easy it was for me. I shipped lot of complex functionality in less time or so I thought. Anyway I really loved AngularJs form Validations.

It's not possible though to have similar API. I am going to settle here for the AngularJS styled form validation UX.


## Show me the code


If you want to straight head out and play with the demo here you go.
<iframe src="https://codesandbox.io/embed/y28ro3w45j?fontsize=14" title="Form Validation with React Hooks" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin" loading="lazy"></iframe>
This is a basic React function component using hooks. Incase you have missed the `hooks` party.

According to React docs-
>Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.



```jsx
import React, { useState } from 'react';

export function FormInput(props) {
  const [inputValue, setValue] = useState('');

  const handleInput = (e) => {
      setValue(e.target.value);
  }

  return (
    <div style={inputWrap} >
        <label>{props.label}</label>
      <input
        style={inputStyle}
        value={inputValue}
        onChange={handleInput}
      />
    </div>
  );
}
```
`useState` is a Hook that lets you add React state to function components. What the hook ? Well you want to check out official [docs](https://reactjs.org/docs/hooks-intro.html) here for more details on hooks. Believe me, they are good.

### So what's going on here ?
We import a predefined hook inside React named as `useState`.

``` import React, { useState } from 'react';```

Which will let us use React's state concept inside a function component. If you are not from React Land, before this we couldn't use state inside function components. Function componets were used to passed state from parent components and then render whatever was passed to it through `props`.


```   const [inputValue, setValue] = useState(''); ```

`inputValue` is our state variable here which we are initializing as empty string with `useState('')`. `setValue` is our function which we can use to update `inputValue`.

```jsx
  const [isTouched, setTouched] = useState(false);
  const [inputValue, setValue] = useState('');
  const [isValid, setValid] = useState(true);
```
We declare two more state variables

1. `isTouched` -  to keep track if user has touched the input.
2. `isValid` - to keep track if entered value is valid or not.

```jsx
    <input
        style={inputStyle}
        value={inputValue}
        onChange={handleInput}
        onBlur={ ()=> setTouched(true)}
      />
```
We add a handler for `onBlur`. When a user touches the input and leaves the input it will set off `onBlur` event. We will use this event to set our state variable `isTouched`. So now we know when a user has touched the input and we can display an error if the user has left it empty.

```jsx
  <input
        style={inputStyle}
        value={inputValue}
        onChange={handleInput}
        onBlur={ ()=> setTouched(true)}
    />
      { touched && !inputValue &&  <p style={{ color: 'red' }}>Please enter value</p>}
```

Let's go one more step and validate input and display an error if it is invalid according to us. We don't want to bother user unless they have typed the value and then left input. I get pissed by instant errors which show up even when I am not finished. So let's give our user a chance first without declaring them stupid.
```jsx

App.js -

 <div className="App">
        <FormInput required={false} type="text" label="Name" />
        <FormInput required={true} type="email" label="Your Email"/>
        <FormInput required={true} type="number" label="Pin"/>
 </div>

  const handleInput = (e) => {
      setValue(e.target.value);
      validate(e.target.value);
  }

  const validate = (val) => {
      if(props.type === 'email') {
        if(emailIsValid(val)) setValid(true);
        else setValid(false);
      }
      if(props.type === 'number') {
        if(isNum(val)) setValid(true);
        else setValid(false);
      }
}

....

     <input
        style={inputStyle}
        value={inputValue}
        onChange={handleInput}
        onBlur={ ()=> setTouched(true)}
      />
      {props.required && touched && !inputValue &&  <p style={{ color: 'red' }}>Please enter value</p>}
      {touched && !isValid &&   <p style={{ color: 'red' }}>Please enter valid value.</p>}

...

function emailIsValid (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  function isNum(val){
   return  /^\d+$/.test(val);
  }
```

We validate the input value. We wait for user to leave the input and display the error if the input value is invalid. Pass an input type and validate based on regular expressions.

``` <FormInput required={true} type="number" label="Pin"/> ```

## Why I prefer this approach ?
I have debated this with lot of people about approach to form validations. For an enterprise client, Product Manager and others weighed in for validations after form submission. I don't llike instant validations as they sort of remind users that you don't know what you are doing. I neither like validations after form submission. In some cases this may mean entering a `captcha` input. These captchas could be straight up harassment for disabled people or with poor vision. I would like to take a middle approach. Let the user fill in the input and display a validation error after they have left the input.

