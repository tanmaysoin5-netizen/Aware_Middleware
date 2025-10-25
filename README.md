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


## Task 2: Content Negotiation Middleware (JSON vs XML)

###  Goal
Create a reusable Express middleware that returns JSON or XML depending on the `Accept` header.

### Features
- Global `negotiate` middleware
- Supports `application/json` and `application/xml`
- Automatically sets `Content-Type`
- Works with arrays and objects

###  Run
```bash
node server.js
```
## test 
http://localhost:3000/data

## XML 
curl -H "Accept: application/xml" http://localhost:3000/data
