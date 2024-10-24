import React,{useState}from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Adminlog() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    await axios.post('http://localhost:7805/admin/logadmin', formData)
    .then((response) => {
      console.log(response.data);
    })
    console.log(formData)
    navigate('/dashboard')
  };

  return (
    <div className="registration-form" style={{display: 'grid', placeItems: 'center', height: '100vh', width: '100%',border : '1px solid black'}}>
      <form onSubmit={handleSubmit}>
        <h2>Login Form</h2>
        <div className="col-auto">
          <label for="inputPassword2" className="visually-hidden">Email</label>
          <input type="email" className="form-control" name='email' id="inputPassword2" placeholder="Email" onChange={handleInputChange}/>
        </div>
        <div className="col-auto">
          <label for="inputPassword2" className="visually-hidden">Password</label>
          <input type="password" className="form-control" name='password' id="inputPassword2" placeholder="Password" onChange={handleInputChange}/>
        </div>
        <div className="col-auto">
            <button type="submit" className="btn btn-primary mb-3" >Login</button>
      </div>
      </form>

    </div>

    
  )
}

export default Adminlog