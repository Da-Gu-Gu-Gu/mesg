import Header from "../utils/Header";
import React from 'react'
import './Dashboard.css'
import LeftNav from "../utils/LeftNav";

const Dashboard = () => {
  return (
        <div className="body">
        <Header />
        <div className="content">
            <LeftNav />
        </div>
        </div>
  )
}

export default Dashboard

