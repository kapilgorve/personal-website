---
title: "iOS App rejection: Info.plist file should contain a NSLocationAlwaysUsageDescription"
tags: ['ReactNative', 'iOS']
type : "blog"
date : "2019-04-07"
description: "The app's Info.plist file should contain a NSLocationAlwaysUsageDescription key with a user-facing purpose string explaining clearly and completely why your app needs the data."
---
We received a message from iOS App Team about adding `NSLocationAlwaysUsageDescription` key in `Info.plist` file. Our last build was rejected for this specific reason.

 Being clueless about what went wrong here. I googled up and found some interesting things.


`NSLocationAlwaysUsageDescription` key needs to be added to your `Info.plist` file if your app using user's location data. You need to add a custom message about why you need user's location data as well.
Quite surpised by this, we were not using geolocation service or tracking user's location. Our app didn't need this specific functionality. So why we do we need to tell the user that we are tracking the user location while we are not ?


Turns out React Native has a `GeoLocation` service which gets included by default into your build. Even if you do not use the `GeoLocation API` in your codebase , it is still in your app build. This triggers code bots about possible usage of Geolocation.

## How do you solve this ?

Referring to this github issue - https://github.com/facebook/react-native/issues/20879. There are three possible ways. I tried the first and easy one and that worked fine for me. I deleted `RCTGeolocation.xcodeproj` from `libraries` folder in XCode and rebuilt the app. You can see on the left Libraries in current app in below screenshot. This solved the `NSLocationAlwaysUsageDescription` issue.

![Xcode Libraries](https://kapilgorve.s3.ap-south-1.amazonaws.com/blog/all/xcode-libraries.png)


Update- I am told that this issue will be fixed around React Native version 60.


