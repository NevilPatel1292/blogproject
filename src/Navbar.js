import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const isAdmin = sessionStorage.getItem("isAdmin");

  const logout = () => {
    sessionStorage.removeItem("isAdmin");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <h4 className="text-white">Blogs</h4>

      <div>

        {!isAdmin ? (
          <Link to="/login" className="btn btn-primary">Login</Link>
        ) : (
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;