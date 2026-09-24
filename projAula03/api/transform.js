const express = require('express');
const app = express();

app.use(express.json());

app.post('/api/transform', (req, res) => {
  const userText = req.body.text;

  if (!userText) {
    return res.status(400).json({ error: 'No text provided' });
  }

  const processedText = `Server received your text! Reversed: ${userText.split('').reverse().join('')}`;

  return res.json({ result: processedText });
});

module.exports = app;
