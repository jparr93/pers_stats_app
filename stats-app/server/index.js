const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

// In-memory data storage (shared across routes)
const userScores = new Map(); // userId -> { skillId -> { score, drillScores, submittedAt } }
const scoreHistory = new Map(); // userId -> [{ skillId, score, submittedAt }, ...]

const authRoutes = require('./routes/auth');
const skillsRoutes = require('./routes/skills');
const scoreRoutes = require('./routes/scores');

const app = express();
// Azure assigns PORT automatically, fallback to 5000 for local development
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Share data structures with routes
app.locals.userScores = userScores;
app.locals.scoreHistory = scoreHistory;

// Request logging for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/scores', scoreRoutes);

// Health check for Azure load balancer
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', environment: process.env.NODE_ENV });
});

// Serve static files from React build
const clientBuildPath = path.join(__dirname, '../client/build');
app.use(express.static(clientBuildPath));

// Root endpoint
app.get('/', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// Fallback to React for any non-API routes (SPA routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

const server = app.listen(PORT, () => {
  console.log(`FUT Stats App server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Serving static files from: ${clientBuildPath}`);
});

// Graceful shutdown for Azure
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
