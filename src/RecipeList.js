import React from 'react';

const RecipeList = ({ recipes }) => {
  // Check if recipes is undefined or null, and provide a default value if necessary
  const recipeItems = recipes ? recipes.map(recipe => (
    <div key={recipe.id}>
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
    </div>
  )) : null;

  return (
    <div>
      {recipeItems}
    </div>
  );
};

export default RecipeList;
