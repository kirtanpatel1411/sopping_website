import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/profile").then((res) => setUser(res.data));
    // .catch(() => {
    //   alert("Login First");
    //   navigate("/login");
    // });
  }, []);

  return user ? (
    <div
      style={{
        marginTop: "100px",
        marginLeft: "600px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "30%",
      }}
    >
      <img
        src={`http://localhost:5000/uploads/${user.profileImage}`}
        alt="Profile"
        style={{ width: "150px", height: "150px", borderRadius: "50%" }}
      />
      <h1>Welcome, {user.firstName}</h1>
      <p>{user.lastName}</p>
      <p>{user.number}</p>
      <p>{user.email}</p>
      <button onClick={() => navigate("/logout")}>logout</button>
    </div>
  ) : (
    <p>Loading...</p>
  );
}
