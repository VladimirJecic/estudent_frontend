import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo-small.jpg";
import { AuthAPIService } from "@/api/auth";
import { useUser } from "@/context/UserContext";
import type { LoginRequest } from "@/types/auth";

import alertService from "@/services/AlertService";
import { User } from "@/types/items";

const LoginPage = () => {
  const [indexNum, setIndexNum] = useState("");
  const [password, setPassword] = useState("");
  const [isCredentialsError, setIsCredentialsError] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCredentialsError(false);
    const loginRequest: LoginRequest = { indexNum, password };
    try {
      const user: User = await AuthAPIService.login(loginRequest);
      user.isAdmin = user.role === "admin";
      if (user) {
        setUser(user);
        navigate("/rokovi");
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        setIsCredentialsError(true);
      } else {
        alertService.error("Nema odgovora sa servera");
      }
    }
  };

  return (
    <div className="wrapper fadeInDown loginRoot">
      <div className="formContent">
        <div className="fadeIn first">
          <img src={logo} className="icon" alt="User Icon" />
        </div>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            className="fadeIn second"
            name="indexNum"
            placeholder="20xx/xxxx"
            value={indexNum}
            onChange={(e) => setIndexNum(e.target.value)}
          />
          <input
            type="password"
            className="fadeIn third"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isCredentialsError && (
            <div className="warning" role="alert">
              <p className="errLine">
                Pogrešan userName ili password
                <br />
              </p>
            </div>
          )}
          <input type="submit" className="fadeIn fourth" value="Log In" />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
