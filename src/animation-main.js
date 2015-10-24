import config from './app.config';
export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-animator-css')
    .plugin('lib/converters')
    .plugin('plugins/auth/index', (baseConfig)=> {
      baseConfig.configure(config);
    });

  aurelia.start().then(a => a.setRoot());
}
