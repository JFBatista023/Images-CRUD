import React from "react";
import { Route, Routes } from "react-router-dom";
import FormsLogin from "./components/Forms/FormsLogin";
import FormsRegister from "./components/Forms/FormsRegister";
import DashboardImages from "./components/Dashboard/DashboardImages";
import UploadImage from "./components/pages/UploadImage";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route
              exact
              path="dashboard/images/upload/"
              element={<UploadImage />}
            />
            <Route
              exact
              path="dashboard/images/"
              element={<DashboardImages />}
            />
          </Route>
          <Route exact path="/register" element={<FormsRegister />} />
          <Route exact path="/login" element={<FormsLogin />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
