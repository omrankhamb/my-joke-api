const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const cors = require('cors');
app.use(cors());

const jokes = [
  "Why do programmers wear glasses? Because they can't C#.",
  "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
  "There are 10 types of people in the world: those who understand binary, and those who don't.",
  "Why did the database administrator leave his wife? She had one-to-many relationships.",
  "A SQL query walks into a bar, walks up to two tables and asks, 'Can I join you?'"
];

// 1. NEW FRONTEND HOME PAGE ROUTE
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Developer Joke Generator</title>
        <style>
            body { font-family: 'Segoe UI', sans-serif; background-color: #121212; color: white; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
            .card { background: #1e1e1e; padding: 30px; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.5); text-align: center; max-width: 400px; width: 90%; border: 1px solid #333; }
            h1 { color: #007acc; font-size: 24px; margin-bottom: 20px; }
            p { font-size: 18px; min-height: 80px; line-height: 1.5; color: #e0e0e0; }
            button { background-color: #007acc; color: white; border: none; padding: 12px 24px; font-size: 16px; border-radius: 6px; cursor: pointer; transition: 0.2s; font-weight: bold; }
            button:hover { background-color: #005999; }
        </style>
    </head>
    <body>
        <div class="card">
            <h1>💻 Hackathon Joke App</h1>
            <p id="joke-text">Click the button below to fetch a joke live from your custom API server!</p>
            <button onclick="getJoke()">Tell Me A Joke</button>
        </div>

        <script>
            function getJoke() {
                const btn = document.querySelector('button');
                btn.innerText = 'Loading...';
                
                // Fetches data from your live /joke API endpoint
                fetch('/joke')
                    .then(res => res.json())
                    .then(data => {
                        document.getElementById('joke-text').innerText = data.joke;
                        btn.innerText = 'Tell Me Another';
                    })
                    .catch(() => {
                        document.getElementById('joke-text').innerText = 'Failed to load joke.';
                        btn.innerText = 'Try Again';
                    });
            }
        </script>
    </body>
    </html>
  `);
});

// 2. YOUR ORIGINAL API ROUTE (Kept completely intact)
app.get('/joke', (req, res) => {
  const randomIndex = Math.floor(Math.random() * jokes.length);
  res.json({ 
    success: true,
    joke: jokes[randomIndex] 
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
