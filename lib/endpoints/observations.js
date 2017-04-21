"use strict";
var iNaturalistAPI = require( "../inaturalist_api" ),
    ControlledTerm = require( "../models/controlled_term" ),
    Observation = require( "../models/observation" ),
    Taxon = require( "../models/taxon" ),
    User = require( "../models/user" );

var observations = class observations {
  static create( params, options ) {
    return iNaturalistAPI.post( "observations", params, options ).
      then( Observation.typifyInstanceResponse );
  }

  static update( params, options ) {
    return iNaturalistAPI.put( "observations/:id", params, options ).
      then( Observation.typifyInstanceResponse );
  }

  static delete( params, options ) {
    return iNaturalistAPI.delete( "observations/:id", params, options );
  }

  static fave( params, options ) {
    return observations.vote( params, options );
  }

  static unfave( params, options ) {
    return observations.unvote( params, options );
  }

  static vote( params, options ) {
    return iNaturalistAPI.post( "votes/vote/observation/:id", params, options ).
      then( Observation.typifyInstanceResponse );
  }

  static unvote( params, options ) {
    return iNaturalistAPI.delete( "votes/unvote/observation/:id", params, options );
  }

  static subscribe( params, options ) {
    return iNaturalistAPI.post( "subscriptions/Observation/:id/subscribe", params, options );
  }

  static review( params, options ) {
    var p = Object.assign( { }, params );
    p.reviewed = "true";
    return iNaturalistAPI.post( "observations/:id/review", p, options );
  }

  static unreview( params, options ) {
    var p = Object.assign( { }, params );
    return iNaturalistAPI.delete( "observations/:id/review", p, options );
  }

  static qualityMetrics( params, options ) {
    return iNaturalistAPI.get( "observations/:id/quality_metrics", params, options );
  }

  static setQualityMetric( params, options ) {
    return iNaturalistAPI.post( "observations/:id/quality/:metric", params, options );
  }

  static deleteQualityMetric( params, options ) {
    return iNaturalistAPI.delete( "observations/:id/quality/:metric", params, options );
  }

  static fetch( ids, params ) {
    return iNaturalistAPI.fetch( "observations", ids, params ).
      then( Observation.typifyResultsResponse );
  }

  static search( params ) {
    return iNaturalistAPI.get( "observations", params, { useAuth: true } ).
      then( Observation.typifyResultsResponse );
  }

  static identifiers( params ) {
    return iNaturalistAPI.get( "observations/identifiers", params ).
      then( function( response ) {
        if( response.results ) {
          response.results = response.results.map( function( r ) {
            r.user = new User( r.user );
            return r;
          });
        }
        return response;
      } );
  }

  static observers( params ) {
    return iNaturalistAPI.get( "observations/observers", params ).
      then( function( response ) {
        if( response.results ) {
          response.results = response.results.map( function( r ) {
            r.user = new User( r.user );
            return r;
          });
        }
        return response;
      } );
  }

  static speciesCounts( params ) {
    return iNaturalistAPI.get( "observations/species_counts", params ).
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

  static popularFieldValues( params ) {
    return iNaturalistAPI.get( "observations/popular_field_values", params ).
      then( function( response ) {
        if( response.results ) {
          response.results = response.results.map( function( r ) {
            r.controlled_attribute = new ControlledTerm( r.controlled_attribute );
            r.controlled_value = new ControlledTerm( r.controlled_value );
            return r;
          });
        }
        return response;
      }) ;
  }

  static histogram( params ) {
    return iNaturalistAPI.get( "observations/histogram", params );
  }

  static subscriptions( params ) {
    return iNaturalistAPI.get( "observations/:id/subscriptions", params, { useAuth: true } );
  }

  static taxonSummary( params ) {
    return iNaturalistAPI.get( "observations/:id/taxon_summary", params );
  }

  static updates( params, options ) {
    options = options || { };
    options.useAuth = true;
    return iNaturalistAPI.get( "observations/updates", params, options );
  }
};

module.exports = observations;
