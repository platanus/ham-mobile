/* tslint:disable typedef */
import * as karma from './karma.actions';

export interface State {
  karma: string;
  errorMessage: string;
}

export const initialState: State = {
  karma: null,
  errorMessage: null,
};

export function reducer(state: State = initialState, action: karma.Actions): State {
  switch (action.type) {
    case karma.GET_KARMA: {
      return {
        ...state,
        errorMessage: null,
      };
    }
    case karma.GET_KARMA_SUCCESS: {
      return {
        ...state,
        karma: action.payload,
      };
    }
    case karma.GET_KARMA_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload,
      };
    }
    case karma.DISMISS_ERROR: {
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

export const getKarma = (state: State) => state.karma;
export const getErrorMessage = (state: State) => state.errorMessage;
