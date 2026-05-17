# RuReso

**Version:** `0.1.0-beta.1`

RuReso is a desktop music training app built with **Tauri**, **React**, **TypeScript**, and **Vite**.
The current beta focuses on **Fret Ninja**, a guitar fretboard note-recognition mode that listens through your microphone and challenges you to play the requested note before time runs out.

## Current Features

- Desktop app powered by Tauri
- React-based interface with module selection
- **Fret Ninja** training mode
- Real-time microphone input
- Pitch detection with `pitchfinder`
- Score tracking during timed sessions

## Planned Modules

The following modules are planned for future development.
Some may be implemented as described, changed significantly, or removed entirely depending on design and feasibility during development.

- Chords
- Ear Training
- Library
- Stats

## Tech Stack

- Tauri 2
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Rust

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js ([https://nodejs.org/](https://nodejs.org/))
- Rust ([https://www.rust-lang.org/tools/install](https://www.rust-lang.org/tools/install))
- pnpm ([https://pnpm.io/installation](https://pnpm.io/installation))
- Tauri system dependencies for your operating system

For Tauri prerequisites, see the official guide: [https://tauri.app/start/prerequisites/](https://tauri.app/start/prerequisites/)

---

### Install dependencies

```bash
pnpm install
```

---

### Run in development

```bash
pnpm tauri dev
```

---

### Build the frontend

```bash
pnpm build
```

---

### Build the desktop app

```bash
pnpm tauri build
```

## Gameplay Notes

- RuReso currently centers on guitar practice
- Fret Ninja runs a timed note-matching session
- Microphone access is required for pitch detection
- This is an early beta version — features may be experimental, incomplete, or subject to change

## Project Structure

```
src/
├── components/
├── hooks/
├── layouts/
├── lib/
├── modules/
│   └── fretninja/
├── pages/
└── providers/

src-tauri/
├── Cargo.toml
└── tauri.conf.json
```

## Status

RuReso is in early beta and under active development.

Some planned or visible features may not be fully implemented yet, and may:

- be completed in future releases
- be redesigned significantly
- or removed if they don’t fit the final direction of the app

Interfaces, features, and module structure are subject to change as the project
