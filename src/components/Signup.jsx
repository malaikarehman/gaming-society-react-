import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const[signinData,setSignIn] =useState({
        username: "",
        password: ""
    })


    const [errors, setErrors] = useState({});
    const [isSignUp, setIsSignUp] = useState(true);
    const navigate = useNavigate();

    const toggle = () => {
        const container = document.getElementById('container');
        container.classList.toggle('sign-in');
        container.classList.toggle('sign-up');
        setIsSignUp(!isSignUp);
    };

    useEffect(() => {
        const container = document.getElementById('container');
        setTimeout(() => {
            container.classList.add('sign-in');
        }, 200);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        setSignIn({
            ...signinData,
            [name]: value
        });
    
    };

    const validate = () => {
        let errors = {};
        if (!formData.username) errors.username = 'Username is required';
        if (!formData.email) errors.email = 'Email is required';
        if (!formData.password) errors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
        return errors;
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            console.log('Form data submitted: ', formData);
            axios.post('http://localhost:5001/signup',{
                name: formData.username,
                email: formData.email,
                password: formData.password,
                role: "participant",
                team:"none"
            })
            .then(result => console.log(result))
            .catch(err => console.log(err))

            // Submit form data to the server or handle it as needed
            setFormData({
                username : "",
                email: "",
                password :"",
                confirmPassword:""
            });
        } else {
            setErrors(validationErrors);
        }

      };

    
      axios.defaults.withCredentials = true;
      useEffect(() => {
        axios.get('http://localhost:5001/dashboard')
        .then( res => {
          console.log(res);
          if(res.data.valid){
              navigate('/dashboard');
          }else {
              navigate('/signup');
          }
        })
      })
      const handleSignIn = (e) => {
        e.preventDefault();
        let errors = {};
        if (!signinData.username) errors.username = 'Username is required';
        if (!signinData.password) errors.password = 'Password is required';
        const validationErrors = errors;

        if (Object.keys(validationErrors).length === 0) {
            console.log('Form data submitted: ', signinData);
            axios.post('http://localhost:5001/signin',{
                name: signinData.username,
                password: signinData.password
                })
            .then(result => {
                console.log(result);
                if (result.data.SignIn) {
                    navigate('/dashboard');
                } else {
                    setErrors({ ...errors, server: result.data.message });
                }
                // NavigateBefore('/home')
            })
            .catch(err => {
                console.log(err);
                setErrors({ password: 'An error occurred. Please try again.' });            });

            // Submit form data to the server or handle it as needed
            setSignIn({
                password : "",
                username: ""
            });
            // errors.password = 'Incorrect password of username!';
        } else {
            setErrors(validationErrors);
        }
      };


    return (
        <div id="container" className="container">
            <div className="row">
                {/* SIGN UP */}
                <div className="col align-items-center flex-col sign-up">
                    <div className="form-wrapper align-items-center">
                        <form className="form sign-up" onSubmit={handleSubmit}>
                            <div className="input-group">
                                <i className='bx bxs-user'></i>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                                {errors.username && <span className="error">{errors.username}</span>}
                            </div>
                            <div className="input-group">
                                <i className='bx bx-mail-send'></i>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {errors.email && <span className="error">{errors.email}</span>}
                            </div>
                            <div className="input-group">
                                <i className='bx bxs-lock-alt'></i>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                {errors.password && <span className="error">{errors.password}</span>}
                            </div>
                            <div className="input-group">
                                <i className='bx bxs-lock-alt'></i>
                                <input
                                    type="password"
                                    placeholder="Confirm password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                                {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                            </div>
                            <button type="submit">
                                Sign up
                            </button>
                            <p>
                                <span>Already have an account?</span>
                                <b onClick={toggle} className="pointer">
                                    Sign in here
                                </b>
                            </p>
                        </form>
                    </div>
                </div>
                {/* END SIGN UP */}
                {/* SIGN IN */}
                <div className="col align-items-center flex-col sign-in">
                    <div className="form-wrapper align-items-center">
                        <form className="form sign-in" onSubmit={handleSignIn}>
                            <div className="input-group">
                                <i className='bx bxs-user'></i>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    name="username"
                                    value={signinData.username}
                                    onChange={handleChange}
                                />
                                {errors.username && <span className="error">{errors.username}</span>}
                            </div>
                            <div className="input-group">
                                <i className='bx bxs-lock-alt'></i>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={signinData.password}
                                    onChange={handleChange}
                                />
                                {errors.password && <span className="error">{errors.password}</span>}
                            </div>
                            <button type="submit">
                                Sign in
                            </button>
                            <p>
                               <b className="pointer"><Link to="/forgot-password" style={{ textDecoration: 'none', color: 'inherit' }}>Forgot password?</Link></b>
                            </p>
                            <p>
                                <span>Don't have an account?</span>
                                <b onClick={toggle} className="pointer">
                                    Sign up here
                                </b>
                            </p>
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
                        <h2>Welcome</h2>
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

export default Signup;








// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Signup.css";

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     fullname: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // Validate passwords
//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5000/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           fullname: formData.fullname,
//           email: formData.email,
//           phone: formData.phone,
//           password: formData.password,
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log("Signup successful:", data);
//         // Redirect to login page after successful signup

//         if (data === "Already exist") {
//           alert("Email already registered");
//           navigate("/login");
//         } else {
//           alert("Successfully registered");
//         }
//         navigate("/login");
//       } else {
//         console.error("Signup failed:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error during signup:", error);
//     }
//   };

//   return (
//     <div className="signup-container">
//       <div className="signup-card">
//         <h2>Join Our Gaming Society</h2>
//         <form onSubmit={handleSubmit}>
//           <label htmlFor="fullname">Full Name</label>
//           <input
//             type="text"
//             id="fullname"
//             name="fullname"
//             value={formData.fullname}
//             onChange={handleChange}
//             required
//           />
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           <label htmlFor="phone">Phone Number</label>
//           <input
//             type="tel"
//             id="phone"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             required
//           />
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//           <label htmlFor="confirmPassword">Confirm Password</label>
//           <input
//             type="password"
//             id="confirmPassword"
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             required
//           />

//           <button type="submit">Sign Up</button>
//         </form>
//         <p>
//           Already have an account? <Link to="/login">Login</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;