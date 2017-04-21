"use strict";
var iNaturalistAPI = require( "../inaturalist_api" ),
    Flag = require( "../models/flag" );

var flags = class flags {
  static create( params, options ) {
    return iNaturalistAPI.post( "flags", params, options ).
      then( Flag.typifyInstanceResponse );
  }

  static delete( params, options ) {
    return iNaturalistAPI.delete( "flags/:id", params, options );
  }
};

module.exports = flags;
