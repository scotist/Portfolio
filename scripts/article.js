(function(module) {
  function Article (opts) {
    Object.keys(opts).forEach(function(e, index, keys) {
      this[e] = opts[e];
    },this);
  }

  Article.all = [];

  Article.createTable = function(callback) {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS articles (' +
        'id INTEGER PRIMARY KEY, ' +
        'title VARCHAR(255) NOT NULL, ' +
        'url VARCHAR (255), ' +
        'category VARCHAR(20), ' +
        'description TEXT NOT NULL);',

      function(result) {
        console.log('Successfully set up the articles table.', result);
        if (callback) callback();
      }
    );
  };

  Article.truncateTable = function(callback) {
    webDB.execute(
      'DELETE FROM articles;',
      callback
    );
  };

  Article.prototype.insertRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO articles (category, title, url, description) VALUES (?, ?, ?, ?);',
          'data': [this.category, this.title, this.url, this.description],
        }
      ],
      callback
    );
  };

  Article.prototype.deleteRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'DELETE FROM articles WHERE id = ?;',
          'data': [this.id]
        }
      ],
      callback
    );
  };

  Article.prototype.updateRecord = function(callback) {
    webDB.execute(
      [
        {

          'sql': 'UPDATE articles SET category = ?, title = ?, url = ?, description = ? WHERE id = ?;',
          'data': [this.category, this.title, this.url, this.description, this.id]
        }
      ],
      callback
    );
  };

  Article.loadAll = function(rows) {
    Article.all = rows.map(function(ele) {
      return new Article(ele);
    });
  };

  Article.fetchAll = function(next) {
    // webDB.execute('SELECT * FROM articles ORDER BY publishedOn DESC', function(rows) {
    webDB.execute('SELECT * FROM articles', function(rows) {

      if (rows.length) {
        Article.loadAll(rows);
        next();
      } else {
        $.getJSON('/data/projects.json', function(rawData) {
          rawData.forEach(function(item) {
            var article = new Article(item);
            article.insertRecord();
          });
          webDB.execute('SELECT * FROM articles', function(rows) {
            Article.loadAll(rows);
            next();
          });
        });
      }
    });
  };

  module.Article = Article;
})(window);
