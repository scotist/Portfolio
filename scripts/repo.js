(function(module) {
  var repos = {};

  repos.all = [];

  repos.requestRepos = function(callback) {
    $.get({
      url: '/github/users/scotist/repos' +
          '?per_page=100' + '&sort=updated',
          // type: 'GET',
    })
      .done(function(data, message, xhr) {
        repos.all = data;
      })
      .done(callback);
  };

  repos.with = function(attr) {
    return repos.all.filter(function(repo) {
      return repo[attr];
    });
  };

  module.repos = repos;
})(window);
