import { createSelector, Selector } from 'reselect';

import { State } from '@/store';

const selectInspection = (state: State) => state.inspectionReducer;


export const selectHeaderFilters_1: Selector<State, string | null> = createSelector(
    selectInspection,
    ({ filter_1 }) => filter_1,
);
export const selectHeaderFilters_2: Selector<State, string | null> = createSelector(
    selectInspection,
    ({ filter_2 }) => filter_2,
);
export const selectHeaderFilters_3: Selector<State, string | null> = createSelector(
    selectInspection,
    ({ filter_3 }) => filter_3,
);