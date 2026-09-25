import express from 'express';
import {GoogleGenAI} from '@google/genai';

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY 
});

async function main(pergunta) {
  if (!process.env.GEMINI_API_KEY) {
    return `Missing API Key config`;
  }

  const response = await ai.models.generateContent({
    model: 'gemini-flash-latest',
    contents: pergunta,
  });

  const processedApi = response.text;
  //return processedApi;
  return `Com chave!`;

  
}

const app = express();

app.use(express.json());

app.post('/api/transform', async (req, res) => {
  const userText = req.body.text;

  if (!userText) {
    return res.status(400).json({ error: 'No text provided' });
  }

  try {
    const processedText = await main(userText);
    return res.json({ result: processedText });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to process request' });
  }
});

export default app;
