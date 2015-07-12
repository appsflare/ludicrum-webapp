/**
 * Created by srinath on 11/7/15.
 */
import {AuthorizeStep} from 'plugins/auth/authorizeStep';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class AppRouterConfig {

  constructor(router) {
    this.router = router;
  }

  configure() {
    var appRouterConfig = function (config) {
      config.title = 'Ludicrum';
      config.addPipelineStep('authorize', AuthorizeStep); // Add a route filter to the authorize extensibility point.
      config.options.pushState = true;


      config.map([
        {route: ['', 'home'], moduleId: './viewmodels/home', nav: true, title: 'home'},
        {route: 'flickr', moduleId: './viewmodels/flickr', nav: true, title: 'Flickr', auth: true},
        {route: 'signup', moduleId: './viewmodels/signup', nav: false, title: 'Signup'},
        {route: 'login', moduleId: './viewmodels/login', nav: false, title: 'Login'},
        {route: 'logout', moduleId: './viewmodels/logout', nav: false, title: 'Logout'},
        {route: 'profile', moduleId: './viewmodels/profile', nav: false, title: 'Profile', auth: true},
        {route: 'me/upload', moduleId: './viewmodels/user/upload', nav: false, title: 'Upload', auth: true}
        //{ route: 'child-router',  moduleId: './child-router', nav: true, title:'Child Router' }
      ]);
    };

    this.router.configure(appRouterConfig);
  }

}
