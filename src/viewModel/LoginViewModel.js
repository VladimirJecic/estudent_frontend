import axios from "axios";
import User from "../model/User.js";
const { localhost } = require("../assets/config.js");

export default class LoginViewModel {
  loginMode;
  user;
  updateView;
  errorMessage;

  constructor() {
    this.loginMode = "sign_in";
    this.user = new User();
    this.updateView = undefined;
    this.errorMessage = undefined;
  }
  project = () => {
    return {
      loginMode: this.loginMode,
      user: this.user,
      errorMessage: this.errorMessage,
    };
  };
  changeLoginMode = () => {
    this.errorMessage = undefined;
    this.loginMode = this.loginMode === "sign_in" ? "sign_up" : "sign_in";
    this.updateView?.();
  };
  changeUserData = (event) => {
    switch (event.target.name) {
      case "name":
        this.user.name = event.target.value;
        break;
      case "indexNum":
        this.user.indexNum = event.target.value;
        break;
      case "password":
        this.user.password = event.target.value;
        break;
      case "confirmPassword":
        this.user.confirmPassword = event.target.value;
        break;
      default:
        console.error("Undefined value in changeUserData");
        return;
    }
    this.updateView?.();
  };
  handleLogin = async (event, navigate) => {
    this.errorMessage = undefined;
    event.preventDefault();
    try {
      const response = await axios.post(`${localhost}:8000/api/login`, {
        indexNum: this.user.indexNum,
        password: this.user.password,
        token: this.user.token,
      });
      if (response.data.success === true) {
        console.log(response.data);
        // Set the access token in session storage
        this.user.fromJSON(response.data.data);
        window.sessionStorage.setItem("user", JSON.stringify(this.user));
        navigate("/home/rokovi"); // Navigate to the home route
      } else {
        this.errorMessage = response.data.message;
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 404) {
        this.errorMessage =
          "That was the wrong username or password. Please try again.";
      } else {
        this.errorMessage = error.response.data.message;
      }
    }
    this.updateView?.();
  };
  handleRegister = async (event, navigate) => {
    this.errorMessage = undefined;
    event.preventDefault();
    try {
      const response = await axios.post(`${localhost}:8000/api/register`, {
        indexNum: this.user.indexNum,
        name: this.user.name,
        password: this.user.password,
        confirmPassword: this.user.confirmPassword,
      });
      if (response.data.success === true) {
        console.log(response.data);
        // Set the access token in session storage
        this.user.fromJSON(response.data.data);
        window.sessionStorage.setItem("user", JSON.stringify(this.user));
        this.updateView?.();
        navigate("/home/rokovi"); // Navigate to the home route
      } else {
        this.errorMessage = response.data.message;
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        this.errorMessage =
          error.response.data.message +
          "Only admin users can create new accounts.";
      }
    }
    this.updateView?.();
  };
}
