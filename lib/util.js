"use strict";

var util = class util {

  static isBrowser( ) {
    return (
      typeof document !== "undefined" &&
      typeof document.querySelector !== "undefined"
    )
  }

  static isNode( ) {
    return (
      typeof process !== "undefined" &&
      typeof process.env !== "undefined"
    )
  }

  static browserMetaTagContent( metaTagName ) {
    if( util.isBrowser( ) ) {
      var element =
        document.querySelector( `meta[name="${ metaTagName }"]` );
      return ( element && element.getAttribute( "content" ) );
    }
  }

  static nodeENV( envVariableName ) {
    if( util.isNode( ) ) {
      return process.env[ envVariableName ];
    }
  }

};

module.exports = util;
