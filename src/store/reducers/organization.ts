import { createReducerFunction, ImmerReducer } from 'immer-reducer';
import {UserResponse} from "@/api/main-protected";

export interface OTPResponse {

}

export interface LoginState {
    organizationResponse: any | null
}

const initialState: LoginState = {
    organizationResponse: null
};

export class OrganizationReducer extends ImmerReducer<LoginState> {

    organizationResponse(organizationResponse: any | null) {
        this.draftState.organizationResponse = organizationResponse;
    }
}

export default createReducerFunction(OrganizationReducer, initialState);
