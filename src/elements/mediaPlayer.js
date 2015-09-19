/**
 * Created by srinath on 13/9/15.
 */
import {customElement, inject, bindable} from 'aurelia-framework';
import 'github:selz/plyr@1.3.6/dist/plyr.css!';
import  plyr from 'github:selz/plyr@1.3.6/dist/plyr';

@customElement('media-player')
@inject(Element)
export class Player {
  @bindable poster;
  @bindable src;
  @bindable type;

  constructor(element) {
    "use strict";
    this.element = element;
  }

  attached() {
    "use strict";
    plyr.setup({storage: {enabled: true}});
  }


}
