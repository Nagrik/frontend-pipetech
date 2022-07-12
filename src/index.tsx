import React, { StrictMode } from 'react'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client';
import { ConnectedRouter } from 'connected-react-router'

import store, { history } from '@/store';

import App from './App';

ReactDOM.render(
    <StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <App />
                </ConnectedRouter>
            </Provider>
        </BrowserRouter>
    </StrictMode>,
    document.getElementById('root'),
);
