import React, { useState, useEffect } from 'react';
import RecipeList from './RecipeList';
import './styles.css';


const App = () => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRecipes = async () => {
      if (query.trim() === '') {
        return; // Prevent empty queries
      }

      const APP_ID = '808b5930';
      const APP_KEY = 'af1602df6a7e9f0019d21600873cb63d	';
      const API_URL = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        setRecipes(data.hits.map(hit => ({
          id: hit.recipe.uri,
          title: hit.recipe.label,
          description: hit.recipe.source
        })));
        setError(null);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setError('Error fetching recipes. Please try again later.');
      }
    };

    getRecipes();
  }, [query]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // getRecipes(); // No need to call getRecipes here; it's already being called on every query change due to useEffect
  };

  return (
    <div>
      <h1>Recipe Finder</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Enter ingredients"
        />
        <button type="submit">Search</button>
      </form>
      {error && <div>{error}</div>}
      <RecipeList recipes={recipes} />
    </div>
  );
};

export default App;
