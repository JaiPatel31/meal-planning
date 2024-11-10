const express = require('express');
const { HfInference } = require('@huggingface/inference'); // Import the Hugging Face client
const router = express.Router();

// Create an instance of HfInference with your API token
const client = new HfInference('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');

// Route to handle chatbot interaction
router.post('/', async (req, res) => {
  const { userMessage } = req.body;

  if (!userMessage) {
    return res.status(400).json({ error: 'User message is required' });
  }

  try {
    // Initialize the output variable to hold the generated content
    let out = "";

    // Create a stream for the chat completion
    const stream = client.chatCompletionStream({
      model: 'meta-llama/Meta-Llama-3-8B-Instruct',
      messages: [{ role: 'user', content: userMessage }],
      max_tokens: 500, // Adjust tokens as needed
    });

    // Iterate over the stream and accumulate the output content
    for await (const chunk of stream) {
      if (chunk.choices && chunk.choices.length > 0) {
        const newContent = chunk.choices[0].delta.content;
        out += newContent;  // Append the new content
        console.log(newContent); // Log the new content for debugging
      }
    }

    // Send the final output content to the frontend
    res.json({ generated_text: out });

  } catch (error) {
    console.error('Error communicating with model:', error);
    res.status(500).json({ error: 'Something went wrong while contacting the model' });
  }
});

module.exports = router;