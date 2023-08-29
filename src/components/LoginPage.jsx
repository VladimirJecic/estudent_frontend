// import { useState } from "react";
import axios from "axios";
// import {Link} from "react-router-dom";
import "../assets/LoginPage.css";
import logo from "../assets/logo-small.jpg";
import { useNavigate } from "react-router-dom";
import "../assets/LoginPage.css";
import { useState, useEffect } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const handleLogin = (event) => {
    event.preventDefault();
    //if login fails setWarning(true);
    //else set auth_token and navigate("/home");
  };
  const handleRegister = (event) => {
    event.preventDefault();
    setWarning(true);
    //if login fails setWarning(true);
    //else set auth_token and navigate("/home");
  };
  const [warning, setWarning] = useState(false);
  const [signMode, setSignMode] = useState("sign_in");
  const [content, setContent] = useState("null");
  useEffect(() => {
    switch (signMode) {
      case "sign_in":
        setContent(
          <form onSubmit={handleLogin}>
            <input
              type="text"
              className="fadeIn second"
              name="login"
              placeholder="login"
            />
            <input
              type="text"
              className="fadeIn third"
              name="text"
              placeholder="password"
            />
            <p className={`warning ${warning ? "" : "hidden"}`} role="alert">
              That was the wrong username or password. Please try again.
            </p>
            <input type="submit" className="fadeIn fourth" value="Log In" />
          </form>
        );
        break;
      case "sign_up":
        setContent(
          <form onSubmit={handleRegister}>
            <input
              type="text"
              className="fadeIn first"
              name="username"
              placeholder="username"
            />
            <input
              type="text"
              className="fadeIn second"
              name="password"
              placeholder="password"
            />
            <input
              type="text"
              className="fadeIn third"
              name="confirm_password"
              placeholder="confirm password"
            />
            <br></br>
            <p className={`warning ${warning ? "" : "hidden"}`} role="alert">
              Passwords do not match. Please try again.
            </p>

            <input type="submit" className="fadeIn fourth" value="Register" />
          </form>
        );
        break;
      default:
        setContent(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signMode, warning]);
  /* prettier-ignore */
  // eslint-disable-next-line no-lone-blocks
  {
  return (
    <div className="wrapper fadeInDown loginRoot">
      <div className="formContent">
        <h2 className={`${signMode === "sign_in" ? "active": "inactive underlineHover"}`} onClick={() => {setWarning(false); setSignMode("sign_in")}}>
          Sign In
        </h2>
        <h2 className={`${signMode === "sign_up" ? "active": "inactive underlineHover"}`} onClick={() => {setWarning(false); setSignMode("sign_up")}}>
          Sign up
        </h2>
        <div className="fadeIn first">
          <img src={logo} className="icon" alt="User Icon" />
        </div>
        {content}
      </div>
    </div>
  );
 }
};

export default LoginPage;
