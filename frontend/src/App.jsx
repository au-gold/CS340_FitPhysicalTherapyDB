// Citation for following code
// source: https://github.com/osu-cs340-ecampus/react-starter-app/

import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PatientsPage from "./pages/PatientsPage";
import InsurancesPage from "./pages/InsurancesPage";
import Navbar from "./components/navbar/NavBar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/patients/*" element={<PatientsPage />} />
        <Route path="/insurances/*" element={<InsurancesPage />} />
      </Routes>
    </>
  );
}

export default App;
