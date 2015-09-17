/**
 * Created by srinath on 5/9/15.
 */
import {transient} from 'aurelia-framework';
import {BaseClient} from '../baseClient';

@transient()
export class MediaMethods extends BaseClient {

  endpoint = '/media';

  constructor() {
    "use strict";
    super('media');
  }

  getAll() {
    "use strict";
    return this.get(this.endpoint);
  }

  getByMediaId(mediaId) {
    "use strict";
    return this.get(`${this.endpoint}/byid/${mediaId}`);
  }

  create(media) {
    "use strict";
    return this.post(this.endpoint, media);

  }

  update(media) {
    "use strict";
    return this.post(`${this.endpoint}/${media.id}`, media);

  }

  remove(id) {
    "use strict";
    return this.delete(`${this.endpoint}/${id}`);

  }


}
