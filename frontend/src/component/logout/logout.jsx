// Logout.jsx
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    localStorage.removeItem("token");
    logout();
    navigate("/login"); // Redirect to login page
    alert("Logged out successfully");
  }, [navigate]);

  return <h2>Logging out...</h2>;
};

export default Logout;
