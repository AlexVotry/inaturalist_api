"use strict";
var Model = require( "./model" );

var Place = class Place extends Model {

  static typifyResultsResponse( response ) {
    return super.typifyResultsResponse( response, Place );
  }

};

module.exports = Place;
