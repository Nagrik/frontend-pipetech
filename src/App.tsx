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
import store from "@/store";
import {getUserInfo} from "@/store/actions/organization";
import ProtectedRouter from "@/Components/utils/ProtectedRouter";

store.dispatch<any>(getUserInfo('1'));
function App () {
    return (
        <div>
        <Switch>
            <Route path="/login" component={LoginPage} />
            <ProtectedRouter path="/dashboard" component={DashboardPage} />
            <ProtectedRouter path="/profile" component={ProfilePage} />
            <ProtectedRouter path="/assets" component={AssetsPage} />
            <ProtectedRouter path="/projects-card" component={ProjectsPage} exact />
            <ProtectedRouter path="/projects-list"  component={ProjectsPage} exact />
            <ProtectedRouter path="/projects-calendar"  component={ProjectsPage} exact />
            <ProtectedRouter path="/inspections"  component={InspectionPage} exact />
            <ProtectedRouter path="/deliverables"  component={DeliverablesPage} exact />

            <ProtectedRouter path="/settings-organization"  component={SettingsOrganization} exact />
            <ProtectedRouter path="/settings-systems"  component={SettingsOrganization} exact />
            <ProtectedRouter path="/settings-templates"  component={SettingsOrganization} exact />
            <ProtectedRouter path="/settings-users"  component={SettingsOrganization} exact />
            <ProtectedRouter path="/settings-equipment"  component={SettingsOrganization} exact />
            <ProtectedRouter path="/settings-integrations"  component={SettingsOrganization} exact />

            <Redirect to="/login" />
        </Switch>
        </div>
    )
}

export default App