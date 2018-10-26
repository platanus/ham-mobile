import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, ToastController, Toast } from 'ionic-angular';
import { Store } from '@ngrx/store';

import * as auth from '../../store/auth/auth.actions';
import * as fromRoot from '../../store';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { Subject } from 'rxjs/Subject';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public authForm: FormGroup;
  private unsubscribe: Subject<void> = new Subject();
  constructor(
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private store: Store<fromRoot.AppState>,
  ) {
    this.authForm = this.formBuilder.group({
      hamCode: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(10),
        ]),
      ],
    });
  }

  public ionViewDidLoad() {
    this.store
      .select(fromRoot.getAuthErrorMessage)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(message => {
        if (message) {
          this.displayError(message);
        }
      });
  }

  public ionViewWillLeave() {
    // Unsubscribe from all managed subscriptions
    this.unsubscribe.next();
    this.unsubscribe.unsubscribe();
  }

  public onSubmit() {
    this.sendCode(this.hamCode.value);
  }

  private displayError(message: string) {
    let toast: Toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      showCloseButton: true,
    });
    toast.present();
  }

  private sendCode(hamCode: string) {
    this.store.dispatch(new auth.Login(hamCode));
  }

  private get hamCode() {
    return this.authForm.get('hamCode');
  }
}
