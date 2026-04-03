import { useState } from "react";
import "../styles/AddDrinkRecipe.css";

function AddDrinkRecipe() {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const newRecipe = {
      name,
      ingredients,
      instructions,
    };

    fetch("/api/drink_recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newRecipe),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setMessage(`Error adding recipe: ${data.error}`);
          console.error("Error adding recipe:", data.error);
        } else {
          setMessage("Recipe added successfully!");
          console.log("Recipe added successfully:", data);
        }
      });
  }

  return (
    <>
      <main>
        <h1>Add a New Drink Recipe</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Ingredients:</label>
            <input
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Instructions:</label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              required
            />
          </div>
          {message && <p className= 'message'>{message}</p>}
          <button type="submit">Add Recipe</button>
        </form>
      </main>
    </>
  );
}

export default AddDrinkRecipe;
