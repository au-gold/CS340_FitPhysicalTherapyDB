// Citation for following code
// source: https://github.com/osu-cs340-ecampus/react-starter-app/

import { Routes, Route, Link } from "react-router-dom";
import CreateAppointment from "../components/appointments/CreateAppointment";
import AppointmentTable from "../components/appointments/AppointmentTable";
import UpdateAppointment from "../components/appointments/UpdateAppointment";

function AppointmentsPage() {
  return (
    <div>
      <h1>Appointments Page</h1>
      <nav>
        <ul>
          <li>
            <Link to="/appointments">Appointments Table</Link>
          </li>
          <li>
            <Link to="/appointments/add">Add an Appointment</Link>
          </li>
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
