---
path: "/screenze"
title: "Screenze"
type: "portfolio"
tags: ['ReactJs','MobX','Bootstrap','HTML5','CSS3','Sass']
thumb: "https://s3.ap-south-1.amazonaws.com/kapilgorve/screenze/screenze-logo.jpg"
screens: [
        'https://s3.ap-south-1.amazonaws.com/kapilgorve/screenze/screenze-1.jpg',
        'https://s3.ap-south-1.amazonaws.com/kapilgorve/screenze/screenze-2.jpg',
        'https://s3.ap-south-1.amazonaws.com/kapilgorve/screenze/screenze-3.jpg',
        ]
---
Tools:

*   ReactJs, MobX, Bootstrap4, Firebase, WebRTC, Tokbox, PeerJs.

*   The project is a web application which can be used or inserted into existing web application as a plug in for end users to communicate.
*   ReactJs is used for UI development.
*   We used firebase backend given the scope of project.
*   Used MobX library for state management.
*   The project is seed started from create react app utility.
*   Added SASS compilation which is not supported by create react app.
*   Even though we are using MobX, I tried to write immutable updates to store like Redux so we can avoid unintended side effects.
*   Every page component is wrapped with props store for future scalability if we plan to add more stores or separate existing ones.
*   Used ES6 syntax for writing javascript. Tried to avoid nested callbacks and instead used async –await pattern approach to wrap up every callback.
*   Video calling feature is implemented using WebRTC platforms like PeerJs and Tokbox. One is open source while other is a paid one for flexibility.