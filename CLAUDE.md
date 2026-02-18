# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

MyUsers — a user management application built for the **ServiceNow** platform, delivered as Service Portal (SP) widgets backed by catalog items.

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

## Architecture

```
src/
├── widgets/
│   ├── myusers-app/                  # Main app wrapper — tab navigation
│   │   ├── myusers-app.html          #   HTML template (tabs + sp-widget embeds)
│   │   ├── myusers-app.client.js     #   Client controller (tab state)
│   │   ├── myusers-app.server.js     #   Server script (loads child widgets)
│   │   └── myusers-app.css           #   Scoped styles
│   ├── create-user/                  # Create User form widget
│   │   ├── create-user.html          #   HTML template (full create form)
│   │   ├── create-user.client.js     #   Client controller (validation, reference fields)
│   │   ├── create-user.server.js     #   Server script (constants, create action)
│   │   └── create-user.css           #   Scoped styles
│   └── manage-user/                  # Manage User widget
│       ├── manage-user.html          #   HTML template (search, edit, deactivate)
│       ├── manage-user.client.js     #   Client controller (search, select, save)
│       ├── manage-user.server.js     #   Server script (load users, update action)
│       └── manage-user.css           #   Scoped styles
├── script-includes/
│   └── MyUsersUtil.js                # Script Include — reusable GlideRecord CRUD, constants
└── catalog-items/
    ├── create-user-request.js        # Catalog item definition + client scripts + workflow script
    └── manage-user-request.js        # Catalog item definition + client scripts + workflow script
```

**Data layer pattern**: All data access goes through `MyUsersUtil` Script Include which uses GlideRecord against the `u_myusers` custom table. Widget server scripts instantiate `MyUsersUtil` and call its methods. Catalog item workflows use the same Script Include for provisioning.

## Deployment

These files are source-controlled here and deployed to ServiceNow by copying each piece into the corresponding ServiceNow record:

| File type           | ServiceNow location                                        |
|---------------------|-------------------------------------------------------------|
| `*.html`            | Service Portal > Widgets > Body HTML template               |
| `*.client.js`       | Service Portal > Widgets > Client controller                |
| `*.server.js`       | Service Portal > Widgets > Server script                    |
| `*.css`             | Service Portal > Widgets > CSS                              |
| Script Include      | System Definition > Script Includes                         |
| Catalog items       | Service Catalog > Catalog Definitions > Maintain Items      |

## Repository

- Remote: https://github.com/maghov/MyUsers.git
- Main branch: `main`

## Workflow

- Always commit and push directly to `main`.
- Include a version number with each new version.
