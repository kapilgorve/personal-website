---
title: 'Set environment variable in Windows and WSL Linux in terminal'
tags: ['Windows10', 'wsl', 'Linux', 'Programming']
type: 'blog'
date: '2020-04-21'
description: 'How to set an environment variable from a command line and shell'
---

!['cover'](https://kapilgorve.s3.ap-south-1.amazonaws.com/blog/covers/wsl.jpg)

## Windows set env variable from the command line
* Open command line.  `set API_KEY=123`
* `echo %API_KEY%` should print your `API_KEY`.
* This env variable is set for the context of the current cmd line.

## Windows set env variable permanently using the command line
* Open the command line as admin.  `setx API_KEY "123" /M`
* Close the current shell. Open a new shell.
* `echo %API_KEY%` should print your `API_KEY`.
* This env variable is set for all future shell instances permanently for your system.

## WSL Linux set env variable from a bash terminal
* Launch your wsl instance.
* `$ API_KEY=123`
* `$ echo $API_KEY` should print your `API_KEY`.


## WSL Linux set env variable permanently from a bash terminal
* Launch your wsl instance.
* `$ sudo vim ~/.bashrc`
* Enter your password.
* Press `i` to go into edit mode. Go to the end of the file using arrow key.
* Add your variable as `API_KEY=123` at the end of the file. If your variable has spaces, use quotes.
  Example - `API_KEY= 'My Key'`
* Press `esc` key to get out of edit mode.
* Enter `:wq` and press enter . This will save and close the file.
* `$ source ~/.bashrc` will load your recent changes into your current shell.
* `$ echo $API_KEY` should print your `API_KEY`.
