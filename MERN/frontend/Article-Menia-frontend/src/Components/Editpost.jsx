import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Addpost = () => {
    const [image,setImage]=useState();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
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
        const id = sessionStorage.getItem('PostData')
        await axios.put(`http://localhost:7805/admin/editedpost?id=${id}`, formData,  )
        .then((response) => {
          console.log(response.data);
        })
        navigate('/dashboard')
        console.log(id)
        console.log(formData)
      };
  return (
    <div className="registration-form">
      <h2>AddPost</h2>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Image:</label>
          <input
            type="file"
            name="image"
            onChange={(e)=>setImage(e.target.files[0])}
          />
        </div>
        <div>
          <label>Content:</label>
          <input
            type="text"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit">AddPost</button>
</form>    
</div>
)};

export default Addpost;
