const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

const TELEGRAM_TOKEN = "7647879120:AAGWbTguXvlSjcNnfiWWODSRdg9sY3hvo5s";
const TELEGRAM_CHAT_ID = "-1002299996850";

app.post("/webhook", async (req, res) => {
  const { nome, email, valor } = req.body;

  const msg = `💰 <b>NOVA VENDA RECEBIDA</b>\n\n👤 Nome: ${nome}\n📧 Email: ${email}\n💵 Valor: R$${valor}`;
  const telegramURL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

  try {
    await axios.post(telegramURL, {
      chat_id: TELEGRAM_CHAT_ID,
      text: msg,
      parse_mode: "HTML"
    });

    res.send("Enviado com sucesso");
  } catch (error) {
    console.error("Erro ao enviar pro Telegram:", error.response?.data || error.message);
    res.status(500).send("Erro ao enviar pro Telegram");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Webhook ON na porta ${PORT}`));
