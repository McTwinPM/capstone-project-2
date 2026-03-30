import { Outlet, Link, useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function DrinkRecipeCard() {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();
  const [editing, setEditing] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState({});
  const [errors, setErrors] = useState(null);

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

  function editRecipe() {
    setEditing(true);
    setEditedRecipe({
      name: recipe.name,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions
    });
    setErrors(null);
  }

  function handleSave() {
    fetch(`/api/drink_recipes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(editedRecipe)
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
            setErrors(`Error updating recipe: ${data.error}`);
            console.error("Error updating recipe:", data.error);
        } else {
            setErrors(null);
            setEditing(false);
            console.log("Recipe updated successfully:", data);
            setRecipe(data.drink_recipe); // Update the state with the new recipe data
        }
      });
  }

  const handleCancel = () => {
    setEditing(false);
    setEditedRecipe({}); // Reset edited recipe to original
    setErrors(null); // Clear any errors
  };

  function deleteRecipe(event) {
    event.preventDefault();
    fetch(`/api/drink_recipes/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((r) => {
        if (r.ok) {
            setErrors(null);
            console.log("Recipe deleted successfully");
            setRecipe(null); // Clear the recipe from state
        } else {
            r.json().then(data => {
                setErrors(`Error deleting recipe: ${data.error}`);
                console.error("Error deleting recipe:", data.error);
            });
        }
      });
  }

  return (
    editing ? (
      <div>
        <input
          value={editedRecipe.name || recipe.name}
          onChange={(e) => setEditedRecipe({ ...editedRecipe, name: e.target.value })}
        />
        <textarea
          value={editedRecipe.ingredients || recipe.ingredients}
          onChange={(e) => setEditedRecipe({ ...editedRecipe, ingredients: e.target.value })}
        />
        <textarea
          value={editedRecipe.instructions || recipe.instructions}
          onChange={(e) => setEditedRecipe({ ...editedRecipe, instructions: e.target.value })}
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
        {errors && <p>{errors}</p>}
      </div>
    ) : (
    <div>
      <h2>{recipe.name}</h2>
      <h3>Ingredients:</h3>
      <p>{recipe.ingredients}</p>
      <h3>Instructions:</h3>
      <p>{recipe.instructions}</p>
      <button onClick={editRecipe}>Edit</button>
      <button onClick={deleteRecipe}>Delete</button>
    </div>
  ));
}

export default DrinkRecipeCard;