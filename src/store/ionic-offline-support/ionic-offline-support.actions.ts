/* tslint:disable typedef */
import { Action } from '@ngrx/store';

export const LOAD_CACHE_SUCCESS = '[Init] Load Cache Success';
export const SET_INIT_STATUS = '[Init] Set Init Status';

export class LoadCacheSuccess implements Action {
  public readonly type = LOAD_CACHE_SUCCESS;

  constructor(public payload: any) {}
}

export class SetInitStatus implements Action {
  public readonly type = SET_INIT_STATUS;

  constructor(public payload: boolean) {}
}

export type Actions = LoadCacheSuccess | SetInitStatus;
