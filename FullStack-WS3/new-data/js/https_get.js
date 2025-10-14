const https = require("https");

https.get("https://jsonplaceholder.typicode.com/todos/1", (res) => {
  let body = "";
  res.on("data", (chunk) => (body += chunk));
  res.on("end", () => {
    try { console.log(JSON.parse(body)); }
    catch (e) { console.error("JSON parse error:", e.message); }
  });
}).on("error", (err) => console.error("Request error:", err));