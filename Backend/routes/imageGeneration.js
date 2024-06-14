// import express from 'express';
// import { Configuration, OpenAIApi} from 'openai';
// import OpenAI from 'openai';
const express = require('express')
const OpenAI = require('openai')

// dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  // apiKey: "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", // This is also the default, can be omitted
  apiKey: "sk-proj-EnEaDgXD8A2uLjZFcY9aT3BlbkFJkuLv69SRFeQlGLZoUV7c", // This is also the default, can be omitted
});

router.route('/')
.post(async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log(prompt)
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json'
    });
    
    console.log(response)

    const image = response.data[0].b64_json;

    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    console.log(error)
    res.status(500).json({ message: "Something went wrong" })
  }
})

module.exports = router;
