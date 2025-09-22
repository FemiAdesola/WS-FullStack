'use strict';

const http = require('http');

const server = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    const url = request.url;

    if (url === '/homepage') {
        response.end(`
            <h1>Welcome to the Homepage</h1>
            <p>This is the main page of our simple Node.js web server.</p>
            <ul>
            <li><a href="/helloworld">Hello World</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            </ul>
            <p>Exploring different routes</p>
        `);
    } else if (url === '/helloworld') {
        response.end('<h1>Hello world in HTML</h1>');

    } else if(url === "/about") {
        response.end(`
            <h1>About Page</h1>
            <p>Here is a list of people and their addresses:</p>
            <table border="1" style="border-collapse: collapse; width: 100%;">
            <tr>
                <th>Name</th>
                <th>Address</th>
                <th>City</th>
            </tr>
            <tr>
                <td>Matti Meikäläinen</td>
                <td>Timotie 1, as 10</td>
                <td>Tampere</td>
            </tr>
            <tr>
                <td>Maija Virtanen</td>
                <td>Asematie 12</td>
                <td>Kiljava</td>
            </tr>
            </table>
        `);

    } else if(url === "/contact") {
        response.end(`
            <h1>Contact Page</h1>
            <p>Contact us at <a href="http://laurea.fi" target="_blank">Laurea</a></p>
            <p>Email: <a href="mailto:info@laurea.fi">info@laurea.fi</a></p>
        `);

    } else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('404 - Page Not Found');
    }
});

server.listen(8081, () => {
  console.log('Server with routes is running at http://127.0.0.1:8081/');
});