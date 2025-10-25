// middleware/abortAware.js
// Middleware that tracks if client disconnects
module.exports = function abortAware(req, res, next) {
    req.clientAborted = false;
  
    // If client disconnects
    req.on('close', () => {
      console.log('❌ Client disconnected');
      req.clientAborted = true;
    });
  
    next();
  };
  