import React from 'react'
import Dashboard from './components/pages/Dashboard'
import Home from './components/pages/Home'
import Verify from './components/pages/Verify'
import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

const App = () => {
  let token=true
  return (
    <Router>
      <Routes>
        <Route path="/" element={token?<Dashboard/>:<Home/>} />
        <Route path="/verify/:id/:token" element={<Verify />} />
      </Routes>
    </Router>
  )
}

export default App