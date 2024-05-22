// Citation for following code
// source: https://github.com/osu-cs340-ecampus/react-starter-app/

import { Routes, Route, Link } from "react-router-dom";
import CreateTherapist from "../components/therapists/CreateTherapist";
import TherapistTable from "../components/therapists/TherapistTable";
import UpdateTherapist from "../components/therapists/UpdateTherapist";

function TherapistsPage() {
  return (
    <div>
      <h1>Therapists Page</h1>
      <nav>
        <ul>
          <li>
            <Link to="/therapists">Therapists Table</Link>
          </li>
          <li>
            <Link to="/therapists/add">Add a Therapist</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<TherapistTable />} />
        <Route path="/add" element={<CreateTherapist />} />
        <Route path="/edit/:id" element={<UpdateTherapist />} />
      </Routes>
    </div>
  );
}

export default TherapistsPage;

