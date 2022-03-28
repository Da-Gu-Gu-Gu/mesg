import Header from "../utils/Header";
import React from 'react'
import './Dashboard.css'
import LeftNav from "../utils/LeftNav";
import Conversation from "../utils/Conversation";

const Dashboard = () => {
  return (
        <div className="body">
        <Header />
        <div className="content">
            <LeftNav />
            <Conversation />
        </div>
        </div>
  )
}

export default Dashboard

