import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, RouteProps, Redirect } from 'react-router';

import {selectIsLoading, selectIsLoggedIn} from '@/store/selectors/auth';

const ProtectedRouter: React.FC<RouteProps> = (props) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const isLoading = useSelector(selectIsLoading);

    if (isLoading) return <></>;

    return isLoggedIn  ? <Route {...props} /> : <Redirect to="/login" />;
};

export default ProtectedRouter;
