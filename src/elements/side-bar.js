/**
 * Created by srinath on 12/7/15.
 */
import {inject, customElement, bindable} from 'aurelia-framework';
import {AuthService} from 'plugins/auth/authService';

@customElement('side-bar')
@inject(AuthService)
export class SideBar {

  @bindable items = null;

  constructor(auth) {
    "use strict";
    this.auth = auth;
    this.items = [];
  }

  get isAuthenticated() {
    "use strict";
    return this.auth.isAuthenticated();
  }


}
