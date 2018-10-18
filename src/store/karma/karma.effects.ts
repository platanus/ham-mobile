import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import { mergeMap, map, catchError, withLatestFrom } from 'rxjs/operators';

import { KarmaService } from './karma.service';
import * as karmaActions from './karma.actions';
import * as fromRoot from '..';

@Injectable()
export class KarmaEffects {
  @Effect()
  public login$: Observable<Action> = this.actions$.ofType(karmaActions.GET_KARMA).pipe(
    withLatestFrom(this.store.select(fromRoot.getAuthHamCode)),
    mergeMap(([_, hamCode]) =>
      Observable.from(this.karmaService.getKarma(hamCode)).pipe(
        map(karma => new karmaActions.GetKarmaSuccess(karma)),
        catchError(err => {
          console.error(err);
          return Observable.of({
            type: karmaActions.GET_KARMA_FAILURE,
            payload: err,
          });
        }),
      ),
    ),
  );

  constructor(
    private karmaService: KarmaService,
    private actions$: Actions,
    private store: Store<fromRoot.AppState>,
  ) {}
}
