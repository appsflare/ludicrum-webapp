import {inject} from 'aurelia-framework';
import  {BaseViewModel} from '../baseViewModel';
import {AuthService} from 'plugins/auth/authService';

@inject(AuthService)
export class Home extends BaseViewModel {

  items = null;

  constructor(auth) {
    "use strict";
    super('What to watch!', auth);
    items = [];
  }

  activate() {
    "use strict";

  }


}
