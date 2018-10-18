import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/core';
import { pickBy } from 'lodash';

import { AppState, STATES_TO_BE_SAVED } from '../';

@Injectable()
export class IonicOfflineService {
  public async getSavedState() {
    const newState: AppState = await this.processStates();
    return newState;
  }

  public saveState(nextState: AppState) {
    STATES_TO_BE_SAVED.forEach(key => {
      const toSave: any = pickBy(nextState[key], (val: string, propertyName: string) => {
        return propertyName.charAt(0) !== '_';
      });
      Storage.set({ key, value: JSON.stringify(toSave) });
    });
  }

  private processStates() {
    const storagePromises: Promise<any>[] = STATES_TO_BE_SAVED.map(key => {
      return Storage.get({ key }).then(res => {
        const state: any = {};
        state[key] = JSON.parse(res.value);
        return state;
      });
    });

    return Promise.all(storagePromises).then(states => {
      const newState: any = {};
      states.map(state => {
        Object.keys(state).map(stateKey => {
          if (state[stateKey]) {
            Object.assign(newState, state);
          }
        });
      });

      return newState;
    });
  }
}
