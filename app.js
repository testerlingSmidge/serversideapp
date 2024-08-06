const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

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

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
