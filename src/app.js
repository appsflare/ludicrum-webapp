/*import 'styles/metro.css!';
 import 'styles/metro-icons.css!';*/
import 'styles/components/app.css!';
import 'github:components/jquery@2.1.4/jquery';
import 'components/metro';
import {inject,ConventionalViewStrategy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {AppRouterConfig} from 'app.router.config';
import {AppHttpClientConfig} from 'plugins/auth/app.httpClient.config';

let defaultViewStrategy = ConventionalViewStrategy.convertModuleIdToViewUrl;

ConventionalViewStrategy.convertModuleIdToViewUrl = function (moduleId) {
  let viewPath = defaultViewStrategy(moduleId).replace('viewmodels', 'views');

  console.log(`view for ${moduleId} is ${viewPath}`);

  return defaultViewStrategy(moduleId).replace('viewmodels', 'views');
};

@inject(Router, AppHttpClientConfig, AppRouterConfig)
export class App {

  sidebar = null;

  constructor(router, httpClientConfig, appRouterConfig) {
    this.router = router;
    this.httpClientConfig = httpClientConfig;
    this.appRouterConfig = appRouterConfig;
  }

  activate() {

    this.httpClientConfig.configure();
    this.appRouterConfig.configure();

    this.sidebar = {
      compact: true,
      items: [{icon: 'mif-home', counter: '', title: 'What to watch', href: '/', config: {auth: true}},
        {icon: 'mif-profile', counter: '', title: 'My channel', href: '/me/channel', config: {auth: true}},
        {icon: 'mif-stack3', counter: '', title: 'My subscriptions', href: '/me/subscriptions', config: {auth: true}},
        {icon: 'mif-history', counter: '', title: 'History', href: '/me/history', config: {auth: true}},
        {icon: 'mif-stack', counter: '', title: 'Watch later', href: '/me/watch-later', config: {auth: true}}]
    };
  }
}
