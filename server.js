/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint (add this)
app.get('/health', (req, res) => {
  // Helper function to humanize uptime in seconds
  function humanizeUptime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return [
      h > 0 ? `${h}h` : null,
      m > 0 ? `${m}m` : null,
      `${s}s`
    ].filter(Boolean).join(' ');
  }

  res.status(200).json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    version: process.env.APP_VERSION || '1.0.0',
    uptime: humanizeUptime(process.uptime())
  });
});

// Your other routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello World 1!' });
});

// Add more routes here
app.get('/api/status', (req, res) => {
  res.json({ status: 'running', version: '1.0.0' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});