/**
 * Created by srinath on 6/7/15.
 */
import {HttpClient} from 'aurelia-http-client';

export class BaseClient extends HttpClient {
  constructor() {
    "use strict";
    super();
    this.name = '';
    this.baseUrl = '';
  }

  createRequest(url) {
    "use strict";
    var request = super.createRequest(url);

    signClient(request);

    return request;
  }

  constructUrl(url) {
    "use strict";
    return url;
  }

  signClient(request) {
    "use strict";
    return request;
  }


}
