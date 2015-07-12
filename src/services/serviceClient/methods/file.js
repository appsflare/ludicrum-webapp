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

  upload(file) {
    "use strict";
    return this.post('/file/upload', {file: file});

  }


}
