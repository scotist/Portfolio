(function(module) {
  var repoView = {};

  var ui = function() {
    var $about = $('#about');

    $about.find('ul').empty();
    $about.show().siblings().hide();
  };

  var render = function(repo) {
    console.log('render?!?');
    console.log('what is this?!');
    return '<li>' + repo.name + ': ' + repo.url + '</li>';
  };

  repoView.index = function() {
    ui();

    $('#about ul').append(
      repos.with('forks_count').map(render)
    );
  };

  module.repoView = repoView;
})(window);
