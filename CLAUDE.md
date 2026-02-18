# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

MyUsers — a user management application designed for the **ServiceNow** platform. The goal is to deliver this as a ServiceNow Service Portal (SP) experience backed by catalog items. The current React + TypeScript implementation serves as a prototype/reference; the production target is ServiceNow.

## ServiceNow Target Platform

### Stack

- **JavaScript** (client-side and server-side scripts)
- **HTML** (Service Portal widget templates)
- **CSS / SCSS** (widget styling, portal theme overrides)

### ServiceNow Components

- **Catalog Items** — User creation and user management requests are submitted as catalog items in the ServiceNow Service Catalog. Each form (Create User, Manage User) maps to a catalog item with appropriate variables and workflows.
- **Service Portal (SP)** — The UI is delivered through ServiceNow Service Portal widgets. Each major view (Create User, Manage User) is implemented as an SP widget with its own HTML template, client script, server script, and CSS.
- **Widgets** — SP widgets encapsulate the UI, client-side logic, and server-side GlideRecord calls. Widgets communicate via `$broadcast`/`$on` or the `spUtil` service as needed.
- **GlideRecord / GlideAjax** — Server-side data access uses GlideRecord for CRUD operations on user records. Client-to-server calls use GlideAjax or the widget server script (`data` object).
- **Flow Designer / Workflows** — Catalog item submissions trigger flows or workflows for approvals and provisioning.

### Conventions

- Follow ServiceNow best practices: use script includes for reusable server logic, avoid direct DOM manipulation in portal widgets, and prefer Angular (AngularJS 1.x as used by SP) patterns in client scripts.
- Catalog variable names should be descriptive and use snake_case (e.g., `user_first_name`, `job_role`, `employment_type`).
- Keep widget CSS scoped to avoid portal-wide style leakage.

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
