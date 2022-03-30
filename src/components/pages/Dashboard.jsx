import Header from "../utils/Header";
import React from 'react'
import './Dashboard.css'
import LeftNav from "../utils/LeftNav";
import Conversation from "../utils/Conversation";
import RightNav from "../utils/RightNav";

const Dashboard = () => {
  return (
        <div className="body">
        <Header />
        <div className="dcontent">
            <LeftNav />
            <Conversation />
            <RightNav/>
        </div>
        </div>
  )
}

export default Dashboard

