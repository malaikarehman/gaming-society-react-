import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="119124985369-h9qu4b3357qsond61kqh8dqn03jfn75q.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
  </React.StrictMode>,
  // document.getElementById("root")
)
