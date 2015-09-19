import {inject, bindable, customElement, computedFrom} from 'aurelia-framework';
import {BaseViewModel} from 'lib/baseViewModel';
import {AuthService} from 'plugins/auth/authService';
import {ServiceClient} from 'services/serviceClient/client';
import {Router} from 'aurelia-router';

@customElement('media-uploader')
@inject(Element, Router, AuthService, ServiceClient)
export class Upload extends BaseViewModel {

  items = null;
  client = null;
  file = null;
  router = null;

  isUploading = false;
  isUploadSuccessful = false;
  uploadedFile = null;

  @bindable invoker;

  status = null;

  progress = null;

  error = null;

  @computedFrom('status', 'progress', 'error', 'file')
  get uploadButtonCss() {
    "use strict";
    if (this.isUploading) {
      return 'loading-cube';
    }

    if (!this.isUploading && this.file) {
      return 'loading-pulse';
    }

    return '';
  }

  @computedFrom('status', 'progress', 'error', 'file')
  get uploadButtonText() {
    "use strict";


    if (this.isUploading) {
      return `Uploading ${this.progress}%...`;
    }

    return 'Upload';
  }

  constructor(element, router, auth, client) {
    "use strict";
    super('Upload video!', auth);
    this.element = element;
    this.router = router;
    this.client = client;
  }

  onFileSelected(e) {
    "use strict";
    //debugger;
    this.file = this.$event.target.files[0];
  }

  attached() {
    "use strict";
    this._charm = $(this.element).data('charm');
    $(this.element).parents('nav-bar').find(this.invoker).on('click', ()=> {
      this._charm.open();
    });

  }


  submit() {
    "use strict";
    this.error = null;
    this.isUploading = true;
    this.client.file.upload(this.file, (e, progress)=> this.progress = progress)
      .then(res => {
        let uploadedFiles = res.content.files;
        this.uploadedFile = uploadedFiles[0];
        let splitted = this.uploadedFile.fd.split('.');
        this._charm.close();
        this.router.navigate(`/media/create/${splitted[1]}/${splitted[0]}`);
        this.isUploadSuccessful = true;
        this.isUploading = false;
        this.file = null;
      })
      .catch(err => {
        this.isUploading = false;
        this.error = err;
        this.isUploadSuccessful = false;
      });
  }
}

