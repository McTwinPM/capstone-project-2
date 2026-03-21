import { Navlink } from "react-router-dom";

function Navbar({ setUser}) {
    function handleLogout() {
        localStorage.removeItem("token");
        setUser(null);
    }
  return (
    <nav>
      <Navlink to="/">My Drink Recipes</Navlink>
      <Navlink to="/add">Add Recipe</Navlink>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;