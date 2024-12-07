const express = require('express');
const cors = require('cors');
const twilio = require('twilio');

const app = express();

// Middleware para procesar JSON
app.use(express.json());

// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:5173', // Permitir solicitudes solo desde tu frontend
}));

// Configuración de Twilio
const accountSid = 'AC2096c68c89101a7cbda4d22cf807f7d0';
const authToken = 'de2932e0af1445cb3df931564a08f611';
const client = new twilio(accountSid, authToken);

// Ruta para enviar mensajes a WhatsApp
app.post('/send-message', async (req, res) => {
  const { phoneNumber, message } = req.body;

  // Validación básica
  if (!phoneNumber || !message) {
    return res.status(400).json({ error: 'Número de teléfono y mensaje son requeridos.' });
  }

  try {
    // Enviar mensaje usando el formato de WhatsApp
    const messageResponse = await client.messages.create({
      from: 'whatsapp:+14155238886', // Número de Twilio para WhatsApp (fijo por Twilio)
      to: `whatsapp:${phoneNumber}`, // Número destino en formato E.164
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
