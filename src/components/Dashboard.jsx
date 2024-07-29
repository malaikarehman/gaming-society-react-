import React, { useEffect, useState } from "react";
import { useNavigate, Link} from "react-router-dom";
import { Button } from '@mui/material';
import axios from 'axios';

export default function Dashboard() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:5001/dashboard')
    .then( res => {
      console.log(res);
      if(res.data.valid){
          setName(res.data.username);
      }else {
          navigate('/signup');
      }
    })
  })
  return (
    <div>
      <h1>Welcome to the Dashboard {name}!</h1>
      <p>This is the main area where you can access your gaming society features.</p>
      <Link to='/addEvent' >
      <Button>Add Event</Button>
      </Link>
    </div>
  );
}
