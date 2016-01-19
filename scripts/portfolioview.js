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

// projectView.handleMainNav = function(){
//   $('#main-nav').on('click', '.tab', function(e) {
//     $('section').hide();
//     $('#' + $(this).data('content')).fadeIn();
//   });
//
//   $('#main-nav .tab:first').click();
// };
//
// projectView.menuToggle = function() {
//   $('.icon-menu').on('click', function() {
//     $('.main-nav ul').slideToggle();
//   });
// };

// projectView.initProjects = function(){
//   Project.all.forEach(function(a){
//     $('#projects').append(a.toHtml(a));
//   });
//   projectView.handleMainNav();
//   projectView.menuToggle();
// };
//
// $(document).ready(function() {
//   projectView.handleMainNav();
//   projectView.menuToggle();
// });


// projectView.handleMainNav = function() {
//   $('.main-nav').on('click', '.tab', function(e) {
//     $('.tab-content').hide();
//     $('#' + $(this).data('content')).fadeIn();
//   });
//   $('.main-nav .tab:first').click();
// };
//

//
//
// projectView.initIndexPage = function() {
//   Project.all.forEach(function(a){
//     $('#projects').append(a.toHtml(a));
//   });
//   projectView.handleMainNav();
//   projectView.menuToggle();
// };
//
// $(document).ready(function() {
//   projectView.handleMainNav();
//   projectView.menuToggle();
// });
