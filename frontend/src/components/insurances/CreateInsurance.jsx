// Citation for following code
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
      <h2>Create a Insurance</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="subscriberName">Subscriber Name</label>
        <input
          type="text"
          name="subscriberName"
          defaultValue={formData.subscriberName}
          onChange={handleInputChange}
        />
        <label htmlFor="insCardNum">Insurance Card Number</label>
        <input
          type="text"
          name="insCardNum"
          defaultValue={formData.insCardNum}
          onChange={handleInputChange}
        />
        <label htmlFor="insGroupNum">Insurance Group Number</label>
        <input 
          type="text" 
          name="insGroupNum" 
          value={formData.insGroupNum} 
          onChange={handleInputChange} 
        />
        <button type="submit">Create a Insurance</button>
      </form>
    </>
  );
}

export default CreateInsurance;