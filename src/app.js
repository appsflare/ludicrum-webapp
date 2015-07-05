import 'styles/metro.css!';
import 'styles/components/app.css!';
import 'github:components/jquery@2.1.4/jquery';
import 'components/metro';

import {ConventionalViewStrategy} from 'aurelia-framework';

ConventionalViewStrategy.convertModuleIdToViewUrl = function(moduleId){
  return moduleId.replace('viewmodels', 'views') + '.html';
};

export class App {
  configureRouter(config, router){
    config.title = 'Ludicrum';
    config.options.pushState = true;
    config.map([
      { route: ['','welcome'],  moduleId: './viewmodels/welcome',      nav: true, title:'Welcome' },
      { route: 'flickr',        moduleId: './viewmodels/flickr',       nav: true, title:'Flickr' },
      { route: 'child-router',  moduleId: './viewmodels/child-router', nav: true, title:'Child Router' }
    ]);



    this.router = router;
  }
}
