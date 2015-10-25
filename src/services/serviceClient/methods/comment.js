/**
 * Created by srinath on 23/10/15.
 */

import {transient} from 'aurelia-framework';
import {BaseClient} from '../baseClient';

@transient()
export class CommentMethods extends BaseClient {

  endpoint = '/comment/';

  constructor() {
    "use strict";
    super('comment');
  }

  create(contentId, comment) {
    "use strict";
    return this.post(this.endpoint, {content: comment.content, contentId: contentId});
  }

  load(contentId, skip = 0, take = 20) {
    "use strict";
    return this.get(`${this.endpoint}for/${encodeURIComponent(contentId)}/skip/${skip}/take/${take}`);
  }

}
