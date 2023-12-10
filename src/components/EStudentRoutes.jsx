/* eslint-disable react-hooks/exhaustive-deps */
import HomePage from "./homePage/HomePage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import useLoginViewModel from "../viewModel/LoginViewModel";
import SignIn from "./login/SignIn";
import SignUp from "./login/SignUp";
import LoginViewModel from "../viewModel/LoginViewModel";
import { useState } from "react";

const EStudentRoutes = () => {
  const [loginViewModel, setLoginViewModel] = useState(new LoginViewModel());
  loginViewModel.updateView = () => {
    setLoginViewModel(loginViewModel.copy());
  };
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path="/*" element={<Navigate to="/login" />} />
        <Route
          path="login"
          element={
            loginViewModel.loginMode === "sign_in" ? (
              <SignIn
                warningVisibility={loginViewModel.warningVisibility}
                changeLoginMode={loginViewModel.changeLoginMode}
                changeUserData={loginViewModel.changeUserData}
                handleLogin={loginViewModel.handleLogin}
              />
            ) : (
              <SignUp
                warningVisibility={loginViewModel.warningVisibility}
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
