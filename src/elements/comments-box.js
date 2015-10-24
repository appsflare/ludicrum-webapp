/**
 * Created by srinath on 23/10/15.
 */
import {inject, customElement, bindable} from 'aurelia-framework';
import {ServiceClient} from 'services/serviceClient/client';

@customElement('comments-box')
@inject(Element, ServiceClient)

@bindable({
  name: 'contentId', //name of the property on the class
  attribute: 'content-id', //name of the attribute in HTML
  changeHandler: 'contentIdPropertyChanged', //name of the method to invoke when the property changes
})
export class CommentsBox {

  contentId = null;


  content = '';
  comments = null;


  _skip = 0;
  _take = 20;

  constructor(element, client) {
    "use strict";
    this.element = element;
    this.client = client;
    this.comments = [];
  }

  loadComments(contentId, skip, take) {
    "use strict";
    this._skip = skip;
    this._take = take;
    return this.client.comment.load(...arguments)
      .then(res => {
        this.comments = res.content;
      });
  }

  refreshComments() {
    "use strict";

    this.loadComments(this.contentId, 0, this._take + this._skip);
  }

  contentIdPropertyChanged(newValue) {
    "use strict";
    if (!newValue) {
      this.comments = [];
      return;
    }
    this.loadComments(newValue, 0, 20);
  }

  submit() {
    return this.client.comment.create(this.contentId, {content: this.content})
      .then(()=> {
        this.content = "";
        this.refreshComments();
      });
  }
}

@inject(ServiceClient)
export class GetProfileUrlValueConverter {

  client = null;

  constructor(client) {
    "use strict";
    this.client = client;
  }

  toView(value) {
    "use strict";
    return this.client.getSignedUrl(this.client.profile.getProfilePicUrl(value));
  }
}
