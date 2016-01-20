(function(module) {

var projectView = {};


projectView.handleMainNav = function(){
  $('#main-nav').on('click', '.tab', function(e) {
    $('section').hide();
    $('#' + $(this).data('content')).fadeIn();
  });

  $('#main-nav .tab:first').click();
};

projectView.menuToggle = function() {
  $('.icon-menu').on('click', function() {
    $('.main-nav ul').slideToggle();
  });
};

projectView.initProjects = function(){
  Project.all.forEach(function(a){
    $('#projects').append(a.toHtml(a));
  });
  projectView.handleMainNav();
  projectView.menuToggle();
};

$(document).ready(function() {
  projectView.handleMainNav();
  projectView.menuToggle();
});

module.projectView = projectView;
})(window);

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
