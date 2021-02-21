# BorneToGo

Developpement brand of the application's frontend part.

## Description 

The project aim to display the optimized path for an electric driver to reach a location. This part is done in ReactNative and manage the views and the navigation between them.

## Deploiement 

The project should work all alone. There is a yarn part that manage all dependecies with npm. Recover the project and in the folder use the command : 
    ```npm install```
then to run the project 
    ```npm run start```
    
## Installation 

If you miss one or some dependencies, or you  need another dependency you can add another one using : 
    ```yarn add <dependency_name>```

## Expo

To test the application, you can use Expo. Expo is an application that is downloadable on Android and on IOS since the react native application has the particularity of running on both Android and IOS.

However, there is the possibility of using Expo on your computer (which may be more convenient for testing purposes). All you need to do is install an emulator (e.g. LDPlayer 4) on your computer and then install Expo.

### Installing an Android emulator on your computer

1.	Retrieve the LDPlayer installation file from the following link: https://fr.ldplayer.net/
2.	Once the installation file has been downloaded, run it and click on "Install".
3.	The installation starts. When finished, click "Start".
4.	Write Expo in the "Search for games" bar.
5.	Click on the single search result.
6.	Click on "Install".
7.	You can now use Expo on your computer.

### Launching an application with Expo

When you use the npm start command in your console, a QR Code will appear in the console. It also appears in the tab that opens in your default browser. This QR Code allows you to link your application to the Expo application and view it.

To connect to your application via Expo :
If this is your first connection :
1. Launch Expo by clicking on it.
2. Click on "Scan QR Code". You will be asked for permission to use your camera. If you are on your computer, you must authorise the capture of your screen.
3. Scan your QR Code. With LDPlayer, you will have to make the blue frame coincide with the outlines of the QR Code by adjusting its size.
4. The application will then launch.

If you have already logged in :
1. Launch Expo by clicking on it.
2. Click on the name of your application in the "Recently Opened" section.
3. The application will then launch.

## Resolution of common bugs

### Not considered modifications
Changes in a javascript-coded program are normally detected immediately and you don't need to rebuild the bundle of your application. However, sometimes, after an error, expo can update your bundle by itself. If you can, just click on the "Reload" button. If "Reload" is not accessible, in this case, turn off expo and turn it back on by rescanning your QR-code.

### New dependency not detected
Sometimes, if you are working with another person adding a new dependency, it may not be detected despite its presence in your project's dependencies. In this case, you just have to do : ```npm install``` in the terminal and then it will work again.

### Added a connection to the Redux store
Sometimes, when you connect a new component to the Redux store that is used to manage the global status of the application, you get this error:
```object is not a constructor (evaluating 'new ctor(props context)')```
Don't panic, it just means that the expo cache is full, and the application can't retrieve the global state anymore. All you have to do is to solve it:
•	Or to restart the application. That can be enough sometimes.
•	Or to clean the cache using: ```yarn cache clean```
