import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoFonSlova from "@/assets/logo-fon-slova.png";
import { AuthAPIService } from "@/api/auth";
import { useUser } from "@/context/UserContext";
import type { LoginRequest } from "@/types/auth";

import alertService from "@/services/AlertService";
import { User } from "@/types/items";

import TextInput from "../custom/TextInput";
import Buton from "../custom/Buton";
import Container from "../custom/Container";

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
    <Container className="bg-white h-50 w-100 mx-5 px-5">
      {/* <img src={logo} className="col-7" alt="User Icon" /> */}
      <img src={logoFonSlova} className="col-5" alt="User Icon" />
      <h4 className="mb-4 d-flex justify-content-center col-12 primary-darken-1">
        E-Student
      </h4>
      <form className="col-12 align-self-center" onSubmit={handleLogin}>
        <TextInput
          className="m-2"
          prependIcon="fa-user"
          value={indexNum}
          onChange={setIndexNum}
          placeholder="Broj indexa u formatu 20xx/xxxx"
          isClearable
          errorMessage={
            isCredentialsError
              ? "Pogrešan broj indeksa ili password"
              : undefined
          }
        />
        <TextInput
          type="password"
          className="m-2"
          value={password}
          prependIcon="fa-lock"
          onChange={setPassword}
          placeholder="Lozinka"
          errorMessage={
            isCredentialsError
              ? "Pogrešan broj indeksa ili password"
              : undefined
          }
        />
        <Buton type="submit" className="m-2">
          Uloguj se
        </Buton>
      </form>
    </Container>
  );
};

export default LoginPage;
