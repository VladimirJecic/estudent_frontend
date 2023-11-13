import axios from "axios";
import { useState } from "react";
import User from "../model/User.js";
const { localhost } = require("../assets/config.js");

const LoginViewModel = () => {
  const [warningVisibility, setWarningVisibility] = useState(false);
  const [loginMode, setLoginMode] = useState("sign_in");
  const [user, setUser] = useState(new User());

  const changeLoginMode = () => {
    setWarningVisibility(false);
    setLoginMode(loginMode === "sign_in" ? "sign_up" : "sign_in");
  };
  const changeUserData = (event) => {
    const newUser = { ...user };
    switch (event.target.name) {
      case "name":
        newUser.name = event.target.value;
        break;
      case "indexNum":
        newUser.indexNum = event.target.value;
        break;
      case "password":
        newUser.password = event.target.value;
        break;
      case "confirmPassword":
        newUser.confirmPassword = event.target.value;
        break;
      default:
        console.error("Undefined value in changeUserData");
        return;
    }
    setUser(newUser);
  };
  const handleLogin = async (event, navigate) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${localhost}:8000/api/login`, {
        indexNum: user.indexNum,
        password: user.password,
        token: user.token,
      });
      if (response.data.success === true) {
        console.log(response.data);
        // Set the access token in session storage
        const token = response.data.data.token;
        window.sessionStorage.setItem("auth_token", token);
        user.token = token;
        setUser(user);
        navigate("/home/rokovi"); // Navigate to the home route
      } else {
        setWarningVisibility(true); // Set warning if login fails
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleRegister = async (event, navigate) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${localhost}:8000/api/login`, {
        indexNum: user.indexNum,
        name: user.name,
        password: user.password,
        c_password: user.confirmPassword,
      });
      if (response.data.success === true) {
        console.log(response.data);
        // Set the access token in session storage
        const token = response.data.data.token;
        window.sessionStorage.setItem("auth_token", token);
        user.token = token;
        setUser(user);
        navigate("/home"); // Navigate to the home route
      } else {
        setWarningVisibility(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return {
    warningVisibility,
    loginMode,
    changeLoginMode,
    changeUserData,
    handleLogin,
    handleRegister,
  };
};
export default LoginViewModel;
