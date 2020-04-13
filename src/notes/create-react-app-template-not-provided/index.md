---
title: 'Create React App Error - Template not provided'
tags: ['ReactJs']
type: 'note'
date: '2020-04-13'
description: 'How to Fix - A template was not provided'
---
![''](https://kapilgorve.s3.ap-south-1.amazonaws.com/blog/covers/cra.jpg)
<sub><sup>Photo from [CRA Docs](https://create-react-app.dev//)</sup></sub>

## Create React App Error
Error Message - `A template was not provided. This is likely because you're using an outdated version of create-react-app.
Please note that global installs of create-react-app are no longer supported.`

## Solution
New versions of Create React App doesn't support global installs. Remove it globally.
Try `npm uninstall -g create-react-app`. Then try again. Didn't work for me. Even after removing `create-react-app` globally. If your system has any projects using CRA in parent directory npm will pick up that version.

Try `npx --ignore-existing create-react-app my-app`. This will ignore any installs you have in your system.

## Final Solution
I had to manually remove CRA from global installs.
Windows path - `C:\Users\your_username\AppData\Roaming\npm` .
Delete file named `create-react-app` and `create-react-app.cmd`.
On Unix systems it should be located in - `/usr/local/bin`. Don' forget to remove executable file. For windows it was `.cmd` file.


CRA - `create-react-app`