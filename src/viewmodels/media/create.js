import {inject} from 'aurelia-framework';
import {BaseViewModel} from '../../baseViewModel';
import {AuthService} from 'plugins/auth/authService';
import {ServiceClient} from 'services/serviceClient/client';

@inject(AuthService, ServiceClient)
export class Upload extends BaseViewModel {

  items = null;
  client = null;
  file = null;

  error = null;
  isMediaCreationSuccessful = false;
  createdMedia = null;
  fileName = null;

  media = {
    title: '',
    type: 'video',
    desc: '',
    category: '',
    file: ''
  };

  constructor(auth, client) {
    "use strict";
    super("Now, Give us some information about the uploaded file!", auth);


    this.client = client;
  }

  submit() {
    "use strict";
    this.media.file = this.fileName;
    this.client.media.create(this.media)
      .then(createdMedia => {
        this.createdMedia = createdMedia;
        this.isMediaCreationSuccessful = true;
      })
      .catch(err => {
        this.isMediaCreationSuccessful = false;
        this.error = err;
      });
  }

  clearThumbTimer() {
    "use strict";
    clearTimeout(this._thumbTimer);
  }

  getThumbFile(fileName) {
    "use strict";
    this.clearThumbTimer();
    return new Promise((resolve, reject)=> {

      this.client.file.getThumbStatus(fileName)
        .then(res=> {
          let data = res.content;
          if (data.ready) {
            return resolve(data.thumb);
          }

          this._thumbTimer = setTimeout(()=> this.getThumbFile(fileName), 1000);
        })
        .catch(reject);
    });
  }

  canDeactivate() {
    "use strict";
    this.clearThumbTimer();
    return true;
  }

  activate(params) {
    "use strict";
    this.fileName = `${params.fileName}.${params.fileExtension}`;

    this.getThumbFile(`${params.fileName}.png`)
      .then(thumbFileName=> this.thumbFileName = thumbFileName);

    //TODO: check if file can be attached to a media object
    //TODO: check if file exists
  }
}

