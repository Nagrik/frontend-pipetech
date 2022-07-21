import { createReducerFunction, ImmerReducer } from 'immer-reducer';
import {AssetsResponse, UserResponse} from "@/api/main-protected";

export interface OTPResponse {

}

export interface LoginState {
    organizationResponse: any | null
    organizationAssets: AssetsResponse | null
    organizations: any | null
    organizationsInspections: any | null
    organizationsInspection: any | null
    inspectionsHeaders: any | null
}

const initialState: LoginState = {
    organizationResponse: null,
    organizationAssets: null,
    organizations: null,
    organizationsInspection: null,
    organizationsInspections: null,
    inspectionsHeaders: null
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

    setOrganizationInspections(organizationInspections:any) {
        this.draftState.organizationsInspections  = organizationInspections;
        this.draftState.organizationsInspection  =  [...organizationInspections!.values.data].map((i, index) => {
            return {arr:[...i], checkbox: false, id: index, hover: false}
        });
        const newArray = [...organizationInspections!.columns]
        this.draftState.inspectionsHeaders = [{title: 'checkbox'},{title: 'Assets'},...newArray ];
    }

    setOrganizations(organizations: any | null) {
        this.draftState.organizations  = organizations;
    }

    setOrganizationsInspection(organizationsInspection: any | null) {
        this.draftState.organizationsInspection  = organizationsInspection;
    }

}

export default createReducerFunction(OrganizationReducer, initialState);
