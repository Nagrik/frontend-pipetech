import { createActionCreators } from 'immer-reducer';
import { push } from 'connected-react-router';

import { LoginReducer } from '@/store/reducers/auth';
import { AsyncAction } from '@/store/actions/common';
import TokensLocalStorage from '@/local-storage/TokensLocalStorage';
import {getOrganizationInfo} from "@/store/actions/organization";

export const loginActions = createActionCreators(LoginReducer);

export type LoginActions =
    | ReturnType<typeof loginActions.setUserResponse>
    | ReturnType<typeof loginActions.setIsLoggedIn>
    | ReturnType<typeof loginActions.setIsLoading>
    | ReturnType<typeof loginActions.setIsInvalidData>
    | ReturnType<typeof loginActions.setIsInvalidDataMessage>
    | ReturnType<typeof loginActions.isInvalidDataClear>
    | ReturnType<typeof loginActions.setIsValidData>



export const logout = (): AsyncAction => async (
  dispatch,
) => {
  try {
    const storage = TokensLocalStorage.getInstance();
    storage.clear();

    // dispatch(userAction.cleanUser());
    // dispatch(loginActions.setIsLoggedIn(false));
  } catch (e) {
    console.log(e);
  }
};


export const createUser = (email:string, firstName: string, lastName: string, phone: string, roles:string[]): AsyncAction => async (
    dispatch,
    _,
    { mainApi, mainProtectedApi },
) => {
  try {
    const body = {
        email,
        firstName,
        lastName,
        phone,
    }
    const response  = await mainProtectedApi.createUser(body)
    dispatch(addUserToOrganization(response.id.toString(),  roles ))
    dispatch(loginActions.setUserResponse(response))
    dispatch(loginActions.setIsValidData(true))
  } catch (e:any) {
    dispatch(loginActions.setIsInvalidData(true))
    dispatch(loginActions.setIsInvalidDataMessage(e.response.data.message));
  }
};


export const addUserToOrganization = (id:string, roles: string[]): AsyncAction => async (
    dispatch,
    _,
    { mainApi, mainProtectedApi },
) => {
  try {
    const body = {
      roles
    }
     await mainProtectedApi.addUserToOrganization(id, body)
    dispatch(getOrganizationInfo())
  } catch (e) {
    console.log(e)
  }
};

export const invalidDataClear = (): AsyncAction => async (
    dispatch,
    _,
    { mainApi, mainProtectedApi },
) => {
  try {
    dispatch(loginActions.isInvalidDataClear())
  } catch (e) {
    console.log(e)
  }
};


export const login = (email:string, password: string): AsyncAction => async (
    dispatch,
    _,
    { mainApi, mainProtectedApi },
) => {
  try {
    const body = {
      email,
      password
    }
    dispatch(loginActions.setIsLoading(true))
     const {accessToken, refreshToken, id} = await mainApi.login(body)
    const storage = TokensLocalStorage.getInstance();
    dispatch(loginActions.setIsLoggedIn(true))
    dispatch(loginActions.setIsLoading(false))
    dispatch(push('/dashboard'))
    storage.setAccessToken(accessToken);
    storage.setRefreshToken(refreshToken);
    window.localStorage.setItem('userId', id.toString())
  } catch (e:any) {
    dispatch(loginActions.setIsInvalidData(true));
    dispatch(loginActions.setIsInvalidDataMessage(e.response.data.message));
  }
};

