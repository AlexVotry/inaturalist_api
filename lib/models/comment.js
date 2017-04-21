"use strict";
var Model = require( "./model" );

var Comment = class Comment extends Model {

  static typifyInstanceResponse( response ) {
    return super.typifyInstanceResponse( response, Comment );
  }

};

module.exports = Comment;
