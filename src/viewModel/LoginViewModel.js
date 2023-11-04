import axios from "axios";
import { useState } from "react";
const { localhost } = require("../assets/config.js");

const LoginViewModel = () => {
  const [warningVisibility, setWarningVisibility] = useState(false);
  const [loginMode, setLoginMode] = useState("sign_in");
  const [userData, setUserData] = useState({
    indexNum: "",
    password: "",
    token: "",
  });

  const changeLoginMode = () => {
    setWarningVisibility(false);
    setLoginMode(loginMode === "sign_in" ? "sign_up" : "sign_in");
  };
  const changeUserData = (event) => {
    userData[event.target.name] = event.target.value;
    setUserData(userData);
  };
  const handleLogin = async (event, navigate) => {
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
        setWarningVisibility(true); // Set warning if login fails
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleRegister = (event, navigate) => {
    event.preventDefault();
    setWarningVisibility(true);
    //if login fails setWarning(true);
    //else set auth_token and navigate("/home");
  };
  return {
    warningVisibility,
    loginMode,
    userData,
    changeLoginMode,
    changeUserData,
    handleLogin,
    handleRegister,
  };
};
export default LoginViewModel;
