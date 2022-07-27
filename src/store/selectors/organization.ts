import { createSelector, Selector } from 'reselect';

import { State } from '@/store';
import {AssetsResponse} from "@/api/main-protected";

const selectInspection = (state: State) => state.OrganizationReducer;


export const selectOrganizationInfo: Selector<State, string | null> = createSelector(
    selectInspection,
    ({ organizationResponse }) => organizationResponse,
);

export const selectOrganizationAssets: Selector<State, AssetsResponse | null> = createSelector(
    selectInspection,
    ({ organizationAssets }) => organizationAssets,
);

export const selectOrganizationInspections: Selector<State, any | null> = createSelector(
    selectInspection,
    ({ organizationsInspections }) => organizationsInspections,
);

export const selectOrganizations: Selector<State, any | null> = createSelector(
    selectInspection,
    ({ organizations }) => organizations,
);

export const selectOrganizationsInspection: Selector<State, any | null> = createSelector(
    selectInspection,
    ({ organizationsInspection }) => organizationsInspection,
);

export const selectInspectionHeader: Selector<State, any | null> = createSelector(
    selectInspection,
    ({ inspectionsHeaders }) => inspectionsHeaders,
);

export const selectInspectionModalHeader: Selector<State, any | null> = createSelector(
    selectInspection,
    ({ inspectionModalHeaders }) => inspectionModalHeaders,
);