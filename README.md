# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

# My Portfolio (React + Firebase)

Personal portfolio built with Create React App, TypeScript and Firebase (Firestore).

**What’s included:** source code for the portfolio site, contact form using EmailJS, and Firebase integration for projects/messages.

**Security note:** do not commit secret keys. This repository uses environment variables for keys — see `\.env.example`.

## Quick start

- Clone:

```bash
git clone <YOUR-REPO-URL>
cd my-portfolio-2026
```

- Install dependencies:

```bash
npm install
```

- Create a local env file: copy `\.env.example` to `\.env.local` and fill values.

- Run locally:

```bash
npm start
```

## Environment variables

Copy `\.env.example` to `\.env.local` and fill the values for EmailJS and Firebase. Example variables used by the app:

- `REACT_APP_EMAILJS_SERVICE_ID`
- `REACT_APP_EMAILJS_TEMPLATE_ID`
- `REACT_APP_EMAILJS_USER_ID`
- `REACT_APP_FIREBASE_API_KEY`
- `REACT_APP_FIREBASE_AUTH_DOMAIN`
- `REACT_APP_FIREBASE_PROJECT_ID`
- `REACT_APP_FIREBASE_STORAGE_BUCKET`
- `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`
- `REACT_APP_FIREBASE_APP_ID`
- `REACT_APP_FIREBASE_MEASUREMENTID`

Files containing secrets (for example `\.env.local`) are excluded via `.gitignore`.

## Build and deploy

Build:

```bash
npm run build
```

Deploy using Firebase Hosting (project already has `firebase.json`):

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy --only hosting
```

Or deploy with GitHub Pages / Netlify / Vercel — build outputs are in the `build/` folder.

## Publishing to GitHub (public repo)

1. Create a new public repository on GitHub.
2. Add remote and push:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo>.git
git push -u origin main
```

If you previously committed secrets (for example `\.env.local` or the `build/` folder containing embedded keys), remove them from history and rotate those keys. Two common tools:

- BFG Repo-Cleaner: https://rtyley.github.io/bfg-repo-cleaner/
- git filter-repo: https://github.com/newren/git-filter-repo

Example (BFG) to remove a file and its history:

```bash
bfg --delete-files .env.local
git push --force
```

## Next steps / Recommendations

- Rotate any API keys that were exposed (Firebase API key, EmailJS user id) from their provider consoles.
- Keep `\.env.local` out of source control.
- Use Firebase rules to limit access for production data.

---

For any help pushing to GitHub or cleaning history I can run the commands or guide you step-by-step.
