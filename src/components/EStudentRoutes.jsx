import HomePage from "./homePage/HomePage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
        {LoginViewModel.getStoredUser()?.isAdmin() && (
          <Route
            path="signUp"
            element={
              <SignUp
                errorMessage={loginViewModelState.errorMessage}
                successMessage={loginViewModelState.successMessage}
                changeUserData={loginViewModel.changeUserData}
                handleRegister={loginViewModel.handleRegister}
                hideWindow={loginViewModel.hideWindow}
              />
            }
          />
        )}
        <Route path="home/*" element={<HomePage />}></Route>
        <Route path="/*" element={<Navigate to="login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default EStudentRoutes;
