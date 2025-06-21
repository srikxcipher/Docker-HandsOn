const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mongo:27017/mood-recipes';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('🍃 MongoDB connected successfully'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Recipe Schema
const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: [String],
  instructions: String,
  mood: { type: String, required: true },
  cookingTime: Number,
  difficulty: String,
  image: String,
  createdAt: { type: Date, default: Date.now }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!', timestamp: new Date().toISOString() });
});

// Get recipes by mood
app.get('/api/recipes/:mood', async (req, res) => {
  try {
    const { mood } = req.params;
    const recipes = await Recipe.find({ mood: mood.toLowerCase() });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all recipes
app.get('/api/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new recipe
app.post('/api/recipes', async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    const savedRecipe = await recipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Search recipes by ingredients
app.post('/api/recipes/search', async (req, res) => {
  try {
    const { ingredients, mood } = req.body;
    const query = {};
    
    if (mood) {
      query.mood = mood.toLowerCase();
    }
    
    if (ingredients && ingredients.length > 0) {
      query.ingredients = { $in: ingredients.map(ing => new RegExp(ing, 'i')) };
    }
    
    const recipes = await Recipe.find(query);
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Seed initial data
app.post('/api/seed', async (req, res) => {
  try {
    await Recipe.deleteMany({});
    
    const seedRecipes = [
      {
        name: "Comfort Mac & Cheese",
        ingredients: ["pasta", "cheese", "milk", "butter", "flour"],
        instructions: "Cook pasta. Make cheese sauce with butter, flour, milk, and cheese. Combine and bake until golden.",
        mood: "sad",
        cookingTime: 30,
        difficulty: "Easy",
        image: "🧀"
      },
      {
        name: "Energizing Green Smoothie",
        ingredients: ["spinach", "banana", "apple", "yogurt", "honey"],
        instructions: "Blend all ingredients until smooth. Add ice if desired. Perfect morning boost!",
        mood: "happy",
        cookingTime: 5,
        difficulty: "Easy",
        image: "🥬"
      },
      {
        name: "Spicy Stress-Relief Tacos",
        ingredients: ["tortillas", "chicken", "peppers", "onions", "spices"],
        instructions: "Sauté chicken with peppers and onions. Season with spices. Serve in tortillas with toppings.",
        mood: "stressed",
        cookingTime: 20,
        difficulty: "Medium",
        image: "🌮"
      },
      {
        name: "Cozy Tomato Soup",
        ingredients: ["tomatoes", "onion", "garlic", "cream", "basil"],
        instructions: "Sauté onion and garlic. Add tomatoes, simmer. Blend smooth, add cream and basil.",
        mood: "tired",
        cookingTime: 25,
        difficulty: "Easy",
        image: "🍅"
      },
      {
        name: "Victory Celebration Cake",
        ingredients: ["flour", "sugar", "eggs", "butter", "vanilla"],
        instructions: "Cream butter and sugar. Add eggs and vanilla. Mix in flour. Bake until golden.",
        mood: "excited",
        cookingTime: 45,
        difficulty: "Hard",
        image: "🎂"
      },
      {
        name: "Mindful Buddha Bowl",
        ingredients: ["quinoa", "chickpeas", "avocado", "vegetables", "tahini"],
        instructions: "Cook quinoa and roast chickpeas. Arrange with fresh vegetables and avocado. Drizzle with tahini.",
        mood: "calm",
        cookingTime: 35,
        difficulty: "Medium",
        image: "🥗"
      }
    ];
    
    await Recipe.insertMany(seedRecipes);
    res.json({ message: 'Database seeded successfully!', count: seedRecipes.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
const path = require('path');

// Serve static files from ./public
app.use(express.static(path.join(__dirname, 'public')));

// Fallback to index.html for SPA (React Router support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});