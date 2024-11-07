const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Recipe = require("../models/recipe"); // Adjust path as needed

router.post("/generate-image", async (req, res) => {
  const { recipeId, recipeTitle } = req.body; // Expecting recipeId to identify the recipe
  const prompt = `A high-quality, appetizing photo of ${recipeTitle}, bright and visually appealing`;

  try {
    const fetch = await import("node-fetch");
    const response = await fetch.default("https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${'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'}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        options: { wait_for_model: true },
      }),
    });

    const contentType = response.headers.get("Content-Type");
    let imageUrl;

    if (contentType && contentType.includes("image")) {
      const buffer = await response.arrayBuffer();
      const base64Image = Buffer.from(buffer).toString("base64");
      imageUrl = `data:image/jpeg;base64,${base64Image}`;
    } else {
      const data = await response.json();
      if (data.error) {
        return res.status(500).json({ error: data.error });
      }
      imageUrl = data[0]?.url || data.url;
    }

    // Update the recipe in the database with the generated image URL
    await Recipe.findByIdAndUpdate(
      recipeId,
      { $push: { Images: imageUrl } },
      { new: true } // Return the updated document
    );

    res.json({ message: "Image generated and saved to recipe", imageUrl });
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({ error: "Image generation failed", details: error.message });
  }
});

module.exports = router;
