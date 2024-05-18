// Citation for following code
// source: https://github.com/osu-cs340-ecampus/react-starter-app/

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

const UpdateInsurance = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevInsurance = location.state.insurance;

  const [formData, setFormData] = useState({
    subscriberName: prevInsurance.subscriberName || '',
    insCardNum: prevInsurance.insCardNum || '',
    insGroupNum: prevInsurance.insGroupNum || '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  function isUpdate(){
    // Check if formData is equal to prevInsurance
    if (JSON.stringify(formData) === JSON.stringify({
      subscriberName: prevInsurance.subscriberName || '',
      insCardNum: prevInsurance.insCardNum || '',
      insGroupNum: prevInsurance.insGroupNum || '',
    })) {
      alert("No changes made.");
      return false;
    }
    return true
  }

  const handleSubmit = async (event) => {
    // Stop default form behavior which is to reload the page
    event.preventDefault();
    // Check if formData is equal to prevInsurance
    if (isUpdate()){
      try {
        const URL = import.meta.env.VITE_API_URL + "insurances/" + id;
        // const URL = "http://127.0.0.1:9112/api/insurances";
        const response = await axios.put(URL, formData);
        if (response.status !== 200) {
          alert("Error updating insurance");
        } else {
          alert(response.data.message);
          // Redirect to insurances page
          navigate("/insurances");
        }
      } catch (err) {
        console.log("Error updating insurance:", err);
      }
    }
  };

  return (
    <div>
      <h2>Update Insurance</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Subscriber Name:</label>
          <input
            type="text"
            name="subscriberName"
            onChange={handleInputChange}
            required
            defaultValue={prevInsurance.subscriberName}
          />
        </div>
        <div>
          <label>Insurance Card Number:</label>
          <input
            type="text"
            name="insCardNum"
            onChange={handleInputChange}
            required
            defaultValue={prevInsurance.insCardNum}
          />
        </div>
        <div>
          <label>Insurance Group Number:</label>
          <input
            type="text"
            name="insGroupNum"
            onChange={handleInputChange}
            required
            defaultValue={prevInsurance.insGroupNum}
          />
        </div>

        <button type="button" onClick={() => navigate("/insurances")}>
          Cancel
        </button>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateInsurance;
