const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');

const app = express();

// Middleware
app.use(helmet());
app.use(express.static('public'));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Disable 'X-Powered-By' header
app.disable('x-powered-by');

// Endpoint to serve modified HTML
app.get('/trigger', (req, res) => {
    const filePath = path.join(__dirname, '../public/index.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server Error');
            return;
        }
        
        // Modify the HTML content
        let modifiedHtml = data.replace('<div id="targetId">1</div>', '<div id="targetId">500000</div>');

        // Send the modified HTML content
        res.send(modifiedHtml);
    });
});

module.exports = app;
