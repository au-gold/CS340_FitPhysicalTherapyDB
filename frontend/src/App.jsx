// Citation for following code
// source: https://github.com/osu-cs340-ecampus/react-starter-app/

import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PatientsPage from "./pages/PatientsPage";
import Navbar from "./components/navbar/NavBar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/patients/*" element={<PatientsPage />} />
      </Routes>
    </>
  );
}

export default App;
