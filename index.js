const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

// === CONFIGURAÇÕES DO BOT E GRUPO ===
const TELEGRAM_TOKEN = "7647879120:AAGWbTguXvlSjcNnfiWWODSRdg9sY3hvo5s";
const TELEGRAM_CHAT_ID = "-1002299996850"; // Supergrupo correto

// === ROTA DO WEBHOOK ===
app.post("/webhook", async (req, res) => {
  const { nome, email, valor } = req.body;

  if (!nome || !email || !valor) {
    return res.status(400).json({ error: "Faltando nome, email ou valor." });
  }

  const msg = `
<b>💰 NOVA VENDA RECEBIDA</b>\n
👤 <b>Nome:</b> ${nome}
📧 <b>Email:</b> ${email}
💵 <b>Valor:</b> R$${valor}
`;

  const telegramURL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

  try {
    await axios.post(telegramURL, {
      chat_id: TELEGRAM_CHAT_ID,
      text: msg,
      parse_mode: "HTML"
    });

    res.status(200).json({ status: "ok", message: "Venda notificada no Telegram!" });
  } catch (error) {
    console.error("Erro ao enviar pro Telegram:", error.response?.data || error.message);
    res.status(500).json({ error: "Erro ao enviar pro Telegram" });
  }
});

// === INICIA SERVIDOR ===
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Webhook rodando na porta ${PORT}`));
