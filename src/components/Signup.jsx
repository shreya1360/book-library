import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  InputAdornment,
  IconButton,
  CircularProgress,
  Link as MuiLink,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTogglePassword = () => {
    setShowPassword((show) => !show);
  };

  const handleSignup = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await Axios.post(
        "https://book-lib-backend.onrender.com/api/v1/user/signup",
        formData,
        { withCredentials: true }
      );
      alert(data.message || "Signup successful");
      navigate("/login");
    } catch (error) {
      const msg = error?.response?.data?.errors || "Signup failed";
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
          Signup
        </Typography>

        <TextField
          fullWidth
          label="First Name"
          name="firstName"
          variant="outlined"
          margin="normal"
          value={formData.firstName}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Last Name"
          name="lastName"
          variant="outlined"
          margin="normal"
          value={formData.lastName}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          variant="outlined"
          margin="normal"
          value={formData.email}
          onChange={handleChange}
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

        <TextField
          select
          fullWidth
          label="Role"
          name="role"
          variant="outlined"
          margin="normal"
          value={formData.role}
          onChange={handleChange}
        >
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </TextField>

        {error && (
          <Typography color="error" variant="body2" mt={1} mb={2}>
            {error}
          </Typography>
        )}

        <Typography
          variant="caption"
          color="textSecondary"
          display="block"
          mb={2}
        >
          By signing up, you agree to our Terms of Use and Privacy Policy.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSignup}
          disabled={loading}
          size="large"
          sx={{ mt: 1, mb: 2 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Signup"}
        </Button>

        <Box display="flex" justifyContent="space-between" mt={2} fontSize={14}>
          <Typography color="textSecondary">
            Already have an account?
          </Typography>
          <MuiLink
            component={Link}
            to="/login"
            underline="hover"
            color="primary"
          >
            Login
          </MuiLink>
        </Box>
      </Box>
    </Box>
  );
}

export default Signup;
