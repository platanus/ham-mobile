/* tslint:disable typedef */
import * as auth from './auth.actions';

export interface State {
  hamCode: string;
  loggedIn: boolean,
  _errorMessage: string;
}

export const initialState: State = {
  hamCode: null,
  loggedIn: false,
  _errorMessage: null,
};

export function reducer(state: State = initialState, action: auth.Actions): State {
  switch (action.type) {
    case auth.LOGIN: {
      return {
        hamCode: action.payload,
        _errorMessage: null,
        loggedIn: false,
      };
    }
    case auth.LOGIN_FAILURE: {
      return {
        ...state,
        hamCode: null,
        loggedIn: false,
        _errorMessage: action.payload,
      };
    }
    case auth.LOGIN_SUCCESS: {
      return {
        ...state,
        loggedIn: true,
        _errorMessage: null,
      };
    }
    default: {
      return state;
    }
  }
}

export const getHamCode = (state: State) => state.hamCode;
export const getLogInStatus = (state: State) => state.loggedIn;
export const getErrorMessage = (state: State) => state._errorMessage;
