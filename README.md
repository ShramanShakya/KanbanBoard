# Board — Kanban &amp; Dashboard

A two-page React app for tracking tasks on a drag-and-drop Kanban board and reviewing team progress on a summary dashboard. Built as a static, front-end-only application — no server, no database, just the browser's Local Storage.

**Live demo:** `https://<username>.github.io/<repo-name>/`
**Repository:** `https://github.com/<username>/<repo-name>`

## Team

- Shraman Shakya 6712145
- Wai Yan Min    6712070
- Oak Saw Thaw   6726138

## Features

## Kanban Board
- Three columns — **To Do**, **Doing**, **Done**
- Create, edit, and delete tasks
- Move tasks between columns by dragging a card, or using the status dropdown on the card
- Each task has a title, description, category, start date, due date, complete date, responsible person, and status
- Assign a responsible person from the provided roster
- Assign an existing category, or add a brand new one on the fly — new categories are immediately available for future tasks
- Overdue tasks (past due date, not yet Done) are flagged on their card
- Completing a task (moving it to Done) automatically stamps today's date as the complete date; it can still be edited manually

## Dashboard
- Summary cards: total tasks, To Do, Doing, Done, and overdue counts
- **Tasks by status** — doughnut chart
- **Tasks by category** — bar chart

## Screenshots

