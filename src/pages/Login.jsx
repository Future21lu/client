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
  Alert,
  Fade,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Person as PersonIcon,
  Lock as LockIcon,
  LocalHospital as HospitalIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (username === "admin" && password === "admin123") {
      setLoading(false);
      navigate("/admin-dashboard");
    } else if (username === "doctor" && password === "doctor123") {
      setLoading(false);
      navigate("/dashboard");
    } else if (username === "opd" && password === "opd123") {
      setLoading(false);
      navigate("/opd-counter");
    } else {
      setLoading(false);
      setError("Invalid credentials. Please check your username and password.");
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Container maxWidth="xs">
        <Fade in={true} timeout={800}>
          <Paper 
            elevation={24} 
            sx={{ 
              p: 4, 
              borderRadius: 4,
              backdropFilter: 'blur(20px)',
              background: 'rgba(255, 255, 255, 0.95)',
              boxShadow: '0 24px 48px rgba(0,0,0,0.2)'
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <HospitalIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
              <Typography variant="h4" fontWeight="bold" color="primary.main" gutterBottom>
                CliniQ
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Hospital Management System
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
                required
                disabled={loading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  '& .MuiOutlinedInput-root': { 
                    borderRadius: 2,
                    '&:hover': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.main',
                      },
                    },
                  } 
                }}
              />
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                disabled={loading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        disabled={loading}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  '& .MuiOutlinedInput-root': { 
                    borderRadius: 2,
                    '&:hover': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.main',
                      },
                    },
                  } 
                }}
              />
              
              <FormControlLabel
                control={<Checkbox disabled={loading} />}
                label="Remember me"
                sx={{ mt: 2, mb: 2 }}
              />
              
              <Button 
                type="submit" 
                fullWidth 
                variant="contained" 
                size="large"
                disabled={loading}
                sx={{ 
                  mt: 2, 
                  mb: 2,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  boxShadow: '0 8px 24px rgba(25, 118, 210, 0.3)',
                  '&:hover': {
                    boxShadow: '0 12px 32px rgba(25, 118, 210, 0.4)'
                  }
                }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                Demo Credentials:
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Typography variant="caption" color="textSecondary">
                  <strong>Admin:</strong> admin / admin123
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  <strong>Doctor:</strong> doctor / doctor123
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  <strong>OPD Counter:</strong> opd / opd123
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Fade>
        
        <Typography
          variant="caption"
          align="center"
          sx={{ 
            color: "rgba(255,255,255,0.8)", 
            mt: 3, 
            display: "block",
            textShadow: '0 1px 2px rgba(0,0,0,0.3)'
          }}
        >
          © 2024 Manmed Dynamics. All rights reserved.
          </Typography>
      </Container>
    </Box>
  );
}
