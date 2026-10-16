# Monthly Expense Tracker

A beginner-friendly full-stack project using React, basic CSS, Express, Node.js, and MongoDB.

## Features
- Add expenses with name, amount, category, and date
- View expenses for a selected month
- Calculate the monthly total
- Delete an expense
- Store records in MongoDB

## Requirements
- Node.js and npm
- MongoDB Community Server running locally
- MongoDB Compass (to view the database)

## 1. Set up the backend

Open a terminal in `assignment8c/server`:

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

The default database URL is `mongodb://127.0.0.1:27017/monthly_expenses`.
Make sure the local MongoDB server is running before starting the backend.

## 2. Set up the frontend

Open a second terminal in `assignment8c/client`:

```powershell
npm install
npm run dev
```

Open the local URL Vite prints in the terminal, usually `http://localhost:5173`.

## 3. View saved records in MongoDB Compass

Connect Compass to:

`mongodb://127.0.0.1:27017`

After saving the first expense, open the `monthly_expenses` database and its `expenses` collection. MongoDB creates them when the first record is saved.

## Git note

Commit the source files and package files. Do not commit `node_modules` or the real `.env` file.
