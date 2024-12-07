import React, { useState } from 'react';
import './App.css';

function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleSendMessage = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Enviar mensaje</h1>
      <form onSubmit={handleSendMessage}>
        <label>
          Número de teléfono:
          <input
            type="text"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </label>
        <br />
        <label>
          Mensaje:
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </label>
        <br />
        <button type="submit">Enviar mensaje</button>
      </form>
    </div>
  );
}

export default App;
