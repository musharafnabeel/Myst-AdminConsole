import { logout } from "../auth/auth";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="topbar">
      <h3>Dashboard</h3>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
}
