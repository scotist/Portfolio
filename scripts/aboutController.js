(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    $('#about').show().siblings().hide();
    console.log('you have made it to AboutController! Congrats!');
    repos.requestRepos(repoView.index);
  };

  module.aboutController = aboutController;
})(window);
