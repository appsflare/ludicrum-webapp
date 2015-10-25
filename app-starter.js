/**
 * Created by srinath on 17/9/15.
 */
import express from 'express';
import StaticFilesServer from './staticfileserver';

import gulp from 'gulp';
import gulpfile from './gulpfile';
import request from 'request';
import bodyParser from 'body-parser';
import envConfigs from './app.env.config';

let env = process.env.NODE_ENV || 'development';
let started = false;
let startApp = function () {

  if (started) return;
  started = true;

  let app = express();

  app.set('env', env);
  app.set('port', process.env.PORT);


  let config = require(`./config/${app.get('env')}/app.config.js`);

  app.set('config', config);


  app.use(bodyParser.json()); // support json encoded bodies
  app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

  app.post('/oauth/token', function (req, res) {

    let body = {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: "password",
      password: req.body.password,
      username: req.body.username
    };

    request({
      url: `${config.baseUrl}oauth/token`,
      method: "POST",
      json: true,
      headers: {
        "content-type": "application/json",
      },
      body: body
    }).pipe(res);
  });

  StaticFilesServer.serve(app, express);

  var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
  });
};


if (envConfigs.hasOwnProperty(env)) {
  var envConfig = envConfigs[env];
  gulp.start(envConfig.task, envConfig.next, ()=> {
    startApp();
  });
} else startApp();
