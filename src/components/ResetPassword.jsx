import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';// import { Link } from "react-router-dom"
import './Signup.css';
import { Password } from '@mui/icons-material';

const ForgotPassword = () => {
    
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
});

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const {id, token} = useParams()//react roter down hooks to distract variables from url

    useEffect(() => {
        const container = document.getElementById('container');
        setTimeout(() => {
            container.classList.add('sign-up');
        }, 200);
    }, []);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
          ...formData,
          [name]: value
      });
  };

  const validate = () => {
    let errors = {};
    if (!formData.password) errors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
    return errors;
};

const handleSubmit = (e) => {
  e.preventDefault();
  const validationErrors = validate();
  if (Object.keys(validationErrors).length === 0) {
      console.log('Form data submitted: ', formData);
      axios.post(`http://localhost:5001/reset-password/${id}/${token}`, {password: formData.password})
      .then(result => {
        console.log(result)
        if(result.data.message === "success"){
          alert("Password changed successfully!")
          navigate("/signin");
      }
  })
      .catch(err => console.log(err))

      setFormData({
          password :"",
          confirmPassword:""
      });
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
                                Update
                            </button>
                        </form>
                    </div>
                </div>
                {/* END SIGN UP */}
                {/* SIGN IN */}
                <div className="col align-items-center flex-col sign-in">
                    <div className="form-wrapper align-items-center">
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
                       
                    </div>
                    <div className="img sign-in"></div>
                </div>
                {/* END SIGN IN CONTENT */}
                {/* SIGN UP CONTENT */}
                <div className="col align-items-center flex-col">
                    <div className="img sign-up"></div>
                    <div className="text sign-up">
                        <h2>Wlcome Back</h2>
                    </div>
                </div>
                {/* END SIGN UP CONTENT */}
            </div>
            {/* END CONTENT SECTION */}
        </div>
    );
};

export default ForgotPassword;
