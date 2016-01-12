function Project (content) {
  this.title = content.title;
  this.url = content.url;
  this.description = content.description;
  this.image = content.image;
}

Project.all = [];

Project.prototype.toHtml = function() {
  var template = Handlebars.compile($('#project-template').text());
  this.body = marked(this.body);
  return template(this);
};

Project.loadAll = function(data) {
  data.forEach(function(ele){
    Project.all.push(new Project(ele));
  });
};

Project.fetchAll = function() {
  if (localStorage.data) {
    Article.loadAll(JSON.parse(localStorage.data));
    projectView.initIndexPage();
  } else {
    $.getJSON('projects.json', function(data) {
      Article.loadAll(data);
      localStorage.data = JSON.stringify(data);
      projectView.initIndexPage();
    });
  }
};
