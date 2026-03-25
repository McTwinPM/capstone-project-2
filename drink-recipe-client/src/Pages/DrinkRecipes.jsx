import { Link, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";

function DrinkRecipes() {
  const [recipes, setRecipes] = useState([]);
  const { user } = useOutletContext();

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
      <Navbar />
      <main>
        <h1>Drink Recipes</h1>
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <Link to={`/drink_recipes/${recipe.id}`}>{recipe.name}</Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export default DrinkRecipes;