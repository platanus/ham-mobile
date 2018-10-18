/* tslint:disable typedef */
import { createSelector } from '@ngrx/store';

import * as auth from './auth.actions';

export interface State {
  hamCode: string;
  errorMessage: string;
}

export const initialState: State = {
  hamCode: null,
  errorMessage: null,
};

export function reducer(state: State = initialState, action: auth.Actions): State {
  switch (action.type) {
    case auth.LOGIN: {
      return {
        hamCode: action.payload,
        errorMessage: null,
      };
    }
    case auth.LOGIN_FAILURE: {
      return {
        ...state,
        hamCode: null,
        errorMessage: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export const getHamCode = (state: State) => state.hamCode;
export const getErrorMessage = (state: State) => state.errorMessage;
