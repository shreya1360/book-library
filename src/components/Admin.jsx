import axios from "axios";
import React from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router";
import { LogOut } from "lucide-react";

function Admin() {
  const [, setAuthUser] = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:4002/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      alert(data.message);
      setAuthUser(null);
      navigate("/login");
    } catch (error) {
      alert(error?.response?.data?.errors || "Logout Failed");
    }
  };
  return (
    <div>
      Admin
      <button
        onClick={handleLogout}
        className="flex text-sm bg-amber-800 items-center gap-1 text-white px-3 py-2 rounded-lg"
      >
        <LogOut />
        Logout
      </button>
    </div>
  );
}

export default Admin;
