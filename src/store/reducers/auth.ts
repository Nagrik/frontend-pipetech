import { createReducerFunction, ImmerReducer } from 'immer-reducer';

export interface OTPResponse {
  createdAt: number,
  email: string,
  id: number,
  otp: string,
}

export interface LoginState {
  isOTPResolved: boolean;
  OPTResponse: OTPResponse | null;
  access_token:string | null,
  refresh_token:string | null,
  loadOTP: boolean,
  isLoggedIn: boolean;
  isLoading: boolean;
  isInvalidData: boolean;
}

const initialState: LoginState = {
  isOTPResolved: false,
  OPTResponse: null,
  access_token: null,
  refresh_token: null,
  loadOTP: false,
  isLoggedIn: false,
  isLoading: true,
  isInvalidData: false,
};

export class LoginReducer extends ImmerReducer<LoginState> {
  setIsOTPResolved() {
    this.draftState.isOTPResolved = true;
  }

  setOTPResponse(OTPResponse: OTPResponse | null) {
    this.draftState.OPTResponse = OTPResponse;
  }

  setTokensResponse(OTPResponse: any | null) {
    this.draftState.access_token = OTPResponse;
    this.draftState.refresh_token = OTPResponse;
  }

  setLoadOTP() {
    const loadedOTP = this.draftState.OPTResponse;
    this.draftState.loadOTP = !loadedOTP;
  }

  setIsLoggedIn(isLoggedIn: boolean) {
    this.draftState.isLoggedIn = isLoggedIn;
  }

  setIsLoading(isLoading: boolean) {
    this.draftState.isLoading = isLoading;
  }

  setIsInvalidData(isInvalidData: boolean) {
    this.draftState.isInvalidData = isInvalidData;
  }

  cleanIsInvalidData() {
    this.draftState.isInvalidData = false;
  }

  cleanLogin() {
    this.draftState = initialState;
  }
}

export default createReducerFunction(LoginReducer, initialState);
