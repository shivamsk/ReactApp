// Two different ways to refer Jquery.
// By the dollar sign and the variable jQuery.
// It is defined globally because bootstrap expects Jquery variable to be in Global namespace.
$ = jQuery = require('jquery');
var React = require('react');
var Router = require('react-router');
var routes = require('./routes');
var InitializeActions = require('./actions/initializeActions');


InitializeActions.initApp();

// Go take our home page component and attach it to the DOM Element ID app in index.html
//React.render(<Home />,document.getElementById('app'));
Router.run(routes, Router.HistoryLocation,function(Handler){
  React.render(<Handler/>,document.getElementById('app'));
});