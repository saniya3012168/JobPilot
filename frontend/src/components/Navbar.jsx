import { Link } from "react-router-dom";

export default function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location = "/login";
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/jobs">Jobs</Link>
      <Link to="/profile">Profile</Link>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}
