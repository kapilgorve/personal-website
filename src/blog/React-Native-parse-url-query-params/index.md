---
title: 'React Native: How to parse url query parameters'
tags: ['ReactJs', 'ReactNative', 'Javascript']
type: 'blog'
date: '2019-05-09'
description: 'React Native: How to parse url query parameters'
---

![](https://s3.ap-south-1.amazonaws.com/kapilgorve/blog/covers/React-Native-parse-url-query-params.jpg)
(Image Credit : unsplash.com)
##TLDR Solution

```js
let url = 'AppName://redirect/subpart/?token=123&refreshToken=123'
let regex = /[?&]([^=#]+)=([^&#]*)/g,
  params = {},
  match
while ((match = regex.exec(url))) {
  params[match[1]] = match[2]
  console.log(match[1], match[2])
}
const { token, refreshToken } = params
```

If you are on a deadline (when we aren't ? eh) and don't care about the explaination. Copy the snippet and solve your problem. I didn't understand what's happening here so I bothered to blog about it after I was done with my deadline. The thing is I don't know much about regular expressions. I couldn't write one from scratch without examples even my life depended on it. As a junir deve I was told to avoid using them and I listened to the advice. So here we are.

## The Problem

When it comes to url parsing I use `URL` interface which is present in browser api. To get search `GET` params present in url I would do something like this :

```js
// https://some.site/?id=123
var parsedUrl = new URL(window.location.href)
console.log(parsedUrl.searchParams.get('id')) // 123
```

This snippet would solve the usual problems in for frontend application. There is no such equivalent in React Native thoguh. All the google searches came up with third party libraries. Or Stack Overlflow answers containing complex regular expressions to deal with this. I don't feel comfortable with regular expressions. As I am told they can be pretty difficult to debug without context. I feel the same.

I could have used string methods. Well I did when I only had to get only pne parameter. After adding some more parameters which were essential. The string methods felt more of a hack and not an appropriate solution. It was also possible that the sequence could be changed later for the url and this would break the published app feature. That would mean adding a new release each time the sequence changes and breaking changes. With React Native I am very cautious about adding third party libraries for trivial things. After a day of more googling found this solution. Sadly when wrting this article I couldn't find the original SO answer for this.

## Explaination

`let regex = /[?&]([^=#]+)=([^&#]*)/g,` We are defining a pattern here. This pattern would start with `&` character. As our url params would be after `&`.

`regex.exec(url)` The `.exec()` function would search for a pattern `regex` defined in `url`.

Well why we are using a while loop ?

`match = regex.exec(url);` This would return each match every time it gets executed.
If you only have one parameter, using a loop wouldn't make sense. I needed two params , so I am using a `while` loop here. The returned match is in format match[0] = matched string, match[1]=key , match[2]=value.

```js
let url =  'AppName://redirect/subpart/?token=123&refreshToken=123';
      let regex = /[?&]([^=#]+)=([^&#]*)/g,
      params = {},
      match;
      match = regex.exec(url);
      console.log(match);

Output:
  [
    0: "?token=123"
    1: "token"
    2: "123"
    groups: undefined
    index: 27
    input: "AppName://redirect/subpart/?token=123&refreshToken=123"
    length: 3
    __proto__: Array(0)
  ]
```

`params[match[1]] = match[2]` We store matched string in `params` as key value pair. This is just another fancy and dynamic way to write `params.token=match[2]`. This way we write a dynamic key to `params`. First time this would store a `token` property for me and second time `refreshToken`.

Fianlly I am extracting both properties as separate variables using [ES6 destructuring syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment).

`const { token, refreshToken } = params`
