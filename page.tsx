'use client';
import { useState } from 'react';

export default function Page() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setMessages([...messages, { role: 'user', content: input }, { role: 'assistant', content: data.message }]);
    setInput('');
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Rin Companion Chat</h1>
      <div>
        {messages.map((m, i) => (
          <p key={i}><strong>{m.role}:</strong> {m.content}</p>
        ))}
      </div>
      <input value={input} onChange={e => setInput(e.target.value)} placeholder="Say something..." />
      <button onClick={sendMessage}>Send</button>
    </main>
  );
}