/**
 * Created by srinath on 6/7/15.
 */
import {transient} from 'aurelia-framework';
import {BaseClient} from '../baseClient';

@transient()
export class AuthMethods extends BaseClient{

  constructor() {
    "use strict";
    super('auth');
  }

  verify(username, password)
  {
    "use strict";
    return this.json("");

  }



}
