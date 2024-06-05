// Citation for following code
// Based on CS340 react starter app
// Changed to handle our insurance entity
// source: https://github.com/osu-cs340-ecampus/react-starter-app/


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateInsurance() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    subscriberName: "",
    insCardNum: "",
    insGroupNum: "",
  });
  
  const handleSubmit = async (e) => {
    // Prevent page reload
    e.preventDefault();
    // Create a new insurance object from the formData
    const newInsurance = {
      subscriberName: formData.subscriberName,
      insCardNum: formData.insCardNum,
      insGroupNum: formData.insGroupNum,
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "insurances";
      // const URL = "http://127.0.0.1:9112/api/insurances";
      const response = await axios.post(URL, newInsurance);
      if (response.status === 201) {
        alert("Insurance created successfully");
        navigate("/insurances");
      } else {
        alert("Error creating insurance");
      }
    } catch (error) {
      alert("Error creating insurance");
      console.error("Error creating insurance:", error);
    }
    // Reset the form fields
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
      subscriberName: "",
      insCardNum: "",
      insGroupNum: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <h2>Create an Insurance</h2>
      <div className="form-container">
        <form onSubmit={handleSubmit} >
          <div className="form-group">
            <label htmlFor="subscriberName">Subscriber Name </label>
            <input
              type="text"
              name="subscriberName"
              defaultValue={formData.subscriberName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="insCardNum">Insurance Card Number </label>
            <input
              type="text"
              name="insCardNum"
              defaultValue={formData.insCardNum}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="insGroupNum">Insurance Group Number </label>
            <input 
              type="text" 
              name="insGroupNum" 
              value={formData.insGroupNum} 
              onChange={handleInputChange} 
            />
          </div>
          <button type="button" onClick={() => navigate("/insurances")}>
          Cancel
        </button>
          <button type="submit">Create an Insurance</button>
        </form>
        </div>
    </>
  );
}

export default CreateInsurance;