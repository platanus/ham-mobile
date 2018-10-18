/* tslint:disable typedef */

import { createSelector } from '@ngrx/store';

import * as fromAuth from './auth/auth.reducer';
import * as fromKarma from './karma/karma.reducer';
import * as fromLunch from './lunch/lunch.reducer';
import * as fromOffline from './ionic-offline-support/ionic-offline-support.reducer';

export interface AppState {
  auth: fromAuth.State;
  karma: fromKarma.State;
  lunch: fromLunch.State;
  offlineSupport: fromOffline.State;
}

export const STATES_TO_BE_SAVED: string[] = ['auth'];

// Offline
export const selectOfflineSupportState = (state: AppState) => state.offlineSupport;
export const getInitStatus = createSelector(selectOfflineSupportState, fromOffline.getInitStatus);

// Auth
export const selectAuthState = (state: AppState) => state.auth;
export const getAuthHamCode = createSelector(selectAuthState, fromAuth.getHamCode);
export const getAuthErrorMessage = createSelector(selectAuthState, fromAuth.getErrorMessage);
export const getAuthLogInStatus = createSelector(selectAuthState, fromAuth.getLogInStatus);

// Karma
export const selectKarmaState = (state: AppState) => state.karma;
export const getKarma = createSelector(selectKarmaState, fromKarma.getKarma);
export const getKarmaErrorMessage = createSelector(selectKarmaState, fromKarma.getErrorMessage);

// Lunch
export const selectLunchState = (state: AppState) => state.lunch;
export const getLunchers = createSelector(selectLunchState, fromLunch.getLunchers);
export const getLunchWinners = createSelector(selectLunchState, fromLunch.getWinners);
export const getLunchErrorMessage = createSelector(selectLunchState, fromLunch.getErrorMessage);
