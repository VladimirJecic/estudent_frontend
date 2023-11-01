import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import EStudentViewModel from "../viewModel/EStudentViewModel";

const EStudentRoutes = () => {
  let viewModel = new EStudentViewModel();
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<Navigate to="/login" />} />
        <Route path="/home" element={<HomePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default EStudentRoutes;
