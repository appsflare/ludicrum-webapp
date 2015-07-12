import {inject} from 'aurelia-framework';
import  {BaseViewModel} from '../baseViewModel';
import {AuthService} from 'plugins/auth/authService';

@inject(AuthService)
export class Home extends BaseViewModel {

  items = null;

  constructor(auth) {
    "use strict";
    super('What to watch!', auth);
    this.items = [];
  }

  activate() {
    "use strict";

  }
}

export class UpperValueConverter {
  toView(value) {
    return value && value.toUpperCase();
  }
}