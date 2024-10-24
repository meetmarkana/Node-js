import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Editemploye = () => {
    
    const [formData, setFormData] = useState({
        username: '',
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
        const id = sessionStorage.getItem('EmployeData')
        await axios.put(`http://localhost:7805/admin/editedemploye?id=${id}`, formData,  )
        .then((response) => {
          console.log(response.data);
        })
        navigate('/viewemploye')
        console.log(id)
        console.log(formData)
      };


  return (
    <div className="registration-form">
      <form onSubmit={handleSubmit}>
      <h2>Edit Employe</h2>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
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

        <button type="submit">Update</button>
</form>    
</div>
  )
}

export default Editemploye