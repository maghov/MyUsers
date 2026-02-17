# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

MyUsers — a React + TypeScript manager application for creating and managing users. Currently uses dummy/test data; designed for future API integration.

## Commands

- `npm run dev` — start Vite dev server
- `npm run build` — type-check with `tsc -b` then build with Vite
- `npm run preview` — preview production build locally

## Architecture

```
src/
├── main.tsx                 # Entry point, renders App
├── App.tsx                  # Root component, tab navigation (Create / Manage)
├── types.ts                 # Shared interfaces (User, CreateUserPayload) and constants (JOB_ROLES, EMPLOYMENT_TYPES, COUNTRY_CODES)
├── data/
│   └── dummyData.ts         # Mock data service: getUsers(), createUser(), updateUser() — replace with real API calls
├── components/
│   ├── CreateUser.tsx       # Create User form with all fields and validation
│   └── ManageUser.tsx       # Search/select user, edit fields, deactivate toggle
└── styles/
    └── App.css              # All application styles
```

**Data layer pattern**: All data access goes through service functions in `dummyData.ts`. To integrate real APIs, replace those function implementations without changing components.

## Repository

- Remote: https://github.com/maghov/MyUsers.git
- Main branch: `main`

## Workflow

- Always commit and push directly to `main`.
- Include a version number with each new version.
