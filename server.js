const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const OpenAI = require("openai");
const path = require("path");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use("/api/", limiter);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const conversations = new Map();
const memories = new Map();

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    name: "OBED AI",
    version: "1.0.0"
  });
});

app.post("/api/chat", async (req, res) => {
  try {
    const {
      message,
      userId = "guest",
      conversationId = "default"
    } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Message is required."
      });
    }

    const key = `${userId}:${conversationId}`;

    if (!conversations.has(key)) {
      conversations.set(key, []);
    }

    const history = conversations.get(key);

    history.push({
      role: "user",
      content: message
    });

    const userMemory = memories.get(userId) || "";

    const response = await openai.responses.create({
      model: "gpt-5.6-luna",
      instructions: `
You are OBED AI, a helpful multilingual AI assistant.

Help users learn, create, code, write and solve problems.

Respond naturally in the language the user uses.
If the user speaks Kirundi, respond in natural Kirundi.

Never reveal API keys or secret information.

User memory:
${userMemory || "No saved memory yet."}
`,
      input: history
    });

    const reply =
      response.output_text ||
      "Sorry, I could not generate a response.";

    history.push({
      role: "assistant",
      content: reply
    });

    conversations.set(key, history.slice(-30));

    res.json({
      success: true,
      reply,
      conversationId,
      userId
    });

  } catch (error) {
    console.error("OBED AI ERROR:", error);

    res.status(500).json({
      success: false,
      error: "OBED AI encountered an error."
    });
  }
});

app.post("/api/memory", (req, res) => {
  try {
    const { userId, memory } = req.body;

    if (!userId || !memory) {
      return res.status(400).json({
        error: "userId and memory are required."
      });
    }

    memories.set(userId, memory);

    res.json({
      success: true,
      message: "Memory saved."
    });

  } catch (error) {
    res.status(500).json({
      error: "Could not save memory."
    });
  }
});

app.get("/api/history/:userId/:conversationId", (req, res) => {
  const { userId, conversationId } = req.params;

  const key = `${userId}:${conversationId}`;

  res.json({
    conversationId,
    messages: conversations.get(key) || []
  });
});

app.delete("/api/history/:userId/:conversationId", (req, res) => {
  const { userId, conversationId } = req.params;

  const key = `${userId}:${conversationId}`;

  conversations.delete(key);

  res.json({
    success: true,
    message: "Conversation deleted."
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`OBED AI running on port ${PORT}`);
});    
