/* tslint:disable typedef */

import { createSelector } from '@ngrx/store';

import * as fromAuth from './auth/auth.reducer';
import * as fromKarma from './karma/karma.reducer';
import * as fromLunch from './lunch/lunch.reducer';

export interface AppState {
  auth: fromAuth.State;
  karma: fromKarma.State;
  lunch: fromLunch.State;
}

// Auth
export const selectAuthState = (state: AppState) => state.auth;
export const getAuthHamCode = createSelector(selectAuthState, fromAuth.getHamCode);
export const getAuthErrorMessage = createSelector(selectAuthState, fromAuth.getErrorMessage);

// Karma
export const selectKarmaState = (state: AppState) => state.karma;
export const getKarma = createSelector(selectKarmaState, fromKarma.getKarma);

// Lunch
export const selectLunchState = (state: AppState) => state.lunch;
export const getLunchers = createSelector(selectLunchState, fromLunch.getLunchers);
export const getLunchWinners = createSelector(selectLunchState, fromLunch.getWinners);
