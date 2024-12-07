const express = require('express');
const cors = require('cors');
const twilio = require('twilio');

const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173', 
}));

// Configuración de Twilio
const accountSid = 'AC2096c68c89101a7cbda4d22cf807f7d0';
const authToken = 'd4ab1a640eb754398aa53338fc912b67';
const client = new twilio(accountSid, authToken);

// Ruta para enviar mensajes
app.post('/send-message', async (req, res) => {
  const { phoneNumber, message } = req.body;

  if (!phoneNumber || !message) {
    return res.status(400).json({ error: 'Número de teléfono y mensaje son requeridos.' });
  }

  try {
    const messageResponse = await client.messages.create({
      from: '+17855690791', // Cambia esto por tu número de Twilio en formato E.164
      to: phoneNumber,
      body: message,
    });

    console.log(`Mensaje enviado con SID: ${messageResponse.sid}`);
    res.json({ success: true, sid: messageResponse.sid });
  } catch (error) {
    console.error('Error al enviar el mensaje:', error.message);
    res.status(500).json({ error: 'No se pudo enviar el mensaje. Revisa los detalles de Twilio.' });
  }
});

// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
