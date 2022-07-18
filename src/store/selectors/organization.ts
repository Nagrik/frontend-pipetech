import { createSelector, Selector } from 'reselect';

import { State } from '@/store';

const selectInspection = (state: State) => state.OrganizationReducer;


export const selectOrganizationInfo: Selector<State, string | null> = createSelector(
    selectInspection,
    ({ organizationResponse }) => organizationResponse,
);