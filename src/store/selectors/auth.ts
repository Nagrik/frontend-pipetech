import { createSelector, Selector } from 'reselect';

import { State } from '@/store';
import { OTPResponse } from '@/store/reducers/auth';

const selectLogin = (state: State) => state.loginReducer;

export const selectOTPResponse: Selector<State, OTPResponse | null> = createSelector(
  selectLogin,
  ({ OPTResponse }) => OPTResponse,
);

export const loadOTP: Selector<State, boolean> = createSelector(
  selectLogin,
  ({ loadOTP }) => loadOTP,
);

export const accessToken: Selector<State, string | null > = createSelector(
  selectLogin,
  ({ access_token }) => access_token,
);

export const selectIsLoggedIn: Selector<State, boolean> = createSelector(
  selectLogin,
  ({ isLoggedIn }) => isLoggedIn,
);

export const selectIsLoading: Selector<State, boolean> = createSelector(
  selectLogin,
  ({ isLoading }) => isLoading,
);

export const selectIsInvalidData: Selector<State, boolean> = createSelector(
  selectLogin,
  ({ isInvalidData }) => isInvalidData,
);
