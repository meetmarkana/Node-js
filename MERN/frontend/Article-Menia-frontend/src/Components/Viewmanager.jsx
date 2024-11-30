import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Viewmanager = () => {

    const [manager, setManager] = useState([])
    const navigate = useNavigate()
    const getData = async ()=> {
        const response = await axios.get('http://localhost:7805/admin/viewmanager')
        .then((res)=>{
            setManager(res.data.managerdata)
            console.log(res.data.managerdata)
        })

    }

    const Deletemanager = async (id)=> {
        const response = await axios.delete(`http://localhost:7805/admin/deletemanager?id=${id}`)
        .then((res)=>{
            console.log(res)
        })
        getData()
    }

    const Editmanager = async (id)=> {
        const response = await axios.get(`http://localhost:7805/admin/editmanager?id=${id}`)
        .then((res)=>{
            console.log(res)
            sessionStorage.setItem('ManagerData', res.data.editdata._id)
        })
        navigate('/editmanager')
    }
    
    useEffect(()=>{
        getData()
    },[])

  return (
    <div className='view'>
    <table className='table table-bordered'>
    <thead>
        <tr>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Phone</th>
        <th scope="col" colSpan='2'>Action</th>
        </tr>
    </thead>
    <tbody>
        {manager && manager.map((el, index)=>(
            <tr key={index}>
                <td>{el.username}</td>
                <td>{el.email}</td>
                <td>{el.phone}</td>
                <td><button className='action btn btn-primary' onClick={()=>{Editmanager(el._id)}}>Edit</button></td>
                <td><button className='action btn btn-danger' onClick={()=>{Deletemanager(el._id)}}>Delete</button></td>
            </tr>
        ))}
    </tbody>
   </table>
    </div>
  )
}

export default Viewmanager
