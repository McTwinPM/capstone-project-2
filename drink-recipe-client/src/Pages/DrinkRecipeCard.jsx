import { Outlet, Link, useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function DrinkRecipeCard() {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/drink_recipes/${id}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((r) => r.json())
      .then((data) => setRecipe(data));
  }, [id]);

  if (!recipe) return <p>No recipe found.</p>;

  return (
    <div>
      <h2>{recipe.name}</h2>
      <h3>Ingredients:</h3>
      <p>{recipe.ingredients}</p>
      <h3>Instructions:</h3>
      <p>{recipe.instructions}</p>
    </div>
  );
}

export default DrinkRecipeCard;