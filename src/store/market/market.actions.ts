/* tslint:disable typedef */

import { Action } from '@ngrx/store';

export const GET_LIMIT_ORDERS = '[Market] Get Limit Orders';
export const GET_LIMIT_ORDERS_FAILURE = '[Market] Get Limit Orders Failure';
export const GET_LIMIT_ORDERS_SUCCESS = '[Market] Get Limit Orders Success';
export const PLACE_LIMIT_ORDER = '[Market] Place Limit Order';
export const PLACE_LIMIT_ORDER_FAILURE = '[Market] Place Limit Order Failure';
export const PLACE_LIMIT_ORDER_SUCCESS = '[Market] Place Limit Order Success';
export const PLACE_MARKET_ORDER = '[Market] Place Market Order';
export const PLACE_MARKET_ORDER_FAILURE = '[Market] Place Market Order Failure';
export const PLACE_MARKET_ORDER_SUCCESS = '[Market] Place Market Order Success';
export const ERASE_ERROR = '[Market] Erase error message';

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

export class EraseError implements Action {
  public readonly type = ERASE_ERROR;

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
  | EraseError
  | PlaceMarketOrderFailure;
