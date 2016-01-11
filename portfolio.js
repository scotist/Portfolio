var projects = [];

function Project (content) {
  this.title = content.title;
  this.url = content.url;
  this.description = content.description;
  this.image = content.image;
}


Project.prototype.toHtml = function() {
  var templateScript = $('#project-template').html();
  var converter = Handlebars.compile(templateScript);
  var dataSource = this;
  var theCompiledHtml = converter(dataSource);
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
  return theCompiledHtml;
};

data.sort(function(a,b){
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

data.forEach(function(ele) {
  projects.push(new Project(ele));
});

projects.forEach(function(a){
  $('#projects').append(a.toHtml());
});
