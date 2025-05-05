const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

app.post('/webhook', async (req, res) => {
  const venda = req.body;

  const mensagem = `💸Caiu no Funil é PIX💸!
Cliente: ${venda.nome || 'Desconhecido'}
E-mail: ${venda.email || 'N/A'}
Valor: R$ ${venda.valor || '???'}
Produto: ${venda.produto || 'N/A'}`;

  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: mensagem,
    });
    res.status(200).send('Enviado');
  } catch (err) {
    console.error(err.response.data);
    res.status(500).send('Erro ao enviar pro Telegram');
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Webhook rodando na porta 3000');
});
