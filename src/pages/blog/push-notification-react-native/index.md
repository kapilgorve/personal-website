# How to add Push Notification in React Native

We will use `react-native-firebase` to add push notification in our react-native app and hopefully save your time implementing it.
### Steps involved:-  
1. Create react-native project
2. Create an application on firebase console
3. Add react-native-firebase 
4. Add Firebase Messaging and Notification Module
5. Test Notification on Device
6. Listening Notification 

Let's get started.

## Step 1. Create a React Native Project
Let's create a React Native Project to start implementing Push Notification service. I'm using react-native@0.60.4 which is the latest at the time of writing this article. Go to the terminal and run this command.
```shell
react-native init pushNotification
```

You can replace `pushNotification` with the project name of your choice.

## Step 2. Create an application on firebase console
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
>Please use the latest firebase dependency available. You can also add it from Android Studio by going to:  
    File -> Project Structure -> Dependencies
## Step 3. Add react-native-firebase
Go to your project root directory and run this command.
```shell
npm install react-native-firebase --save
```

(Optional) Link the module if your react-native version is less than 0.60.
```shell
react-native link react-native-firebase
```

>React Native version (>0.60) supports [autolinking](https://facebook.github.io/react-native/blog/2019/07/03/version-60#native-modules-are-now-autolinked).  

Follow the Manual Linking guide if you're having issues with linking `react-native-firebase` or you're using an earlier version of React Native.

## Manual Linking for React Native(<0.60)
Check out the official [docs](https://rnfirebase.io/docs/v5.x.x/installation/android) for updated method.
### Android
* Add `react-native-firebase` to App-level `build.gradle`
```java
dependencies {
    // ...
    implementation project(':react-native-firebase') // Add this line
}
```
* Edit `settings.gradle`
```java
//Add these lines
include ':react-native-firebase'
project(':react-native-firebase').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-firebase/android')
```
* Edit `MainApplication.java`
```java
    import...
    import io.invertase.firebase.RNFirebasePackage; // import core package

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new RNFirebasePackage(), // Add this line
      );
    }
```
* Sync Project and we are good to go.

## Step 4. Add Firebase Messaging and Notification Module
We have to include other modules as the `RNFirebasePackage` we imported earlier provides the core features only.
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
// import these two packages
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage

@Override
protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new RNFirebasePackage(),
        new RNFirebaseMessagingPackage() // Add this line
        new RNFirebaseNotificationsPackage() // Add this line
    );
}
```
* Sync Project and we are done.

> Check out [official docs](https://rnfirebase.io/docs/v5.x.x/links/android#Configure-Android-Project) for updated method.

## Step 5. Test notification on the device
Now that we have added all the required libraries hence we should be able to receive a notification. Let's test it out but *first make sure your app is in background.*
1. Go to firebase console
2. Click on **Cloud Messaging** on the left panel.
3. Click on **Send your first message**.
4. Enter **Notification text**-> Click **Next**->Choose **Target**->Select app in **User Segment**.
5. Publish notification and check device.

I hope you're able to get a *test notification* on your device. Let's move on to next section.

## Step 6. Listening Notifications
This part involves three steps: -
1. Check Permissions
1. Request Permissions
2. Listen for Notifications

## Check Permissions
We need to ensure that user has granted required permissions so that we can receive Notifications:
* Import firebase module.  
```javascript
import firebase from 'react-native-firebase';
```
* Check for permission in `componentDidMount()`. If permission hasn't been granted then ask for permission in `askPermission()` otherwise fetch the `token`.
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

## Request Permissions
Request the permissions if not already granted. This step is very important in case for iOS Plateform.
* Ask permission if not already granted. Fetch token once the permission is granted
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
* Check if the token is already saved. If not then `getToken` from `firebase` module and save it in `AsyncStorage`.
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
## Listen for Notifications
Firebase Notifications can be of three different types:
* notification-only messages from FCM
* notification + data messages from FCM
* local notifications

A notification will trigger one of these listeners depending on the state of your application:

* onNotificationDisplayed - Triggered when a particular notification has been displayed.
* onNotification - Triggered when a particular notification has been received
* onNotificationOpened - Triggered when your app is in background and opened when a notification is clicked.
* getInitialNotification - Triggered when your app is closed and opened when a notification is clicked.
```javascript
componentDidMount() {
    this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
        // Process your notification as required
    });

    this.notificationListener = firebase.notifications().onNotification((notification) => {
        // Process your notification as required
    });

    // App (in background) was opened by a notification
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        // Get information about the notification that was opened
        const notification = notificationOpen.notification;
    });

    // App was opened by a notification
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        // Get information about the notification that was opened
        const notification = notificationOpen.notification;
    }
}

componentWillUnmount() {
    this.notificationDisplayedListener();
    this.notificationListener();
    this.notificationOpenedListener();
}
```
> *Note: On Android, unfortunately there is no way to access the title and body of an opened remote notification. You can use the data part of the remote notification to supply this information if it's required.*

I hope you're able to receive the notification successfully by now.
