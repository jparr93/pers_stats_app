# FUT Stats App - FIFA Ultimate Team Inspired Card Generator

A web application that generates FIFA Ultimate Team inspired player cards based on skill drills and scoring.

## Features

- **User Authentication**: Login system with hardcoded credentials
- **6 Skills**: Shooting, Passing, Dribbling, Strength, Defending, Speed
- **5 Drills per Skill**: Each skill has 5 training drills with video placeholders
- **Score Submission**: Input scores for each drill
- **Average Calculation**: Automatic calculation of skill ratings
- **Player Card Generation**: FIFA-style player card showing all skills and overall rating
- **Smart Position Detection**: Automatically assigns position based on skill distribution

## Quick Start

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Run Production Server
```bash
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with credentials
- `POST /api/auth/logout` - Logout session
- `GET /api/auth/verify` - Verify token

### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills/:skillId` - Get skill with drills

### Scores
- `POST /api/scores/submit` - Submit drill scores
- `GET /api/scores/user/:userId` - Get user's scores
- `POST /api/scores/generate-card` - Generate player card
- `GET /api/scores/card/:userId` - Get generated card

## Default Credentials

- Username: `admin`
- Password: `password123`

## Project Structure

```
stats-app/
├── server/
│   ├── routes/
│   │   ├── auth.js
│   │   ├── skills.js
│   │   └── scores.js
│   ├── utils/
│   │   └── cardGenerator.js
│   └── index.js
├── package.json
├── .env
└── README.md
```

## Next Steps

- Add React frontend for UI
- Implement video hosting for drills
- Add database for persistent storage
- Deploy to Azure
