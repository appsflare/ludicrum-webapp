/**
 * Created by srinath on 17/9/15.
 */
let configForProduction = {
  baseUrl: process.env.API_BASE_URL || 'http://media-api.appsflare.com/',
  loginUrl: '/oauth/token',
  //clientId: 'M24JEOFN1W',
  //clientSecret: 'U0KbUehGim8s1EOBCOszUHEAPx2sFE'
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

export default configForProduction;
