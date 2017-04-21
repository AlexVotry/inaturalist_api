"use strict";
var Model = require( "./model" );

var Post = class Post extends Model {

  static typifyArrayResponse( response ) {
    return super.typifyArrayResponse( response, Post );
  }

};

module.exports = Post;
