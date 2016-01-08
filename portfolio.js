var projects = [];

function Project (content) {
  this.title = content.title;
  this.url = content.url;
  this.description = content.description;
  this.image = content.image;
}

Project.prototype.toHtml = function() {
  var $newProject = $('article.template').clone();
  $newProject.removeClass('template').attr('id', this.title);
  $newProject.find('a').attr('href', this.url);
  $newProject.find('p').attr(this.description);
  $newProject.find('img').attr('src', this.image);
};


data.forEach(function(data) {
  projects.push(new Project(data));
});
