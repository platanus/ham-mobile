import { ActionReducer } from '@ngrx/store';
import { merge } from 'lodash';

import * as offlineSupport from './ionic-offline-support.actions';

export function storageSync(reducer: ActionReducer<any>) {
  return (state = {}, action) => {
    let nextState: any = reducer(state, action);
    switch (action.type) {
      case offlineSupport.LOAD_CACHE_SUCCESS:
        // Load from cache
        return merge({}, state, action.payload);
    }

    return nextState;
  };
}
