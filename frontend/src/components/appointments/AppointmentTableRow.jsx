// Citation for following code
// source: https://github.com/osu-cs340-ecampus/react-starter-app/

import axios from "axios";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const TableRow = ({ appointment, fetchAppointments }) => {
  // Hook that allows us to navigate programmatically
  const navigate = useNavigate();
  // Redirect to edit appointment page
  const handleEdit = () => {
    // We can access the id (and query the appointment) with useParams() in the UpdatePatient component
    navigate("/appointments/edit/" + appointment.id, { state: { appointment } });
  };

  const deleteRow = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "appointments/" + appointment.id;
      // const URL = "http://127.0.0.1:9112/api/appointment";
      const response = await axios.delete(URL);
      // Ensure that the appointment was deleted successfully
      if (response.status === 204) {
        alert("Appointment deleted successfully");
      }
    } catch (err) {
      alert(err.response.data.error || "Error deleting appontment");
      console.log(err);
    }
    fetchAppointments();
  };

  return (
    <tr key={appointment.appointmentID}>
      <td>{appointment.patientID}</td>
      <td>{appointment.patientfirstName}</td>
      <td>{appointment.patientlastName}</td>
      <td>{appointment.therapistID}</td>
      <td>{appointment.therapistfirstName}</td>
      <td>{appointment.therapistlastName}</td>
      <td>{appointment.treatmentPlanID}</td>
      <td>{appointment.appointmentDate}</td>
      <td>{appointment.appointmentTime}</td>
      <td>
        <BiEditAlt onClick={handleEdit} size={25} style={{ cursor: "pointer" }} />
      </td>
      <td>
        <BsTrash onClick={deleteRow} size={25} style={{ cursor: "pointer" }} />
      </td>
    </tr>
  );
};

export default TableRow;