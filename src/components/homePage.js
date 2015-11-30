"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Home = React.createClass({
  // render is required for any react component
  // whatever the render function returns is what will be displayed to th
  // the screen
  render: function(){
    return (
      <div className="jumbotron">
          <h1> Pluralsight Administration</h1>
          <p>React,React Router and Flux for ultra-responsive web apps.</p>
          <Link to="about" className="btn btn-primary btn-lg"> Learn More </Link>

      </div>

    );
  }
});


module.exports = Home;
