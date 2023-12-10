import axios from "axios";
import User from "../model/User.js";
const { localhost } = require("../assets/config.js");

export default class LoginViewModel {
  warningVisibility;
  loginMode;
  user;
  updateView;

  constructor() {
    this.warningVisibility = false;
    this.loginMode = "sign_in";
    this.user = new User();
    this.updateView = undefined;
  }
  copy = () => {
    const copyOfThis = new LoginViewModel();
    copyOfThis.warningVisibility = this.warningVisibility;
    copyOfThis.loginMode = this.loginMode;
    copyOfThis.user = this.user;
    copyOfThis.updateView = this.updateView;
    return copyOfThis;
  };
  changeLoginMode = () => {
    this.warningVisibility = false;
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
        const token = response.data.data.token;
        window.sessionStorage.setItem("auth_token", token);
        this.user.token = token;
        this.updateView?.();
        navigate("/home/rokovi"); // Navigate to the home route
      } else {
        this.warningVisibility = true; // Set warning if login fails
      }
    } catch (error) {
      console.log(error);
    }
  };
  handleRegister = async (event, navigate) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${localhost}:8000/api/login`, {
        indexNum: this.user.indexNum,
        name: this.user.name,
        password: this.user.password,
        c_password: this.user.confirmPassword,
      });
      if (response.data.success === true) {
        console.log(response.data);
        // Set the access token in session storage
        const token = response.data.data.token;
        window.sessionStorage.setItem("auth_token", token);
        this.user.token = token;
        this.updateView?.();
        navigate("/home/rokovi"); // Navigate to the home route
      } else {
        this.warningVisibility = true;
      }
    } catch (error) {
      console.log(error);
    }
  };
}
