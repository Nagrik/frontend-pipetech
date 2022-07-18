import { createSelector, Selector } from 'reselect';

import { State } from '@/store';
import { OTPResponse } from '@/store/reducers/auth';
import {UserResponse} from "@/api/main-protected";

const selectLogin = (state: State) => state.loginReducer;

export const selectUserResponse: Selector<State, UserResponse | null> = createSelector(
  selectLogin,
  ({ userResponse }) => userResponse,
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

export const selectIsInvalidDataMessage: Selector<State, string | null> = createSelector(
  selectLogin,
  ({ isInvalidDataMessage }) => isInvalidDataMessage,
);

