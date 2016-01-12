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
  // var templateScript = $('#project-template').html();
  // var converter = Handlebars.compile(templateScript);
  // var dataSource = this;
  // var theCompiledHtml = converter(dataSource);
  // this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  // this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
  // return theCompiledHtml;
};

Project.loadAll = function(data) {
  data.forEach(function(ele) {
    Project.all.push(new Project(ele));
  });
};

Project.fetchAll = function() {
  if (localStorage.data) {
    Project.loadAll(JSON.parse(localStorage.data));
    projectView.initIndexPage();
  } else {
    $.getJSON('projects.json', function(data){
      Project.loadAll(data);
      localStorage.data = JSON.stringify(data);
      projectView.initIndexPage();
    });
  }
};
// data.sort(function(a,b){
//   return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
// });
//
// data.forEach(function(ele) {
//   projects.push(new Project(ele));
// });
//
// projects.forEach(function(a){
//   $('#projects').append(a.toHtml());
// });
