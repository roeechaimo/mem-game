# mem-game

A browser-based memory card game: flip pairs, beat the clock, and try to clear the board. Built for casual players who want a short, polished web game.

## Features

- **Board sizes**: 16 or 32 cards (8 or 16 pairs)
- **Optional countdown**: timed mode with win/lose feedback
- **Game flow**: choose board settings → play → game-over modal → play again
- **Firebase-ready**: Firestore/Storage clients and env-based config (see [Firebase](#firebase))

## Tech stack

| Area | Choice |
|------|--------|
| UI | React 18, functional components, Context API |
| Build | [Vite](https://vitejs.dev/) 7 |
| Routing | React Router 6 |
| Styling | SCSS (component-scoped + `src/styles/variables.scss`) |
| Backend / hosting | Firebase (Firestore, Storage, Hosting) |
| Runtime | Node.js **v24.3.0** (see `TECH_STACK.md`) |

Authoritative stack and patterns: [`TECH_STACK.md`](TECH_STACK.md). Product goals and scope: [`PROJECT_CONTEXT.md`](PROJECT_CONTEXT.md).

## Prerequisites

- **Node.js** v24.3.0 (recommended; align with `TECH_STACK.md`)
- **npm** (comes with Node)
- **Firebase CLI** — only for deploy scripts (`npm i -g firebase-tools`, then `firebase login`)

## Quick start

```bash
git clone <repository-url>
cd mem-game
npm install
```

Create a `.env` file in the project root (see [Environment variables](#environment-variables)), then:

```bash
npm run dev
```

Open the URL Vite prints (default: [http://localhost:5173](http://localhost:5173)).

## Environment variables

Firebase is configured via Vite env vars (loaded from `.env`; never commit secrets). Required keys match `src/firebase/firbase.js`:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_DATABASE_URL=
VITE_MEASURMENT_ID=
```

Copy values from the [Firebase console](https://console.firebase.google.com/) for project **`mem-game-a94ab`** (see `.firebaserc`).

## npm scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `vite` | Local development with HMR |
| `build` | `vite build` | Production build → `dist/` |
| `preview` | `vite preview` | Serve `dist/` locally (smoke-test before deploy) |
| `deploy` | `npm run build && firebase deploy` | Build and deploy to Firebase Hosting |
| `deploy:preview` | `npm run build && firebase hosting:channel:deploy preview-$npm_package_version --expires 7d` | Temporary preview channel (7-day expiry) |

There is no `npm test` script today; legacy test files under `src/` are not wired to a runner.

## Project structure

```
mem-game/
├── index.html              # Vite entry HTML
├── vite.config.js
├── firebase.json           # Hosting: public = dist, SPA rewrites
├── .firebaserc             # Default Firebase project
├── public/                 # Static assets (images, fonts, favicon)
├── src/
│   ├── index.jsx           # App bootstrap
│   ├── App.jsx             # Router shell + header
│   ├── routes.js           # Route table
│   ├── GamePage/           # Game board, countdown, modals
│   ├── appData/            # Local image constants
│   ├── firebase/           # Firebase init + Firestore helpers
│   ├── contexts/           # React context (e.g. game time)
│   ├── components/         # Shared UI (e.g. Toggle)
│   ├── hooks/              # Custom hooks
│   └── styles/             # Global SCSS variables
├── PROJECT_CONTEXT.md      # Product mission and scope
├── TECH_STACK.md           # Locked stack and conventions
└── AGENTS.md               # AI/agent workflow standards
```

## Development conventions

- **Components**: functional only; no class components (`TECH_STACK.md`).
- **State**: React Context for cross-cutting game state; local `useState` in screens.
- **Data**: constants in `src/appData/` and `src/texts.js`; Firestore collection `board_images` via `firestoreService`.
- **Styling**: SCSS per feature folder; shared tokens in `src/styles/variables.scss`.
- **Paths**: feature folders use PascalCase components (e.g. `GamePage/Board/Board.jsx`).

## Firebase

- **Project ID**: `mem-game-a94ab` (`.firebaserc`)
- **Hosting**: `dist/` after `npm run build`; all routes rewrite to `index.html` (`firebase.json`)
- **Services in app**: Firestore (`db`), Storage (`storage`); board images collection: `board_images`

Card faces and backgrounds are served from `public/images/` today; Firestore integration for dynamic assets is partially in place (`firestoreService.getBoardImages`).

## Deployment runbook

### Production

1. Ensure `.env` has production Firebase values (or CI secrets).
2. `npm run build` — confirm `dist/` looks correct.
3. Optional: `npm run preview` and spot-check locally.
4. `firebase login` (once per machine) if not already authenticated.
5. `npm run deploy` — builds and runs `firebase deploy` to the default project.

### Preview channel

```bash
npm run deploy:preview
```

Deploys to a versioned preview channel (`preview-0.1.0` from `package.json` version), expires in 7 days.

### Rollback / verify

- Use [Firebase Hosting console](https://console.firebase.google.com/project/mem-game-a94ab/hosting) for release history and rollback.
- After deploy, hard-refresh the live URL to bypass CDN cache.

## Documentation for contributors

| Doc | Use when |
|-----|----------|
| [`PROJECT_CONTEXT.md`](PROJECT_CONTEXT.md) | Understanding goals, audience, and out-of-scope work |
| [`TECH_STACK.md`](TECH_STACK.md) | Choosing libraries, patterns, and restrictions |
| [`AGENTS.md`](AGENTS.md) | Working with AI agents / skills in this repo |
| [`TODO`](TODO) | Informal backlog |

## Troubleshooting

| Issue | What to try |
|-------|-------------|
| Blank app / Firebase errors | Check `.env` keys and that `VITE_*` names match `src/firebase/firbase.js` |
| `firebase: command not found` | Install Firebase CLI globally |
| Deploy serves old assets | Run `npm run build` before deploy; clear browser cache |
| Port in use (dev) | `npm run dev -- --port 5174` |

## License

Private project (`"private": true` in `package.json`). Add a license file here if you open-source the repo.
