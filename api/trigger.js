const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); // Import UUID library

const app = express();
app.use(express.json()); // To parse JSON bodies

// Simulate a global variable to store targetId value and unique ID
let targetIdValue = 1;
let uniqueId = null;

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
            // Modify the HTML content with the current targetIdValue and uniqueId
            let modifiedHtml = data.replace('<div id="targetId">1</div>', `<div id="targetId">${targetIdValue}</div>`);
            modifiedHtml = modifiedHtml.replace('<div id="uniqueId"></div>', `<div id="uniqueId">${uniqueId}</div>`);
            console.log("Sending modified HTML content");
            res.send(modifiedHtml);
        } catch (error) {
            console.error("Error processing request:", error);
            res.status(500).send('Server Error');
        }
    });
});

// Endpoint to update targetId value and generate a unique ID
app.post('/api/update', (req, res) => {
    console.log("Received request to /api/update with body:", req.body);
    const { value } = req.body;
    if (typeof value === 'number') {
        targetIdValue = value;
        uniqueId = uuidv4(); // Generate a new unique ID
        console.log(`Updated targetId to ${targetIdValue} with uniqueId ${uniqueId}`);
        res.status(200).json({ status: 'success', targetIdValue, uniqueId });
        
        // Reset the targetId value and unique ID after a brief period
        setTimeout(() => {
            targetIdValue = 1;
            uniqueId = null;
            console.log("Reset targetId value to 1 and uniqueId to null");
        }, 5000); // 5 seconds delay for testing
    } else {
        console.error("Invalid value received:", value);
        res.status(400).json({ status: 'error', message: 'Invalid value' });
    }
});

// Endpoint to get the current targetId value and unique ID
app.get('/api/status', (req, res) => {
    try {
        res.status(200).json({ targetIdValue, uniqueId });
    } catch (error) {
        console.error("Error processing /api/status request:", error);
        res.status(500).send('Server Error');
    }
});

// Export the app as a Vercel handler
module.exports = app;
