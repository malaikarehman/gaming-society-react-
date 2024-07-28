import React, { useState } from "react";
import { Box, Button, TextField, Typography, Container, CssBaseline, Link } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';

export default function Login() {
  return(
    <GoogleLogin
  onSuccess={credentialResponse => {
    const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
    console.log(credentialResponseDecoded);
  }}
  onError={() => {
    console.log('Login Failed');
  }} />
  );
}
