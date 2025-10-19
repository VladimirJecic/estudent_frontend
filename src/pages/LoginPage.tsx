import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoFonSlova from "@/assets/logo-fon-slova.png";
import { AuthAPIService } from "@/api/auth";
import { useUser } from "@/context/UserContext";
import type { LoginRequest } from "@/types/auth";
import { User } from "@/types/items";

import TextInput from "@/components/custom/TextInput";
import Button from "@/components/custom/Button";
import Container from "@/components/custom/Container";
import { useAlertService } from "@/context/AlertServiceContext";

const LoginPage = () => {
  const [indexNum, setIndexNum] = useState("");
  const [password, setPassword] = useState("");
  const [isCredentialsError, setIsCredentialsError] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();
  const alertService = useAlertService();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCredentialsError(false);
    const loginRequest: LoginRequest = { indexNum, password };
    try {
      const user: User = await AuthAPIService.login(loginRequest);
      if (user) {
        setUser(user);
        navigate("/");
      }
    } catch (error: any) {
      if (error.response?.status === 400) {
        setIsCredentialsError(true);
      } else {
        alertService.error("Došlo je do greške pri prijavljivanju");
      }
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent clearing the input fields
      handleLogin(e);
    }
  };

  return (
    <div className=" d-flex align-items-center justify-content-center bg-primary h-100 w-100">
      <Container className="bg-white h-50 p-5 col-4">
        {/* <img src={logo} className="col-7" alt="User Icon" /> */}
        <img src={logoFonSlova} className="col-5 mt-2" alt="User Icon" />
        <h3 className="mb-4 d-flex justify-content-center col-12 primary-darken-1">
          E-Student
        </h3>
        <form
          className="col-12 mb-2 align-self-center"
          onSubmit={handleLogin}
          onKeyUp={handleKeyUp}
        >
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
          <Button
            type="submit"
            className="m-2"
            onClick={handleLogin}
            title="Uloguj se"
          />
        </form>
      </Container>
    </div>
  );
};

export default LoginPage;
