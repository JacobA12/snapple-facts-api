# Snapple Facts REST API

A simple RESTful API built with Node.js and Express.js for posting and retrieving Snapple-style facts.  
Inspired by the format found at [Snapple Real Facts](https://www.snapple.com/real-facts), this project is built with real data persistence using MongoDB.

---

## Features

- Retrieve all Snapple facts
- Retrieve a single fact by Snapple fact number (used as ID)
- Add a new Snapple fact
- Delete a Snapple fact by ID
- Auto-collect facts from snapple.com using a custom Tampermonkey script

---

## Tampermonkey Fact Scraper (Created by Me)

To speed up data collection, this project includes a Tampermonkey userscript that:

- Automatically clicks the “Random Fact” button on Snapple’s website
- Extracts the fact number and text
- Sends the data to your running Snapple API in real time
- Skips duplicates and stops after a set number of facts (default: 50)

### Setup

1. Install the [Tampermonkey extension](https://www.tampermonkey.net/) in your browser.
2. Make sure your API is running at `http://localhost:3000/api/facts`
3. Open [Snapple Real Facts](https://www.snapple.com/real-facts/random) and let the automation begin!

---

## Tech Stack

- Node.js
- Express.js
- MongoDB (using Mongoose)
- Dotenv for environment configuration

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/snapple-facts-api.git
cd snapple-facts-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory with the following:

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/snappleDB?retryWrites=true&w=majority
PORT=3000
```

Make sure `.env` is listed in your `.gitignore` file.

### 4. Start the server

```bash
node server.js
```

The API will be available at:  
`http://localhost:3000/api/facts`

---

## API Endpoints

| Method | Endpoint         | Description                   |
| ------ | ---------------- | ----------------------------- |
| GET    | `/api/facts`     | Retrieve all Snapple facts    |
| GET    | `/api/facts/:id` | Retrieve a fact by Snapple ID |
| POST   | `/api/facts`     | Add a new Snapple fact        |
| DELETE | `/api/facts/:id` | Delete a Snapple fact by ID   |

### Example `POST` Request Body

```json
{
  "id": "1337",
  "text": "Antarctica is the largest desert in the world."
}
```

---

## Project Structure

```
snapple-facts-api/
├── controllers/         # API route logic
│   └── factsController.js
├── models/              # Mongoose schema for Snapple facts
│   └── Fact.js
├── routes/              # API endpoints
│   └── facts.js
├── scripts/              # Script to autocollect Snapple Facts
│   └── snappleFactAutoCollector.js
├── server.js            # Entry point and server setup
├── .env                 # Environment variables
└── README.md
```