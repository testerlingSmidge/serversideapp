const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json()); // To parse JSON bodies

// Simulate a global variable to store targetId value
let targetIdValue = 1;

// Endpoint to serve modified HTML
app.get('/api/trigger', (req, res) => {
    console.log("Received request to /api/trigger");
    const filePath = path.join(__dirname, '../public/index.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            res.status(500).send('Server Error');
            return;
        }
        
        try {
            // Modify the HTML content with the current targetIdValue
            let modifiedHtml = data.replace('<div id="targetId">1</div>', `<div id="targetId">${targetIdValue}</div>`);
            console.log("Sending modified HTML content");
            res.send(modifiedHtml);
        } catch (error) {
            console.error("Error processing request:", error);
            res.status(500).send('Server Error');
        }
    });
});

// Endpoint to update targetId value
app.post('/api/update', (req, res) => {
    const { value } = req.body;
    if (typeof value === 'number') {
        targetIdValue = value;
        res.status(200).json({ status: 'success', targetIdValue });
        
        // Reset the targetId value after a brief period
        setTimeout(() => {
            targetIdValue = 1;
            console.log("Reset targetId value to 1");
        }, 10); // 10 milliseconds delay
    } else {
        res.status(400).json({ status: 'error', message: 'Invalid value' });
    }
});

// Endpoint to get the current targetId value
app.get('/api/status', (req, res) => {
    res.status(200).json({ targetIdValue });
});

// Export the app as a Vercel handler
module.exports = app;
