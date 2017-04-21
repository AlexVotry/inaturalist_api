"use strict";
var Model = require( "./model" );

var Photo = class Photo extends Model {

  photoUrl( size ) {
    this.cachedPhotos = this.cachedPhotos || {};
    size = size || "square";
    if ( this.cachedPhotos[size] ) {
      return this.cachedPhotos[size];
    }
    if ( this[`${size}_url`] ) {
      return this[`${size}_url`];
    }
    if ( !this.url ) { return }
    else {
      this.cachedPhotos[size] = this.url.replace( "square", size );
    }
    return this.cachedPhotos[size];
  }

  dimensions( size ) {
    const longEdges = {
      square: 75,
      thumb: 100,
      small: 240,
      medium: 500,
      large: 1024,
      original: 2048
    };
    if ( !longEdges[size] || size === "original" || !this.original_dimensions ) {
      return this.original_dimensions;
    }
    const w = this.original_dimensions.width;
    const h = this.original_dimensions.height;
    if ( Math.max( w, h ) < longEdges[size] ) {
      return null;
    }
    if ( w < h ) {
      return {
        width: parseInt( ( longEdges[size] / this.original_dimensions.height ) * this.original_dimensions.width ),
        height: longEdges[size]
      }
    } else {
      return {
        width: longEdges[size],
        height: parseInt( ( longEdges[size] / this.original_dimensions.width ) * this.original_dimensions.height )
      }
    }
  }
}

module.exports = Photo;
