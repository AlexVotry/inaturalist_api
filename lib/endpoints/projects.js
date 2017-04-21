"use strict";
var iNaturalistAPI = require( "../inaturalist_api" ),
    Project = require( "../models/project" );

var projects = class projects {
  static fetch( ids ) {
    return iNaturalistAPI.fetch( "projects", ids ).
      then( Project.typifyResultsResponse );
  }

  static join( params, options ) {
    return iNaturalistAPI.post( "projects/:id/join", params, options );
  }

  static leave( params, options ) {
    return iNaturalistAPI.delete( "projects/:id/leave", params, options );
  }

  static add( params, options ) {
    return iNaturalistAPI.post( "projects/:id/add", params, options );
  }

  static remove( params, options ) {
    return iNaturalistAPI.delete( "projects/:id/remove", params, options );
  }
};

module.exports = projects;
