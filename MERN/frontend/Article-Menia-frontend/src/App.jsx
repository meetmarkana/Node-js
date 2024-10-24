import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import Templates from './Templates'
import Adminpannel from './Components/Adminpannel'
import Viewmanager from './Components/Viewmanager'


function App() {
  const [count, setCount] = useState(0)
  const [admin, setAdmin] = useState([])

  const getData = async ()=> {
    const response = await axios.get('http://localhost:7805/admin/viewadmin')
    .then((res)=>{
      setAdmin(res.data)
      console.log(res.data.admindata)
    })
   
  } 

  useEffect(()=>{
    getData()
  },[])

  return (
    <>
    <div className='app'>
    <Templates/>
    </div>
    </>
  )
}

export default App
