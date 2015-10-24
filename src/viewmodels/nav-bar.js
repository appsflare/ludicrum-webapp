import {bindable, inject} from 'aurelia-framework';
import {AuthService} from 'plugins/auth/authService';
import {ServiceClient} from 'services/serviceClient/client';
import {Router} from 'aurelia-router';

@inject(AuthService, Router, ServiceClient)
export class NavBar {
  @bindable router = null;
  @bindable sidebar = null;

  user = null;

  constructor(auth, router, client) {
    "use strict";
    this.auth = auth;
    this.router = router;
    this.client = client;
  }

  attached() {
    "use strict";

    if (!this.isAuthenticated) {
      return true;
    }

    return this.client.profile.me()
      .then((res)=> {

        this.user = res.content;

      });
  }

  get isAuthenticated() {
    "use strict";
    return this.auth.isAuthenticated();
  }

}
