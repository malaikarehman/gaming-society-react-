import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';// import { Link } from "react-router-dom"
import './Signup.css';

const ForgotPassword = () => {
    
    const[email, setEmail] = useState("");

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const container = document.getElementById('container');
        setTimeout(() => {
            container.classList.add('sign-in');
        }, 200);
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email)  { 
            errors.email = 'Email is required';
        }else{
            
            if (Object.keys(errors).length === 0) {
                console.log('Form data submitted: ', email);
                
                axios.post('http://localhost:5001/forgot-password', { email })
                .then(result => {
                    console.log(result);
                    if(result.data.message === "success"){
                        // navigate("/login");
                    }
                })
                .catch(err => console.log(err));
                
                setEmail(""); 
            } else {
                setErrors(errors);
            }
        }

      };


    return (
        <div id="container" className="container">
            <div className="row">
                {/* SIGN UP */}
                <div className="col align-items-center flex-col sign-up">
                    <div className="form-wrapper align-items-center">
                    </div>
                </div>
                {/* END SIGN UP */}
                {/* SIGN IN */}
                <div className="col align-items-center flex-col sign-in">
                    <div className="form-wrapper align-items-center">
                        <form className="form sign-in" onSubmit={handleSubmit}>
                            <div className="input-group">
                                <i className='bx bxs-user'></i>
                                <input
                                    type="text"
                                    placeholder="Email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <span className="error">{errors.email}</span>}
                            </div>
                            <button type="submit">
                                Send
                            </button>
                            {/* <p>
                                <span>Already have an account?</span>
                                <b className="pointer">
                                   <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>
                                   Sign in here
                                   </Link> 
                                </b>
                            </p> */}
                        </form>
                    </div>
                </div>
                {/* END SIGN IN */}
            </div>
            {/* END FORM SECTION */}
            {/* CONTENT SECTION */}
            <div className="row content-row">
                {/* SIGN IN CONTENT */}
                <div className="col align-items-center flex-col">
                    <div className="text sign-in">
                        <h2>Oops</h2>
                    </div>
                    <div className="img sign-in"></div>
                </div>
                {/* END SIGN IN CONTENT */}
                {/* SIGN UP CONTENT */}
                <div className="col align-items-center flex-col">
                    <div className="img sign-up"></div>
                    <div className="text sign-up">
                        <h2>Join with us</h2>
                    </div>
                </div>
                {/* END SIGN UP CONTENT */}
            </div>
            {/* END CONTENT SECTION */}
        </div>
    );
};

export default ForgotPassword;
