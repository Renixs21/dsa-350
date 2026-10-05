// DSA 350 — sync settings
//
// Paste your Firebase web config below (Firebase console → Project settings → General →
// Your apps → your web app → "SDK setup and configuration" → Config). Replace the whole
// `firebase: { ... }` object with the one Firebase shows you.
//
// These values are not secret. The database rules (README, step 1.3) are what keep
// everyone except you and your friend out.
//
// While the placeholders below are still here, the sheet works on one device only, without sync.

window.DSA_CONFIG = {
  firebase: {
    apiKey: "PASTE_API_KEY",
    authDomain: "PASTE_PROJECT_ID.firebaseapp.com",
    databaseURL: "PASTE_DATABASE_URL",
    projectId: "PASTE_PROJECT_ID",
    appId: "PASTE_APP_ID"
  }
};
