import {bindable, inject} from 'aurelia-framework';
import {AuthService} from 'plugins/auth/authService';
import {Router} from 'aurelia-router';

@inject(AuthService, Router)
export class NavBar {
  @bindable router = null;

  constructor(auth, router) {
    "use strict";
    this.auth = auth;
    this.router = router;
  }

  get isAuthenticated() {
    "use strict";
    return this.auth.isAuthenticated();
  }

}
