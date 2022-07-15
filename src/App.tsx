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
import ProfilePage from './Pages/ProfilePage';
import SettingsOrganization from "@/Pages/SettingOrganization";

function App () {
    return (
        <div>
        <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/dashboard" component={DashboardPage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/assets" component={AssetsPage} />
            <Route path="/projects-card" component={ProjectsPage} exact />
            <Route path="/projects-list"  component={ProjectsPage} exact />
            <Route path="/projects-calendar"  component={ProjectsPage} exact />
            <Route path="/inspections"  component={InspectionPage} exact />
            <Route path="/deliverables"  component={DeliverablesPage} exact />

            <Route path="/settings-organization"  component={SettingsOrganization} exact />
            <Route path="/settings-systems"  component={SettingsOrganization} exact />
            <Route path="/settings-templates"  component={SettingsOrganization} exact />
            <Route path="/settings-users"  component={SettingsOrganization} exact />
            <Route path="/settings-equipment"  component={SettingsOrganization} exact />
            <Route path="/settings-integrations"  component={SettingsOrganization} exact />

            <Redirect to="/login" />
        </Switch>
        </div>
    )
}

export default App