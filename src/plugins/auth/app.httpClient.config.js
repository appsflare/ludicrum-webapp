import {HttpClient, RequestBuilder} from 'aurelia-http-client';
import {BaseConfig}  from './baseConfig';
import {Authentication} from './authentication';
import {Storage} from './storage';
import {inject} from 'aurelia-framework';
@inject(HttpClient, Authentication, Storage, BaseConfig)
export class AppHttpClientConfig {
  constructor(http, auth, storage, config) {
    this.http = http;
    this.auth = auth;
    this.storage = storage;
    this.config = config.current;
  }

  configure() {
    RequestBuilder.addHelper('authTokenHandling', ()=> {
      return (client, processor, message)=> {
        if (this.auth.isAuthenticated() && this.config.httpInterceptor) {
          if (this.config.authHeader) {
            message.headers.add(this.config.authHeader, this.auth.getPayload());
          }
        }
      }
    });

    this.http.configure(x => {
      x.authTokenHandling();
    });
  }
}
