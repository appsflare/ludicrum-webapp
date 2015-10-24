/**
 * Created by srinath on 6/7/15.
 */
import {inject,All} from 'aurelia-framework';
import  config from 'app.config';
import  {AuthMethods, FileMethods, MediaMethods, EmotionMethods, CommentMethods, ProfileMethods} from './allMethods';
import {AppHttpClientConfig} from 'plugins/auth/app.httpClient.config';
import {Authentication} from 'plugins/auth/authentication';

@inject(AppHttpClientConfig, Authentication, AuthMethods, FileMethods, MediaMethods, EmotionMethods, CommentMethods, ProfileMethods)
export class ServiceClient {


  constructor(appHttpClientConfig, authentication) {
    "use strict";

    this.authentication = authentication;

    Array.from(arguments)
      .slice(2)
      .forEach(method=> {
        method.configure(cfg=> cfg.withBaseUrl(config.baseUrl));
        appHttpClientConfig.configureClient(method);
        this[method.name] = method;

      }
    );
  }

  signUrl(url) {
    "use strict";
    return `${url}${(url.indexOf('?') > -1) ? '&' : '?'}access_token=${this.authentication.getToken().access_token}`;
  }


// Joins path segments.  Preserves initial "/" and resolves ".." and "."
// Does not support using ".." to go above/outside the root.
// This means that join("foo", "../../bar") will not resolve to "../bar"
  join(url, join_url) {
    // Split the inputs into a list of path commands.
    var parts = [];
    for (var i = 0, l = arguments.length; i < l; i++) {
      parts = parts.concat(arguments[i].split("/"));
    }

    if (parts.length > 1 && parts[0].endsWith(':') && parts[1] == '') {
      parts[1] = "//";
    }

    // Interpret the path commands to get the new resolved path.
    var newParts = [];
    for (i = 0, l = parts.length; i < l; i++) {
      var part = parts[i];
      // Remove leading and trailing slashes
      // Also remove "." segments
      if (!part || part === ".") continue;
      // Interpret ".." to pop the last segment
      if (part === "..") newParts.pop();
      // Push new path segments.
      else newParts.push(part);
    }
    // Preserve the initial slash if there was one.
    if (parts[0] === "") newParts.unshift("");
    // Turn back into a single string path.


    return newParts.join("/") || (newParts.length ? "/" : ".");
  }

  getUrl(endpoint) {
    "use strict";
    return this.join(config.baseUrl, endpoint);
  }

  getSignedUrl(endpoint) {
    "use strict";
    return this.signUrl(this.getUrl(endpoint));
  }

}
