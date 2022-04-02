import React from 'react'
import Dashboard from './components/pages/Dashboard'
import Home from './components/pages/Home'
import Verify from './components/pages/Verify'
import ResetPassword from './components/pages/ResetPassword'
import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { useSelector } from 'react-redux'

const App = () => {
  let token=useSelector(state=>state.user.token)

  return (
    <Router>
      <Routes>
        <Route path="/" element={token?<Dashboard/>:<Home/>} />
        <Route path="/verify/:id/:token" element={<Verify />} />
        <Route path="/resetpassword/:id/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
  )
}

export default App