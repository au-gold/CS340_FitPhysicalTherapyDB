// Citation for following code
// source: https://github.com/osu-cs340-ecampus/react-starter-app/

import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import CreatePatient from "../components/patients/CreatePatient";
import PatientTable from "../components/patients/PatientTable";
import UpdatePatient from "../components/patients/UpdatePatient";

function PatientsPage() {
  const location = useLocation()
  const navigate = useNavigate();


  const handleAddClick = () => {
    navigate("/patients/add");
  };


  return (
    <div>
      <h1>Patients Page</h1>
      <nav>
      <ul>
          {/* Only renders patients table link  under add and edit page */}
          {location.pathname === "/patients/add" || location.pathname.startsWith("/patients/edit") ? (
            <>
              <li>
                <Link to="/patients">Patients Table</Link>
              </li>
            </>
          ) : (
            <li>
              <button onClick={handleAddClick}>Add Patient</button>
              {/* <Link to="/patients/add">Add Patient</Link> */}
            </li>
          )}
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