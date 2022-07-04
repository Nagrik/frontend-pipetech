import React, { useContext, useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import './global.css'
import './null.css'
import LoginPage from "@/Pages/LoginPage";
import DashboardPage from "@/Pages/DashboardPage";
// import store from '@/store'




// export type AppDispatch = typeof store.dispatch

function App () {
    return (
        <div>
        <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/dashboard" component={DashboardPage} />
        </Switch>
        </div>
    )
}

export default App