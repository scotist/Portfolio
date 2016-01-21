(function(module) {

  var projectView = {};

  projectView.initNewProjectPage = function () {
    $('.tab-content').show();
    $('#export-field').hide();
    $('#project-json').on('focus', function(){
      this.select();
    });
    $('#new-form').on('change', 'input, textarea', projectView.create);
  };

  projectView.create = function() {
    var project;
    $('#projects').empty();

    project = new Project({
      title: $('#project-title').val(),
      category: $('#project-category').val(),
      url: $('#project-url').val(),
      description: $('#project-description').val()
    });

    $('#projects').append(project.toHtml());
    $('pre code').each(function(i, block) {
      hljs.highlight(block);
    });

    $('#export-field').show();
    $('#project-json').val(JSON.stringify(project) + ',');
  };

  projectView.initIndexPage = function() {
    Project.all.forEach(function(a){
      $('#projects').append(a.toHtml());
    });
  };

  module.projectView = projectView;
})(window);
