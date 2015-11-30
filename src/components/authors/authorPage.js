"use strict";

var React = require('react');
var AuthorActions = require('../../actions/authorAction');
var AuthorStore = require('../../stores/authorStore');
var AuthorList = require('./authorList');
var Router = require('react-router');
var Link = Router.Link;

var AuthorPage = React.createClass({

  getInitialState: function(){
    return{
      authors:AuthorStore.getAllAuthors()
    };
  },
  render: function(){

    return (
      <div>
        <Link to="addAuthor" className="btn btn-default pull-right" > Add Author </Link>
        <AuthorList authors = {this.state.authors} />


      </div>
    );
  }
});

module.exports = AuthorPage;
