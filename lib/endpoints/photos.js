"use strict";
var iNaturalistAPI = require( "../inaturalist_api" );

var photos = class photos {
  static create( params, options ) {
    return iNaturalistAPI.upload( "photos", params, options );
  }
};

module.exports = photos;
