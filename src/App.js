import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { CitizenLogIn } from "./pages/CitizenLogIn";
import { CitizenSignUp } from "./pages/CitizenSignUp/index";
import { CityServiceLogIn } from "./pages/CityServiceLogIn/index";
import initializeI18n from "./utils/internationalization/initialize";

initializeI18n();

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/CityReportSystem/citizen"
          exact
          element={<CitizenLogIn />}
        ></Route>
        <Route
          path="/CityReportSystem"
          exact
          element={<CitizenLogIn />}
        ></Route>
        <Route
          path="/CityReportSystem/citizen/login"
          exact
          element={<CitizenLogIn />}
        ></Route>
        <Route
          path="/CityReportSystem/cityService/login"
          exact
          element={<CityServiceLogIn />}
        ></Route>
        <Route
          path="/CityReportSystem/citizen/signup"
          exact
          element={<CitizenSignUp />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
