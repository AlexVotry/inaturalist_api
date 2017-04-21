"use strict";
var Model = require( "./model" );

var ProjectObservation = class ProjectObservation extends Model {

  static typifyInstanceResponse( response ) {
    return super.typifyInstanceResponse( response, ProjectObservation );
  }

};

module.exports = ProjectObservation;
