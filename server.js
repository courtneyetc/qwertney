const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Set up static file serving for the HTML file
app.use(express.static(path.join(__dirname)));

// Read or initialize the counter value
const counterFile = path.join(__dirname, 'counter.txt');

// Function to get the count from file
function getCount() {
    if (fs.existsSync(counterFile)) {
        const count = fs.readFileSync(counterFile, 'utf-8');
        return parseInt(count, 10) || 0;
    } else {
        fs.writeFileSync(counterFile, '0');
        return 0;
    }
}

// Function to increment and save the count
function incrementCount() {
    let count = getCount();
    count += 1;
    fs.writeFileSync(counterFile, count.toString());
    return count;
}

// Endpoint to get the current count
app.get('/count', (req, res) => {
    const count = incrementCount();
    res.json({ count });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
