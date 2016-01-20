(function(module) {

function Project(features){
  Object.keys(features).forEach(function(e, index, keys){
    this[e] = features[e];
  }, this);
};

Project.all = [];

Project.prototype.toHtml = function(){
  var template = Handlebars.compile($('#article-template').text());
  this.body = marked(this.body);
  return template(this);
};

Project.createTable = function(callback) {
  webDB.execute(
    'CREATE TABLE IF NOT EXISTS articles (' +
      'id INTEGER PRIMARY KEY, ' +
      'title VARCHAR(255) NOT NULL, ' +
      'category VARCHAR(20), ' +
      'url VARCHAR(255), ' +
      'description TEXT NOT NULL);',
    function(result) {
      console.log('Successfully set up the projects table.', result);
      if (callback) callback();
    }
  );
};

Project.truncateTable = function(callback) {
  webDB.execute(
    'DELETE FROM projects;',
    callback
  );
};

Project.prototype.insertRecord = function(callback) {
  webDB.execute(
  [
    {
      'sql': 'INSERT INTO projects (title, category, url, description), VALUES (????);',
      'data': [this.title, this.category, this.url, this.description],
    }
  ],
  callback
  );
};

Project.prototype.deleteRecord = function(callback) {
  webDB.execute(
    [
      {
        'sql': 'DELETE FROM projects WHERE id = ?;',
        'data': [this.id]
      }
    ],
    callback
  );
};

Project.prototype.updateRecord = function(callback) {
  webDB.execute(
    [
      {
        'sql': 'UPDATE projects SET title = ?, category = ?, url = ?, description = ? WHERE id = ?;',
        'data': [this.title, this.category, this.url, this.description, this.id]
      }
    ],
    callback
  );
};

////////////////////////
////////////////////////
Project.loadAll = function(rows){
  Project.all = rows.map(function(ele) {
    return new Project(ele);
  });
};

// Project.checkUpdates = function(){
//   $.getJSON('projects.json', function(rawData){
//     Project.loadAll(rawData);
//     localStorage.rawData = JSON.stringify(rawData);
//     projectView.initProjects();
//   });
// };
//
// Project.checkEtags = function(data, message, xhr){
//   var eTag = xhr.getResponseHeader('ETag');
//   if(typeof localStorage.projEtag == 'undefined' || localStorage.projEtag != eTag){
//     localStorage.projEtag = eTag;
//     Project.checkUpdates();
//   }else {
//     Project.loadAll(JSON.parse(localStorage.rawData));
//     projectView.initProjects();
//   }
// };

Project.fetchAll = function(next){
  webDB.execute('SELECT * FROM projects', function(rows_){
    if (rows.length) {
      Project.loadAll(rows);
      next();
    } else {
      $.getJSON('projects.json', function(rawData){
        rawData.forEach(function(item){
          var project = new Project(item);
          project.insertRecord();
        });
        webDB.execute('SELECT * FROM projects', function(rows){
          Project.loadAll(rows);
          next();
        });
      });
    }
  });
};


module.Project = Project;
})(window);

// function Project (content) {
//   this.title = content.title;
//   this.url = content.url;
//   this.description = content.description;
//   this.image = content.image;
// }
//
// Project.all = [];
//
// Project.prototype.toHtml = function(a) {
//   var source = $('#project-template').html();
//   var template = Handlebars.compile(source);
//   return html;
// };
//
// Project.loadAll = function(data) {
//   data.forEach(function(ele){
//     Project.all.push(new Project(ele));
//   });
// };
//
// Project.checkUpdates = function(){
//   $.getJSON('projects.json', function(data){
//     Project.loadAll(data);
//     localStorage.data = JSON.stringify(data);
//     projectView.initProjects();
//   }).error(function(jqXHR, textStatus, errorThrown) {
//         console.log("error " + textStatus);
//         console.log("incoming Text " + jqXHR.responseText);
//     })
//
// };
//
// Project.checkEtags = function(data, message, xhr){
//   var eTag = xhr.getResponseHeader('ETag');
//   if(typeof localStorage.projEtag == 'undefined' || localStorage.projEtag != eTag){
//     localStorage.projEtag = eTag;
//     Project.checkUpdates();
//   }else {
//     Project.loadAll(JSON.parse(localStorage.data));
//     projectView.initIndexPage();
//   }
// };
//
// Project.fetchAll = function(){
//   if(localStorage.data){
//     $.getJSON('projects.json', function(data){
//       Project.loadAll(data);
//       localStorage.data = JSON.stringify(data);
//     });
//     // var head = $.ajax({
//     //   type: 'HEAD',
//     //   url: 'projects.json',
//     //   success: Project.checkEtags
//     // });
//   } else {
//     Project.checkUpdates();
//   }
// };
//
//
// // Project.fetchAll = function() {
// //   if (localStorage.data) {
// //   Project.loadAll(JSON.parse(localStorage.data));
// //   projectView.initIndexPage();
// // } else {
// //   console.log('something happening');
// //   $.getJSON('projects.json').done(function(data){
// //     Project.loadAll(data);
// //     localStorage.data = JSON.stringify(data);
// //     projectView.initIndexPage();
// //   });
// //   }
// // };
