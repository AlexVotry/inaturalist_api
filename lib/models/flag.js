"use strict";
var Model = require( "./model" );

var Flag = class Flag extends Model {

  static typifyInstanceResponse( response ) {
    return super.typifyInstanceResponse( response, Flag );
  }

};

module.exports = Flag;
