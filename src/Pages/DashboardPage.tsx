import React from 'react';
import Header from "@/Components/Header";
import Dashboard from "@/Components/Dashboard/Dashboard";
import Popup from "@/Components/utils/Popup";


const DashboardPage = () => {
    return (
     <div style={{backgroundColor: 'whitesmoke', height: '100%', width: '100%'}}>
         <Header/>
         <Dashboard/>
     </div>
    )
};

export default DashboardPage;