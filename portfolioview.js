var projectView = {};

// projectView.populateFilter = function() {
//   $('project').each(function() {
//     if(!$(this).hasClass('template')) {
//       var val = $(this).find('address a').text();
//       var optionTag = '<option value="' + val + '">' + val + '</option"';
//       $('#category-filter').append(optionTag);
//     }
//   });
// };

projectView.populateFilter = function() {
  $('project').each(function() {
    if (!$(this).hasClass('template')) {
      var val = $(this).find('address a').text();
      var optionTag = '<option value="' + val + '">' + val + '</option>';
      $('#author-filter').append(optionTag);

      var val = $(this).find('address a').text();
      var optionTag = '<option value="' + val + '">' + val + '</option>';
      val = $(this).attr('data-category');
      optionTag = '<option value="' + val + '">' + val + '</option>';
      if ($('#category-filter option[value="' + val + '"]').length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};


projectView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('project').hide();
      $('project[data-category="' + $(this).val() + '"]').fadeIn();
    } else {
      $('project').fadeIn();
      $('project.template').hide();
    }
    $('#project-filter').val('');
  });
};

projectView.handleMainNav = function() {
  $('.main-nav').on('click', '.tab', function(e) {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });
  $('.main-nav .tab:first').click();
};

projectView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide();
  $('#articles').on('click', 'a.read-on', function(e) {
    e.preventDefault();
    $(this).parent().find('*').fadeIn();
    $(this).hide();
  });
};

projectView.menuToggle = function() {
  $('.icon-menu').on('click', function() {
    $('.main-nav ul').slideToggle();
  });
};

$(document).ready(function() {
  projectView.populateFilter();
  projectView.handleCategoryFilter();
  // projectView.handleMainNav();
  projectView.setTeasers();
  projectView.menuToggle();
});
