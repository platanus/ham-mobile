import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import { mergeMap, map, catchError, withLatestFrom, tap } from 'rxjs/operators';

import { MarketService } from './market.service';
import * as marketActions from './market.actions';
import * as fromRoot from '..';

@Injectable()
export class MarketEffects {
  @Effect()
  public getLimitOrders$: Observable<Action> = this.actions$
    .ofType(marketActions.GET_LIMIT_ORDERS)
    .pipe(
      withLatestFrom(this.store.select(fromRoot.getAuthHamCode)),
      mergeMap(([_, hamCode]) =>
        Observable.from(this.marketService.getLimitOrders(hamCode)).pipe(
          map(orders => new marketActions.GetLimitOrdersSuccess(orders)),
          catchError(err => {
            return Observable.of({
              type: marketActions.GET_LIMIT_ORDERS_FAILURE,
              payload: err,
            });
          }),
        ),
      ),
    );

  @Effect()
  public placeLimitOrder$: Observable<Action> = this.actions$
    .ofType(marketActions.PLACE_LIMIT_ORDER)
    .pipe(
      withLatestFrom(this.store.select(fromRoot.getAuthHamCode)),
      mergeMap(([_, hamCode]) =>
        Observable.from(this.marketService.placeLimitOrder(hamCode)).pipe(
          map(status => new marketActions.PlaceLimitOrderSuccess(status)),
          tap(() => this.store.dispatch(new marketActions.GetLimitOrders())),
          catchError(err => {
            return Observable.of({
              type: marketActions.PLACE_LIMIT_ORDER_FAILURE,
              payload: err,
            });
          }),
        ),
      ),
    );

    @Effect()
    public placeMarketOrder$: Observable<Action> = this.actions$
      .ofType(marketActions.PLACE_MARKET_ORDER)
      .pipe(
        withLatestFrom(this.store.select(fromRoot.getAuthHamCode)),
        mergeMap(([_, hamCode]) =>
          Observable.from(this.marketService.placeMarketOrder(hamCode)).pipe(
            map(status => new marketActions.PlaceMarketOrderSuccess(status)),
            tap(() => this.store.dispatch(new marketActions.GetLimitOrders())),
            catchError(err => {
              return Observable.of({
                type: marketActions.PLACE_MARKET_ORDER_FAILURE,
                payload: err,
              });
            }),
          ),
        ),
      );

  constructor(
    private marketService: MarketService,
    private actions$: Actions,
    private store: Store<fromRoot.AppState>,
  ) {}
}
