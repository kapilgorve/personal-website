---
title: 'Move/Install WSl distro from C drive to another drive'
tags: ['Windows10', 'wsl', 'Linux', 'Programming']
type: 'blog'
date: '2020-04-26'
description: 'Move WSL distro from default installed location'
---

!['cover'](https://kapilgorve.s3.ap-south-1.amazonaws.com/blog/covers/wsl.jpg)

I have a small 128GB SSD. I run out of space when I install ReactNative related dev tools. So I wanted to find a way to install/move my existing distro to different location than C drive.

## Move WSL to another drive
* Install `LxRunOffline` tool. `choco install lxrunoffline`
* `lxrunoffline list` List all the installed distros on your system.  I get output like this.
```bash
Microsoft Windows [Version 10.0.19041.207]
(c) 2020 Microsoft Corporation. All rights reserved.
D:\work>lxrunoffline list
Ubuntu-18.04
docker-desktop
docker-desktop-data
D:\work>
```
* `lxrunoffline move -n Ubuntu-18.04 -d G:\wsl\` . Move your distro to another drive. My distro name here is `Ubuntu-18.04`. I am moving it to `G drive` and `wsl` folder inside it. It would take some time to finish moving.

You can use the same move command to move your distro from default location to a different location inside C Drive.

Edit - As someone pointed out on Reddit. You can also go to Settings > Apps > Your distro. Click on your distro name and it will show option to move to a different drive. 
