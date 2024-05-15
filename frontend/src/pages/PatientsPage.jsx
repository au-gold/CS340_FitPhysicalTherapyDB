// Citation for following code
// source: https://github.com/osu-cs340-ecampus/react-starter-app/

import { Routes, Route, Link } from "react-router-dom";
import CreatePatient from "../components/patients/CreatePatient";
import PatientTable from "../components/patients/PatientTable";
import UpdatePatient from "../components/patients/UpdatePatient";

function PatientsPage() {
  return (
    <div>
      <h1>Patients Page</h1>
      <nav>
        <ul>
          <li>
            <Link to="/patients">Patients Table</Link>
          </li>
          <li>
            <Link to="/patients/add">Add a Patient</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<PatientTable />} />
        <Route path="/add" element={<CreatePatient />} />
        <Route path="/edit/:id" element={<UpdatePatient />} />
      </Routes>
    </div>
  );
}

export default PatientsPage;