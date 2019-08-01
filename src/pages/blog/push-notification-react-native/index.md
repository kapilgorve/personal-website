# How to add Push Notification in React Native

We will use `react-native-firebase` to add push notification in our react-native app and use firebase cloud messaging.  
### Steps involved:-  
1. Create react-native project
2. Create an application on firebase console
3. Add react-native-firebase 
4. Add Firebase Messaging Library
5. Test Notification on Device
6. Listen to notification  

Let's start.

## Create a React Native Project
We need a React Native project to add a push notification service. So let's create one. I'm using react-native@0.60.4 which is the latest at the time of writing this article. Go to the terminal and run this command.
> react-native init pushNotification

You can replace `pushNotification` with the project name of your choice.

## Create an application on firebase console
Let's create an application on the firebase console to use the Firebase SDK. Go [here](https://console.firebase.google.com/) and create an application. 
* Click on Add Project.
* Add iOS and Android app and follow the steps. Make sure the project name in **Register app** section matches with your react-native project (`com.pushnotification` in our case).  
!['Register App'](https://raw.githubusercontent.com/iamshadmirza/personal-website/push-notification-react-native/src/pages/blog/push-notification-react-native/add-app.png)
* Download `google-services.json` and paste it inside `/pushnotification/android/app/`. Make sure the location is correct.  
!['Project structure'](https://raw.githubusercontent.com/iamshadmirza/personal-website/push-notification-react-native/src/pages/blog/push-notification-react-native/project-structure.jpg)
* Add libraries as instructed and Sync Project. This will look something like this:-  
    * Project-level build.gradle  
    ```java
    dependencies {
        classpath("com.android.tools.build:gradle:3.4.1")
        classpath 'com.google.gms:google-services:4.3.0' //Add this line
    }
    ```
    * App-level build.gradle
    ```java
    dependendies {
        implementation fileTree(dir: "libs", include: ["*.jar"])
        implementation "com.facebook.react:react-native:+"
        implementation 'com.google.firebase:firebase-core:17.0.1' // Add this line
        implementation 'com.google.firebase:firebase-messaging:19.0.1' // Add this line
        
        if (enableHermes) {
        def hermesPath = "../../node_modules/hermesvm/android/";
        debugImplementation files(hermesPath + "hermes-debug.aar")
        releaseImplementation files(hermesPath + "hermes-release.aar")
        } else {
        implementation jscFlavor
        }
    }
    //Add to the bottom of the file
    apply plugin: 'com.google.gms.google-services'
    ```
    >Please use the latest firebase dependency available. You can add it from Android Studio also by going to:  
    File -> Project Structure -> Dependencies
## Add react-native-firebase
Go to your project and run this command.
> npm i react-native-firebase --save

(Optional) Link the module if your react-native version is less than 0.60. Run this command.
> react-native link react-native-firebase

React Native version (>0.60) supports [autolinking](https://facebook.github.io/react-native/blog/2019/07/03/version-60#native-modules-are-now-autolinked) but sometimes, it might not work. Follow the Manual Linking guide if you're having any issue with linking `react-native-firebase`.

### Manual Linking for React Native(<0.60)
Check out the official [docs](https://rnfirebase.io/docs/v5.x.x/installation/android) for updated method.
### Android
* Add `react-native-firebase` to App-level `build.gradle`
```java
dependencies {
    implementation project(':react-native-firebase') // Add this line
    implementation fileTree(dir: "libs", include: ["*.jar"])
    implementation 'androidx.appcompat:appcompat:1.0.0'
    implementation "com.facebook.react:react-native:+"
    implementation 'com.google.firebase:firebase-core:17.0.1'
}
```
* Edit `settings.gradle`
```java
include ':react-native-firebase'
project(':react-native-firebase').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-firebase/android')
```
* Edit `MainApplication.java`
```java
    import...
    import io.invertase.firebase.RNFirebasePackage; // import this

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new RNFirebasePackage(), // Add this line
      );
    }
```
* Sync Project

## Add Firebase Messaging Library

* Add the dependency to `android/app/build.gradle` file:
```java
dependencies {
  // ...
  implementation 'com.google.firebase:firebase-messaging:19.0.1'
}
```
* Edit `MainApplication.java`:
```java
import...
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage; // import this

@Override
protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new RNFirebasePackage(),
        new RNFirebaseMessagingPackage() // Add this line
    );
}
```
* Sync Project

> See [official docs](https://rnfirebase.io/docs/v5.x.x/links/android#Configure-Android-Project) for updated method.

## Test notification on the device
Now we have added all the libraries required and we should be able to receive a notification. 
> Make sure your app is in background.
1. Go to firebase console
2. Click on **Cloud Messaging** on the left panel.
3. Click on **Send your first message**.
4. Enter **Notification text**-> Click **Next**->Choose **Target**->Select app in **User Segment**.
5. Publish notification and check device.

## Listen to notification
This part involves two steps: -
1. Ask for permission.
2. Listen to the notification.

### Ask for permission
To start listening to the notification, we have to ask for the user's permission first. We want to ask for permission when the user opens the app. So we will be adding code to the root file `App.js`.
Follow these steps:-  
1. Import firebase module.  
```javascript
import firebase from 'react-native-firebase';
```
2. Check for permission in `componentDidMount()`. If permission hasn't been granted then ask for permission in `askPermission()` otherwise fetch the `token`.
```javascript
async componentDidMount(){
    const granted = await firebase.messaging().hasPermission();
    if (granted) {
        this.fetchToken();
    } else {
        this.askPermission();
    }
}
```
3. Ask permission if not already granted. Fetch token once the permission is granted
```javascript
    async askPermission(){
        try{
            await firebase.messaging().requestPermission();
            console.log('Permissions allowed');
            this.fetchToken();
        } catch(error) {
            console.log('Permissions denied');
        }
    }
```
4. Check if the token is already saved. If not then `getToken` from `firebase` module and save it in `AsyncStorage`.
```javascript
    async fetchToken(){
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        if (!fcmToken) {
        fcmToken = await firebase.messaging().getToken();
            if (fcmToken) {
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }
    }
```
### Listen to notification
Now when the user has the required permission, we can finally proceed to listening notifications.
