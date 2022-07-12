import { createReducerFunction, ImmerReducer } from 'immer-reducer';

export interface InspectionState {
  filter_1: string | null;
  filter_2: string | null;
  filter_3: string | null;
}

const initialState: InspectionState = {
  filter_1: null,
  filter_2: null,
  filter_3: null,
};

export class InspectionReducer extends ImmerReducer<InspectionState> {
  setFiler_1(filter:string) {
    this.draftState.filter_1 = filter;
  }
  setFiler_2(filter:string) {
    this.draftState.filter_2 = filter;
  }
  setFiler_3(filter:string) {
    this.draftState.filter_3 = filter;
  }

}

export default createReducerFunction(InspectionReducer, initialState);
