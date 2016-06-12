# React Native Github Feed

This repository contains a small react-native application that allows you to log-in to Github and shows your feed. It's still a WIP.

The app was built with purpose of giving a talk about Introduction to React Native. It currently only supports iOS.

### Configuration File

It's necessary to create a `config.json` file in the `src` directory.

For development purposes, a `testUser` can be set-up that overrides the username and password in the login screen, to ease the development by not having to repeat the credentials every time.

You can also choose what kind of navigation you would like by changing the `navigation` value: a swiper window, rotating between three screens, or a tabbed navigation.

See `config.example.json` for an example.
```
{
    "navigation": "tabs|swiper",
    "testUser": {
        "username": "joachim@seminck.be",
        "password": "Some password"
    }
}
```

### Run

* `npm run start` via cmd
* Run via XCode (build and run on a simulator)

To run on a device, connect to laptop and change the URL in `AppDelegate.m` to match the local laptop ip (instead of using localhost).

### Screenshots

##### Demo
![Tabs](https://github.com/jseminck/react-native-github-feed/blob/master/screenshots/github_feed.gif)

##### Swiper instead of Tabs
![Swiper](https://github.com/jseminck/react-native-github-feed/blob/master/screenshots/github_swiper.gif)
