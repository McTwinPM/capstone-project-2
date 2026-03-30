import { NavLink } from "react-router-dom";

function Navbar({ setUser}) {
    function handleLogout() {
        localStorage.removeItem("token");
        setUser(null);
    }
  return (
    <nav className="navbar">
      <NavLink to="/">My Drink Recipes</NavLink>
      <NavLink to="/add">Add Recipe</NavLink>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;