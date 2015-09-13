/**
 * Created by srinath on 6/7/15.
 */
import {HttpClient} from 'aurelia-http-client';

export class BaseClient extends HttpClient {
  constructor(name) {
    "use strict";
    super();
    this.name = name;
  }


  createRequest(url) {
    "use strict";
    var request = super.createRequest(url);

    this.signClient(request);

    return request;
  }

  signClient(request) {
    "use strict";
    return request;
  }


}
