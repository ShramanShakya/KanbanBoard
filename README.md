# Board — Kanban &amp; Dashboard

A two-page React app for tracking tasks on a drag-and-drop Kanban board and reviewing team progress on a summary dashboard. Built as a static, front-end-only application — no server, no database, just the browser's Local Storage.

**Live demo:** `https://<username>.github.io/<repo-name>/`
**Repository:** `https://github.com/<username>/<repo-name>`

## Team

- Member Name 1
- Member Name 2
- Member Name 3

## Features

### Kanban Board
- Three columns — **To Do**, **Doing**, **Done**
- Create, edit, and delete tasks
- Move tasks between columns by dragging a card, or using the status dropdown on the card
- Each task has a title, description, category, start date, due date, complete date, responsible person, and status
- Assign a responsible person from the provided roster
- Assign an existing category, or add a brand new one on the fly — new categories are immediately available for future tasks
- Overdue tasks (past due date, not yet Done) are flagged on their card
- Completing a task (moving it to Done) automatically stamps today's date as the complete date; it can still be edited manually

### Dashboard
- Summary cards: total tasks, To Do, Doing, Done, and overdue counts
- **Tasks by status** — doughnut chart
- **Tasks by category** — bar chart
- **Completion performance** — bar chart comparing tasks finished **Early**, **On Time**, or **Late** against their due date

### Data persistence
All tasks and categories are saved to the browser's `localStorage` on every change and reloaded automatically when the page refreshes. Nothing is sent to a server.

## Screenshots

> Replace these placeholders with real screenshots after running the app locally (`npm run dev`).

| Kanban Board | Dashboard |
| --- | --- |
| `docs/screenshot-board.png` | `docs/screenshot-dashboard.png` |

## Tech stack

- [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/) (`HashRouter`, for clean GitHub Pages routing)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/) for the dashboard charts
- Browser `localStorage` for persistence — no backend

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`) in your browser.

### Build for production

```bash
npm run build
npm run preview   # optional: preview the production build locally
```

### Deploy to GitHub Pages

This repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds and publishes the `dist/` folder to GitHub Pages automatically on every push to `main`.

To enable it:
1. Push this repository to GitHub.
2. In the repo, go to **Settings → Pages** and set the source to **GitHub Actions**.
3. Push to `main` — the workflow builds the app and publishes it. The live URL will appear on the **Actions** tab and under **Settings → Pages**.

Alternatively, you can deploy manually with the included `gh-pages` script:

```bash
npm run deploy
```

## Usage guide

1. **Add a task** — click **+ New task** on the board (or the button on the To Do column) and fill in the form.
2. **Add a category** — inside the task form, click **+ New** next to the category dropdown, type a name, and click **Add**. It's saved and available for every future task.
3. **Move a task** — drag a card into another column, or change its **Status** dropdown on the card itself.
4. **Edit or delete a task** — hover a card and use the **Edit** / **Delete** buttons.
5. **Track progress** — open the **Dashboard** tab to see summary counts and charts update live as tasks change.

## Project structure

```
src/
  components/   # TaskCard, Column, TaskModal, Navbar, StatCard
  context/      # AppContext — tasks/categories state + localStorage sync
  data/         # people.js — responsible-person roster
  hooks/        # useLocalStorage
  pages/        # KanbanBoard, Dashboard
  utils/        # date/status helper functions
```

## Notes

- The responsible-person roster in `src/data/people.js` is placeholder sample data, per the assignment brief ("responsible person data will be provided"). Replace it with the real roster if one is supplied.
- This is a static, client-only app — all data lives in the current browser only. Clearing browser storage or switching browsers/devices will reset it.
