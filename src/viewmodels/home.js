import {inject} from 'aurelia-framework';
import  {BaseViewModel} from '../baseViewModel';
import {AuthService} from 'plugins/auth/authService';
import {ServiceClient} from 'services/serviceClient/client';

@inject(AuthService, ServiceClient)
export class Home extends BaseViewModel {

  items = null;

  constructor(auth, client) {
    "use strict";
    super('What to watch!', auth);
    this.items = [];
    this.client = client;
  }

  activate() {
    "use strict";
    this.client.media.getAll()
      .then(res => this.items = res.content.map(item=> {
        item.thumbUrl = this.client.signUrl(this.client.getUrl(`/file/stream/${item.file.split('.')[0]}.png`));
        return item;
      }));
  }
}

export class UpperValueConverter {
  toView(value) {
    return value && value.toUpperCase();
  }
}
