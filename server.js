const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Server Running");
});

app.post("/chat", async (req, res) => {

  try {

    const { messages } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4.1-mini",
        messages: messages
      })
    });

    const data = await response.json();

    console.log(data);

    res.json({
      reply: data.choices[0].message.content
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Sunucu hatası"
    });

  }

});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});