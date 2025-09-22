# Node.js Simple Web Server with Routes

This workshop demonstrates a **simple Node.js web server** that responds with different content depending on the URL (route). It uses the built-in `http` module and serves HTML content such as tables, links, and headings.

---

## 📁 Project Structure

```
Root/
│
├──  WS0/
│    ├── helloworld.js      # Simple Node.js script for console output "Hello World"
│    ├── helloroutes.js     # Node.js server with multiple routes (homepage, about, contact, helloworld)
│    └── server.js          # Node.js server with single route 
└── README.md        # Project documentation
```

---

## 🚀 Getting Started

1. **Clone the repository** or download the folder.

```bash
git clone https://github.com/YOUR_USERNAME/R0314-MEAN.git
cd WS0
```

2. **Run the server** using Node.js:

```bash
node helloroutes.js
    or 
node hellworld.js
    or 
node server.js
```

3. **Open a browser** and visit the following URLs:

* [http://localhost:8081/helloworld](http://localhost:8081/helloworld)
  Shows **Hello world in HTML**

* [http://localhost:8081/homepage](http://localhost:8081/homepage)
  Displays the **Homepage** with links to other routes

* [http://localhost:8081/about](http://localhost:8081/about)
  Shows an **HTML table** with sample names and addresses

* [http://localhost:8081/contact](http://localhost:8081/contact)
  Displays **Contact information** with links

* Any other URL → **404 - Page Not Found**

---

## 💡 Features

* Serves **different HTML content** based on URL routes.
* Includes a **table** and **links** for navigation.
* Handles **404 errors** for unknown routes.
* Simple **Node.js HTTP server** with no external dependencies.

---

## 📝 Example Routes in server.js

```javascript
if (url === '/homepage') { ... }         // Homepage
else if (url === '/helloworld') { ... }  // Hello World
else if (url === '/about') { ... }       // About page with table
else if (url === '/contact') { ... }     // Contact page
else { ... }                             // 404 page
```

---

## ⚡ How it Works

1. The server listens on **port 8081**.
2. Based on `request.url`, the server sends HTML content with `response.end()`.
3. Unknown routes return a **404 response**.

---

## 🛠 Requirements

* Node.js (v12+ recommended)

---

## 📌 Notes

* All routes are currently hardcoded in `server.js`.
* HTML is embedded directly in `response.end()` using template literals.

---
