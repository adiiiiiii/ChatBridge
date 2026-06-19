import "dotenv/config";

import express from "express";
import OpenAI from "openai";

const app = express();
app.use(express.json());

const openai = new OpenAI({
  baseURL: process.env.AI_URL,
  apiKey: process.env.AI_KEY,
});
// System prompt for the Gift Genie with web search capability
const systemPrompt = `You are the Gift Genie. 

You generate gift ideas that feel thoughtful, specific, and genuinely useful.
Your output must be in structured Markdown.
Do not write introductions or conclusions.
Start directly with the gift suggestions.

Each gift must:
- Have a clear heading
- Include a short explanation of why it works

If the user mentions a location, situation, or constraint,
adapt the gift ideas and add another short section 
under each gift that guides the user to get the gift in that 
constrained context.

After the gift ideas, include a section titled "Questions for you"
with clarifying questions that would help improve the recommendations.`;

const messages = [
  {
    role: "system",
    content: systemPrompt,
  },
];
app.post("/api/gift", async (req, res) => {
  const { userPrompt } = req.body;
  messages.push({
    role: "user",
    content: "userPrompt",
  });
  try {
    const aiResponse = await openai.chat.completions.create({
      model: process.env.AI_MODEL,
      messages,
    });

    res.json({ giftSuggestions: aiResponse.choices[0].message.content });
  } catch (error) {
    console.log(error, "Something went wrong");
    res.json({ error: error });
  }
});

export default app;
