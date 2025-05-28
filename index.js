import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  async function sendMessage(e) {
    e.preventDefault();
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [...messages, userMessage] })
    });
    const data = await response.json();
    setMessages([...messages, userMessage, data.reply]);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Rin Companion</h1>
      <div>
        {messages.map((msg, i) => (
          <p key={i}><strong>{msg.role}:</strong> {msg.content}</p>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input value={input} onChange={e => setInput(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}