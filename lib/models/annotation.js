"use strict";
var Model = require( "./model" );

var Annotation = class Annotation extends Model {

  static typifyInstanceResponse( response ) {
    return super.typifyInstanceResponse( response, Annotation );
  }

};

module.exports = Annotation;
