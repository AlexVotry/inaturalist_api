"use strict";
var iNaturalistAPI = require( "../inaturalist_api" ),
    Place = require( "../models/place" );

var places = class places {
  static fetch( ids ) {
    return iNaturalistAPI.fetch( "places", ids ).
      then( Place.typifyResultsResponse );
  }

  static autocomplete( params ) {
    return iNaturalistAPI.get( "places/autocomplete", params ).
      then( Place.typifyResultsResponse );
  }

  static containing( params ) {
    return iNaturalistAPI.get( "places/containing", params ).
      then( Place.typifyResultsResponse );
  }
};

module.exports = places;
