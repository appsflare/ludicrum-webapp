/**
 * Created by srinath on 24/10/15.
 */
import {inject} from 'aurelia-framework';
import  {BaseViewModel} from 'lib/baseViewModel';
import {AuthService} from 'plugins/auth/authService';
import {ServiceClient} from 'services/serviceClient/client';
import 'styles/views/home.css!';

@inject(AuthService, ServiceClient)
export class ViewProfile extends BaseViewModel {

  profiles = null;
  userId = null;


  constructor(auth, client) {
    "use strict";
    super('Profile', auth);
    this.profiles = [];
    this.client = client;
  }

  postLoad() {
    "use strict";
    let systemProfile = this.profiles.find(profile=> profile.type == 'system');

    if (systemProfile) {
      this.heading = `${this.heading}: ${systemProfile.name}`;
    }
  }

  attached() {
    "use strict";
    debugger;
  }

  get profilePicUrl() {
    "use strict";
    return this.client.signUrl(this.client.getUrl(`/profile/default/picture`));
  }

  load() {
    "use strict";
    this.client.profile.forUser(this.userId)
      .then((res, err)=> {

        this.profiles = res.content;
        this.postLoad();


      });
  }

  activate(params) {
    "use strict";
    this.userId = decodeURIComponent(params.userId);
    return this.load();
  }
}
