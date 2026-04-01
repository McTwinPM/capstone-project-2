import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchBar from "../Components/SearchBar";

function DrinkRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    fetch("/api/drink_recipes", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((r) => r.json())
      .then((data) => setRecipes(data.drink_recipes));
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
        <h1 className="title">Drink Recipes</h1>
        <SearchBar className="search-bar" searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <ul>
          {filteredRecipes.map((recipe) => (
            <li key={recipe.id}>
              <Link to={`/drink_recipes/${recipe.id}`}>{recipe.name}</Link>
            </li>
          ))}
        </ul>
    </>
  );
}

export default DrinkRecipes;