const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config(); // load .env

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
    origin: 'http://localhost:4200'
  }));
  app.use(express.json()); 

app.post('/api/generate', async (req, res) => {
  const prompt = req.body.prompt;

  try {
    // Start prediction
    const init = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        version: 'b3d14e1c', // Replace with full version hash if needed
        input: { prompt }
      })
    });

    const prediction = await init.json();

    if (!prediction.urls?.get) {
      return res.status(500).json({ error: 'Failed to start generation' });
    }

    // Poll until complete
    let statusRes = prediction;
    while (statusRes.status !== 'succeeded' && statusRes.status !== 'failed') {
      await new Promise(r => setTimeout(r, 2000));
      const poll = await fetch(statusRes.urls.get, {
        headers: { 'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}` }
      });
      statusRes = await poll.json();
    }

    if (statusRes.status === 'succeeded') {
      res.json({ imageUrl: statusRes.output[0] });
    } else {
      res.status(500).json({ error: 'Image generation failed' });
    }

} catch (err) {
    console.error('❌ Replicate error:', err);
  
    // If error has a response body, log it
    if (err.response) {
      try {
        const errorText = await err.response.text();
        console.error('🔍 Error response:', errorText);
      } catch (e) {
        console.error('⚠️ Could not parse error response:', e.message);
      }
    }
  
    res.status(500).json({ error: 'Failed to generate image' });
  }
  
});

app.listen(port, () => {
  console.log(`✅ Replicate backend running on http://localhost:${port}`);
});
