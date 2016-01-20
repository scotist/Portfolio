(function(module) {

function Project(features){
  this.title = features.title;
  this.picture = features.picture;
  this.link = features.link;
};

Project.all = [];

Project.prototype.toHtml = function(a){
  var source = $('#project-template').html();
  var template = Handlebars.compile(source);
  var html = template(a);
  return html;
};

Project.loadAll = function(rawData){
  rawData.forEach(function(data) {
    Project.all.push(new Project(data));
  });
};

Project.checkUpdates = function(){
  $.getJSON('projects.json', function(rawData){
    Project.loadAll(rawData);
    localStorage.rawData = JSON.stringify(rawData);
    projectView.initProjects();
  });
};

Project.checkEtags = function(data, message, xhr){
  var eTag = xhr.getResponseHeader('ETag');
  if(typeof localStorage.projEtag == 'undefined' || localStorage.projEtag != eTag){
    localStorage.projEtag = eTag;
    Project.checkUpdates();
  }else {
    Project.loadAll(JSON.parse(localStorage.rawData));
    projectView.initProjects();
  }
};

Project.fetchAll = function(){
  if(localStorage.rawData){
    var head = $.ajax({
      type: 'HEAD',
      url: 'projects.json',
      success: Project.checkEtags
    });
  } else{
    Project.checkUpdates();
  }
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
