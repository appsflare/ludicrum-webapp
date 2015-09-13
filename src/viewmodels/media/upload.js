import {inject} from 'aurelia-framework';
import {BaseViewModel} from '../../../baseViewModel';
import {AuthService} from 'plugins/auth/authService';
import {ServiceClient} from 'services/serviceClient/client';
import {Router} from 'aurelia-router';

@inject(Router, AuthService, ServiceClient)
export class Upload extends BaseViewModel {

  items = null;
  client = null;
  file = null;
  router = null;
  isFileUploadSuccessful = false;
  uploadedFile = null;

  constructor(router, auth, client) {
    "use strict";
    super('Upload video!', auth);

    this.router = router;
    this.client = client;
  }

  onFileSelected(e) {
    "use strict";
    //debugger;
    this.file = this.$event.target.files[0];
  }


  submit() {
    "use strict";
    this.client.file.upload(this.file)
      .then(res => {
        let uploadedFiles = res.content.files;
        this.uploadedFile = uploadedFiles[0];
        let splitted = this.uploadedFile.fd.split('.');
        this.router.navigate(`/media/create/${splitted[1]}/${splitted[0]}`);
        this.isFileUploadSuccessful = true;
      })
      .catch(err => {
        this.isFileUploadSuccessful = false;
      });
  }
}

