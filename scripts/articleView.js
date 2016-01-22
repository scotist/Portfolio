(function(module) {
  var articleView = {};

  var render = function(article) {
    var template = Handlebars.compile($('#article-template').text());
    return template(article);
  };

  articleView.initIndexPage = function() {
    Article.all.forEach(function(a){
      $('#articles').append(render(a));
    });
  };

  module.articleView = articleView;
})(window);
