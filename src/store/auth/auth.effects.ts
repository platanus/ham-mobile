import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { AuthService } from './auth.service';
import * as authActions from './auth.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  public login$: Observable<Action> = this.actions$.ofType(authActions.LOGIN).pipe(
    map((action: authActions.Login) => action.payload),
    mergeMap(payload =>
      Observable.from(this.authService.login(payload)).pipe(
        map(_ => new authActions.LoginSuccess()),
        catchError(err => {
          console.error(err);
          return Observable.of({
            type: authActions.LOGIN_FAILURE,
            payload: err,
          });
        }),
      ),
    ),
  );

  constructor(
    private authService: AuthService,
    private actions$: Actions,
  ) {}
}
