"use strict";
var iNaturalistAPI = require( "../inaturalist_api" ),
    ProjectObservation = require( "../models/project_observation" );

var projectObservations = class projectObservations {
  static create( params, options ) {
    return iNaturalistAPI.post( "project_observations", params, options ).
      then( ProjectObservation.typifyInstanceResponse );
  }

  static update( params, options ) {
    return iNaturalistAPI.put( "project_observations/:id", params, options ).
      then( ProjectObservation.typifyInstanceResponse );
  }

  static delete( params, options ) {
    return iNaturalistAPI.delete( "project_observations/:id", params, options );
  }

};

module.exports = projectObservations;
