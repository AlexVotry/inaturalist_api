"use strict";
var Model = require( "./model" ),
    Taxon = require( "./taxon" ),
    Photo = require( "./photo" ),
    Identification = require( "./identification" );

var Observation = class Observation extends Model {

  constructor( attrs ) {
    super( attrs );
    if ( this.geojson && this.geojson.coordinates ) {
      this.latitude = this.geojson.coordinates[1];
      this.longitude = this.geojson.coordinates[0]
    }
    if ( this.taxon ) {
      this.taxon = new Taxon( this.taxon );
    }
    if ( this.photos && this.photos.length > 0) {
      this.photos = this.photos.map( ( p ) => new Photo( p ) );
    }
    if ( this.identifications && this.identifications.length > 0) {
      this.identifications = this.identifications.map( ( i ) => new Identification( i ) );
    }
  }

  static typifyResultsResponse( response ) {
    return super.typifyResultsResponse( response, Observation )
  }

  static typifyInstanceResponse( response ) {
    return super.typifyInstanceResponse( response, Observation );
  }

  photo( size ) {
    this.cachedPhotos = this.cachedPhotos || {};
    size = size || "square";
    if ( this.cachedPhotos[size] ) { 
      return this.cachedPhotos[size];
    }
    if ( this.photos && this.photos.length > 0 ) {
      this.cachedPhotos[size] = this.photos[0].photoUrl( size )
    }
    return this.cachedPhotos[size];
  }

  hasPhotos( ) {
    return this.photos && this.photos.length > 0;
  }

  hasSounds( ) {
    return this.sounds && this.sounds.length > 0;
  }

  hasMedia( ) {
    if ( this.hasPhotos( ) || this.hasSounds( ) ) {
      return true;
    }
    return false;
  }

};

module.exports = Observation;
