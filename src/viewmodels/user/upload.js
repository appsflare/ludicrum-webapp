import {inject} from 'aurelia-framework';
import {BaseViewModel} from '../../baseViewModel';
import {AuthService} from 'plugins/auth/authService';
import {ServiceClient} from 'services/serviceClient/client';

@inject(AuthService, ServiceClient)
export class Upload extends BaseViewModel {

  items = null;
  client = null;
  file = null;

  constructor(auth, client) {
    "use strict";
    super('Upload video!', auth);

    this.client = client;
  }


  onFileSelected(e) {
    "use strict";
    //debugger;
    this.file = this.$event.target.files[0];
  }

  submit() {
    "use strict";
    this.client.file.upload(this.file);
  }

  activate() {
    "use strict";

  }
}

