import React from 'react'
import { use } from 'react';
import { useState } from 'react'

function form() {
    const [Name,setName] = useState('');
    const [image,setImage] = useState('');
    const [salary,setSalary] = useState('');
  return (
    <div>
        <form>
            <label htmlFor="">Name:</label>
            <input type="" placeholder='Enter Name'/><br />
            <label htmlFor="">Image:</label>
            <input type="file" /><br />
            <label htmlFor="">Salary</label>
            <input type="salary"/>
        </form>
    </div>
  )
}

export default form