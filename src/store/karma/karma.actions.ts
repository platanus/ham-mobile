/* tslint:disable typedef */

import { Action } from '@ngrx/store';

export const GET_KARMA = '[Karma] Get Karma';
export const GET_KARMA_FAILURE = '[Karma] Get Karma Failure';
export const GET_KARMA_SUCCESS = '[Karma] Get Karma Success';

export class GetKarma implements Action {
  public readonly type = GET_KARMA;
}

export class GetKarmaSuccess implements Action {
  public readonly type = GET_KARMA_SUCCESS;

  constructor(public payload: string) {}
}

export class GetKarmaFailure implements Action {
  public readonly type = GET_KARMA_FAILURE;

  constructor(public payload: string) {}
}

export type Actions =
  | GetKarma
  | GetKarmaSuccess
  | GetKarmaFailure;
