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
  $newProject.find('time[pubdate]').attr('datetime', this.publishedOn);
  $newProject.find('time[pubdate]').attr('title', this.publishedOn);
  $newProject.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newProject.append('<hr>');
  return $newProject;
};

data.sort(function(a,b){
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

data.forEach(function(data) {
  projects.push(new Project(data));
});

projects.forEach(function(a){
  $('#projects').append(a.toHtml());
});
