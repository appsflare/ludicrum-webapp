/**
 * Created by srinath on 13/9/15.
 */
import {customElement, bindable} from 'aurelia-framework';
import 'github:selz/plyr@1.3.6/dist/plyr.css!';
import  plyr from 'github:selz/plyr@1.3.6/dist/plyr';

@customElement('media-player')
export class Player {
  @bindable poster;
  @bindable src;
  @bindable type;

  attached() {
    "use strict";
    plyr.setup(this.element);
  }


}
