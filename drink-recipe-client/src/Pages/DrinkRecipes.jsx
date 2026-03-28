import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function DrinkRecipes() {
  const [recipes, setRecipes] = useState([]);


  useEffect(() => {
    fetch("/drink_recipes", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((r) => r.json())
      .then((data) => setRecipes(data));
  }, []);

  return (
    <>
        <h1>Drink Recipes</h1>
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <Link to={`/drink_recipes/${recipe.id}`}>{recipe.name}</Link>
            </li>
          ))}
        </ul>
    </>
  );
}

export default DrinkRecipes;