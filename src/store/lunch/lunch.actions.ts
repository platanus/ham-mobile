/* tslint:disable typedef */

import { Action } from '@ngrx/store';

export const GET_WINNERS = '[Lunch] Get Winners';
export const GET_WINNERS_FAILURE = '[Lunch] Get Winners Success';
export const GET_WINNERS_SUCCESS = '[Lunch] Get Winners Failure';

export class GetWinners implements Action {
  public readonly type = GET_WINNERS;
}

export class GetWinnersSuccess implements Action {
  public readonly type = GET_WINNERS_SUCCESS;

  constructor(public payload: string[]) {}
}

export class GetWinnersFailure implements Action {
  public readonly type = GET_WINNERS_FAILURE;

  constructor(public payload: string) {}
}

export const GET_CURRENT_LUNCHERS = '[Lunch] Get Current Lunchers';
export const GET_CURRENT_LUNCHERS_FAILURE = '[Lunch] Get Current Lunchers Success';
export const GET_CURRENT_LUNCHERS_SUCCESS = '[Lunch] Get Current Lunchers Failure';

export class GetCurrentLunchers implements Action {
  public readonly type = GET_CURRENT_LUNCHERS;
}

export class GetCurrentLunchersSuccess implements Action {
  public readonly type = GET_CURRENT_LUNCHERS_SUCCESS;

  constructor(public payload: string[]) {}
}

export class GetCurrentLunchersFailure implements Action {
  public readonly type = GET_CURRENT_LUNCHERS_FAILURE;

  constructor(public payload: string) {}
}

export type Actions =
  | GetWinners
  | GetWinnersSuccess
  | GetWinnersFailure
  | GetCurrentLunchers
  | GetCurrentLunchersSuccess
  | GetCurrentLunchersFailure;
