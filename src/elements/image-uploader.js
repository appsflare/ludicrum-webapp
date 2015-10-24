/**
 * Created by srinath on 24/10/15.
 */
import 'npm:cropperjs@0.1.1/dist/cropper.css!'
import $ from 'jquery';
import Cropper from 'cropperjs';


import {inject, bindable, customElement, computedFrom} from 'aurelia-framework';
import {BaseViewModel} from 'lib/baseViewModel';
import {AuthService} from 'plugins/auth/authService';
import {ServiceClient} from 'services/serviceClient/client';
import {Router} from 'aurelia-router';

@customElement('image-uploader')
@inject(Element, Router, AuthService, ServiceClient)
export class ImageUpload extends BaseViewModel {

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
    super('Upload photo!', auth);
    this.element = element;
    this.router = router;
    this.client = client;
  }

  onFileSelected(e) {
    "use strict";
    //debugger;
    this.file = this.$event.target.files[0];
  }

  get _window() {
    "use strict";
    return $(this.element).find('[data-role=dialog]').data('dialog');
  }


  get imageUrl() {
    "use strict";
    return this.client.signUrl(this.client.getUrl(`/profile/user/picture`));
  }

  attached() {
    "use strict";
    debugger;

    this._cropper = new Cropper($(this.element).find('.profile-picture img')[0], {
      movable: false,
      zoomable: false,
      rotatable: false,
      scalable: false
    });

  }

  editPhoto() {
    "use strict";
    this._window.open();
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
        this._window.close();
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

