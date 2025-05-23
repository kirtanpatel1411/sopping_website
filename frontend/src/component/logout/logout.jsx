// Logout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    navigate("/login"); // Redirect to login page
    alert("Logged out successfully");
  }, [navigate]);

  return <h2>Logging out...</h2>;
};

export default Logout;
