const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    return res.end("Hello from first homepage");
  }
  if (req.url === "/front") {
    const html = fs.readFileSync("./frontpage.html");
    res.writeHead(200, { "Content-Type": "text/html" });
    return res.end(html);
  }
  if (req.url === "/contact") {
    const html = fs.readFileSync("./contact.html");
    res.writeHead(200, { "Content-Type": "text/html" });
    return res.end(html);
  }
  if (req.url === "/sample.json") {
    const sample = { name: "Alex Example", role: "Student" };
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(sample));
  }
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not found");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("Server on http://localhost:" + PORT));