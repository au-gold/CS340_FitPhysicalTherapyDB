// Citation for following code
// Based on CS340 react starter app
// Slight change to have button instead of link
// source: https://github.com/osu-cs340-ecampus/react-starter-app/

import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import CreateAppointment from "../components/appointments/CreateAppointment";
import AppointmentTable from "../components/appointments/AppointmentTable";
import UpdateAppointment from "../components/appointments/UpdateAppointment";

function AppointmentsPage() {
  const location = useLocation();
  const navigate = useNavigate();


  const handleAddClick = () => {
    navigate("/appointments/add");
  };

  return (
    <div>
      <h1>Appointments Page</h1>
      <nav>
        <ul>
          {/* Only renders appt table link  under add and edit page */}
          {location.pathname === "/appointments/add" || location.pathname.startsWith("/appointments/edit") ? (
            <>
              <li>
                <Link to="/appointments">Appointments Table</Link>
              </li>
            </>
          ) : (
            <li>
              <button onClick={handleAddClick}>Add Appointment</button>
              {/* <Link to="/appointments/add">Add Appointment</Link> */}
            </li>
          )}
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<AppointmentTable />} />
        <Route path="/add" element={<CreateAppointment />} />
        <Route path="/edit/:id" element={<UpdateAppointment />} />
      </Routes>
    </div>
  );
}

export default AppointmentsPage;
