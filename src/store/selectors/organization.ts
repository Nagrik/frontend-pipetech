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