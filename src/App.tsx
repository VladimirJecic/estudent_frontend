import { AppLayout } from "@/layout/AppLayout";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import { UserProvider } from "@/context/UserContext";
import { AlertServiceProvider } from "@/context/AlertServiceContext";
import RequireAuth from "@/context/RequireAuth";
import { routes } from "@/routes";

const App = () => {
  return (
    <div className="App">
      <UserProvider>
        <AlertServiceProvider>
          <BrowserRouter basename="/estudent">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<AppLayout />}>
                {routes.map(({ path, element }) => (
                  <Route
                    key={path}
                    path={path}
                    element={<RequireAuth>{element}</RequireAuth>}
                  />
                ))}
              </Route>
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </BrowserRouter>
        </AlertServiceProvider>
      </UserProvider>
    </div>
  );
};

export default App;
