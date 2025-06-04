import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Admin from "./components/Admin";
import User from "./components/User";
import { useAuth } from "./context/AuthProvider";
import Profile from "./components/Profile";

function App() {
  const [authUser] = useAuth();
  const role = authUser?.role;

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              role === "admin" ? (
                <Admin />
              ) : (
                <User />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />
        <Route path="*" element={<Navigate to="/" />} />

        <Route
          path="/profile"
          element={authUser ? <Profile /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
