import { useState, useEffect } from 'react'
import './App.css'
import Login from './Pages/Login';
import Navbar from './Components/Navbar';
import DrinkRecipes from './Pages/DrinkRecipes';

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch("/me", {
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
        <DrinkRecipes />
    
      </main>
    </>
  )
}

export default App
