/**
 * Created by srinath on 17/9/15.
 */
let mapDir = function (path) {
  return __dirname + path;
};

export default class StaticFilesServer {

  static getMappings() {
    return {
      '/styles': mapDir('/styles'),
      '/assets': mapDir('/assets'),
      '/dist': mapDir('/dist'),
      'dist': mapDir('/dist'),
      '/fonts': mapDir('/fonts'),
      '/jspm_packages': mapDir('/jspm_packages'),
      '/index.js': mapDir('/index.js'),
      '/config.js': mapDir('/config.js'),
      '/index.html': mapDir('/index.html'),
    };
  }

  static serve(app, express) {
    let staticFiles = StaticFilesServer.getMappings();

    for (var path in staticFiles) {
      app.use(path, express.static(staticFiles[path]));
    }

    app.use('/app.config.js', express.static(mapDir(`${__dirname}/config/${app.get('env')}/app.config.js`)));

    app.get('*', function (request, response) {
      response.sendFile(mapDir('/index.html'));
    });
  }
}
