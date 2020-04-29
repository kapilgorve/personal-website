---
title: 'How to move WSL2 distro'
tags: ['Windows10', 'wsl', 'Linux', 'Programming']
type: 'note'
date: '2020-04-29'
description: 'Move WSL distro from default installed location'
---

## Edit -
As pointed out by `lxrunoffline` [author](https://github.com/DDoSolitary/LxRunOffline/issues/90), it is supported to move WSL2 distro. No conversion needed. This post is applicable for older `lxrunoffline` versions. If you are on latest version follow this post - [/blog/install-move-wsl-distro-from-c-drive-to-another-drive/](/blog/install-move-wsl-distro-from-c-drive-to-another-drive/)

You can use `LxRunOffline` tool to move WSL 1 distros. I faced errors for moving wsl2 distro. You need to convert your distro to v1 and then move. Then convert again to v2.

## Move WSL2 distro from C drive
* Install `LxRunOffline` tool. `choco install lxrunoffline`
* Stop your distro.
* `wsl --list --verbose` List all the installed distros on your system. I get output like this.
```bash
D:\work>wsl --list --verbose
  NAME                   STATE           VERSION
  docker-desktop         Stopped         2
  Ubuntu-18.04           Stopped         2
  docker-desktop-data    Stopped         2
D:\work>
```
* `wsl --set-version Ubuntu-18.04 1` This will convert your distro from v2 to v1.
* `lxrunoffline move -n Ubuntu-18.04 -d G:\wsl\`. Move your distro to another drive. My distro name here is `Ubuntu-18.04`. I am moving it to `G drive` and `wsl` folder inside it. It would take some time to finish moving.

* `wsl --set-version Ubuntu-18.04 2` This will convert your distro from v1 to v2 again.

That's it. You can start to use your distro again.

