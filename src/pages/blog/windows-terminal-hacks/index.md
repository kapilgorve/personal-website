---
title: 'Widows Terminal Hacks'
tags: ['Windows10']
type: 'blog'
date: '2020-04-04'
description: 'Windows 10 terminal : How to open in current folder, copy text'
---
!['cover'](https://upload.wikimedia.org/wikipedia/commons/2/29/Linux_command-line._Bash._GNOME_Terminal._screenshot.png)
<sub><sup>Photo by Wikipedia</sup></sub>


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