"use store";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');

var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
// Objecta-assign to glue two objects
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

var _authors = [];

// Each time an author is created, createAuthor Action will be dispatched.
// It will include new Author as part of the payload.


var AuthorStore = assign({}, EventEmitter.prototype, {
    // This function will let the  react components know when the store changes.
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    // It is important that any time the store changes, the emitChange method needs to be called.
    //By emitting a change, any react components that have registered with this store will be notified and they will
    // know that they need to update the UI accordingly
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    getAllAuthors: function () {
        return _authors;
    },

    getAuthorById: function (id) {
        return _.find(_authors, {id: id});
    }


});

// Register the store with Dispatcher so that it is notified when the actions occur

// This function will be called anytime the action is dispatched.
// Every Store that is registered with DIspatcher is notified of every single action.
Dispatcher.register(function (action) {
    switch (action.actionType) {
        case ActionTypes.CREATE_AUTHOR:
            _authors.push(action.author);
            AuthorStore.emitChange();
            break;
        case ActionTypes.UPDATE_AUTHOR:
            var existingAuthor = _.find(_authors, {id: action.author.id}
                )
                ;
            var existingAuthorIndex = _.indexOf(_authors, existingAuthor);
            _authors.splice(existingAuthorIndex, 1, action.author);
            AuthorStore.emitChange();
            break;
        case ActionTypes.INITIALIZE:
            _authors = action.initialData.authors;
            AuthorStore.emitChange();
            break;
        default:
        // No Operation

    }
});

module.exports = AuthorStore;