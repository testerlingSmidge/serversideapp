const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Middleware
app.use(express.static('public'));

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
