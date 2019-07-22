---
title: 'Windows10 WSL ssh Permission denied public key on new session'
tags: ['Windows10', 'WSL', 'Linux']
type: 'blog'
date: '2019-07-22'
description: 'Windows 10 Linux Subsystem SSH-agent issue, ssh key not regonized on new session.'
---
Problem - When trying to connect using ssh, the existing key isn't recognized by the WSL shell. I had to manually add key each time `ssh-add ~/.ssh/id_work_digitalocean` on every session.


TLDR-
Add your hostname and key to ~/.ssh/config


```
Host 49.35.99.253
IdentityFile ~/.ssh/id_work_digitalocean
AddKeysToAgent yes
```

I have been using WSL from long time. Most of it for experiment purposes only.

There is always something in whole tech stack of the project that it won't work on WSL. Thats why I use Windows for frontend only projects and an Ubunutu installed on other drive for backend projects.

For work we use DigitalOcean droplets to deploy projects for client demos. I didn't give mush thought to SSH until recently. We are deploying multiple single page business websites for the client. That means I had to connect to droplets using ssh keys. Using passwords became hectic. So I switched to ssh keys.

There was one tiny issue though. It quickly became annoying.

When trying to connect using ssh, the existing key isn't recognized by the WSL shell. I had to manually add key each time `ssh-add ~/.ssh/id_work_digitalocean` on every session.

Solution - Add your key in the ssh config .

* Create a config file first.
```bash
$ touch ~/.ssh/config
```
There are chances that this file does not exist. In that case create it. If this file exists skip this step.

* Open `config` file using vim.
```bash
$ vim ~/.ssh/config
```

* Enter `i` to go into insert mode so you can edit it. Add your hostname and private key location.
```
Host 49.35.99.253
IdentityFile ~/.ssh/id_work_digitalocean
AddKeysToAgent yes
```

* Enter `ESC` key to get out of insert mode and press `:wq` to save your changes.

Now reopen your bash and connect using ssh to your host. You won't need to add ssh key this time.

Happy SSHING on Windows !!!

Fun Fact -  `ssh` support landed in `Powershell` in 2018. You no longer need to use bash to use ssh. I discovered this while trying the newly launched `Windows Terminal`.