/**
 * Created by srinath on 12/7/15.
 */

export class BaseViewModel {
  @bindable heading = '';
  @bindable auth = null;

  constructor(heading, auth) {
    "use strict";
    this.heading = heading;
    this.auth = auth;
  }
}
