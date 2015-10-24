/**
 * Created by srinath on 24/10/15.
 */
export class EncodeUriComponentValueConverter {

  toView(value) {
    "use strict";
    return encodeURIComponent(value);
  }

  fromView(encodedValue) {
    "use strict";
    return decodeURIComponent(encodedValue);
  }
}


export class DecodeUriComponentValueConverter {

  toView(value) {
    "use strict";
    return decodeURIComponent(value);
  }

  fromView(encodedValue) {
    "use strict";
    return encodeURIComponent(encodedValue);
  }
}
