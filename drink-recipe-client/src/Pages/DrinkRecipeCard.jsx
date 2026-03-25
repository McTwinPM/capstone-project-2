import { Outlet, Link, useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function DrinkRecipeCard() {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();
  const { user } = useOutletContext();

  useEffect(() => {
    fetch(`/drink_recipes/${id}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((r) => r.json())
      .then((data) => setRecipe(data));
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div>
      <h2>{recipe.name}</h2>
      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <p>Instructions: {recipe.instructions}</p>
    </div>
  );
}

export default DrinkRecipeCard;