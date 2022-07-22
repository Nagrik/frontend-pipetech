import {createActionCreators} from "immer-reducer";
import {LoginReducer} from "@/store/reducers/auth";
import {AsyncAction} from "@/store/actions/common";
import TokensLocalStorage from "@/local-storage/TokensLocalStorage";
import {OrganizationReducer} from "@/store/reducers/organization";
import {loginActions} from "@/store/actions/login";

export const organizationAction = createActionCreators(OrganizationReducer);

export type OrganizationActions =
    | ReturnType<typeof organizationAction.organizationResponse>
    | ReturnType<typeof organizationAction.setOrganizationAssets>
    | ReturnType<typeof organizationAction.setOrganizations>
    | ReturnType<typeof organizationAction.setOrganizationInspections>
    | ReturnType<typeof organizationAction.setOrganizationsInspection>



export const getOrganizationInfo = (): AsyncAction => async (
    dispatch, _, {mainProtectedApi}
) => {
    try {
     const response = await mainProtectedApi.getOrganizationInfo()
        dispatch(organizationAction.organizationResponse(response))
    } catch (e) {
        console.log(e);
    }
};

export const getUserInfo = (organizationId:string): AsyncAction => async (
    dispatch, _, {mainProtectedApi}
) => {
    try {
        dispatch(loginActions.setIsLoading(true))
        const response = await mainProtectedApi.getUserInfo(organizationId)
        dispatch(loginActions.setUserResponse(response))
        dispatch(loginActions.setIsLoggedIn(true))
        dispatch(loginActions.setIsLoading(false))
        dispatch(organizationAction.organizationResponse(response))
    } catch (e) {
        console.log(e);
        dispatch(loginActions.setIsLoading(false))
    }finally {
        dispatch(loginActions.setIsLoading(false))
    }
};


export const getOrganizationAssets = (organizationId:string, page:string, limit:string): AsyncAction => async (
    dispatch, _, {mainProtectedApi}
) => {
    try {
        const response = await mainProtectedApi.getOrganizationAssets(organizationId, page, limit)
        dispatch(organizationAction.setOrganizationAssets(response))
    } catch (e) {
        console.log(e);
    }
};


export const getOrganizationInspections = (organizationId:string, page:string, limit:string): AsyncAction => async (
    dispatch, _, {mainProtectedApi}
) => {
    try {
        const response = await mainProtectedApi.getOrganizationInspection(organizationId, page, limit)
        dispatch(organizationAction.setOrganizationInspections(response))
    } catch (e) {
        console.log(e);
    }
};

export const changeOrganisationArray = (organization:any): AsyncAction => async (
    dispatch, _, {mainProtectedApi}
) => {
    try {
        dispatch(organizationAction.setOrganizations(organization))
    } catch (e) {
        console.log(e);
    }
};

export const changeOrganisationInspectionArray = (inspection:any): AsyncAction => async (
    dispatch, _, {mainProtectedApi}
) => {
    try {
        dispatch(organizationAction.setOrganizationsInspection(inspection))
    } catch (e) {
        console.log(e);
    }
};
