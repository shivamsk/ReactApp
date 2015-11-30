"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var AuthorApi = require('../api/authorApi');
var ActionTypes = require('../constants/actionTypes');

var AuthorActions = {
     createAuthor: function(author){
         var newAuthor = AuthorApi.saveAuthor(author);
         // Hey Dispatcher , go tell all the stores that an author was just created.
         Dispatcher.dispatch({
             actionType: ActionTypes.CREATE_AUTHOR,
             author: newAuthor
         });
     },

    updateAuthor: function(author){
        var newAuthor = AuthorApi.saveAuthor(author);
        // Hey Dispatcher , go tell all the stores that an author was just created.
        Dispatcher.dispatch({
            actionType: ActionTypes.UPDATE_AUTHOR,
            author: newAuthor
        });
    }

};


module.exports = AuthorActions;
