/* tslint:disable typedef */
import { createSelector } from '@ngrx/store';

import * as market from './market.actions';

export interface State {
  limitOrders: string[];
  errorMessage: string;
  lastStatus: string;
}

export const initialState: State = {
  limitOrders: [],
  errorMessage: null,
  lastStatus: null,
};

export function reducer(state: State = initialState, action: market.Actions): State {
  switch (action.type) {
    case market.PLACE_LIMIT_ORDER:
    case market.PLACE_MARKET_ORDER:
    case market.GET_LIMIT_ORDERS: {
      return {
        ...state,
        errorMessage: null,
      };
    }
    case market.GET_LIMIT_ORDERS_SUCCESS: {
      return {
        ...state,
        limitOrders: action.payload,
      };
    }
    case market.PLACE_LIMIT_ORDER_SUCCESS:
    case market.PLACE_MARKET_ORDER_SUCCESS: {
      return {
        ...state,
        lastStatus: action.payload,
      };
    }
    case market.PLACE_LIMIT_ORDER_FAILURE:
    case market.PLACE_MARKET_ORDER_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload,
      };
    }
    case market.ERASE_ERROR: {
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

export const getLimitOrders = (state: State) => state.limitOrders;
export const getLastStatus = (state: State) => state.lastStatus;
export const getErrorMessage = (state: State) => state.errorMessage;
