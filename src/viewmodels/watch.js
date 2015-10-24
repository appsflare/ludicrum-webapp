import {inject} from 'aurelia-framework';
import  {BaseViewModel} from 'lib/baseViewModel';
import {AuthService} from 'plugins/auth/authService';
import {ServiceClient} from 'services/serviceClient/client';
import 'styles/views/watch.css!';


@inject(AuthService, ServiceClient)
export class Watch extends BaseViewModel {

  media = null;

  constructor(auth, client) {
    "use strict";
    super('What to watch!', auth);
    this.items = [];
    this.client = client;
  }

  load(mediaId) {
    "use strict";
    return this.client.media.getByMediaId(mediaId)
      .then(res => {
        let media = this.media = res.content;
        let splitted = media.file.split('.');
        this.media.ext = splitted[1];
        this.media.thumbUrl = this.client.signUrl(this.client.getUrl(`/file/stream/${splitted[0]}.png`));
        this.media.videoUrl = this.client.signUrl(this.client.getUrl(`/file/stream/${media.file}`));

        return media;
      });
  }

  activate(params) {
    "use strict";
    return this.load(params.mediaId);
  }

  toggleLike() {
    "use strict";
    let liked = !this.media.liked;
    return this.client.emotion.setLike(this.media.id, liked)
      .then(res => {
        this.load(this.media.mediaId);
      });
  }

}

export class UpperValueConverter {
  toView(value) {
    return value && value.toUpperCase();
  }
}
