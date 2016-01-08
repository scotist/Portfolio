var view = {};

view.handleMainNav = function() {
  // TODO: Add an event handler to .main-nav element that will power the Tabs feature.
  //       Clicking any .tab element should hide all the .tab-content sections, and then reveal the
  //       single .tab-content section that is associated with the clicked .tab element.
  //       So: You need to dynamically build a selector string with the correct ID, based on the
  //       data available to you on the .tab element that was clicked.
  $('.tab-content').hide();
  $('#' + $(this).data('content')).fadeIn();

  $('.tab').on('click', function(event) {
    event.preventDefault();
    var $content = $(this).data('content');
  });
}

$(document).ready(function(){
  view.handleMainNav();
});
