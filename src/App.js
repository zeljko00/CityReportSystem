import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { LogIn } from "./pages/LogIn/index";
import { SignUp } from "./pages/SignUp/index";
import { CitizenHomePage } from "./pages/CitizenHomePage/index";
import { CityOfficialHomePage } from "./pages/CityOfficialHomePage/index";
import initializeI18n from "./utils/internationalization/initialize";

// koristi se za prevodjenje (inicijalizuje se trenutni jezik, na osnovu vrijednosti procitanje iz local storage)
initializeI18n();

function App() {
  return (
    <Router>
      {/* Bira se prva ruta cija se vrijednost path atributa poklopi (zbog exact) sa specifikovanim url-om */}
      <Routes>
        <Route
          path="/CityReportSystem/citizen"
          exact
          element={<LogIn />}
        ></Route>
        <Route path="/CityReportSystem" exact element={<LogIn />}></Route>
        <Route
          path="/CityReportSystem/citizen/login"
          exact
          element={<LogIn />}
        ></Route>
        <Route path="/CityReportSystem/login" exact element={<LogIn />}></Route>
        <Route
          path="/CityReportSystem/citizen/signup"
          exact
          element={<SignUp />}
        ></Route>
        <Route
          path="/CityReportSystem/signup"
          exact
          element={<SignUp />}
        ></Route>
        <Route
          path="/CityReportSystem/citizen/home"
          exact
          element={<CitizenHomePage />}
        ></Route>
        <Route
          path="/CityReportSystem/city/home"
          exact
          element={<CityOfficialHomePage />}
        ></Route>
        <Route
          path="/CityReportSystem/city"
          exact
          element={<CityOfficialHomePage />}
        ></Route>
        <Route path="*" element={<LogIn />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
