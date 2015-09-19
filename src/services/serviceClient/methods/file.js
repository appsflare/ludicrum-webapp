/**
 * Created by srinath on 16/8/15.
 */
import {transient} from 'aurelia-framework';
import {BaseClient} from '../baseClient';

@transient()
export class FileMethods extends BaseClient {

  constructor() {
    "use strict";
    super('file');
  }

  upload(file, progressCallback) {
    "use strict";
    var formData = new FormData();
    formData.append("file", file);

    let request = this.createRequest('/file/upload')
      .asPost()
      .withContent(formData);

    progressCallback && request.withProgressCallback(e=> progressCallback(e, ((e.loaded / e.total) * 100).toFixed(2)));

    return request.send();

  }

  getThumbStatus(fileName) {
    "use strict";
    return this.get(`/file/thumbstatus/${fileName}`);
  }


}
