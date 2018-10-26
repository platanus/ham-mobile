/* tslint:disable typedef */

import * as offlineSupport from './ionic-offline-support.actions';

export type State = {
  initialized: boolean;
};

const initialState: State = {
  initialized: false,
};

export function ionicOfflineSupportReducer(
  state: State = initialState,
  action: offlineSupport.Actions,
) {
  switch (action.type) {
    case offlineSupport.LOAD_CACHE_SUCCESS: {
      return Object.assign({}, state, action.payload);
    }

    case offlineSupport.SET_INIT_STATUS: {
      return Object.assign({}, state, { initialized: action.payload });
    }

    default:
      return state;
  }
}

export const getOfflineSupportState = (state: State) => state;
export const getInitStatus = (state: State) => state.initialized;
