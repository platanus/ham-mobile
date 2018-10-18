import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import { mergeMap, map, catchError, withLatestFrom, tap } from 'rxjs/operators';

import { LunchService } from './lunch.service';
import * as lunchActions from './lunch.actions';
import * as fromRoot from '..';

@Injectable()
export class LunchEffects {
  @Effect()
  public getLunchers$: Observable<Action> = this.actions$
    .ofType(lunchActions.GET_CURRENT_LUNCHERS)
    .pipe(
      withLatestFrom(this.store.select(fromRoot.getAuthHamCode)),
      mergeMap(([_, hamCode]) =>
        Observable.from(this.lunchService.getCurrentLunchers(hamCode)).pipe(
          map(lunchers => new lunchActions.GetCurrentLunchersSuccess(lunchers)),
          catchError(err => {
            console.error(err);
            return Observable.of({
              type: lunchActions.GET_CURRENT_LUNCHERS_FAILURE,
              payload: err,
            });
          }),
        ),
      ),
    );

  @Effect()
  public getWinners$: Observable<Action> = this.actions$.ofType(lunchActions.GET_WINNERS).pipe(
    withLatestFrom(this.store.select(fromRoot.getAuthHamCode)),
    mergeMap(([_, hamCode]) =>
      Observable.from(this.lunchService.getWinners(hamCode)).pipe(
        map(winners => new lunchActions.GetWinnersSuccess(winners)),
        catchError(err => {
          console.error(err);
          return Observable.of({
            type: lunchActions.GET_WINNERS_FAILURE,
            payload: err,
          });
        }),
      ),
    ),
  );

  @Effect()
  public signUpForLunch$: Observable<Action> = this.actions$
    .ofType(lunchActions.SIGN_UP_FOR_LUNCH)
    .pipe(
      withLatestFrom(this.store.select(fromRoot.getAuthHamCode)),
      mergeMap(([_, hamCode]) =>
        Observable.from(this.lunchService.signUpForLunch(hamCode)).pipe(
          map(_ => new lunchActions.SignUpForLunchSuccess()),
          tap(() => this.store.dispatch(new lunchActions.GetCurrentLunchers())),
          catchError(err => {
            console.error(err);
            return Observable.of({
              type: lunchActions.SIGN_UP_FOR_LUNCH_FAILURE,
              payload: err,
            });
          }),
        ),
      ),
    );

  constructor(
    private lunchService: LunchService,
    private actions$: Actions,
    private store: Store<fromRoot.AppState>,
  ) {}
}
