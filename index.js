const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// SEUS DADOS
const BOT_TOKEN = '7647879120:AAGWbTguXvlSjcNnfiWWODSRdg9sY3hvo5s';
const CHAT_ID = '1446913054';

app.post('/webhook', async (req, res) => {
  const { nome, email, valor } = req.body;

  if (!nome || !email || !valor) {
    return res.status(400).send('Campos obrigatórios faltando');
  }

  const msg = `
🔥 NOVA VENDA 🔥
👤 Nome: ${nome}
📧 Email: ${email}
💰 Valor: R$${valor}
🕐 ${new Date().toLocaleString('pt-BR')}
`;

  try {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: msg,
      parse_mode: 'HTML',
    });

    res.send('Enviado pro Telegram com sucesso');
  } catch (err) {
    console.error('Erro ao enviar pro Telegram:', err.message);
    res.status(500).send('Erro ao enviar mensagem pro Telegram');
  }
});

app.get('/', (req, res) => {
  res.send('Webhook está rodando ✅');
});

app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando na porta ${PORT}`);
});
