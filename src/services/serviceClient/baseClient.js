/**
 * Created by developer on 6/7/15.
 */
import {HttpClient} from 'aurelia-http-client';

export class BaseClient extends HttpClient {
  constructor() {
    "use strict";
    this.name = '';
    this.baseUrl = '';
    super();
  }

  createRequest(url) {
    "use strict";
    var request = super.createRequest(url);

    signClient(request)

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
