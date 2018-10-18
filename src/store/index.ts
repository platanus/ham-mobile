/* tslint:disable typedef */

import { createSelector } from '@ngrx/store';
import * as fromAuth from './auth/auth.reducer';

export interface AppState {
  auth: fromAuth.State;
}

// Auth
export const selectAuthState = (state: AppState) => state.auth;
export const getAuthHamCode = createSelector(selectAuthState, fromAuth.getHamCode);
export const getAuthErrorMessage = createSelector(selectAuthState, fromAuth.getErrorMessage);
