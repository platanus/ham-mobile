/* tslint:disable typedef */

import { Action } from '@ngrx/store';

export const GET_LIMIT_ORDERS = '[Lunch] Get Limit Orders';
export const GET_LIMIT_ORDERS_FAILURE = '[Lunch] Get Limit Orders Failure';
export const GET_LIMIT_ORDERS_SUCCESS = '[Lunch] Get Limit Orders Success';
export const PLACE_LIMIT_ORDER = '[Lunch] Place Limit Order';
export const PLACE_LIMIT_ORDER_FAILURE = '[Lunch] Place Limit Order Failure';
export const PLACE_LIMIT_ORDER_SUCCESS = '[Lunch] Place Limit Order Success';
export const PLACE_MARKET_ORDER = '[Lunch] Place Market Order';
export const PLACE_MARKET_ORDER_FAILURE = '[Lunch] Place Market Order Failure';
export const PLACE_MARKET_ORDER_SUCCESS = '[Lunch] Place Market Order Success';

export class GetLimitOrders implements Action {
  public readonly type = GET_LIMIT_ORDERS;
}

export class GetLimitOrdersSuccess implements Action {
  public readonly type = GET_LIMIT_ORDERS_SUCCESS;

  constructor(public payload: string[]) {}
}

export class GetLimitOrdersFailure implements Action {
  public readonly type = GET_LIMIT_ORDERS_FAILURE;

  constructor(public payload: string) {}
}

export class PlaceLimitOrder implements Action {
  public readonly type = PLACE_LIMIT_ORDER;
}

export class PlaceLimitOrderSuccess implements Action {
  public readonly type = PLACE_LIMIT_ORDER_SUCCESS;

  constructor(public payload: any) {}
}

export class PlaceLimitOrderFailure implements Action {
  public readonly type = PLACE_LIMIT_ORDER_FAILURE;

  constructor(public payload: string) {}
}

export class PlaceMarketOrder implements Action {
  public readonly type = PLACE_MARKET_ORDER;
}

export class PlaceMarketOrderSuccess implements Action {
  public readonly type = PLACE_MARKET_ORDER_SUCCESS;

  constructor(public payload: any) {}
}

export class PlaceMarketOrderFailure implements Action {
  public readonly type = PLACE_MARKET_ORDER_FAILURE;

  constructor(public payload: string) {}
}

export type Actions =
  | GetLimitOrders
  | GetLimitOrdersSuccess
  | GetLimitOrdersFailure
  | PlaceLimitOrder
  | PlaceLimitOrderSuccess
  | PlaceLimitOrderFailure
  | PlaceMarketOrder
  | PlaceMarketOrderSuccess
  | PlaceMarketOrderFailure;
