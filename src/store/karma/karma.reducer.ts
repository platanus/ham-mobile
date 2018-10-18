/* tslint:disable typedef */
import { createSelector } from '@ngrx/store';

import * as karma from './karma.actions';

export interface State {
  karma: string;
}

export const initialState: State = {
  karma: null,
};

export function reducer(state: State = initialState, action: karma.Actions): State {
  switch (action.type) {
    case karma.GET_KARMA_SUCCESS: {
      return {
        karma: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export const getKarma = (state: State) => state.karma;
