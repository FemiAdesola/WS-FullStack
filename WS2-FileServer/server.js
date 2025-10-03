// server.js
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Log every request for debugging
    console.log(`Request received for: ${req.url}`);

    // ROUTING LOGIC
    if (req.url === '/') {
        serveFile(path.join(__dirname, 'html', 'index.html'), 'text/html', res);
    } else if (req.url === '/about') {
        serveFile(path.join(__dirname, 'html', 'about.html'), 'text/html', res);
    } else if (req.url === '/api/users') {
        serveFile(path.join(__dirname, 'json', 'users.json'), 'application/json', res);
    } else if (req.url.startsWith('/css/')) {
        // serve CSS
        serveFile(path.join(__dirname, req.url), 'text/css', res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Oops, page not found!</h1><a href="/">Go Home</a>');
    }
});

// Helper function to keep our code clean (Don't Repeat Yourself!)
function serveFile(filePath, contentType, res) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            // If the file is not found or there's an error
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 - Server Error');
            console.error(`Error reading ${filePath}:`, err);
            return;
        }
        // If successful, send the file contents
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
}

const PORT = 8081;
server.listen(PORT, () => {
    console.log(`✅ Server is live! Navigate to http://localhost:${PORT}`);
});
