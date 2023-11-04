import HomePage from "./HomePage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
//import useHomePageViewModel from "../viewModel/HomePageViewModel";
import useLoginViewModel from "../viewModel/LoginViewModel";
import SignIn from "./loginComponents/SignIn";
import SignUp from "./loginComponents/SignUp";

const EStudentRoutes = () => {
  const loginViewModel = useLoginViewModel();
  // const homePageViewModel = useHomePageViewModel();
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path="/*" element={<Navigate to="/login" />} />
        <Route
          path="/login"
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
        <Route path="/home" element={<HomePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default EStudentRoutes;
