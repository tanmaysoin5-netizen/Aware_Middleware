// middleware/negotiate.js
// Middleware to handle JSON vs XML based on Accept header

const xmlbuilder = require('xmlbuilder');

module.exports = function negotiate(req, res, next) {
  /**
   * Attach a helper method to res that formats output
   */
  res.formatResponse = (data) => {
    const accept = req.headers['accept'] || 'application/json';

    // If Accept includes "application/xml"
    if (accept.includes('application/xml') || accept.includes('text/xml')) {
      const xmlRoot = xmlbuilder.create('response');

      if (Array.isArray(data)) {
        // Handle array
        data.forEach((item) => {
          const node = xmlRoot.ele('item');
          for (const [key, value] of Object.entries(item)) {
            node.ele(key, value);
          }
        });
      } else {
        // Handle object
        for (const [key, value] of Object.entries(data)) {
          xmlRoot.ele(key, value);
        }
      }

      res.setHeader('Content-Type', 'application/xml');
      res.send(xmlRoot.end({ pretty: true }));
    } else {
      // Default to JSON
      res.setHeader('Content-Type', 'application/json');
      res.json(data);
    }
  };

  next();
};
