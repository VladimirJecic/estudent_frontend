import axios from "axios";
import { useState } from "react";
import createUser from "../model/factory/UserFactory.js";
const { localhost } = require("../assets/config.js");

const LoginViewModel = () => {
  const [warningVisibility, setWarningVisibility] = useState(false);
  const [loginMode, setLoginMode] = useState("sign_in");
  const user = createUser();

  const changeLoginMode = () => {
    setWarningVisibility(false);
    setLoginMode(loginMode === "sign_in" ? "sign_up" : "sign_in");
  };
  const changeUserData = (event) => {
    switch (event.target.name) {
      case "indexNum":
        user.setIndexNum(event.target.value);
        break;
      case "password":
        user.setPassword(event.target.value);
        break;
      default:
        console.error("Undefined value in changeUserData");
    }
  };
  const handleLogin = async (event, navigate) => {
    event.preventDefault();
    console.log(user.toJSON());
    try {
      const response = await axios.post(
        `${localhost}:8000/api/login`,
        user.toJSON()
      );
      if (response.data.success === true) {
        console.log(response.data);
        // Set the access token in session storage
        const token = response.data.data.token;
        window.sessionStorage.setItem("auth_token", token);
        user.setToken(token);
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
    user,
    changeLoginMode,
    changeUserData,
    handleLogin,
    handleRegister,
  };
};
export default LoginViewModel;
