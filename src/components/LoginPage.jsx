// import { useState } from "react";
// import axios from "axios";
// import {Link} from "react-router-dom";
import '../assets/LoginPage.css';
import logo from '../assets/logo-small.jpg';
import { useNavigate } from "react-router-dom";
import '../assets/LoginPage.css'

const LoginPage = () => {
    const navigate = useNavigate();
    const handleSubmit = (event)=>{
        event.preventDefault();
        navigate("/home")
    }

    return (
        <div className="wrapper fadeInDown loginRoot">
        <div className="formContent">
          <h2 className="active"> Sign In </h2>
          <h2 className="inactive underlineHover">Sign Up </h2>

          <div className="fadeIn first">
            <img src={logo} className="icon" alt="User Icon" />
          </div>
      
          <form onSubmit={handleSubmit}>
            <input type="text" className="fadeIn second" name="login" placeholder="login"/>
            <input type="text" className="fadeIn third" name="text" placeholder="password"/>
            <input type="submit" className="fadeIn fourth" value="Log In"/>
          </form>
        </div>
        </div>

    );
  };
  
  export default LoginPage