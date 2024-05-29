// Citation for following code
// source: https://github.com/osu-cs340-ecampus/react-starter-app/

import axios from "axios";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const TableRow = ({ appointment, fetchAppointments }) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate("/appointments/edit/" + appointment.appointmentID, { state: { appointment } });
  };

  const deleteRow = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this patient?");
    if (!confirmed) {
      return; // Exit the function if the user cancels the action
    }
    try {
      const URL = import.meta.env.VITE_API_URL + "appointments/" + appointment.appointmentID;
      const response = await axios.delete(URL);
      if (response.status === 204) {
        alert("Appointment deleted successfully");
      }
    } catch (err) {
      alert(err.response.data.error || "Error deleting appointment");
      console.log(err);
    }
    fetchAppointments();
  };

  return (
    <tr key={appointment.appointmentID}>
      <td>{appointment.appointmentID}</td>
      <td>{appointment.patientID}</td>
      <td>{appointment.patientFirstName}</td>
      <td>{appointment.patientLastName}</td>
      <td>{appointment.therapistID}</td>
      <td>{appointment.therapistFirstName}</td>
      <td>{appointment.therapistLastName}</td>
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
