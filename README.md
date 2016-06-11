# React Native Github Feed

This repository contains a small react-native application that allows you to log-in to Github and shows your feed. It's still a WIP.

The app was built with purpose of giving a talk about Introduction to React Native.

### Configuration File

It's necessary to create a `config.json` file in the `src` directory.

For development purposes, a testUser can be set-up that overrides the username and password in the login screen, to ease the development by not having to repeat the credentials every time.

See config.exanple.json for an example.
```
{
    testUser: {
        username: "joachim@seminck.be",
        password: "8JARJmNnQKESweikW9dVnxvaZ~iNiCcKXFoXtYcq"
    }
}
```