import express from 'express';
import {GoogleGenAI} from '@google/genai';

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY 
});

async function main(pergunta) {
  const response = await ai.models.generateContent({
    model: 'gemini-flash-latest',
    contents: pergunta,
  });

  if (!process.env.GEMINI_API_KEY) {
    return `Missing API Key config`;
  } else {
    const processedApi = response.text;
    //return processedApi;
    return `Com chave!`;
  }
  
}

const app = express();

app.use(express.json());

app.post('/api/transform', (req, res) => {
  const userText = req.body.text;

  if (!userText) {
    return res.status(400).json({ error: 'No text provided' });
  }

  const processedText = main(userText);
  const processedText2 = `Server received your text! Reversed: ${userText.split('').reverse().join('')}`;

  return res.json({ result: processedText });
});

export default app;
