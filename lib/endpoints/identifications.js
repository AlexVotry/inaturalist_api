"use strict";
var iNaturalistAPI = require( "../inaturalist_api" ),
    Identification = require( "../models/identification" ),
    Taxon = require( "../models/taxon" ),
    User = require( "../models/user" );

var identifications = class identifications {
  static create( params, options ) {
    return iNaturalistAPI.post( "identifications", params, options ).
      then( Identification.typifyInstanceResponse );
  }

  static update( params, options ) {
    return iNaturalistAPI.put( "identifications/:id", params, options ).
      then( Identification.typifyInstanceResponse );
  }

  static delete( params, options ) {
    return iNaturalistAPI.delete( "identifications/:id", params, options );
  }

  static similar_species( params, options ) {
    return iNaturalistAPI.get( "identifications/similar_species", params, options ).
      then( function( response ) {
        if( response.results ) {
          response.results = response.results.map( function( r ) {
            r.taxon = new Taxon( r.taxon );
            return r;
          });
        }
        return response;
      } );
  }

  static identifiers( params, options ) {
    return iNaturalistAPI.get( "identifications/identifiers", params, options ).
      then( function( response ) {
        if ( response.results ) {
          response.results = response.results.map( function( r ) {
            r.user = new User( r.user );
            return r;
          } )
        }
        return response;
      } );
  }
};

module.exports = identifications;
