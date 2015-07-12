import {inject} from 'aurelia-framework';
import {BaseConfig} from './baseConfig';


var storageTempl = function (prop, name) {
  "use strict";
  this.get = function (key) {
    "use strict";
    if (prop in window && window[prop] !== null) {
      return window[prop].getItem(key);
    } else {
      console.warn('Warning: ' + name + ' is disabled or unavailable');
      return undefined;
    }
  };
  this.set = function (key, value) {
    "use strict";
    if (prop in window && window[prop] !== null) {
      return window[prop].setItem(key, value);

    } else {
      console.warn('Warning: ' + name + ' is disabled or unavailable. will not work correctly.');
      return undefined;
    }
  };
  this.remove = function (key) {
    "use strict";
    if (prop in window && window[prop] !== null) {
      return window[prop].removeItem(key);
    } else {
      console.warn('Warning: ' + name + ' is disabled or unavailable. will not work correctly.');
      return undefined;
    }
  };
};

var storages = {
  sessionStorage: new storageTempl('sessionStorage', 'Session Storage'),
  localStorage: new storageTempl('localStorage', 'Local Storage')
};

@inject(BaseConfig)
export class Storage {
  constructor(config) {
    this.config = config.current;
  }

  get(key) {
    return storages[this.config.storage].get(key);
  }

  set(key, value) {
    return storages[this.config.storage].set(key, value);
  }

  remove(key) {
    switch (this.config.storage) {
      case 'localStorage':

        break;

      case 'sessionStorage':
        if ('sessionStorage' in window && window['sessionStorage'] !== null) {
          return sessionStorage.removeItem(key);

        } else {
          console.warn('Warning: Session Storage is disabled or unavailable.  will not work correctly.');
          return undefined;
        }
        break;
    }
  }


}
