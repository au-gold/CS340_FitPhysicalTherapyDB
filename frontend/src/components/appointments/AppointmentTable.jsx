// Citation for following code
// source: https://github.com/osu-cs340-ecampus/react-starter-app/

import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import TableRow from "./AppointmentTableRow";
import axios from "axios";

const AppointmentTable = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "appointments";
      console.debug(URL)
      // const URL = "http://127.0.0.1:9112/api/appointments";
      const response = await axios.get(URL);
      setAppointments(response.data);
    } catch (error) {
      alert("Error fetching appointments from the server.");
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatTime = (timeString) => {
    return new Date(`1970-01-01T${timeString}Z`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div>
      <h2>Appointments Table</h2>
      {appointments.length === 0 ? (
        <div>
          <RiCreativeCommonsZeroFill size={70} color="#ccc" />
          <p>No appointments found.</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Patient's First Name</th>
              <th>Patient's Last Name</th>
              <th>Therapist ID</th>
              <th>Therapist's First Name</th>
              <th>Therapist's Last Name</th>
              <th>Treatment Plan ID</th>
              <th>Appointment Date</th>
              <th>Appointment Time</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.appointmentID} 
              appointment={{ 
                ...appointment, 
                appointmentDate: formatDate(appointment.appointmentDate),
                appointmentTime: formatTime(appointment.appointmentTime),
              }}
              fetchAppointments={fetchAppointments} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AppointmentTable;