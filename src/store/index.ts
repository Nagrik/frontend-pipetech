import {
    createStore,
    applyMiddleware,
    compose,
    combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import Main from '@/api/main';
import MainProtected from '@/api/main-protected';


import loginReducer from './reducers/auth';
import inspectionReducer from './reducers/inspection';
import {LoginActions} from "@/store/actions/login";
import {InspectionAction} from "@/store/actions/inspection";

export const history = createBrowserHistory();

export const api = {
    mainApi: Main.getInstance(),
    mainProtectedApi: MainProtected.getInstance(),
};

const rootReducer = combineReducers({
    router: connectRouter(history),
    loginReducer,
    inspectionReducer
});

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
    applyMiddleware(routerMiddleware(history), thunk.withExtraArgument(api)),
);

export type State = ReturnType<typeof rootReducer>;
export type Actions =
    | LoginActions
    | InspectionAction

export default createStore(rootReducer, enhancer);
