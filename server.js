const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS so your frontend can call this API safely
const cors = require('cors');
app.use(cors());

// Your array of custom random jokes
const jokes = [
  "Why do programmers wear glasses? Because they can't C#.",
  "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
  "There are 10 types of people in the world: those who understand binary, and those who don't.",
  "Why did the database administrator leave his wife? She had one-to-many relationships.",
  "A SQL query walks into a bar, walks up to two tables and asks, 'Can I join you?'"
];

// Define your API endpoint
app.get('/joke', (req, res) => {
  const randomIndex = Math.floor(Math.random() * jokes.length);
  res.json({ 
    success: true,
    joke: jokes[randomIndex] 
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
