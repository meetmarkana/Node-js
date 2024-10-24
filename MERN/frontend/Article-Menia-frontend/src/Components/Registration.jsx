import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevstate)=>({
      ...prevstate,
      [name]: value
    }))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:7805/admin/addadmin', formData)
    .then((response) => {
      console.log(response.data);
    })
    console.log(formData)
    navigate('/logadmin')
  };

  return (
    <div className="registration-form">
      <form onSubmit={handleSubmit}>
      <h2>Registration Form</h2>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit">Register</button>
</form>    
</div>
)};

export default RegistrationForm;
