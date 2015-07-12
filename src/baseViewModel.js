/**
 * Created by srinath on 12/7/15.
 */

import {bindable} from 'aurelia-framework';

export class BaseViewModel {
  @bindable heading = '';
  @bindable auth = null;

  constructor(heading, auth) {
    "use strict";
    this.heading = heading;
    this.auth = auth;
  }
}

export class UpperValueConverter {
  toView(value) {
    return value && value.toUpperCase();
  }
}
