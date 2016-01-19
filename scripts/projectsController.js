(function(module) {
  var projectsController = {};
  Project.createTable();
  projectsController.index = function() {
    Project.fetchAll(projectView.initIndexPage);
    $('main > section').hide();
    $('#articles').show();
  };
  module.projectsController = projectsController;
})(window);
