/**
 * Created by srinath on 11/7/15.
 */
var configForDevelopment = {
  baseUrl: 'http://dev-media-api.appsflare.com:1337/',
  loginUrl: '/oauth/token'
  //providers: {
  //  google: {
  //    clientId: ''
  //  }
  //  ,
  //  linkedin:{
  //    clientId:''
  //  },
  //  facebook:{
  //    clientId:''
  //  }
  //}
};

var configForProduction = {
  baseUrl: 'http://media-api.appsflare.com/',
  loginUrl: '/oauth/token'
  //providers: {
  //  google: {
  //    clientId: ''
  //  }
  //  ,
  //  linkedin:{
  //    clientId:''
  //  },
  //  facebook:{
  //    clientId:''
  //  }
  //}
};
var config;
if (window.location.hostname === 'localhost') {
  config = configForDevelopment;
}
else {
  config = configForDevelopment;
  //config = configForProduction;
}


export default config;
