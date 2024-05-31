// Citation for following code
// source: https://github.com/osu-cs340-ecampus/react-starter-app/

import { Routes, Route, Link, useLocation} from "react-router-dom";
import CreateTherapist from "../components/therapists/CreateTherapist";
import TherapistTable from "../components/therapists/TherapistTable";
import UpdateTherapist from "../components/therapists/UpdateTherapist";

function TherapistsPage() {
  const location = useLocation();

  return (
    <div>
      <h1>Therapists Page</h1>
      <nav>
        <ul>
          {/* Only renders appt table link  under add and edit page */}
          {location.pathname === "/therapists/add" || location.pathname.startsWith("/therapists/edit") ? (
            <>
              <li>
                <Link to="/therapists">Therapists Table</Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/therapists/add">Add Therapist</Link>
            </li>
          )}
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

