'use client';

import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [...messages, userMessage] })
    });
    const data = await res.json();
    setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
  };

  return (
    <main style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>Rin Companion</h1>
      <div style={{ marginBottom: 20 }}>
        {messages.map((m, i) => (
          <div key={i}><b>{m.role === 'user' ? 'You' : 'Rin'}:</b> {m.content}</div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Say something..."
        style={{ width: '80%', padding: 10 }}
      />
      <button onClick={sendMessage} style={{ padding: 10, marginLeft: 10 }}>Send</button>
    </main>
  );
}
