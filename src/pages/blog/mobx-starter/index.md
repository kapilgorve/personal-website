# Guide to MobX with React
![cover image](./mobx-cover.jpg)

As we all know state management is the most important and core part of any react application and as react is just a UI library there is a need for something to take care of the state of our app. State management can be troublesome and it is easy to create unmanageable react applications because of inconsistent state. 

## What is State Management?
A state is just the data that your app is dealing with. State saves the data that needs to be rendered and it influences how the component gets rendered.
State management is the process of managing that data. Monitoring and retrieving data in a particular app can be difficult that's where state management libraries come into play. There are multiple ways to manage states like Redux and Context but we will talk precisely about MobX here.

## What is MobX?
MobX is a simple, scalable and battle-tested state management solution. It's a standalone library that can be used with any javascript framework. React and MobX is really powerful together and work as a complete framework. MobX provides the mechanism to store and update the application state that React then uses to render the components. 

## Core concept
MobX at its core has three important concepts: Observables, Actions, and Reactions. A Store contains these three which then is used by the React application.

> Find minimal state (observable state), derive everything (derived state) and never turn the state into more state.

## Observables
The observable state is one of the main concepts of MobX. The idea behind this concept is to make an object able to emit new changes on them to the observers. You can achieve this with the `@observable` decorator.  
For example, imagine you have a variable named firstName that you expect to change on any event. You can make it observable like so:

```javascript
//import observable from mobx
import { observable } from "mobx";

//create a store with count observable
class Store {
  @observable
  firstName = '';
}

//export Store
export default new Store();
```

### Computed Observables
The state of your application consists of a `core-state` and `derived-state`. The core-state is state inherent to the domain you are dealing with.
The computed value is another important concept of MobX. These values are represented by the `@computed` decorator. Computed values work in hand with observable states. These values can be derived from observables. For example:
```javascript
import { observable, computed } from "mobx";

class Store {
  @observable
  firstName = '';

  @observable
  lastName = '';

  @computed
  get fullName = () => this.firstName + ',' + this.lastName;
}

export default new Store();
```
Here, `@computed` is working as a getter function deriving its value from `firstName` and `lastName`. `fullName` will emit changes as the value of `firstName` and `lastName` changes.

## Actions
MobX supports a uni-directional data flow where *actions change the state*, which in turn updates all affected views.
> An action is any piece of code that modifies the state.

You can mark your actions using the `@action` decorator. As such, you are supposed to use the `@action` on any function that modifies observables or has side effects. A simple example can be:

```javascript
Store {
import { observable, computed, action } from "mobx";

class Store {
  @observable
  firstName = '';

  @observable
  lastName = '';

  //action that receives text and updates firstName observable
  @action
  setFirstName = text => {
    this.firstName = text;
  }

  @computed
  get fullName = () => this.firstName + ',' + this.lastName;
}

export default new Store();
```

## Reactions
Reactions are very similar to computed values. The difference here is that, instead of computing and returning a value, a reaction simply triggers a side effect, more like it performs a side operation. In simple words, Reactions are:
>Side effects that should occur in reaction to state changes (component re-render)

Reactions occur as a result of changes in observables. Reactions could affect the UI, or they could be background actions. MobX provides three main types of reaction functions: autorun, when and reaction.

### 1. autorun
When `autorun` is used, the provided function will always be triggered once immediately and then again each time one of its dependencies changes. `autorun` can be used in those cases where you want to create a reactive function that will never have observers itself. This is usually the case when you need to bridge from reactive to imperative code, for example for logging, persistence, or UI-updating code.
```javascript
autorun( reaction => {
  /* do some stuff */
  reaction.dispose();
} );
```
The return value from autorun is a disposer function, which can be used to dispose of the autorun when you no longer need it. 

### 2. when
`when` observes & runs the given predicate until it returns true. Once that happens, the given effect is executed and the autorunner is disposed. The function returns a disposer to cancel the autorunner prematurely.

This function is really useful to dispose of or reactively cancel stuff. For example:
```javascript
class MyResource {
    constructor() {
        when(
            // once...
            () => !this.isVisible,
            // ... then
            () => this.dispose()
        );
    }

    @computed get isVisible() {
        // indicate whether this item is visible
    }

    dispose() {
        // dispose
    }
}
```

### 3. reaction
A variation of `autorun` which takes two functions: the data function and the effect function. The first one (the data function) is tracked and returns data that is used as input for the second one, the effect function.  
Unlike autorun, the side effect runs only after the data expression returns a new value for the first time.  
The second function (the effect function) passed to reaction will receive two arguments when invoked. The first argument is the value returned by the data function. The second argument is the current reaction, which can be used to dispose of the reaction during execution.
In the following example, reactionDemo will react to the change in the counter count. When invoked reaction, the second argument can use as a disposer. The following example shows a reaction that is invoked only once.
```javascript
const counter = observable({ count: 0 });

// invoke once of and dispose reaction: reacts to observable value.
const reactionDemo = reaction(
    () => counter.count,
    (count, reaction) => {
        console.log("reaction demo: invoked. counter.count = " + count);
        reaction.dispose();
    }
);

counter.count = 1;
// prints:
// reaction demo: invoked. counter.count = 1

counter.count = 2;
// prints:
// (There are no logging, because of reaction disposed. But, counter continue reaction)

console.log(counter.count);
// prints:
// 2
```

## MobX in action
We will understand the working of MobX by creating an application in three simple steps
1. Defining state and make it observable
2. Creating a View that will observe for state changes
3. Modifying the state using actions

> The application uses `openlibrary.org` API to fetch books by searching author names and adding them to favorites. See code: https://codesandbox.io/embed/mobx-demo-69c47

## Step 1. Defining state and make it observable
We are going to search for the author's name and save the result. Then we will click on books and add them to our favorites. *Comments* are self-explanatory: 
```javascript
//importing observables and decorate
import { decorate, observable } from "mobx";

class Store {
  //text to save author name to search
  text = "";

  //data to save response from api
  data = null;

  //addedBooks to save favourite books
  addedBooks = [];
}

//another way to decorate variables with observable
decorate(Store, {
  text: observable,
  data: observable,
  addedBooks: observable,
});

//export class
export default new Store();
```

## Step 2. Creating a View that will observe for state changes
Create the `SearchBooks` component that will accept the author's name as text input and show the API response as a list. It will also show the number of books added and their names. 

1. Boilerplate for SearchBooks component
```javascript
import React from "react";
//import inject and observer from 'mobx-react'
import { inject, observer } from "mobx-react";

//components receive Store values as props which we will inject while exporting
function SearchBooks(props) {
  return (
    <div>
      //component fields goes here
    </div>
  );
}

//inject Store as props to SearchBooks and make it observe to changes in Store
export default inject("store")(observer(SearchBooks));
```

2. Add `input` to accept text and `button` to call API

```javascript
return (
  <div>
      <label>Search books</label>
      <input
        type="text"
        value={props.store.text} /*text observable defined in Store*/
        placeholder="Type Author name"
        onChange={e => {/*Action to update text*/}}
      />
      <button className="button" onClick={e => {/*Action to call api*/}}>
        Search
      </button>
    </div>
);
```

3. `openlibrary.org` returns a response with `docs` array containing all the books. We will map that array to show a list of books

```javascript
return (
  //...input field previously added

  //observable data variable
  {props.store.data.docs.map((item, i) => {
            return (
              <li key={item.key} onClick={() => {/*Action to add books to favourite*/}}>
                //Prints as 1. Book Title
                {i + 1}. {item.title_suggest}
              </li>
            );
          })}
  
);
```
> Go to [openlibrary.org](https://openlibrary.org/) to learn more about api response.

## Step 3. Modifying the state using actions
Now we will create actions that will update text, data, and addedBooks observables. Also, we will add a computed state to get the total number of books added.
```javascript
import { decorate, observable, action, computed } from "mobx";

class Store {
  text = "";
  data = null;
  addedBooks = [];

  //action to update text
  setText = function(text) {
    this.text = text;
  };

  //action to search books
  searchBooks = function() {
    fetch(`https://openlibrary.org/search.json?author=${this.text}`)
      .then(response => response.json())
      .then(data => {
        //calling action to update data
        this.setData(data)
      });
  };

  //action to update data
  setData = data => {
    this.data = data;
  };

  //action to add books to favourite upon click
  addBook = function(book) {
    this.addedBooks.push(book);
    this.data = null;
    this.text = "";
  };

  //computed value to total books added
  get totalBooks() {
    return this.addedBooks.length;
  }
}

//decorate action and computed values
decorate(Store, {
  text: observable,
  data: observable,
  addedBooks: observable,
  setText: action,
  searchBooks: action,
  setData: action,
  addBook: action,
  totalBooks: computed
});

export default new Store();

```

Now we will update our View for these added actions.

```javascript
return (
      <div>
      <label>Search books</label>
      <input
        type="text"
        value={props.store.text}
        placeholder="Type Author name"
        onChange={e => {
          //action to update text
          props.store.setText(e.target.value)
        }}
      />
      <button className="button" onClick={e => {
        //action to call api and search books
        props.store.searchBooks()
      }}>
        Search
      </button>

      //show total books added with computed value
      <h1 className="bookcount">Books added: {props.store.totalBooks}</h1>

      //toggle between search reponse and addedBooks when data is available or null.
      {props.store.data

      //when data has search result, render a list of books by author
        ? props.store.data.docs.map((item, i) => {
            return (
              <li key={item.key} onClick={() => {
                //action to add a book to favourite
                props.store.addBook(item)
              }}>
                {i + 1}. {item.title_suggest}
              </li>
            );
          })

        //when data is null, show a list of books added by user
        : props.store.addedBooks.map((item, i) => {
            return (
              <li id="added" key={item.key}>
                {i + 1}. {item.title_suggest}
              </li>
            );
          })}
    </div>
);
```

Now, the last thing we have to do is provide store in `Provider` to the root component. Our root file will look like this: 
```javascript
import React from "react";
import ReactDOM from "react-dom";
//importing Provider, store and SearchBooks component
import { Provider } from "mobx-react";
import store from "./store";
import SearchBooks from "./SearchBooks";

import "./styles.css";

//provide store as a provider so that our component can use it. 
function App() {
  return (
    <Provider store={store}>
      <SearchBooks />
    </Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

That's it. We are done and you can view this project in action at this [link](https://codesandbox.io/s/mobx-demo-69c47?fontsize=14). I hope this tutorial was able to get you started with MobX. Happy coding!