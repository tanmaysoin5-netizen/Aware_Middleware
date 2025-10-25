// server.js
const express = require('express');
const { Readable } = require('stream');
const abortAware = require('./middleware/abortAware');

const app = express();
const PORT = 3000;

// Middleware to handle abort signals
app.use(abortAware);

// NDJSON streaming endpoint
app.get('/stream', async (req, res) => {
  res.setHeader('Content-Type', 'application/x-ndjson');

  // Create a readable stream that sends data gradually
  const stream = new Readable({
    async read() {
      for (let i = 0; i < 10; i++) {
        if (req.clientAborted) {
          console.log('🛑 Client aborted streaming');
          this.push(null); // end stream
          return;
        }

        const obj = { id: i, message: 'Streaming data...', time: new Date().toISOString() };
        this.push(JSON.stringify(obj) + '\n');

        await new Promise(r => setTimeout(r, 500)); // delay to simulate streaming
      }
      this.push(null);
    }
  });

  stream.pipe(res);
});

// Root route to show info
app.get('/', (req, res) => {
  res.send(`
    <h2>✅ Task 1: Streaming + Abort Middleware</h2>
    <p>Use these endpoints:</p>
    <ul>
      <li><a href="/stream">/stream</a> – NDJSON streaming</li>
    </ul>
    <p>Best viewed with <code>curl http://localhost:${PORT}/stream</code></p>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
