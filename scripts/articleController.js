(function(module) {
  var articlesController = {};

  Article.createTable();

  articlesController.index = function() {
    Article.fetchAll(articleView.initIndexPage);
    $('#articles').empty();
    $('#articles').show().siblings().hide();
  };

// alternate version of articlesController.index below:
  // articlesController.index = function(ctx, next) {
  //   articleView.index(ctx.articles);
  // };

  // attempt at articlesController.loadAll
  articlesController.loadAll = function(ctx, next) {
    var articleData = function(allArticles) {
      ctx.articles = Article.all;
      next();
    };

    if (Article.all.length) {
      ctx.articles = Article.all;
      next();
    } else {
      Article.fetchAll(articleData);
    }
  };


  module.articlesController = articlesController;
})(window);
