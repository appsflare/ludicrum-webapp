/**
 * Created by srinath on 6/7/15.
 */
import {inject,All} from 'aurelia-framework';
import  config from 'app.config';
import  {AuthMethods, FileMethods} from './allMethods';
import {AppHttpClientConfig} from 'plugins/auth/app.httpClient.config';

@inject(AppHttpClientConfig, AuthMethods, FileMethods)
export class ServiceClient {


  constructor(appHttpClientConfig) {
    "use strict";

    Array.from(arguments)
      .slice(1)
      .forEach(method=> {
        method.configure(cfg=> cfg.withBaseUrl(config.baseUrl));
        appHttpClientConfig.configureClient(method);
        this[method.name] = method;

      }
    );
  }


}
