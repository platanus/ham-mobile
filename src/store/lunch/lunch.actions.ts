/* tslint:disable typedef */

import { Action } from '@ngrx/store';

export const GET_WINNERS = '[Lunch] Get Winners';
export const GET_WINNERS_FAILURE = '[Lunch] Get Winners Failure';
export const GET_WINNERS_SUCCESS = '[Lunch] Get Winners Success';
export const GET_CURRENT_LUNCHERS = '[Lunch] Get Current Lunchers';
export const GET_CURRENT_LUNCHERS_FAILURE = '[Lunch] Get Current Lunchers Failure';
export const GET_CURRENT_LUNCHERS_SUCCESS = '[Lunch] Get Current Lunchers Success';
export const SIGN_UP_FOR_LUNCH = '[Lunch] Sign Up For Lunch';
export const SIGN_UP_FOR_LUNCH_FAILURE = '[Lunch] Sign Up For Lunch Failure';
export const SIGN_UP_FOR_LUNCH_SUCCESS = '[Lunch] Sign Up For Lunch Success';
export const ERASE_ERROR = '[Lunch] Erase error message';

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

export class SignUpForLunch implements Action {
  public readonly type = SIGN_UP_FOR_LUNCH;
}

export class SignUpForLunchSuccess implements Action {
  public readonly type = SIGN_UP_FOR_LUNCH_SUCCESS;
}

export class SignUpForLunchFailure implements Action {
  public readonly type = SIGN_UP_FOR_LUNCH_FAILURE;

  constructor(public payload: string) {}
}

export class EraseError implements Action {
  public readonly type = ERASE_ERROR;
}

export type Actions =
  | GetWinners
  | GetWinnersSuccess
  | GetWinnersFailure
  | GetCurrentLunchers
  | GetCurrentLunchersSuccess
  | GetCurrentLunchersFailure
  | SignUpForLunch
  | SignUpForLunchSuccess
  | SignUpForLunchFailure
  | EraseError;
