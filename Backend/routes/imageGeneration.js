
const express = require('express')
const OpenAI = require('openai')
const dotenv = require('dotenv')
dotenv.config()


const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
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
