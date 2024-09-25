const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// API routes
app.get('/api/some-endpoint', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

// Catch-all handler to serve the React app for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
