/* tslint:disable typedef */
import { createSelector } from '@ngrx/store';

import * as lunch from './lunch.actions';

export interface State {
  lunchers: string[];
  winners: string[];
  errorMessage: string;
}

export const initialState: State = {
  lunchers: [],
  winners: [],
  errorMessage: null,
};

export function reducer(state: State = initialState, action: lunch.Actions): State {
  switch (action.type) {
    case lunch.GET_WINNERS: {
      return {
        ...state,
        errorMessage: null,
      };
    }
    case lunch.GET_WINNERS_SUCCESS: {
      return {
        ...state,
        winners: action.payload,
      };
    }
    case lunch.GET_WINNERS_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload,
      };
    }
    case lunch.GET_CURRENT_LUNCHERS: {
      return {
        ...state,
        errorMessage: null,
      };
    }
    case lunch.GET_CURRENT_LUNCHERS_SUCCESS: {
      return {
        ...state,
        lunchers: action.payload,
      };
    }
    case lunch.GET_CURRENT_LUNCHERS_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload,
      };
    }
    case lunch.SIGN_UP_FOR_LUNCH: {
      return {
        ...state,
        errorMessage: null,
      };
    }
    case lunch.SIGN_UP_FOR_LUNCH_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload,
      };
    }
    case lunch.ERASE_ERROR: {
      return {
        ...state,
        errorMessage: null,
      };
    }
    default: {
      return state;
    }
  }
}

export const getLunchers = (state: State) => state.lunchers;
export const getWinners = (state: State) => state.winners;
export const getErrorMessage = (state: State) => state.errorMessage;
