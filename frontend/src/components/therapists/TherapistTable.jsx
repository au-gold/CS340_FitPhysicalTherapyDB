// Citation for following code
// source: https://github.com/osu-cs340-ecampus/react-starter-app/

import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import TableRow from "./TherapistTableRow";
import axios from "axios";

const TherapistTable = () => {
  const [therapists, setTherapists] = useState([]);

  const fetchTherapists = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "therapists";
      console.debug(URL)
      // const URL = "http://127.0.0.1:9112/api/therapists";
      const response = await axios.get(URL);
      setTherapists(response.data);
    } catch (error) {
      alert("Error fetching therapists from the server.");
      console.error("Error fetching therapists:", error);
    }
  };

  useEffect(() => {
    fetchTherapists();
  }, []);


  return (
    <div>
      <h2>Therapists Table</h2>
      {therapists.length === 0 ? (
        <div>
          <RiCreativeCommonsZeroFill size={70} color="#ccc" />
          <p>No therapists found.</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Therapist ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>License Number</th>
            </tr>
          </thead>
          <tbody>
            {therapists.map((therapist) => (
              <TableRow 
                key={therapist.therapistID} 
                therapist={therapist}
                fetchTherapists={fetchTherapists} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TherapistTable;