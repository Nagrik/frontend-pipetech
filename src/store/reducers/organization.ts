import { createReducerFunction, ImmerReducer } from 'immer-reducer';
import {AssetsResponse, UserResponse} from "@/api/main-protected";

export interface OTPResponse {

}

export interface LoginState {
    organizationResponse: any | null
    organizationAssets: AssetsResponse | null
}

const initialState: LoginState = {
    organizationResponse: null,
    organizationAssets: null
};

export class OrganizationReducer extends ImmerReducer<LoginState> {

    organizationResponse(organizationResponse: any | null) {
        this.draftState.organizationResponse = organizationResponse;
    }

    setOrganizationAssets(organizationAssets: any | null) {
        this.draftState.organizationAssets = organizationAssets;
    }
}

export default createReducerFunction(OrganizationReducer, initialState);
