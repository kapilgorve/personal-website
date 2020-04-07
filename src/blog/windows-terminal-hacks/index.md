---
title: 'Windows Terminal Hacks'
tags: ['Windows10']
type: 'blog'
date: '2020-04-06'
description: 'Windows 10 terminal : How to open in current folder, copy text'
---
!['cover'](https://kapilgorve.s3.ap-south-1.amazonaws.com/blog/covers/terminal.jpg)
<sub><sup>Photo by Lewis Ngugi from [Pexels](https://www.pexels.com/photo/blur-business-close-up-coding-289927/)</sup></sub>


## Start Windows Terminal in current folder
We can specify the default directory `Windows Terminal` can open in.
* Open Windows Terminal
* Go to Settings option or You can press `Ctrl + ,`. This will open your config file.
It should look like this. The first option in list is `Powershell` config.

```json
{
    "profiles":
    {
        "list":
        [
            {
                // Make changes here to the powershell.exe profile
                "guid": "{61c54bbd-c2c6-5271-96e7-009a87ff44bf}",
                "name": "Windows PowerShell",
                "commandline": "powershell.exe",
                "hidden": false,
                "startingDirectory": null
            },
        ]
}
```
* Add `"startingDirectory": null` option for each profile.
* Restart Windows Terminal.

Now if you go to any folder and type `wt` in address bar.  This should open Windows Terminal in your current folder. If you want to open it in specific folder,you can specify the path instead of `null`.

## Copy Terminal text
You can't copy text from Windows Terminal by selecting text and right click.
* Go to Settings
* Specify `"copyOnSelect": true` at the root of your config file.
Ex:
```json
{
    "$schema": "https://aka.ms/terminal-profiles-schema",
    "defaultProfile": "{0caa0dad-35be-5f56-a8ff-afceeeaa6101}",
    "copyOnSelect": true,
}
```
* Restart Windows Terminal

Now if you select text in terminal and right click. The selected text would be copied to your clipboard.

## Specify default commandline application
By default Windows Terminal will open `powershell` in first tab. You can change that using `defaultProfile` property in config.
* Go to Settings
* Specify `"defaultProfile":` property to the value of `guid` from list of profiles.
* Restart Windows Terminal
Ex:
```json
{
    "$schema": "https://aka.ms/terminal-profiles-schema",

    "defaultProfile": "{0caa0dad-35be-5f56-a8ff-afceeeaa6101}",
    "copyOnSelect": true,

    "profiles":
    {
        "defaults":
        {
            // Put settings here that you want to apply to all profiles
        },
        "list":
        [
            {
                // Make changes here to the powershell.exe profile
                "guid": "{61c54bbd-c2c6-5271-96e7-009a87ff44bf}",
                "name": "Windows PowerShell",
                "commandline": "powershell.exe",
                "hidden": false,
                "startingDirectory": null
            },
            {
                // Make changes here to the cmd.exe profile
                "guid": "{0caa0dad-35be-5f56-a8ff-afceeeaa6101}",
                "name": "cmd",
                "commandline": "cmd.exe",
                "hidden": false,
                "startingDirectory": null
            },
        ]
    }
}
```