import { NavLink } from "react-router-dom";

function Navbar({ setUser}) {
    function handleLogout() {
        localStorage.removeItem("token");
        setUser(null);
    }
  return (
    <nav>
      <NavLink to="/">My Drink Recipes</NavLink>
      <NavLink to="/add">Add Recipe</NavLink>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;