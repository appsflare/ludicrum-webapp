/**
 * Created by srinath on 19/9/15.
 */
var gulp = require('gulp');
var bundler = require('aurelia-bundler');

var aurLibs = ['aurelia-bootstrapper',
  'aurelia-fetch-client',
  'aurelia-router',
  'aurelia-animator-css',
  'github:aurelia/templating-binding',
  'github:aurelia/templating-resources',
  'github:aurelia/templating-router',
  'github:aurelia/loader-default',
  'github:aurelia/history-browser',
  'github:aurelia/logging-console'];

var appLibs = [
  'services/**/*',
  'plugins/**/*',
  'lib/**/*'
  //'*.css!text'
];

var config = {
  force: true,
  packagePath: '.',
  bundles: {
    "dist/aurelia": {
      includes: aurLibs,
      options: {
        inject: true,
        minify: true
      }
    },
    "dist/app-framework": {
      includes: appLibs,
      excludes: aurLibs,
      options: {
        inject: true,
        minify: true
      }
    },
    "dist/app-build": {
      includes: [
        '*',
        '*.html!text',
        //'*.css!text'
      ],
      excludes: aurLibs.concat(appLibs),
      options: {
        inject: true,
        minify: true
      }
    }
  }
};

gulp.task('bundle', function () {
  return bundler.bundle(config);
});

gulp.task('unbundle', function () {
  return bundler.unbundle(config);
});
