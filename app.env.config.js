module.exports = {

  production: {
    task: 'build',
    next: ['bundle']
  },
  development: {
    task: 'build',
    next: ['watch-only']
  }

};
