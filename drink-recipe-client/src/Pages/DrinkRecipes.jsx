import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchBar from "../Components/SearchBar";
import '../styles/DrinkRecipes.css';

function DrinkRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  useEffect(() => {
    fetch("/api/drink_recipes", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((r) => r.json())
      .then((data) => {
        setRecipes(data.drink_recipes);
        setPage(data.current_page);
        setTotalPages(data.pages);
      });
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLoadMore = () => {
    fetch(`/api/drink_recipes?page=${page + 1}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((r) => r.json())
      .then((data) => {
        setRecipes(data.drink_recipes);
        setPage(data.current_page);
        setTotalPages(data.pages);
      });
  };

  const handleLoadprevious = () => {
    if (page > 1) {
      fetch(`/api/drink_recipes?page=${page - 1}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then((r) => r.json())
        .then((data) => {
          setRecipes(data.drink_recipes);
          setPage(data.current_page);
          setTotalPages(data.pages);
        });
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
        <div className="pagination-buttons">
          {page > 1 && (
            <button className='pagination-previous-button' onClick={handleLoadprevious}>Load Previous</button>
          )}
            {page < totalPages && (
              <button className='pagination-next-button' onClick={handleLoadMore}>Load More</button>
            )}
        </div>
    </>
  );
}

export default DrinkRecipes;