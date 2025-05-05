const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

// Teus dados do bot
const TELEGRAM_TOKEN = "7647879120:AAGWbTguXvlSjcNnfiWWODSRdg9sY3hvo5s";
const TELEGRAM_CHAT_ID = "1446913054";

// Middleware
app.use(bodyParser.json());

// Rota principal
app.post("/", async (req, res) => {
  const { nome, email, valor, produto } = req.body;

  if (!nome || !email || !valor || !produto) {
    return res.status(400).json({ erro: "Faltando dados" });
  }

  const mensagem = `
📦 NOVA VENDA CONFIRMADA

👤 Nome: ${nome}
📧 Email: ${email}
💸 Valor: R$${valor}
📦 Produto: ${produto}
🕒 Horário: ${new Date().toLocaleString("pt-BR")}
`;

  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: mensagem,
        parse_mode: "Markdown"
      })
    });

    res.status(200).json({ sucesso: true, msg: "Mensagem enviada pro Telegram" });
  } catch (err) {
    console.error("Erro ao enviar pro Telegram:", err);
    res.status(500).json({ erro: "Falha ao enviar para o Telegram" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porra da porta ${PORT}`);
});
