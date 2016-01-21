(function(module) {
  var articleView = {};
  var render = function(article) {
    var template = Handlebars.compile($('#article-template').text());
    return template(article);
  };

  articleView.initNewArticlePage = function() {
    $('.tab-content').show();
    $('#export-field').hide();
    $('#article-json').on('focus', function(){
      this.select();
    });

    $('#new-form').on('change', 'input, textarea', articleView.create);
  };

  articleView.create = function() {
    var article;
    $('#articles').empty();

    article = new Article({
      title: $('#article-title').val(),
      url: $('#article-url').val(),
      category: $('#article-category').val(),
      description: $('#article-description').val()
    });

    $('#articles').append(render(article));

    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });

    $('#export-field').show();
    $('#article-json').val(JSON.stringify(article) + ',');
  };

  articleView.initIndexPage = function() {
    Article.all.forEach(function(a){
      $('#articles').append(render(a));
    });
  };

  module.articleView = articleView;
})(window);
