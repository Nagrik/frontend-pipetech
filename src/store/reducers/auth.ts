import { createReducerFunction, ImmerReducer } from 'immer-reducer';
import {UserResponse} from "@/api/main-protected";

export interface OTPResponse {

}

export interface LoginState {
  userResponse: UserResponse | null
  isLoggedIn: boolean,
  isLoading: boolean,
  isInvalidData: boolean,
  isValidData: boolean,
    isInvalidDataMessage: string | null,
}

const initialState: LoginState = {
  userResponse: null,
  isLoggedIn: false,
  isLoading: false,
  isValidData: false,
    isInvalidData: false,
    isInvalidDataMessage: null,
};

export class LoginReducer extends ImmerReducer<LoginState> {


  setTokensResponse(OTPResponse: any | null) {
    // this.draftState.access_token = OTPResponse;
    // this.draftState.refresh_token = OTPResponse;
  }

  setUserResponse(userResponse: UserResponse | null) {
    this.draftState.userResponse = userResponse;
  }

  setIsLoggedIn(isLoggedIn: boolean) {
    this.draftState.isLoggedIn = isLoggedIn;
  }

  setIsLoading(isLoading: boolean) {
    this.draftState.isLoading = isLoading;
  }

  setIsInvalidData(isInvalid: boolean) {
    this.draftState.isInvalidData = isInvalid;
  }

  setIsValidData(isInvalid: boolean) {
    this.draftState.isValidData = isInvalid;
  }

  isInvalidDataClear() {
    this.draftState.isInvalidData = false;
    this.draftState.isValidData = false
  }

  setIsInvalidDataMessage(isInvalidDataMessage: string) {
    this.draftState.isInvalidDataMessage = isInvalidDataMessage;
  }


  cleanLogin() {
    this.draftState = initialState;
  }
}

export default createReducerFunction(LoginReducer, initialState);
