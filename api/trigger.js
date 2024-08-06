const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Middleware
app.use(helmet());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Disable 'X-Powered-By' header
app.disable('x-powered-by');

// Endpoint
app.get('/trigger', (req, res) => {
    console.log("Sending Trigger");
    setTimeout(() => {
        res.json({ status: "triggered", value: 500000 });
        console.log("Resetting Trigger");
        setTimeout(() => {
            console.log("Reset to initial value");
        }, 2000);
    }, 2000);
});

module.exports = app;
