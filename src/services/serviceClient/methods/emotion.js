/**
 * Created by srinath on 23/10/15.
 */

import {transient} from 'aurelia-framework';
import {BaseClient} from '../baseClient';

@transient()
export class EmotionMethods extends BaseClient {

  endpoint = '/emotion/';

  constructor() {
    "use strict";
    super('emotion');
  }

  setLike(contentId, like) {
    "use strict";
    return this.get(`${this.endpoint}like/${encodeURIComponent(contentId)}/${like ? 1 : 0}`);
  }


}
