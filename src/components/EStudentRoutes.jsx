/* eslint-disable react-hooks/exhaustive-deps */
import HomePage from "./homePage/HomePage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import useLoginViewModel from "../viewModel/LoginViewModel";
import SignIn from "./login/SignIn";
import SignUp from "./login/SignUp";
import LoginViewModel from "../viewModel/LoginViewModel";
import { useState, useMemo } from "react";
import { useEffect } from "react";
const EStudentRoutes = () => {
  const loginViewModel = useMemo(() => new LoginViewModel(), []);
  const [loginViewModelState, setLoginViewModelState] = useState(
    loginViewModel.project()
  );

  loginViewModel.updateView = () => {
    setLoginViewModelState(loginViewModel.project());
  };

  useEffect(() => {
    if (
      window.location.pathname.startsWith("/home") &&
      !loginViewModel.isAuthenticated()
    ) {
      window.location.replace("/login");
    }
  }, [loginViewModel]);
  return (
    <BrowserRouter className="App">
      <Routes>
        loginViewModel.isAuthenticated() && (
        <Route
          path="login"
          element={
            <SignIn
              errorMessage={loginViewModelState.errorMessage}
              changeUserData={loginViewModel.changeUserData}
              handleLogin={loginViewModel.handleLogin}
            />
          }
        />
        <Route
          path="signUp"
          element={
            <SignUp
              errorMessage={loginViewModelState.errorMessage}
              changeUserData={loginViewModel.changeUserData}
              handleRegister={loginViewModel.handleRegister}
            />
          }
        />
        <Route path="home/*" element={<HomePage />}></Route>
        )
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default EStudentRoutes;
