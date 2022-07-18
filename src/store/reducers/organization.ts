import { createReducerFunction, ImmerReducer } from 'immer-reducer';
import {AssetsResponse, UserResponse} from "@/api/main-protected";

export interface OTPResponse {

}

export interface LoginState {
    organizationResponse: any | null
    organizationAssets: AssetsResponse | null
    organizations: any | null
}

const initialState: LoginState = {
    organizationResponse: null,
    organizationAssets: null,
    organizations: null,
};

export class OrganizationReducer extends ImmerReducer<LoginState> {

    organizationResponse(organizationResponse: any | null) {
        this.draftState.organizationResponse = organizationResponse;
    }

    setOrganizationAssets(organizationAssets: AssetsResponse | null) {
        this.draftState.organizationAssets  = organizationAssets;
        this.draftState.organizations  =  [...organizationAssets!.assets.data].map((i) => {
            return {...i, checkbox: false}
        });
    }

    setOrganizations(organizations: any | null) {
        this.draftState.organizations  = organizations;
    }

}

export default createReducerFunction(OrganizationReducer, initialState);
