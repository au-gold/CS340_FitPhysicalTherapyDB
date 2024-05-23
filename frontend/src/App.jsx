// Citation for following code
// source: https://github.com/osu-cs340-ecampus/react-starter-app/

import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PatientsPage from "./pages/PatientsPage";
import InsurancesPage from "./pages/InsurancesPage";
import ExercisesPage from "./pages/ExercisesPage";
import AppointmentsPage from "./pages/AppointmentsPage"; 
import TherapistsPage from "./pages/TherapistsPage"; 
import TreatmentPlansPage from "./pages/TreatmentPlansPage";
import Navbar from "./components/navbar/NavBar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/patients/*" element={<PatientsPage />} />
        <Route path="/insurances/*" element={<InsurancesPage />} />
        <Route path="/exercises/*" element={<ExercisesPage />} />
        <Route path="/appointments/*" element={<AppointmentsPage />} /> 
        <Route path="/therapists/*" element={<TherapistsPage />} /> 
        <Route path="/treatmentPlans/*" element={<TreatmentPlansPage />} /> 
      </Routes>
    </>
  );
}

export default App;
