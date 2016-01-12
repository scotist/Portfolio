var projectView = {};

projectView.handleMainNav = function() {
  $('.main-nav').on('click', '.tab', function(e) {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });
  $('.main-nav .tab:first').click();
};

projectView.menuToggle = function() {
  $('.icon-menu').on('click', function() {
    $('.main-nav ul').slideToggle();
  });
};

// projectView.initNewProjectPage = function() {
//   $('tab-content').show();
//   $('#export-field').hide();
//   $('#project-json').on('focus', function() {
//     this.select();
//   });
//   $('#new-form').on('change', 'input, textarea', projectView.create);
// };

// projectView.initIndexPage = function() {
//   Project.all.forEach(function(a){
//     $('#projects').append(a.toHtml());
//   });
//   projectView.handleMainNav();
//   projectView.menuToggle();
// };

$.ajax('projects.json', function() {
  console.log(xhr);
});

$(document).ready(function() {
  // projectView.populateFilter();
  // projectView.handleCategoryFilter();
  projectView.handleMainNav();
  // projectView.setTeasers();
  projectView.menuToggle();
});
