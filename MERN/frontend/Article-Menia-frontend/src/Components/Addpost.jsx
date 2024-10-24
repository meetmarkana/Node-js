import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Addpost = () => {
  const [image,setImage]=useState();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");


  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("content",content)

    await axios.post('http://localhost:7805/admin/addpost',formData)
    .then((response) => {
      console.log(response.data);
    })
    console.log(formData)
    navigate('/dashboard')
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
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
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
            value={content}
            onChange={(e)=>setContent(e.target.value)}
          />
        </div>

        <button type="submit">AddPost</button>
</form>    
</div>
)};

export default Addpost;
