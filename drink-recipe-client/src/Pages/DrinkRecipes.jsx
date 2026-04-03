import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchBar from "../Components/SearchBar";
import '../styles/DrinkRecipes.css';

function DrinkRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);


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

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    fetch(`/api/drink_recipes?page=${page + 1}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((r) => r.json())
      .then((data) => setRecipes((prevRecipes) => [...prevRecipes, ...data.drink_recipes]));
  };

  const handleLoadprevious = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
      fetch(`/api/drink_recipes?page=${page - 1}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then((r) => r.json())
        .then((data) => setRecipes((prevRecipes) => [...prevRecipes, ...data.drink_recipes]));
    }
  };


  return (
    <>
        <h1 className="title">Drink Recipes</h1>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <ul>
          {filteredRecipes.map((recipe) => (
            <li key={recipe.id}>
              <Link to={`/drink_recipes/${recipe.id}`}>{recipe.name}</Link>
            </li>
          ))}
        </ul>
        <button className='pagination-next-button' onClick={handleLoadMore}>Load More</button>
        {page > 1 && (
          <button className='pagination-previous-button' onClick={handleLoadprevious}>Load Previous</button>
        )}
    </>
  );
}

export default DrinkRecipes;