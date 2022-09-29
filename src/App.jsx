import React from "react";
import { Route, Routes } from "react-router-dom";
import FormsLogin from "./components/Forms/FormsLogin";
import FormsRegister from "./components/Forms/FormsRegister";
import DashboardImages from "./components/Dashboard/DashboardImages";
import ShowImage from "./components/pages/ShowImage";
import UploadImage from "./components/pages/UploadImage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<FormsLogin />} />
        <Route exact path="register/" element={<FormsRegister />} />
        <Route exact path="dashboard/images/" element={<DashboardImages />} />
        <Route exact path="dashboard/images/:id/" element={<ShowImage />} />
        <Route
          exact
          path="dashboard/images/upload/"
          element={<UploadImage />}
        />
      </Routes>
    </div>
  );
}

export default App;
