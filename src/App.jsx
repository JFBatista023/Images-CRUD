import React from "react";
import { Route, Routes } from "react-router-dom";
import FormsLogin from "./components/Forms/FormsLogin";
import FormsRegister from "./components/Forms/FormsRegister";
import DashboardImages from "./components/Dashboard/DashboardImages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<FormsLogin />} />
        <Route exact path="register/" element={<FormsRegister />} />
        <Route exact path="dashboard/images/" element={<DashboardImages />} />
      </Routes>
    </div>
  );
}

export default App;
