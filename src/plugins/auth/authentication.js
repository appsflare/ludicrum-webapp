import {inject} from 'aurelia-framework';
import {BaseConfig}  from './baseConfig';
import {Storage} from './storage';
import authUtils from './authUtils';
@inject(Storage, BaseConfig)
export class Authentication {
  constructor(storage, config) {
    this.storage = storage;
    this.config = config.current;
    this.tokenName = this.config.tokenPrefix ? this.config.tokenPrefix + '_'
    + this.config.tokenName : this.config.tokenName;
  }

  getLoginUrl() {
    return this.config.loginUrl;
  }


  getSignupUrl() {
    return this.config.signupUrl;
  }


  getProfileUrl() {
    return this.config.baseUrl ? authUtils.joinUrl(this.config.baseUrl, this.config.profileUrl) : this.config.profileUrl;
  }


  getToken() {
    return JSON.parse(this.storage.get(this.tokenName));
  }


  getPayload() {
    var token = this.getToken();

    return token.token_type + ' ' + token.access_token;
  }


  setToken(response, redirect) {

    if (!authUtils.isObject(response)) {
      throw new Error('response must be an object with properties namely "access_token","token_type" optionally "exp" and "refresh_token".');
    }

    this.storage.set(this.tokenName, JSON.stringify(response));

    if (this.config.loginRedirect && !redirect) {
      window.location.href = this.config.loginRedirect;
    } else if (redirect && authUtils.isString(redirect)) {
      window.location.href = window.encodeURI(redirect);
    }
  }


  removeToken() {
    this.storage.remove(this.tokenName);
  }

  isAuthenticated() {
    var token = this.getToken();

    if (token) {
      var exp = token.exp;
      if (exp) {
        return new Date().getTime() <= exp;
      }
      else return true;
    }
    return false;
  }


  logout(redirect) {
    var tokenName = this.tokenName;
    return new Promise((resolve, reject)=> {
      this.storage.remove(tokenName);
      //var this.config = this.this.config;
      if (this.config.logoutRedirect && !redirect) {
        window.location.href = this.config.logoutRedirect;
      }
      else if (authUtils.isString(redirect)) {
        //window.location.href =redirect;
        //this.router.navigate(redirect);
        window.location.href = redirect;

      }
      resolve();
    });

  }


}
