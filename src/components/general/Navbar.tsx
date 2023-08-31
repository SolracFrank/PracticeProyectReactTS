import { Link } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { useContext } from "react";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  //console.log(user);
  return (
    <div className="flex bg-blue-600  w-full justify-center md:justify-around text-white p-6 md:p-4">
      <div className="flex ">
        <Link className="p-4 text-center" to="/">
          {user ? <h1>Welcome</h1> : <Link to="/login">¡Inicia sesión!</Link>}
        </Link>
      </div>

      <div className="flex justify-around">
        <Link className="p-4 text-center" to="/login">
          Login
        </Link>
        <Link className="p-4 text-center" to="/contact">
          Contact
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
