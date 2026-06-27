# ZRecorder PRO 🎙️

ZRecorder PRO is a high-quality, professional-grade mobile audio recording application built with **React Native** and **Expo SDK 54**. It features a modern, clean dark-themed UI, real-time live tracking, persistent local storage, custom rename options, and native file sharing capabilities.

Developed meticulously step-by-step to maintain high-utility native architecture.

---

## ✨ Features

- **Professional Dark Theme UI**: A sleek, minimal user interface designed for optimal user experience and visibility.
- **Live Recording Timer**: A dynamic, precise clock displaying `00:00:00` format that updates in real-time while capturing audio.
- **Interactive Audio List**: Instantly adds and displays recordings with accurate duration tracking.
- **Persistent Storage**: Integrated with `AsyncStorage` to ensure your data is permanently saved locally and never lost when closing the app.
- **Custom Native Rename Modal**: A custom cross-platform pop-up overlay allowing users to easily tap and rename individual recordings.
- **Native File Sharing/Exporting**: Built-in support via `expo-sharing` to send recordings to WhatsApp, Telegram, Email, or save them directly inside your phone's native File Manager.
- **Smart Record Buttons**: Contextual UI buttons that dynamically morph from circular nodes to professional recording squares upon activation.

---

## 🛠️ Tech Stack & Libraries

- **Framework**: React Native (via Expo SDK 54)
- **Audio Handling**: `expo-av` (Recording & Playback engine)
- **Local Database**: `@react-native-async-storage/async-storage`
- **File Sharing System**: `expo-sharing`

---

## 🚀 How It Works (Step-by-Step Architecture)

### 1. Audio Recording Lifecycle
When the user clicks the main **Record** button, `Audio.requestPermissionsAsync()` asks for device microphone permissions. Once granted, an isolated audio session is configured using `Audio.RecordingOptionsPresets.HIGH_QUALITY`. Concurrently, a JavaScript `setInterval` kicks in to increment the active clock timer every 1000ms.

### 2. Audio Storage and Serialization
Stopping a recording triggers `recording.stopAndUnloadAsync()` to free up hardware memory. The app fetches the strict file pathway (`URI`). It creates a new object stringifying a unique ID (`Date.now()`), localized title, duration, and URI, then prepends it to the React array state. This entire updated bundle is permanently serialized into device memory using `AsyncStorage.setItem`.

### 3. State Hydration on App Launch
Whenever the application boots up, a `useEffect` hook intercepts the initialization phase. It checks the local filesystem via `AsyncStorage.getItem`. If any tsofaffin (older) recording array blocks are found, it parses them back into JSON and populates the active UI layout instantly.

### 4. Native Sharing Sheet Integration
The export system targets the direct file pathway (`item.uri`). When hitting the 📤 button, `Sharing.shareAsync` activates the native sharing dialogue built directly into Android/iOS operating systems, bridging the sandbox app environment seamlessly with public folders.

---

## 📥 Getting Started & Installation

Follow these steps to run the project locally on your machine:

### Prerequisites
Make sure you have Node.js and the Expo Go app installed on your smartphone.

### 1. Clone the repository
```bash
git clone https://github.com
cd ZRecorder
```

### 2. Install Dependencies
Run the following command to download all required packages:
```bash
npm install
```

### 3. Start the Development Server
```bash
npx expo start
```
Scan the generated **QR Code** using your terminal or Expo Go app to test it live on your Android device.

---

## 📱 Compiling into an Android Mobile App (.APK)

This project is optimized with an `eas.json` configuration block to be compiled directly into a mobile application.

1. Install the global EAS CLI tools:
   ```bash
   npm install -g eas-cli
   ```
2. Log in to your personal Expo dev profile:
   ```bash
   eas login
   ```
3. Initialize and hook the application directory to the cloud server:
   ```bash
   eas project:init
   ```
4. Build your standalone distributed `.apk` binary file:
   ```bash
   eas build --platform android --profile preview
   ```
*Once compilation finishes in the cloud, scan the terminal QR code to download and run **ZRecorder PRO** natively on any Android device!*

---

## 🛡️ License & Credit
Distributed under the MIT License. 

**Powered by RNG Tech-301** 🚀
