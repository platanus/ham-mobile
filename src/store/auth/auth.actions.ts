/* tslint:disable typedef */

import { Action } from '@ngrx/store';

export const LOGIN = '[Auth] Login';
export const LOGIN_FAILURE = '[Auth] Login Failure';
export const LOGIN_SUCCESS = '[Auth] Login Success';

export class Login implements Action {
  public readonly type = LOGIN;

  constructor(public payload: string) {}
}

export class LoginSuccess implements Action {
  public readonly type: '[Auth] Login Success' = LOGIN_SUCCESS;
}

export class LoginFailure implements Action {
  public readonly type = LOGIN_FAILURE;

  constructor(public payload: string) {}
}

export type Actions =
  | Login
  | LoginSuccess
  | LoginFailure;
