"use strict";

var React = require('react');
var AuthorForm = require('./authorForm');
var AuthorActions = require('../../actions/authorAction');
var AuthorStore = require('../../stores/authorStore');

var Router = require('react-router');
var toastr = require('toastr');

// Main Component (Smart Component)
// Also Controller View
// THis is the parent to AuthorForm component
// Props are passed from this (Parent) to Child
var ManageAuthorPage = React.createClass({
    //Navigation Mixin comes with React Router
    mixins: [
        Router.Navigation
    ],

    statics: {
        willTransitionFrom: function (transition, component) {
            if (component.state.dirty && !confirm('Leave without saving?')) {
                transition.abort();
            }
        }
    },
    getInitialState: function () {
        return {
            author: {id: '', firstName: '', lastName: ''},
            errors: {},
            dirty: false
        };
    },

    componentWillMount: function () {
        // From the path '/author:id'
        // React Router puts the ID In the Params in the props
        var authorId = this.props.params.id;

        if (authorId) {
            this.setState({author: AuthorStore.getAuthorById(authorId)});
        }
    },

    setAuthorState: function (event) {
        this.setState({dirty: true});
        var field = event.target.name;
        var value = event.target.value;
        this.state.author[field] = value;
        return this.setState({author: this.state.author});
    },

    authorFormIsValid: function () {
        var isFormValid = true;
        this.state.errors = {}; // Clear any previous errors.

        if (this.state.author.firstName.length < 3) {
            this.state.errors.firstName = 'First Name must be at least  3 characters';
            isFormValid = false;
        }

        if (this.state.author.lastName.length < 3) {
            this.state.errors.lastName = 'Last Name must be at least 3 characters';
            isFormValid = false;
        }

        this.setState({errors: this.state.errors});
        return isFormValid;
    },

    saveAuthor: function (event) {
        // Prevent the Browser Default Operation to happen
        event.preventDefault();

        if (!this.authorFormIsValid()) {
            return;
        }

        if(this.state.author.id){
            AuthorActions.updateAuthor(this.state.author);
        }else{
            AuthorActions.createAuthor(this.state.author);
        }


        this.setState({dirty: false});
        toastr.success('Author saved.');
        //This will take us back to authors page once the save is done
        this.transitionTo('authors')
    },


    render: function () {
        return (
            <AuthorForm author={this.state.author}
                        onChange={this.setAuthorState}
                        onSave={this.saveAuthor}
                        errors={this.state.errors}
            />
        );
    }
});


module.exports = ManageAuthorPage;