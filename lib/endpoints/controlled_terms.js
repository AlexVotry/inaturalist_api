"use strict";
var iNaturalistAPI = require( "../inaturalist_api" ),
    ControlledTerm = require( "../models/controlled_term" );

var controlled_terms = class controlled_terms {
  static for_taxon( params ) {
    return iNaturalistAPI.get( "controlled_terms/for_taxon", params ).then( response => {
      response = ControlledTerm.typifyResultsResponse( response );
      for ( var i = 0; i < response.results.length; i++ ) {
        if ( !response.results[ i ] || !!response.results[ i ].values ) {
          continue;
        }
        response.results[ i ].values =
          response.results[ i ].values.map( v => ( new ControlledTerm( v ) ) );
      }
      return response;
    } );
  }
};

module.exports = controlled_terms;
