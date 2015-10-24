import {EmoticonsParser} from 'services/emoticonParser';
import  {inject} from 'aurelia-framework';

@inject(EmoticonsParser)
export class EmoticonParserValueConverter {

  constructor(emoticonParser) {
    "use strict";
    this.emoticonParser = emoticonParser;
  }

  toView(value) {
    "use strict";
    return this.emoticonParser.replace(value);
  }

}
