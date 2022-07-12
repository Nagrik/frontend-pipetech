import { createActionCreators } from 'immer-reducer';
import { push } from 'connected-react-router';

import { LoginReducer } from '@/store/reducers/auth';
import { AsyncAction } from '@/store/actions/common';
import TokensLocalStorage from '@/local-storage/TokensLocalStorage';

export const loginActions = createActionCreators(LoginReducer);

export type LoginActions =
    | ReturnType<typeof loginActions.setIsOTPResolved>
    | ReturnType<typeof loginActions.setOTPResponse>
    | ReturnType<typeof loginActions.setLoadOTP>
    | ReturnType<typeof loginActions.setIsLoading>
    | ReturnType<typeof loginActions.setIsLoggedIn>
    | ReturnType<typeof loginActions.setIsInvalidData>
    | ReturnType<typeof loginActions.cleanIsInvalidData>;

export const sendEmail = (email: string, password: string): AsyncAction => async (
  dispatch,
  _,
  { mainApi, mainProtectedApi },
) => {
  try {
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
  } catch (e) {
    // dispatch(userAction.isInvalidDataMessage(e.response.data.message));
  } finally {
    // dispatch(loaderActions.setIsResolved(false));
  }
};

export const clearIsEmailInvalid = (): AsyncAction => async (
  dispatch,
) => {
  try {
    dispatch(loginActions.cleanIsInvalidData());
  } catch (e) {
    console.log(e);
  }
};

export const logout = (): AsyncAction => async (
  dispatch,
) => {
  try {
    const storage = TokensLocalStorage.getInstance();
    storage.clear();

    // dispatch(userAction.cleanUser());
    dispatch(loginActions.setIsLoggedIn(false));
  } catch (e) {
    console.log(e);
  }
};
