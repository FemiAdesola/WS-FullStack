const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

let todos = [{ id: 1, text: "Learn WS-3", done: false }];

app.get("/api/hello", (req, res) => res.json({ message: "Hello from Express API" }));

app.get("/api/todos", (req, res) => res.json(todos));

app.post("/api/todos", (req, res) => {
  const id = todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1;
  const todo = { id, text: String(req.body.text || ""), done: false };
  todos.push(todo);
  res.status(201).json(todo);
});

app.listen(PORT, () => console.log("API on http://localhost:" + PORT));