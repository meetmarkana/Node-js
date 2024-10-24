import React from 'react'
import Registration from './Components/Registration'
import Adminpannel from './Components/Adminpannel'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import AddManager from './Components/Addmanager'
import Viewmanager from './Components/Viewmanager'
import Adminlog from './Components/Adminlog'
import EditManager from './Components/EditManager'
import Addemploye from './Components/Addemploye'
import Viewemploye from './Components/Viewemploye'
import Editemploye from './Components/Editemploye'
import Addpost from './Components/Addpost'
import Managerpanel from './Components/Managerpanel'
function Templates() {
  return (
    <>
      {/* <div style={{height: '100vh', width: '100wh', border: '1px solid red'}}>

      </div> */}
        <Routes>
            <Route path='/' element={ <Registration/>} />
            <Route path='/logadmin' element={ <Adminlog/>} />
            <Route path='/dashboard' element={ <Adminpannel/>} />
            <Route path='/addmanager' element={ <AddManager/>} />
            <Route path='/viewmanager' element={ <Viewmanager/> } />
            <Route path='/editmanager' element={ <EditManager/> } />
            <Route path='/addemploye' element={ <Addemploye/> } />
            <Route path='/viewemploye' element={ <Viewemploye/> } />
            <Route path='/editemploye' element={ <Editemploye/>} />
            <Route path='/addpost' element={ <Addpost/>} />
            {/* <Route path='/manager' element={ <Managerpanel/>} /> */}

        </Routes>
        {/* <Viewmanager/> */}    
   
    
    </>
  )
}

export default Templates