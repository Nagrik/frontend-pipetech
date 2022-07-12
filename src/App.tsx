import React, { useContext, useEffect, useState } from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import './global.css'
import './null.css'
import LoginPage from "@/Pages/LoginPage";
import DashboardPage from "@/Pages/DashboardPage";
import AssetsPage from "@/Pages/AssetsPage";
import ProjectsPage from "@/Pages/ProjectsPage";
import InspectionPage from "@/Pages/InspectionPage";
import DeliverablesPage from "@/Pages/DeliverablesPage";

function App () {
    return (
        <div>
        <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/dashboard" component={DashboardPage} />
            <Route path="/assets" component={AssetsPage} />
            <Route path="/projects-card" component={ProjectsPage} exact />
            <Route path="/projects-list"  component={ProjectsPage} exact />
            <Route path="/projects-calendar"  component={ProjectsPage} exact />
            <Route path="/inspections"  component={InspectionPage} exact />
            <Route path="/deliverables"  component={DeliverablesPage} exact />
            <Redirect to="/login" />
        </Switch>
        </div>
    )
}

export default App