import { useState, useEffect } from 'react'
import './App.css'
import Login from './Pages/Login';
import Navbar from './Components/Navbar';
import './styles/Navbar.css';
import DrinkRecipes from './Pages/DrinkRecipes';
import AddDrinkRecipe from './Pages/AddDrinkRecipe';
import DrinkRecipeCard from './Pages/DrinkRecipeCard';
import { Routes, Route } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch("/api/me", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => setUser(user));
        }
      });
  }, []);

  const onLogin = (token, user) => {
    localStorage.setItem("token", token);
    setUser(user);
  }

  if (!user) return <Login onLogin={onLogin} />

  return (
    <>
      <Navbar setUser={setUser}/>
      <main>
        <h1>Welcome, {user.username}!</h1>
        <Routes>
          <Route path="/" element={<DrinkRecipes />} />
          <Route path="/drink_recipes/:id" element={<DrinkRecipeCard />} />
          <Route path="/add" element={<AddDrinkRecipe />} />
        </Routes>
      </main>
    </>
  )
}

export default App
