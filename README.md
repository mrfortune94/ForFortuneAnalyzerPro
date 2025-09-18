# FortuneAnalyzerPro

**Live Real-Time Android Penetration Testing App** for slot/casino environments (with authorization).

## 🔥 Features
- Live game playback with embedded WebView
- Real-time request logger (XHR / fetch / WebSocket)
- SQL Injection tester
- Admin login brute force module
- Replay API injector
- Hash scanner in login/API payloads
- PIN protected (1187)
- GitHub Actions auto-build APK on commit

## 🚀 Build APK Locally
```bash
npm install
npm run build
npx cap sync android
cd android && ./gradlew assembleDebug
```

## 🛠️ GitHub Actions
Push to `main` branch to trigger APK build automatically.

## ⚠️ Legal Use Only
This tool is for testing environments and systems **you are legally authorized to assess**.
Using it on public or unauthorized systems may violate local laws.