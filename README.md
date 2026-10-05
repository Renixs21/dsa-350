# DSA 350 Placement Sheet

350 most-asked placement DSA problems, Arrays to Dynamic Programming, scheduled 5 a day for Operation 88 (5 Oct – 31 Dec 2026). Two friends sign in with Google and see each other's progress live.

Live link once published: **https://renixs21.github.io/dsa-350/**

| File | What it is |
|---|---|
| `index.html` | The app. Don't edit it. |
| `config.js` | Your Firebase settings. The only file you edit. |
| `README.md` | This guide. |

---

## 1. Set up Firebase (free, about 10 minutes)

1. Open https://console.firebase.google.com → **Create a project** → name it `dsa-350` → Google Analytics can be off → **Create project**.
2. **Database:** left menu **Build → Realtime Database → Create Database** → location **Singapore (asia-southeast1)** → **Start in locked mode** → **Enable**.
3. **Rules:** on the same page open the **Rules** tab, delete everything, paste the rules below, put your Gmail and your friend's Gmail in place of the two example addresses (all lowercase, in both places), then **Publish**.
4. **Google sign-in:** **Build → Authentication → Get started → Sign-in method → Google → Enable** → pick your support email → **Save**.
5. **Authorized domain:** in Authentication open **Settings → Authorized domains → Add domain** → type `renixs21.github.io` → **Add**.
6. **Web app config:** gear icon → **Project settings → General** → scroll to **Your apps** → click the web icon `</>` → nickname `dsa-350` → leave Firebase Hosting unticked → **Register app**. Firebase shows a `firebaseConfig = { ... }` object.
   Make sure it has a `databaseURL` line. If it doesn't, copy the URL shown at the top of **Realtime Database → Data** (it looks like `https://dsa-350-xxxxx-default-rtdb.asia-southeast1.firebasedatabase.app`) and add it as `databaseURL: "..."`.
7. Open `config.js` and replace the whole `firebase: { ... }` object with yours.

### Database rules

```json
{
  "rules": {
    "dsa350": {
      "users": {
        ".read": "auth != null && auth.token.email_verified == true && (auth.token.email == 'your.email@gmail.com' || auth.token.email == 'friend.email@gmail.com')",
        "$uid": {
          ".write": "auth != null && auth.uid == $uid && auth.token.email_verified == true && (auth.token.email == 'your.email@gmail.com' || auth.token.email == 'friend.email@gmail.com')"
        }
      }
    }
  }
}
```

Only these two Google accounts can see the shared progress, and each person can only change their own ticks. The values in `config.js` are not secret; these rules are what keep everyone else out.

---

## 2. Publish on GitHub Pages

1. Go to https://github.com/new → Repository name `dsa-350` → **Public** → **Create repository**.
2. On the empty repo page, click **uploading an existing file** → add `index.html`, `config.js` and `README.md` → **Commit changes**.
3. Open **Settings → Pages**. Under **Build and deployment**, set Source to **Deploy from a branch**, Branch to **main** and **/ (root)** → **Save**.
4. Wait 1–2 minutes and open **https://renixs21.github.io/dsa-350/**. The Pages settings screen also shows the link once it's live.

To change `config.js` later: open it on GitHub → pencil icon → edit → **Commit changes**. The site updates within a couple of minutes.

---

## 3. Use it together

- Both of you open the link in **Chrome** (Android) or **Safari** (iPhone), not inside WhatsApp's or Instagram's built-in browser, and tap **Sign in with Google**.
- Each person has their own ticks and stars, synced across all their devices. You see each other's progress in four places:
  - the squad card at the top (solved count, today, streak, last active)
  - the other person's initial next to problems they've solved
  - a coloured dot on calendar dates they've worked on (hollow = partly done)
  - a second, smaller row of dots on each day in the week list
- **Bring over ticks from the Claude version:** on that page scroll to **Back up your progress → Copy backup code**. On the GitHub page, after signing in, paste it into the same box → **Load pasted code**.
- **Home screen:** Chrome menu → **Add to Home screen**. Safari → Share → **Add to Home Screen**.

---

## Troubleshooting

| What you see | Fix |
|---|---|
| "This account isn't on the list yet" | The email in the rules doesn't exactly match the Google account you signed in with. Fix it in the Rules tab (lowercase), **Publish**, reload. |
| "isn't on Firebase's list of authorized domains" | Add `renixs21.github.io` under Authentication → Settings → Authorized domains (step 1.5). |
| The sign-in window doesn't open | Allow pop-ups for the site, and open the link directly in Chrome or Safari. |
| No sign-in card at the top of the page | `config.js` still has the `PASTE_...` placeholders, or `databaseURL` is missing. |
| "Sign-in failed" mentioning the API key | Copy the config again from Project settings; one of the values got cut off. |
| Still seeing the old version after an edit | Wait a minute, then reload. |

## How it works

GitHub Pages serves the static page. Firebase Realtime Database stores each person's ticks under their Google account (`dsa350/users/<uid>`), and every open copy of the page updates live when either of you ticks something. It runs on Firebase's free Spark plan and uses a tiny fraction of its limits.
