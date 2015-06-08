/**
 * Created by developer on 6/7/15.
 */
import {transient} from 'aurelia-framework';
import {BaseClient} from '../baseClient.js';

@transient('APIMethods')
export class AuthMethods extends BaseClient{

  contstructor(){
    "use strict";
    this.name = 'auth';
  }

  verify(username, password)
  {
    "use strict";
    return this.json(this.constructUrl(('')));

  }



}
