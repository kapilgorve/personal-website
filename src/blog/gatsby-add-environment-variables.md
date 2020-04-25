---
title: 'GatsbyJs - Add environment variables'
tags: ['GatsbyJs','Windows10','Linux', 'ReactJs']
type: 'blog'
date: '2020-04-20'
description: 'How to add environment variables for gatsby in Windows and Linux'
---
## Development Environment
* Create a new file named as `.env.development` at the root of your project.
* Add your variable to the newly created file. Example - `TEST_KEY=123`
* Change your `npm run develop` command to set environment.

For Windows -
```json
    "develop": "set GATSBY_ENV=development && gatsby develop"
```
For Linux -
```json
    "develop": "GATSBY_ENV=development gatsby develop"
```
* Restart your dev environment. So Gatsby will load your new env file.
* You should be able to access your env variables using `process.env.TEST_KEY` in any js file.

## Production Environment
* Create a new file named as `.env.production` at the root of your project.
* Add your variable to the newly created file. Example - `TEST_KEY=123`
* Change your `npm run build` command to set environment.

For Windows -
```json
    "develop": "set GATSBY_ENV=production && gatsby develop"
```
For Linux -
```json
    "build": "GATSBY_ENV=production gatsby build",
```
This is only if you want to build on local.

If you are using any providers like Netlify use the Linux version. You will also need to add environment variables in the service provider.

For Netlify it is in `Site Settings > Build&Deploy > Environment`

Testing netlify inc builds
