import axios from "axios";
import User from "../model/User.js";
const { localhost } = require("../assets/config.js");

export default class LoginViewModel {
  #user;
  #errorMessage;
  #successMessage;
  updateView;

  constructor() {
    this.#user = new User();
    this.#errorMessage = undefined;
    this.#successMessage = undefined;
    this.updateView = undefined;
  }
  project = () => {
    return {
      user: this.#user,
      errorMessage: this.#errorMessage,
      successMessage: this.#successMessage,
    };
  };
  changeUserData = (event) => {
    switch (event.target.name) {
      case "name":
        this.#user.name = event.target.value;
        break;
      case "indexNum":
        this.#user.indexNum = event.target.value;
        break;
      case "password":
        this.#user.password = event.target.value;
        break;
      case "confirmPassword":
        this.#user.confirmPassword = event.target.value;
        break;
      default:
        console.error("Unexpected target.name in changeUserData");
        return;
    }
    this.updateView?.();
  };
  handleLogin = async (event, navigate) => {
    event.preventDefault();
    this.#errorMessage = undefined;
    try {
      const response = await axios.post(`${localhost}:8000/api/login`, {
        indexNum: this.#user.indexNum,
        password: this.#user.password,
        token: this.#user.token,
      });
      if (response.data.success === true) {
        console.log(response.data);
        // Set the access token in session storage
        this.#user.withJSON(response.data.data);
        window.sessionStorage.setItem("user", JSON.stringify(this.#user));
        navigate("/home/rokovi"); // Navigate to the home route
      }
    } catch (error) {
      console.log(error);
      if (error.response === undefined) {
        this.#errorMessage = "No response from server";
      } else if (error.response?.status === 401) {
        this.#errorMessage =
          "That was the wrong username or password. Please try again.";
      } else {
        this.#errorMessage = error.response?.data?.message;
      }
    }
    this.updateView?.();
  };
  handleRegister = async (event) => {
    event.preventDefault();
    this.#errorMessage = undefined;
    const token = LoginViewModel.getStoredUser()?.token;
    const data = JSON.stringify({
      indexNum: this.#user.indexNum,
      name: this.#user.name,
      password: this.#user.password,
      confirmPassword: this.#user.confirmPassword,
    });
    const config = {
      method: "post",
      url: "http://localhost:8000/api/register",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data,
    };
    try {
      const response = await axios.request(config);
      if (response.data.success === true) {
        console.log(response.data);
        this.#user.withJSON(response.data.data);
        this.#successMessage = `
          name: ${this.#user.name}\n
          indexNum: ${this.#user.indexNum}\n
          email: ${this.#user.email}\n
          role: ${this.#user.role}\n
          `; //token: ${this.#user.token}
      }
    } catch (error) {
      console.log(error);

      if (error.response === undefined) {
        this.#errorMessage = "No response from server";
      } else if (error.response?.status === 409) {
        this.#errorMessage = error.response?.data?.message;
      } else if (error.response?.status === 400) {
        this.#errorMessage = JSON.stringify(error.response?.data?.data);
      } else {
        alert(JSON.stringify(error.response?.data?.data));
      }
    }
    this.updateView?.();
  };
  static getStoredUser = () => {
    const jsonUser = JSON.parse(sessionStorage.getItem("user"));
    return jsonUser ? new User().withJSON(jsonUser) : undefined;
  };

  hideWindow = () => {
    this.#successMessage = undefined;
    this.updateView?.();
  };
}
