/**
 * Created by srinath on 12/7/15.
 */
import {inject, customElement, bindable} from 'aurelia-framework';
import {AuthService} from 'plugins/auth/authService';

@customElement('login-form')
@inject(AuthService)
export class LoginForm {
  heading = 'Login to ludicrum...';
  userName = '';
  password = '';

  constructor(auth) {
    "use strict";
    this.auth = auth;
  }

  submit() {
    return this.auth.login(this.userName, this.password);
  }
}

export class UpperValueConverter {
  toView(value) {
    return value && value.toUpperCase();
  }
}
