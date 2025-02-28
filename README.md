# Nitro Math

A demonstration of Nitro Modules with mixed C/C++ implementation in an Expo app.

The Nitro module is contained in /package.

## Overview

This repo demonstrates how to:
- Build a Nitro Module with C++ and pure C implementations
- Access the module from React Native
- Integrate with Expo projects

## Features

- **Pi Value**: Access a constant value through a native property
- **Addition**: Call a C++ native function to perform calculations
- **Number Formatting**: Use a pure C utility function through a C++ bridge

## Issues

Currently unable to run the app on Android SDK 35 using expo's prebuild command.

The app compiles normally, and runs fine on Android SDK <35 and iOS, but I get the error: `java.lang.UnsatisfiedLinkError: dlopen failed: empty/missing DT_HASH/DT_GNU_HASH in "/data/app/~~0oYmWD5XJ7B6A1v8Di-bvw==/com.mgiallourakis.reactnativemathexpo-KsHQ__Cgwf49FeymZnNO4g==/base.apk!/lib/arm64-v8a/libNitroMath.so" (new hash type from the future?)`

I've provided the android logcat that occurs from the app in `./without_set_target_properties.log`

I also tried a fix setting `LINK_FLAGS "-Wl,--hash-style=both"` in the CMake, which yields a different error in `with_set_target_properties.log`

## License

MIT
