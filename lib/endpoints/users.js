"use strict";
var iNaturalistAPI = require( "../inaturalist_api" ),
    User = require( "../models/user" );

var users = class users {
  static fetch( ids ) {
    return iNaturalistAPI.fetch( "users", ids ).
      then( User.typifyResultsResponse );
  }

  static update( params, options ) {
    return iNaturalistAPI.put( "users/:id", params, options ).
      then( User.typifyInstanceResponse );
  }

  static update_session( params, options ) {
    return iNaturalistAPI.put( "users/update_session", params, options );
  }

  static me( options ) {
    options = options || { };
    options.useAuth = true;
    return iNaturalistAPI.get( "users/me", null, options ).
      then( User.typifyResultsResponse );
  }
};

module.exports = users;
