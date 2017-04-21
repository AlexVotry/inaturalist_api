"use strict";
var Model = require( "./model" );

var ObservationFieldValue = class ObservationFieldValue extends Model {

  static typifyInstanceResponse( response ) {
    return super.typifyInstanceResponse( response, ObservationFieldValue );
  }

};

module.exports = ObservationFieldValue;
