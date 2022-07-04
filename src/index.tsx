import React, { StrictMode } from 'react'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client';
import { ConnectedRouter } from 'connected-react-router'

import App from './App'

// import { Auth0ProviderComponent } from './Components/common/Auth0Provider'


const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render

(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);
