// server.js
const express = require('express');
const { Readable } = require('stream');
const abortAware = require('./middleware/abortAware');
const negotiate = require('./middleware/negotiate');

const app = express();
const PORT = 4000;

// Apply negotiate middleware globally
app.use(negotiate);

// ----------------------
// Task 1: NDJSON Stream
// ----------------------
app.get('/stream', abortAware, async (req, res) => {
  res.setHeader('Content-Type', 'application/x-ndjson');

  const stream = new Readable({
    async read() {
      for (let i = 0; i < 10; i++) {
        if (req.clientAborted) {
          console.log('🛑 Client aborted streaming');
          this.push(null);
          return;
        }
        const obj = { id: i, message: 'Streaming data...', time: new Date().toISOString() };
        this.push(JSON.stringify(obj) + '\n');
        await new Promise((r) => setTimeout(r, 500));
      }
      this.push(null);
    },
  });

  stream.pipe(res);
});

// ----------------------
// Task 2: Negotiation
// ----------------------
app.get('/data', (req, res) => {
  const data = {
    message: 'Hello from content negotiation middleware!',
    author: 'Tanmay',
    timestamp: new Date().toISOString(),
  };
  res.formatResponse(data);
});

// ----------------------
// Root page
// ----------------------
app.get('/', (req, res) => {
  res.send(`
    <h2>✅ Middleware Tasks</h2>
    <ul>
      <li><a href="/stream">Task 1 – NDJSON Stream</a></li>
      <li><a href="/data">Task 2 – JSON/XML Negotiation</a></li>
    </ul>
    <p>Test XML with curl:</p>
    <pre><code>curl -H "Accept: application/xml" http://localhost:${PORT}/data</code></pre>
  `);
});

// ----------------------
// Start server
// ----------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
