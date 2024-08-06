const path = require('path');
const fs = require('fs');

module.exports = (req, res) => {
    console.log("Received request to /api/trigger");
    const filePath = path.join(__dirname, '../public/index.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            res.status(500).send('Server Error');
            return;
        }
        
        try {
            // Modify the HTML content
            let modifiedHtml = data.replace('<div id="targetId">1</div>', '<div id="targetId">500000</div>');
            console.log("Sending modified HTML content");
            // Send the modified HTML content
            res.send(modifiedHtml);
        } catch (error) {
            console.error("Error processing request:", error);
            res.status(500).send('Server Error');
        }
    });
};
