// doctor-frontend/src/pages/Login.jsx
import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Link,
  Box,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin123") {
      navigate("/admin-dashboard");
    } else if (username === "doctor" && password === "doctor123") {
      navigate("/dashboard");
    } else if (username === "opd" && password === "opd123") {
      navigate("/opd-counter");
    } else {
      alert("Invalid credentials. Try: admin/admin123, doctor/doctor123, or opd/opd123");
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: "url('/login-bg.jpg')",
        backgroundSize: "cover",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="xs">
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Log in
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Remember me"
            />
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Box>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Log in
            </Button>
          </form>
          <Box mt={2} textAlign="center">
            <Link href="#" variant="body2">
              Or Sign Up
            </Link>
          </Box>
        </Paper>
        <Typography
          variant="caption"
          align="right"
          sx={{ color: "white", mt: 4, display: "block" }}
        >
          © Manmed Dynamics
        </Typography>
      </Container>
    </Box>
  );
}
