import React, { useState } from "react";
import { Box, Button, TextField, Typography, Container, CssBaseline, Link } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from '@react-oauth/google';
// import { useGoogleLogin } from '@react-oauth/google';

export default function Login() {
  const handleSuccess = (credentialResponse) => {
    console.log('Google login successful', credentialResponse);
    const authorizationCode = credentialResponse.code;

    fetch('/api/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: authorizationCode }),
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from your backend server
      console.log('Login successful, backend response:', data);
    })
    .catch(error => {
      // Handle errors in communicating with your backend server
      console.error('Error exchanging authorization code:', error);
    });
  };

  const handleError = (errorResponse) => {
    console.error('Google login failed', errorResponse);
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
      useOneTap
        flow="auth-code"
    />
  );
}
