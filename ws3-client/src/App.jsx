import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function App() {
  const [hello, setHello] = useState("");
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    axios.get(`${API}/api/hello`).then(r => setHello(r.data.message));
    axios.get(`${API}/api/todos`).then(r => setTodos(r.data));
  }, []);

  async function addTodo(e) {
    e.preventDefault();
    if (!text.trim()) return;
    const { data } = await axios.post(`${API}/api/todos`, { text });
    setTodos(prev => [...prev, data]);
    setText("");
  }

  return (
    <div style={{ fontFamily: "system-ui", padding: 16 }}>
      <h1>WS-3 React and Axios</h1>
      <p><strong>API says:</strong> {hello || "loading..."}</p>

      <h2>Todos</h2>
      <ul>{todos.map(t => <li key={t.id}>{t.text}</li>)}</ul>

      <form onSubmit={addTodo} style={{ marginTop: 12 }}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="New todo"
        />
        <button type="submit" style={{ marginLeft: 8 }}>Add</button>
      </form>
    </div>
  );
}