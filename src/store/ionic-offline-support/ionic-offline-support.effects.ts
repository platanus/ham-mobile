import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap, map, withLatestFrom, catchError } from 'rxjs/operators';
import { defer } from 'rxjs/observable/defer';
import 'rxjs/add/operator/do';

import * as offlineSupport from './ionic-offline-support.actions';
import { AppState } from '../';
import { IonicOfflineService } from './ionic-offline-support.service';

@Injectable()
export class IonicOfflineSupportEffects {
  @Effect() public loadFromCache$: Observable<Action>;
  @Effect() public setInitStatus$: Observable<Action>;
  @Effect({ dispatch: false }) public saveToCache$: Observable<[Action, AppState]>;
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private offlineService: IonicOfflineService,
  ) {
    this.loadFromCache$ = defer(() => {
      return Observable.from(offlineService.getSavedState())
        .pipe(
          map((newState) => new offlineSupport.LoadCacheSuccess(newState)),
          catchError((err) => Observable.of(err)),
        );
    });

    this.setInitStatus$ = this.actions$
      .ofType(offlineSupport.LOAD_CACHE_SUCCESS)
      .pipe(switchMap(() => [new offlineSupport.SetInitStatus(true)]));

    this.saveToCache$ = this.actions$.pipe(
      withLatestFrom(this.store),
    )
    .do(([action, nextState]) => {
      if (
        action.type !== offlineSupport.LOAD_CACHE_SUCCESS &&
        nextState.offlineSupport.initialized !== false
      ) {
        this.offlineService.saveState(nextState);
      }
    });
  }
}
