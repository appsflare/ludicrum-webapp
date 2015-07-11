import {inject} from 'aurelia-framework';
import {AuthService} from 'plugins/auth/authService';
@inject(AuthService)
export class Login {
  heading = 'Login to your account';
  userName = '';
  password = '';

  constructor(auth) {
    "use strict";
    this.auth = auth;
  }

  submit() {
    return this.auth.login(this.userName, this.password);
  }

  canDeactivate() {
    if (this.fullName !== this.previousValue) {
      return confirm('Are you sure you want to leave?');
    }
  }
}

export class UpperValueConverter {
  toView(value) {
    return value && value.toUpperCase();
  }
}
