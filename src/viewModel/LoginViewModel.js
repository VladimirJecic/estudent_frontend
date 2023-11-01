import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const { localhost } = require("../assets/config.js");

const LoginViewModel = () => {
  const navigate = useNavigate();
  const [warning, setWarning] = useState(false);
  const [signMode, setLoginMode] = useState("sign_in");
  const [userData, setUserData] = useState({
    indexNum: "",
    password: "",
    token: "",
  });

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${localhost}:8000/api/login`,
        userData
      );
      if (response.data.success === true) {
        console.log(response.data);
        // Set the access token in session storage
        window.sessionStorage.setItem("auth_token", response.data.data.token);
        navigate("/home"); // Navigate to the home route
      } else {
        setWarning(true); // Set warning if login fails
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleRegister = (event) => {
    event.preventDefault();
    setWarning(true);
    //if login fails setWarning(true);
    //else set auth_token and navigate("/home");
  };
  const handleUserDataChanged = (event) => {
    userData[event.target.name] = event.target.value;
    setUserData(userData);
  };
  const changeLoginMode = () => {
    setWarning(false);
    setLoginMode("sign_in");
  };
};
export default LoginViewModel;
