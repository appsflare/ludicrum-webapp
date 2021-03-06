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
        {route: ['', 'home'], moduleId: './viewmodels/home', nav: false, title: 'home'},
        {route: 'signup', moduleId: './viewmodels/signup', nav: false, title: 'Sign up'},
        {route: 'login', moduleId: './viewmodels/login', nav: false, title: 'Login'},
        {route: 'logout', moduleId: './viewmodels/logout', nav: false, title: 'Logout'},

        {
          route: 'profile/view/:userId',
          moduleId: './viewmodels/profile/view',
          nav: false,
          title: 'View Profile',
          auth: true
        },
        {
          route: 'media/create/:fileExtension/:fileName',
          moduleId: './viewmodels/media/create',
          nav: false,
          title: 'Create Media',
          auth: true
        },
        {
          route: 'watch/:mediaId',
          moduleId: './viewmodels/watch',
          nav: false,
          title: 'Watch/Listen media',
          auth: true
        },
        {
          route: 'media/update/:id',
          moduleId: './viewmodels/media/update',
          nav: false,
          title: 'Update Media',
          auth: true
        },
        //{ route: 'child-router',  moduleId: './child-router', nav: true, title:'Child Router' }
      ]);
    };

    this.router.configure(appRouterConfig);
  }

}
