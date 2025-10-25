# Aware_Middleware
PRACTICAL 13

# Task 1: Streaming & Backpressure + Client Abort-Aware Middleware

##  Goal
Create a streaming NDJSON endpoint that stops work when the client disconnects.

## Features
- Express-based server
- Streams NDJSON data line by line
- Middleware detects client disconnect (abort)
- Backpressure handled using Node.js streams

## Run
```bash
node server.js
```
## Test
Browser: http://localhost:3000
Terminal: curl http://localhost:3000/stream

