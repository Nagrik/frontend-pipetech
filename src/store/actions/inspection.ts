import { createActionCreators } from 'immer-reducer';
import { push } from 'connected-react-router';

import { AsyncAction } from '@/store/actions/common';
import TokensLocalStorage from '@/local-storage/TokensLocalStorage';
import {InspectionReducer} from "@/store/reducers/inspection";

export const inspectionActions = createActionCreators(InspectionReducer);

export type InspectionAction =
    | ReturnType<typeof inspectionActions.setFiler_1>
    | ReturnType<typeof inspectionActions.setFiler_2>
    | ReturnType<typeof inspectionActions.setFiler_3>


// export const sendEmail = (email: string, password: string): AsyncAction => async (
//     dispatch,
//     _,
//     { mainApi, mainProtectedApi },
// ) => {
//     try {
        // const { access_token, refresh_token } = await mainApi.sendEmail({ email, password });
        // const storage = TokensLocalStorage.getInstance();
        //
        // storage.setAccessToken(access_token);
        // storage.setRefreshToken(refresh_token);
        //
        // const user = await mainProtectedApi.getUserInfo();
        //
        // dispatch(userAction.setUser(user));
        // dispatch(loginActions.setIsLoggedIn(true));
        //
        // dispatch(push('/'));
    // } catch (e) {
        // dispatch(userAction.isInvalidDataMessage(e.response.data.message));
    // } finally {
        // dispatch(loaderActions.setIsResolved(false));
    // }
// };

// export const clearIsEmailInvalid = (): AsyncAction => async (
//     dispatch,
// ) => {
//     try {
//         dispatch(inspectionActions.cleanIsInvalidData());
//     } catch (e) {
//         console.log(e);
//     }
// };


export const setFilters = (filter_1:string, filter_2:string, filter_3:string): AsyncAction => async (
    dispatch,
) => {
    try {
       dispatch(inspectionActions.setFiler_1(filter_1))
       dispatch(inspectionActions.setFiler_2(filter_2))
       dispatch(inspectionActions.setFiler_3(filter_3))
    } catch (e) {
        console.log(e);
    }
};
