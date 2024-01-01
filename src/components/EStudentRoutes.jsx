/* eslint-disable react-hooks/exhaustive-deps */
import HomePage from "./homePage/HomePage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import useLoginViewModel from "../viewModel/LoginViewModel";
import SignIn from "./login/SignIn";
import SignUp from "./login/SignUp";
import LoginViewModel from "../viewModel/LoginViewModel";
import { useState, useMemo } from "react";

const EStudentRoutes = () => {
  const loginViewModel = useMemo(() => new LoginViewModel(), []);
  const [loginViewModelState, setLoginViewModelState] = useState(
    loginViewModel.project()
  );

  loginViewModel.updateView = () => {
    setLoginViewModelState(loginViewModel.project());
  };
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path="/*" element={<Navigate to="/login" />} />
        <Route
          path="login"
          element={
            loginViewModelState.loginMode === "sign_in" ? (
              <SignIn
                warningVisibility={loginViewModelState.warningVisibility}
                changeLoginMode={loginViewModel.changeLoginMode}
                changeUserData={loginViewModel.changeUserData}
                handleLogin={loginViewModel.handleLogin}
              />
            ) : (
              <SignUp
                warningVisibility={loginViewModelState.warningVisibility}
                changeLoginMode={loginViewModel.changeLoginMode}
                changeUserData={loginViewModel.changeUserData}
                handleRegister={loginViewModel.handleRegister}
              />
            )
          }
        />
        <Route path="home/*" element={<HomePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default EStudentRoutes;
