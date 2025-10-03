# Node.js Simple Web Server with Routes

> This workshop demonstrates a **simple Node.js web server** that responds with different content depending on the URL (route). It uses the built-in `http` module and serves HTML content such as tables, links, and headings.
<details>
<summary>👉Click to expand and see the details</summary>

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

* All routes are currently hardcoded in `helloroutes.js and server.js`.
* HTML is embedded directly in `response.end()` using template literals.

---
</details>



# WS2 File Server Project

> This workshop demonstrates basic **Node.js file system operations** and a simple **HTTP server** that serves HTML, CSS, and JSON files. 
<details>
<summary>👉Click to expand and see the details</summary>

## File Structure

```
WS2-FileServer/
├── css/
│   └── style.css
├── html/
│   ├── about.html
│   └── index.html
├── json/
│   └── users.json
├── example.txt
├── fileManager.js
├── programA.js   # Asynchronous file reading
├── programB.js   # Synchronous file reading
├── server.js     # HTTP server
└── README.md
```
## Features

### 1. File Operations (`fileManager.js`)
- **Write** to a log file (`fs.writeFile`).
- **Append** new entries (`fs.appendFile`).
- **Read** log file (`fs.readFile`).
- **Delete** log file (`fs.unlink`).

### 2. Asynchronous vs Synchronous I/O
- `programA.js` → Uses **async I/O** (non-blocking, server can do other tasks).
- `programB.js` → Uses **sync I/O** (blocking, waits until file read finishes).

### 3. HTTP Server (`server.js`)
- Serves:
  - `/` → `html/index.html`
  - `/about` → `html/about.html`
  - `/api/users` → `json/users.json`
  - `/css/style.css` → CSS styles
- Handles **404 Not Found** errors.

### 4. Frontend Files
- `index.html` → Home page (blue background).
- `about.html` → About page (light pink background).
- `style.css` → Shared stylesheet with **page-specific backgrounds**.

```css
body {
  font-family: sans-serif;
}

body.home {
  background-color: #f0f8ff; /* light blue */
}

body.about {
  background-color: #fff0f5; /* light pink */
}
```

---

## ▶️ Running the task

1. Run the HTTP server:
   ```bash
   node server.js
   ```
2. Open in browser:
   - [http://localhost:8081/](http://localhost:8081/) → Home
   - [http://localhost:8081/about](http://localhost:8081/about) → About
   - [http://localhost:8081/api/users](http://localhost:8081/api/users) → JSON API

---

## 📝 Example Users JSON (`json/users.json`)

```json
[
  { "id": 1, "name": "Flynn Coleman", "company": "KIDGREASE" },
  { "id": 2, "name": "Kenya Ashley", "company": "VIASIA" },
  { "id": 3, "name": "Cross Hooper", "company": "ISOPOP" }
]
```

---

## Learning Outcomes

- Understand file system operations in Node.js.
- Compare **asynchronous** vs **synchronous** file access.
- Build a minimal HTTP server.
- Serve **static files** (HTML, CSS, JSON).
- Use CSS classes for **page-specific styling**.

---

This project is from **Workshop 2** — building a basic file server with Node.js.

</details>