````markdown
# Snapple Facts REST API

A simple RESTful API built with Node.js and Express.js for posting and retrieving fun Snapple facts.

---

## Features

- Retrieve all Snapple facts
- Get a single Snapple fact by ID
- Add a new Snapple fact
- Delete a Snapple fact by ID
- (Optional) Update an existing fact

---

## Tech Stack

- Node.js
- Express.js
- JSON file for mock data (no database required)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/snapple-facts-api.git
cd snapple-facts-api
```
````

### 2. Install dependencies

```bash
npm install
```

### 3. Start the server

```bash
node server.js
```

> Server will run at `http://localhost:3000`

---

## API Endpoints

Base URL: `http://localhost:3000/api/facts`

| Method | Endpoint | Description                 |
| ------ | -------- | --------------------------- |
| GET    | `/`      | Get all Snapple facts       |
| GET    | `/:id`   | Get a fact by ID            |
| POST   | `/`      | Add a new Snapple fact      |
| DELETE | `/:id`   | Delete a Snapple fact by ID |

### Example `POST /api/facts`

```json
{
  "text": "Snapple Real Fact: Slugs have four noses."
}
```

---

## 📁 Project Structure

```
snapple-facts-api/
├── controllers/
│   └── factsController.js
├── data/
│   └── facts.json
├── routes/
│   └── facts.js
├── server.js
└── README.md
```

---

## Notes

- This API uses an in-memory array with mock data from `facts.json`.
- Changes will not persist after restarting the server unless you implement file writing or a database.

---

## Future Enhancements

- Add support for updating facts (`PUT`)
- Save changes to a file or connect to a real database (e.g. MongoDB)
- Add pagination and search filters
- Deploy to Render, Railway, or Vercel

---
