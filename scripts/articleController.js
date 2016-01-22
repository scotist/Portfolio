(function(module) {
  var articlesController = {};

  Article.createTable();

  articlesController.index = function() {
    Article.fetchAll(articleView.initIndexPage);
    $('#articles').empty();
    $('#articles').show().siblings().hide();
  };

  module.articlesController = articlesController;
})(window);
