#!/bin/bash
npm install
npm run build
npx cap sync android
cd android && ./gradlew assembleDebug
open app/build/outputs/apk/debug