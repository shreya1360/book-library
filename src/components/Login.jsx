import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress,
  Link as MuiLink,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useAuth } from "../context/AuthProvider";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [, setAuthUser] = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTogglePassword = () => {
    setShowPassword((show) => !show);
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const { data } = await Axios.post(
        "https://book-lib-backend.onrender.com/api/v1/user/login",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true, // Required for httpOnly cookie
        }
      );

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      setAuthUser(data.user);
      alert(data.message || "Login successful");
      navigate("/");
    } catch (error) {
      const msg =
        error?.response?.data?.error ||
        error?.response?.data?.errors ||
        "Login failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={2}
      bgcolor="#f5f5f5"
    >
      <Box
        bgcolor="white"
        p={4}
        borderRadius={3}
        boxShadow={3}
        maxWidth={400}
        width="100%"
      >
        <Typography variant="h5" fontWeight="600" textAlign="center" mb={3}>
          Login
        </Typography>

        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          variant="outlined"
          margin="normal"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          variant="outlined"
          margin="normal"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleTogglePassword}
                  edge="end"
                  size="large"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {error && (
          <Typography color="error" variant="body2" mt={1} mb={2}>
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          disabled={loading}
          size="large"
          sx={{ mt: 2, mb: 1 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
        </Button>

        <Box display="flex" justifyContent="space-between" mt={2} fontSize={14}>
          <Typography color="textSecondary">Don't have an account?</Typography>
          <MuiLink
            component={Link}
            to="/signup"
            underline="hover"
            color="primary"
          >
            Signup
          </MuiLink>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
