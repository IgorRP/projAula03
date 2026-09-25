import express from 'express';
import {GoogleGenAI} from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({apiKey: apiKey});

async function main(pergunta) {
  const response = await ai.models.generateContent({
    model: 'gemini-flash-latest',
    contents: pergunta,
  });

  const processedText = JSON.stringify(response, null, 2);
  return processedText;
  console.log(processedText);
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

  return res.json({ result: processedText2 });
});

export default app;
