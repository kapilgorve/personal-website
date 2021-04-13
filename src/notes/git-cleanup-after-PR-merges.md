---
title: 'Git cleanup after PR merges'
tags: ['git', 'Programming']
type: 'note'
date: '2021-04-13'
description: 'Git remove local version branches deleted on remote after PR merges'
---

## The PR only approach
The last company I worked for we followed a strict PR based approach to add new code to the repo. I was doing a daily 2-3 PR of my own, couple of PR merges of other teammates. That meant on a daily basis I had about 4-5 branches to delete locally after merging the PRs.

It became hectic to manually delete these on local and keep track of which were removed and which were not. So I found these two commands that will do that automatically. Without me having to lookup every time.

## Solution
```bash
$ git fetch --prune
```

This will fetch all remote branch refs. It will then delete remote refs that are no longer in use on the remote repository. This will remove the list of branches that were deleted.



```bash
$ git branch | grep -v "origin" | grep -v "develop" | grep -v "master" | xargs git branch -D
```

This will create  list of all your branches. Remove branches containing master, develop or origin (remote branches) from the list. Then delete all the other branches remaining in the list. That should be all your local branches except `develop` or `master`.

If you need to keep other company specific local branches you need to remove it from the the list.

```bash
$ git branch | grep -v "origin" | grep -v "develop" | grep -v "master" | grep -v "company-specific-branch" | xargs git branch -D
```