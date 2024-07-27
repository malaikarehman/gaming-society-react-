import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Typography, Container, CssBaseline } from "@mui/material";

export default function Home() {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Welcome to the Gaming Society Web App
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Link>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
