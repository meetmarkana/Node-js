import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Adminpanel.css'
import axios from 'axios';

function Adminpannel() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:7805/admin/viewposts');
      console.log(response.data.posts);
      
      if (response.data) {
        setPosts(response.data.posts);
      } else {
        alert('Failed to fetch posts');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const Deletepost = async (id)=> {
    const response = await axios.delete(`http://localhost:7805/admin/deletepost?id=${id}`)
    .then((res)=>{
        console.log(res)
    })
    fetchPosts()
}

const Editpost = async (id)=> {
    const response = await axios.get(`http://localhost:7805/admin/editpost?id=${id}`)
    .then((res)=>{
        console.log(res)
        sessionStorage.setItem('PostData', res.data.editdata._id)
    })
    navigate('/editpost')
}



  return (
<body>
  <div className="main">
    <div className="navbar-side">
      <h6>
        <span className="icon"><i className="fas fa-code"></i></span>
        <span className="link-text">Admin Panel</span>
      </h6>
      <ul>
        <li><a href="#" className="link-active" title="Dashboard">
            <span className="icon"><i className="fas fa-chart-bar"></i></span>
            <span className="link-text">Dashboard</span>
          </a></li>
        <li>
        <li>
              <a href="#" className="myBtn" data-toggle="collapse" data-target="#my-posts" title="Posts" aria-expanded="false">
                <span className="icon"><i className="fas fa-list"></i></span>
                <span className="link-text">Posts</span>
              </a>
              <div id="my-posts" className="collapse bg-secondary">
                <Link to="/addpost" title="Add Post">
                  <span className="icon"><i className="fas fa-copy"></i></span>
                  <span className="link-text"><a href="/addpost">AddPost</a></span>
                </Link>
              </div>
            </li>
          <a href="#" className="myBtn" data-toggle="collapse" data-target="#my-manager" title="Post" aria-expanded="false">
            <span className="icon"><i className="fas fa-list"></i></span>
            <span className="link-text">Manager</span>
          </a>
          <div id="my-manager" className="collapse bg-secondary">
            <a href="#" title="All Post">
              <span className="icon"><i className="fas fa-copy"></i></span>
              <span className="link-text"><a href="/addmanager">Add Manager</a></span>
            </a>
            <a href="#" title="Add Post">
              <span className="icon"><i className="fas fa-pen-fancy"></i></span>
              <span className="link-text"><a href="/viewmanager">View Manager</a></span>
            </a>
          </div>
        </li>

        <li>
          <a href="#" className="myBtn" data-toggle="collapse" data-target="#my-sub" title="Post" aria-expanded="false">
            <span className="icon"><i className="fas fa-list"></i></span>
            <span className="link-text">Employe</span>
          </a>
          <div id="my-sub" className="collapse bg-secondary">
            <a href="#" title="All Post">
              <span className="icon"><i className="fas fa-copy"></i></span>
              <span className="link-text"><a href="/addemploye">Add Employe</a></span>
            </a>
            <a href="#" title="Add Post">
              <span className="icon"><i className="fas fa-pen-fancy"></i></span>
              <span className="link-text"><a href="/viewemploye">view Employe</a></span>
            </a>
          </div>
        </li>

      </ul>
    </div>
    <div className="content">
      <nav className="navbar navbar-dark bg-dark py-1">

        <a href="#" id="navBtn">
          <span id="changeIcon" className="fa fa-bars text-light"></span>
        </a>

        <div className="d-flex">
          <a className="nav-link text-light px-2" href="#"><i className="fas fa-search"></i></a>
          <a className="nav-link text-light px-2" href="#"><i className="fas fa-bell"></i></a>
          <a className="nav-link text-light px-2" href="#"><i className="fas fa-sign-out-alt"></i></a>
        </div>

      </nav>

      <div className="posts-section">
            <h2>All Posts</h2>
            {posts.length === 0 ? (
              <p>No posts available</p>
            ) : (
              <ul>
                {posts.map((e,i) => (
                  <><li key={i}>
                    <h3>{e.title}</h3>
                    <p>{e.content}</p>
                    <img src={`http://localhost:7805/${e.image}`} width={"20%"} />
                  </li><>        
                      <button className='action btn btn-danger' onClick={()=>{Deletepost(e._id)}}>Delete</button>
                      <button className='action btn btn-danger' onClick={()=>{Editpost(e._id)}}>Edit</button>
                  </>
                  
                  </>
                ))}
              </ul>
            )}
      </div>
    </div>
    </div>

</body>
  )
}

export default Adminpannel;