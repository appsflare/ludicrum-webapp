/**
 * Created by srinath on 24/10/15.
 */

import {transient} from 'aurelia-framework';
import {BaseClient} from '../baseClient';

@transient()
export class ProfileMethods extends BaseClient {

  endpoint = '/profile/';

  constructor() {
    "use strict";
    super('profile');
  }

  create(profile) {
    "use strict";
    return this.post(`${this.endpoint}`, profile);
  }

  update(id, profile) {
    "use strict";
    return this.put(`${this.endpoint}${encodeURIComponent(id)}`, profile);
  }

  me() {
    "use strict";
    return this.get(`${this.endpoint}me`);
  }

  forUser(userId) {
    "use strict";
    return this.get(`${this.endpoint}list/byuser/${encodeURIComponent(userId)}`);
  }

  getProfilePicUrl(userId) {
    "use strict";
    return `${this.endpoint}${encodeURIComponent(userId)}/picture`;
  }

}
