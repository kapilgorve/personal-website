---
title: 'aws cli s3 commands'
tags: ['Programming' , 'aws']
type: 'note'
date: '2020-04-30'
description: 'aws cli s3 cheatsheet'
---

### List buckets

```bash
aws s3 ls

Output:
Microsoft Windows [Version 10.0.19041.207]
(c) 2020 Microsoft Corporation. All rights reserved.

D:\work>aws s3 ls
2018-11-22 12:23:27 kapilgorve
2020-01-08 10:36:12 macosimage

D:\work>
```

### List files and folders inside a bucket.

```bash
aws s3 ls kapilgorve/

Output:
D:\work>aws s3 ls kapilgorve/
                           PRE all/
                           PRE covers/
                           PRE push-notification-react-native/
2019-04-28 14:03:03          0

D:\work>
```

### Copy single file to s3

```bash
aws s3 cp test.jpg s3://kapilgorve/blog/covers/
```

### Copy single file to s3 and make public

```bash
aws s3 cp test.jpg s3://kapilgorve/blog/covers/ --acl public-read
```

### Copy complete folder to s3
```bash
aws s3 cp myfolder s3://kapilgorve/ --recursive
```
