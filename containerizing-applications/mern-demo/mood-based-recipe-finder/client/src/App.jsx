import { useState, useEffect } from 'react'
import axios from 'axios'

const API_BASE = '/api'

const moods = [
  { id: 'happy', label: 'Happy', emoji: '😊' },
  { id: 'sad', label: 'Sad', emoji: '😢' },
  { id: 'stressed', label: 'Stressed', emoji: '😰' },
  { id: 'excited', label: 'Excited', emoji: '🤩' },
  { id: 'tired', label: 'Tired', emoji: '😴' },
  { id: 'calm', label: 'Calm', emoji: '😌' }
]

function App() {
  const [selectedMood, setSelectedMood] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [currentIngredient, setCurrentIngredient] = useState('')
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [isSeeded, setIsSeeded] = useState(false)

  useEffect(() => {
    checkAndSeedData()
  }, [])

  const checkAndSeedData = async () => {
    try {
      const response = await axios.get(`${API_BASE}/recipes`)
      if (response.data.length === 0 && !isSeeded) {
        await axios.post(`${API_BASE}/seed`)
        setIsSeeded(true)
        console.log('Database seeded with initial recipes!')
      }
    } catch (error) {
      console.error('Error checking/seeding data:', error)
    }
  }

  const addIngredient = () => {
    if (currentIngredient.trim() && !ingredients.includes(currentIngredient.trim().toLowerCase())) {
      setIngredients([...ingredients, currentIngredient.trim().toLowerCase()])
      setCurrentIngredient('')
    }
  }

  const removeIngredient = (ingredient) => {
    setIngredients(ingredients.filter(ing => ing !== ingredient))
  }

  const searchRecipes = async () => {
    setLoading(true)
    try {
      const response = await axios.post(`${API_BASE}/recipes/search`, {
        mood: selectedMood,
        ingredients: ingredients
      })
      setRecipes(response.data)
    } catch (error) {
      console.error('Error searching recipes:', error)
      setRecipes([])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addIngredient()
    }
  }

  return (
    <div className="app">
      <div className="hero">
        <div className="container">
          <h1>🍳 Mood Recipe Finder</h1>
          <p>Discover delicious recipes that match your current mood and available ingredients</p>
        </div>
      </div>

      <div className="container">
        <div className="mood-selector">
          <h2 style={{ marginBottom: '20px', textAlign: 'center', color: '#333' }}>
            How are you feeling today?
          </h2>
          <div className="mood-grid">
            {moods.map(mood => (
              <button
                key={mood.id}
                className={`mood-btn ${selectedMood === mood.id ? 'active' : ''}`}
                onClick={() => setSelectedMood(mood.id)}
              >
                <span className="mood-emoji">{mood.emoji}</span>
                <span>{mood.label}</span>
              </button>
            ))}
          </div>

          <h3 style={{ marginBottom: '15px', color: '#333' }}>
            What ingredients do you have?
          </h3>
          <div className="ingredient-input">
            <input
              type="text"
              value={currentIngredient}
              onChange={(e) => setCurrentIngredient(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter an ingredient (e.g., chicken, tomatoes, rice...)"
            />
            <button className="add-btn" onClick={addIngredient}>
              Add
            </button>
          </div>

          {ingredients.length > 0 && (
            <div className="ingredient-tags">
              {ingredients.map(ingredient => (
                <div key={ingredient} className="ingredient-tag">
                  <span>{ingredient}</span>
                  <button
                    className="remove-tag"
                    onClick={() => removeIngredient(ingredient)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            className="search-btn"
            onClick={searchRecipes}
            disabled={!selectedMood && ingredients.length === 0}
            style={{ 
              width: '100%', 
              padding: '15px',
              fontSize: '1.1rem',
              opacity: (!selectedMood && ingredients.length === 0) ? 0.6 : 1,
              cursor: (!selectedMood && ingredients.length === 0) ? 'not-allowed' : 'pointer'
            }}
          >
            Find Perfect Recipes
          </button>
        </div>

        {loading && (
          <div className="loading">
            <h3>Finding the perfect recipes for you...</h3>
          </div>
        )}

        {!loading && recipes.length > 0 && (
          <div className="recipes-container">
            <h2 style={{ marginBottom: '30px', textAlign: 'center', color: '#333' }}>
              Perfect Recipes for You ({recipes.length} found)
            </h2>
            <div className="recipes-grid">
              {recipes.map(recipe => (
                <div key={recipe._id} className="recipe-card">
                  <div className="recipe-header">
                    <div className="recipe-emoji">
                      {recipe.image}
                    </div>
                    <div>
                      <h3 className="recipe-title">{recipe.name}</h3>
                      <div className="recipe-meta">
                        <span>⏱️ {recipe.cookingTime}min</span>
                        <span>📊 {recipe.difficulty}</span>
                        <span>😊 {recipe.mood}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="recipe-ingredients">
                    <h4>Ingredients:</h4>
                    <div className="ingredients-list">
                      {recipe.ingredients.map((ingredient, index) => (
                        <span key={index} className="ingredient-item">
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="recipe-instructions">
                    <strong>Instructions:</strong><br />
                    {recipe.instructions}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && recipes.length === 0 && (selectedMood || ingredients.length > 0) && (
          <div className="recipes-container">
            <div className="no-recipes">
              <h3>🤔 No recipes found</h3>
              <p>Try a different mood or add more ingredients to discover new recipes!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App