import 'styles/metro.css!';
import 'styles/components/app.css!';
import 'github:components/jquery@2.1.4/jquery';
import 'components/metro';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {AppRouterConfig} from 'app.router.config';
import {AppHttpClientConfig} from 'plugins/auth/app.httpClient.config';
import {ConventionalViewStrategy} from 'aurelia-framework';

ConventionalViewStrategy.convertModuleIdToViewUrl = function (moduleId) {
  return moduleId.replace('viewmodels', 'views') + '.html';
};

@inject(Router, AppHttpClientConfig, AppRouterConfig)
export class App {

  constructor(router, httpClientConfig, appRouterConfig) {
    this.router = router;
    this.httpClientConfig = httpClientConfig;
    this.appRouterConfig = appRouterConfig;
  }

  activate() {

    this.httpClientConfig.configure();
    this.appRouterConfig.configure();
  }
}
