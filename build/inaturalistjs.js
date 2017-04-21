(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var iNaturalistAPI = __webpack_require__(1);

	module.exports = {
	  setConfig: iNaturalistAPI.setConfig,
	  annotations: __webpack_require__(11),
	  comments: __webpack_require__(13),
	  controlled_terms: __webpack_require__(15),
	  flags: __webpack_require__(17),
	  identifications: __webpack_require__(19),
	  observation_field_values: __webpack_require__(25),
	  observations: __webpack_require__(27),
	  photos: __webpack_require__(29),
	  places: __webpack_require__(30),
	  posts: __webpack_require__(32),
	  projects: __webpack_require__(34),
	  project_observations: __webpack_require__(36),
	  taxa: __webpack_require__(38),
	  users: __webpack_require__(39),
	  Annotation: __webpack_require__(12),
	  Comment: __webpack_require__(14),
	  ControlledTerm: __webpack_require__(16),
	  Flag: __webpack_require__(18),
	  Identification: __webpack_require__(20),
	  Observation: __webpack_require__(28),
	  ObservationFieldValue: __webpack_require__(26),
	  Photo: __webpack_require__(22),
	  Place: __webpack_require__(31),
	  Post: __webpack_require__(33),
	  Project: __webpack_require__(35),
	  Taxon: __webpack_require__(21),
	  User: __webpack_require__(24)
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _fetch = __webpack_require__(2),
	    querystring = __webpack_require__(4),
	    util = __webpack_require__(7),
	    iNaturalistAPIResponse = __webpack_require__(9);

	var iNaturalistAPI = function () {
	  function iNaturalistAPI() {
	    _classCallCheck(this, iNaturalistAPI);
	  }

	  _createClass(iNaturalistAPI, null, [{
	    key: "fetch",
	    value: function fetch(route, ids, params, options) {
	      if (!Array.isArray(ids)) {
	        ids = [ids];
	      }
	      var query = "";
	      if (params) {
	        query = "?" + querystring.stringify(params);
	      }
	      var apiToken = iNaturalistAPI.apiToken(options);
	      var headers = apiToken ? { Authorization: apiToken } : {};
	      return _fetch("" + iNaturalistAPI.apiURL + ("/" + route + "/" + ids.join(",") + query), { headers: headers }).then(iNaturalistAPI.thenCheckStatus).then(iNaturalistAPI.thenText).then(iNaturalistAPI.thenJson).then(iNaturalistAPI.thenWrap);
	    }
	  }, {
	    key: "get",
	    value: function get(route, params, options) {
	      options = options || {};
	      var query = "";
	      if (params) {
	        query = "?" + querystring.stringify(params);
	      }
	      var interpolated = iNaturalistAPI.interpolateRouteParams(route, params);
	      if (interpolated.err) {
	        return interpolated.err;
	      }
	      var thisRoute = interpolated.route;
	      var apiToken = options.useAuth ? iNaturalistAPI.apiToken(options) : null;
	      var headers = apiToken ? { Authorization: apiToken } : {};
	      return _fetch("" + iNaturalistAPI.apiURL + ("/" + thisRoute + query), { headers: headers }).then(iNaturalistAPI.thenCheckStatus).then(iNaturalistAPI.thenText).then(iNaturalistAPI.thenJson).then(iNaturalistAPI.thenWrap);
	    }
	  }, {
	    key: "post",
	    value: function post(route, params, options) {
	      options = options || {};
	      params = Object.assign({}, params);
	      // interpolate path params, e.g. /:id => /1
	      var interpolated = iNaturalistAPI.interpolateRouteParams(route, params);
	      if (interpolated.err) {
	        return interpolated.err;
	      }
	      var thisRoute = interpolated.route;
	      // set up request headers
	      var headers = {
	        Accept: "application/json",
	        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE, HEAD"
	      };
	      if (options.user_agent) {
	        headers["user-agent"] = options.user_agent;
	      }
	      if (options.remote_ip) {
	        headers["x-forwarded-for"] = options.remote_ip;
	      }
	      // set up authentication
	      var csrf = iNaturalistAPI.csrf();
	      var apiToken = iNaturalistAPI.apiToken(options);
	      if (apiToken) {
	        headers.Authorization = apiToken;
	      } else if (csrf) {
	        params[csrf.param] = csrf.token;
	      }
	      // get the right host to send requests
	      var host = iNaturalistAPI.methodHostPrefix(options);
	      // make the request
	      var body;
	      if (options.upload) {
	        body = new FormData();
	        for (var k in params) {
	          body.append(k, params[k]);
	        }
	      } else {
	        headers["Content-Type"] = "application/json";
	        body = JSON.stringify(params);
	      }
	      var fetchOpts = {
	        method: options.method || "post",
	        credentials: options.same_origin ? "same-origin" : undefined,
	        headers: headers
	      };
	      if (options.method !== "head") {
	        fetchOpts.body = body;
	      }
	      var query = "";
	      // Rails, at least, can read params from DELETE request URLs, but
	      // cannot read post data. So append any params to the URL
	      if (options.method === "delete" && Object.keys(params).length > 0) {
	        query = "?" + querystring.stringify(params);
	      }
	      return _fetch(host + "/" + thisRoute + query, fetchOpts).then(iNaturalistAPI.thenCheckStatus).then(iNaturalistAPI.thenText).then(iNaturalistAPI.thenJson);
	    }

	    // a variant of post using the http PUT method

	  }, {
	    key: "head",
	    value: function head(route, params, options) {
	      options = Object.assign({}, options, { method: "head" });
	      return iNaturalistAPI.post(route, params, options);
	    }

	    // a variant of post using the http PUT method

	  }, {
	    key: "put",
	    value: function put(route, params, options) {
	      options = Object.assign({}, options, { method: "put" });
	      return iNaturalistAPI.post(route, params, options);
	    }

	    // a variant of post using the http DELETE method

	  }, {
	    key: "delete",
	    value: function _delete(route, params, options) {
	      options = Object.assign({}, options, { method: "delete" });
	      return iNaturalistAPI.post(route, params, options);
	    }
	  }, {
	    key: "upload",
	    value: function upload(route, params, options) {
	      options = Object.assign({}, options, { method: "post", upload: true });
	      return iNaturalistAPI.post(route, params, options);
	    }
	  }, {
	    key: "methodHostPrefix",
	    value: function methodHostPrefix(options) {
	      if (options.same_origin) {
	        return "";
	      }
	      return "" + iNaturalistAPI.writeApiURL;
	    }
	  }, {
	    key: "csrf",
	    value: function csrf() {
	      var param = util.browserMetaTagContent("csrf-param");
	      var token = util.browserMetaTagContent("csrf-token");
	      if (param && token) {
	        return { param: param, token: token };
	      }
	    }
	  }, {
	    key: "apiToken",
	    value: function apiToken(options) {
	      options = options || {};
	      var token = util.browserMetaTagContent("inaturalist-api-token");
	      if (token) {
	        return token;
	      }
	      return options.api_token;
	    }
	  }, {
	    key: "thenCheckStatus",
	    value: function thenCheckStatus(response) {
	      if (response.status >= 200 && response.status < 300) {
	        return response;
	      } else {
	        var error = new Error(response.statusText);
	        error.response = response;
	        throw error;
	      }
	    }
	  }, {
	    key: "thenText",
	    value: function thenText(response) {
	      // not using response.json( ) as there may be no JSON
	      return response.text();
	    }
	  }, {
	    key: "thenJson",
	    value: function thenJson(text) {
	      if (text) {
	        return JSON.parse(text);
	      }
	      return text;
	    }
	  }, {
	    key: "thenWrap",
	    value: function thenWrap(response) {
	      if (Array.isArray(response)) {
	        return response;
	      }
	      return new iNaturalistAPIResponse(response);
	    }
	  }, {
	    key: "setConfig",
	    value: function setConfig(config) {
	      config = config || {};
	      var legacyEnv = iNaturalistAPI.legacyEnvConfig(config);
	      var envURLConfig = legacyEnv.apiURL || util.browserMetaTagContent("config:inaturalist_api_url") || util.nodeENV("API_URL");
	      var envWriteURLConfig = legacyEnv.writeApiURL || util.browserMetaTagContent("config:inaturalist_write_api_url") || util.nodeENV("WRITE_API_URL");
	      iNaturalistAPI.apiURL = config.apiURL || envURLConfig || "http://localhost:4000/v1";
	      iNaturalistAPI.writeApiURL = envWriteURLConfig || envURLConfig || config.writeApiURL || config.apiURL || "http://localhost:3000";
	    }
	  }, {
	    key: "legacyEnvConfig",
	    value: function legacyEnvConfig(config) {
	      var oldVariables = {
	        envHostConfig: config.apiHost || util.browserMetaTagContent("config:inaturalist_api_host") || util.nodeENV("API_HOST"),
	        envWriteHostConfig: config.writeApiHost || util.browserMetaTagContent("config:inaturalist_write_api_host") || util.nodeENV("WRITE_API_HOST"),
	        envApiHostSSL: config.apiHostSSL || (util.browserMetaTagContent("config:inaturalist_api_host_ssl") || util.nodeENV("API_HOST_SSL")) === "true",
	        envWriteHostSSL: config.writeApiHostSSL || (util.browserMetaTagContent("config:inaturalist_write_host_ssl") || util.nodeENV("WRITE_HOST_SSL")) === "true"
	      };
	      var updatedVariables = {};
	      if (oldVariables.envHostConfig) {
	        updatedVariables.apiURL = (oldVariables.envApiHostSSL ? "https://" : "http://") + oldVariables.envHostConfig;
	      }
	      if (oldVariables.envWriteHostConfig) {
	        updatedVariables.writeApiURL = (oldVariables.envWriteHostSSL ? "https://" : "http://") + oldVariables.envWriteHostConfig;
	      }
	      return updatedVariables;
	    }
	  }, {
	    key: "interpolateRouteParams",
	    value: function interpolateRouteParams(route, params) {
	      var err,
	          matches = route.match(/(:[a-z]+)(?=\/|$)/g);
	      if (matches) {
	        matches.forEach(function (sym) {
	          if (err) {
	            return;
	          }
	          var v = sym.substring(1);
	          if (params && params[v]) {
	            route = route.replace(sym, params[v]);
	          } else {
	            err = new Promise(function (res, rej) {
	              rej(new Error(v + " required"));
	            });
	          }
	        });
	      }
	      return { route: route, err: err };
	    }
	  }]);

	  return iNaturalistAPI;
	}();

	iNaturalistAPI.setConfig();

	module.exports = iNaturalistAPI;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// the whatwg-fetch polyfill installs the fetch() function
	// on the global object (window or self)
	//
	// Return that as the export for use in Webpack, Browserify etc.
	__webpack_require__(3);
	module.exports = self.fetch.bind(self);

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	(function (self) {
	  'use strict';

	  if (self.fetch) {
	    return;
	  }

	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name);
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name');
	    }
	    return name.toLowerCase();
	  }

	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value);
	    }
	    return value;
	  }

	  function Headers(headers) {
	    this.map = {};

	    if (headers instanceof Headers) {
	      headers.forEach(function (value, name) {
	        this.append(name, value);
	      }, this);
	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function (name) {
	        this.append(name, headers[name]);
	      }, this);
	    }
	  }

	  Headers.prototype.append = function (name, value) {
	    name = normalizeName(name);
	    value = normalizeValue(value);
	    var list = this.map[name];
	    if (!list) {
	      list = [];
	      this.map[name] = list;
	    }
	    list.push(value);
	  };

	  Headers.prototype['delete'] = function (name) {
	    delete this.map[normalizeName(name)];
	  };

	  Headers.prototype.get = function (name) {
	    var values = this.map[normalizeName(name)];
	    return values ? values[0] : null;
	  };

	  Headers.prototype.getAll = function (name) {
	    return this.map[normalizeName(name)] || [];
	  };

	  Headers.prototype.has = function (name) {
	    return this.map.hasOwnProperty(normalizeName(name));
	  };

	  Headers.prototype.set = function (name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)];
	  };

	  Headers.prototype.forEach = function (callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function (name) {
	      this.map[name].forEach(function (value) {
	        callback.call(thisArg, value, name, this);
	      }, this);
	    }, this);
	  };

	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'));
	    }
	    body.bodyUsed = true;
	  }

	  function fileReaderReady(reader) {
	    return new Promise(function (resolve, reject) {
	      reader.onload = function () {
	        resolve(reader.result);
	      };
	      reader.onerror = function () {
	        reject(reader.error);
	      };
	    });
	  }

	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader();
	    reader.readAsArrayBuffer(blob);
	    return fileReaderReady(reader);
	  }

	  function readBlobAsText(blob) {
	    var reader = new FileReader();
	    reader.readAsText(blob);
	    return fileReaderReady(reader);
	  }

	  var support = {
	    blob: 'FileReader' in self && 'Blob' in self && function () {
	      try {
	        new Blob();
	        return true;
	      } catch (e) {
	        return false;
	      }
	    }(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  };

	  function Body() {
	    this.bodyUsed = false;

	    this._initBody = function (body) {
	      this._bodyInit = body;
	      if (typeof body === 'string') {
	        this._bodyText = body;
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body;
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body;
	      } else if (!body) {
	        this._bodyText = '';
	      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
	        // Only support ArrayBuffers for POST method.
	        // Receiving ArrayBuffers happens via Blobs, instead.
	      } else {
	          throw new Error('unsupported BodyInit type');
	        }

	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8');
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type);
	        }
	      }
	    };

	    if (support.blob) {
	      this.blob = function () {
	        var rejected = consumed(this);
	        if (rejected) {
	          return rejected;
	        }

	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob);
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob');
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]));
	        }
	      };

	      this.arrayBuffer = function () {
	        return this.blob().then(readBlobAsArrayBuffer);
	      };

	      this.text = function () {
	        var rejected = consumed(this);
	        if (rejected) {
	          return rejected;
	        }

	        if (this._bodyBlob) {
	          return readBlobAsText(this._bodyBlob);
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as text');
	        } else {
	          return Promise.resolve(this._bodyText);
	        }
	      };
	    } else {
	      this.text = function () {
	        var rejected = consumed(this);
	        return rejected ? rejected : Promise.resolve(this._bodyText);
	      };
	    }

	    if (support.formData) {
	      this.formData = function () {
	        return this.text().then(decode);
	      };
	    }

	    this.json = function () {
	      return this.text().then(JSON.parse);
	    };

	    return this;
	  }

	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase();
	    return methods.indexOf(upcased) > -1 ? upcased : method;
	  }

	  function Request(input, options) {
	    options = options || {};
	    var body = options.body;
	    if (Request.prototype.isPrototypeOf(input)) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read');
	      }
	      this.url = input.url;
	      this.credentials = input.credentials;
	      if (!options.headers) {
	        this.headers = new Headers(input.headers);
	      }
	      this.method = input.method;
	      this.mode = input.mode;
	      if (!body) {
	        body = input._bodyInit;
	        input.bodyUsed = true;
	      }
	    } else {
	      this.url = input;
	    }

	    this.credentials = options.credentials || this.credentials || 'omit';
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers);
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET');
	    this.mode = options.mode || this.mode || null;
	    this.referrer = null;

	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests');
	    }
	    this._initBody(body);
	  }

	  Request.prototype.clone = function () {
	    return new Request(this);
	  };

	  function decode(body) {
	    var form = new FormData();
	    body.trim().split('&').forEach(function (bytes) {
	      if (bytes) {
	        var split = bytes.split('=');
	        var name = split.shift().replace(/\+/g, ' ');
	        var value = split.join('=').replace(/\+/g, ' ');
	        form.append(decodeURIComponent(name), decodeURIComponent(value));
	      }
	    });
	    return form;
	  }

	  function headers(xhr) {
	    var head = new Headers();
	    var pairs = xhr.getAllResponseHeaders().trim().split('\n');
	    pairs.forEach(function (header) {
	      var split = header.trim().split(':');
	      var key = split.shift().trim();
	      var value = split.join(':').trim();
	      head.append(key, value);
	    });
	    return head;
	  }

	  Body.call(Request.prototype);

	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {};
	    }

	    this.type = 'default';
	    this.status = options.status;
	    this.ok = this.status >= 200 && this.status < 300;
	    this.statusText = options.statusText;
	    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers);
	    this.url = options.url || '';
	    this._initBody(bodyInit);
	  }

	  Body.call(Response.prototype);

	  Response.prototype.clone = function () {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    });
	  };

	  Response.error = function () {
	    var response = new Response(null, { status: 0, statusText: '' });
	    response.type = 'error';
	    return response;
	  };

	  var redirectStatuses = [301, 302, 303, 307, 308];

	  Response.redirect = function (url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code');
	    }

	    return new Response(null, { status: status, headers: { location: url } });
	  };

	  self.Headers = Headers;
	  self.Request = Request;
	  self.Response = Response;

	  self.fetch = function (input, init) {
	    return new Promise(function (resolve, reject) {
	      var request;
	      if (Request.prototype.isPrototypeOf(input) && !init) {
	        request = input;
	      } else {
	        request = new Request(input, init);
	      }

	      var xhr = new XMLHttpRequest();

	      function responseURL() {
	        if ('responseURL' in xhr) {
	          return xhr.responseURL;
	        }

	        // Avoid security warnings on getResponseHeader when not allowed by CORS
	        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	          return xhr.getResponseHeader('X-Request-URL');
	        }

	        return;
	      }

	      xhr.onload = function () {
	        var status = xhr.status === 1223 ? 204 : xhr.status;
	        if (status < 100 || status > 599) {
	          reject(new TypeError('Network request failed'));
	          return;
	        }
	        var options = {
	          status: status,
	          statusText: xhr.statusText,
	          headers: headers(xhr),
	          url: responseURL()
	        };
	        var body = 'response' in xhr ? xhr.response : xhr.responseText;
	        resolve(new Response(body, options));
	      };

	      xhr.onerror = function () {
	        reject(new TypeError('Network request failed'));
	      };

	      xhr.open(request.method, request.url, true);

	      if (request.credentials === 'include') {
	        xhr.withCredentials = true;
	      }

	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob';
	      }

	      request.headers.forEach(function (value, name) {
	        xhr.setRequestHeader(name, value);
	      });

	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
	    });
	  };
	  self.fetch.polyfill = true;
	})(typeof self !== 'undefined' ? self : undefined);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.decode = exports.parse = __webpack_require__(5);
	exports.encode = exports.stringify = __webpack_require__(6);

/***/ },
/* 5 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	'use strict';

	// If obj.hasOwnProperty has been overridden, then calling
	// obj.hasOwnProperty(prop) will break.
	// See: https://github.com/joyent/node/issues/1707

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	module.exports = function (qs, sep, eq, options) {
	  sep = sep || '&';
	  eq = eq || '=';
	  var obj = {};

	  if (typeof qs !== 'string' || qs.length === 0) {
	    return obj;
	  }

	  var regexp = /\+/g;
	  qs = qs.split(sep);

	  var maxKeys = 1000;
	  if (options && typeof options.maxKeys === 'number') {
	    maxKeys = options.maxKeys;
	  }

	  var len = qs.length;
	  // maxKeys <= 0 means that we should not limit keys count
	  if (maxKeys > 0 && len > maxKeys) {
	    len = maxKeys;
	  }

	  for (var i = 0; i < len; ++i) {
	    var x = qs[i].replace(regexp, '%20'),
	        idx = x.indexOf(eq),
	        kstr,
	        vstr,
	        k,
	        v;

	    if (idx >= 0) {
	      kstr = x.substr(0, idx);
	      vstr = x.substr(idx + 1);
	    } else {
	      kstr = x;
	      vstr = '';
	    }

	    k = decodeURIComponent(kstr);
	    v = decodeURIComponent(vstr);

	    if (!hasOwnProperty(obj, k)) {
	      obj[k] = v;
	    } else if (Array.isArray(obj[k])) {
	      obj[k].push(v);
	    } else {
	      obj[k] = [obj[k], v];
	    }
	  }

	  return obj;
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var stringifyPrimitive = function stringifyPrimitive(v) {
	  switch (typeof v === 'undefined' ? 'undefined' : _typeof(v)) {
	    case 'string':
	      return v;

	    case 'boolean':
	      return v ? 'true' : 'false';

	    case 'number':
	      return isFinite(v) ? v : '';

	    default:
	      return '';
	  }
	};

	module.exports = function (obj, sep, eq, name) {
	  sep = sep || '&';
	  eq = eq || '=';
	  if (obj === null) {
	    obj = undefined;
	  }

	  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
	    return Object.keys(obj).map(function (k) {
	      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
	      if (Array.isArray(obj[k])) {
	        return obj[k].map(function (v) {
	          return ks + encodeURIComponent(stringifyPrimitive(v));
	        }).join(sep);
	      } else {
	        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	      }
	    }).join(sep);
	  }

	  if (!name) return '';
	  return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var util = function () {
	  function util() {
	    _classCallCheck(this, util);
	  }

	  _createClass(util, null, [{
	    key: "isBrowser",
	    value: function isBrowser() {
	      return typeof document !== "undefined" && typeof document.querySelector !== "undefined";
	    }
	  }, {
	    key: "isNode",
	    value: function isNode() {
	      return typeof process !== "undefined" && typeof process.env !== "undefined";
	    }
	  }, {
	    key: "browserMetaTagContent",
	    value: function browserMetaTagContent(metaTagName) {
	      if (util.isBrowser()) {
	        var element = document.querySelector("meta[name=\"" + metaTagName + "\"]");
	        return element && element.getAttribute("content");
	      }
	    }
	  }, {
	    key: "nodeENV",
	    value: function nodeENV(envVariableName) {
	      if (util.isNode()) {
	        return process.env[envVariableName];
	      }
	    }
	  }]);

	  return util;
	}();

	module.exports = util;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while (len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Model = __webpack_require__(10);

	var iNaturalistAPIResponse = function (_Model) {
	  _inherits(iNaturalistAPIResponse, _Model);

	  function iNaturalistAPIResponse() {
	    _classCallCheck(this, iNaturalistAPIResponse);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(iNaturalistAPIResponse).apply(this, arguments));
	  }

	  return iNaturalistAPIResponse;
	}(Model);

	module.exports = iNaturalistAPIResponse;

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Model = function () {
	  function Model(attrs) {
	    _classCallCheck(this, Model);

	    Object.assign(this, attrs);
	  }

	  _createClass(Model, null, [{
	    key: "typifyInstanceResponse",
	    value: function typifyInstanceResponse(response, type) {
	      return new type(response);
	    }
	  }, {
	    key: "typifyArrayResponse",
	    value: function typifyArrayResponse(response, type) {
	      var arr = [];
	      for (var key in response) {
	        arr.push(new type(response[key]));
	      }
	      return arr;
	    }
	  }, {
	    key: "typifyResultsResponse",
	    value: function typifyResultsResponse(response, type) {
	      if (type && response.results) {
	        response.results = response.results.map(function (r) {
	          return new type(r);
	        });
	      }
	      return response;
	    }
	  }]);

	  return Model;
	}();

	module.exports = Model;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var iNaturalistAPI = __webpack_require__(1),
	    Annotation = __webpack_require__(12);

	var annotations = function () {
	  function annotations() {
	    _classCallCheck(this, annotations);
	  }

	  _createClass(annotations, null, [{
	    key: "create",
	    value: function create(params, options) {
	      return iNaturalistAPI.post("annotations", params, options).then(Annotation.typifyInstanceResponse);
	    }
	  }, {
	    key: "delete",
	    value: function _delete(params, options) {
	      return iNaturalistAPI.delete("annotations/:id", params, options);
	    }
	  }, {
	    key: "vote",
	    value: function vote(params, options) {
	      return iNaturalistAPI.post("votes/vote/annotation/:id", params, options).then(Annotation.typifyInstanceResponse);
	    }
	  }, {
	    key: "unvote",
	    value: function unvote(params, options) {
	      return iNaturalistAPI.delete("votes/unvote/annotation/:id", params, options);
	    }
	  }]);

	  return annotations;
	}();

	module.exports = annotations;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Model = __webpack_require__(10);

	var Annotation = function (_Model) {
	  _inherits(Annotation, _Model);

	  function Annotation() {
	    _classCallCheck(this, Annotation);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Annotation).apply(this, arguments));
	  }

	  _createClass(Annotation, null, [{
	    key: "typifyInstanceResponse",
	    value: function typifyInstanceResponse(response) {
	      return _get(Object.getPrototypeOf(Annotation), "typifyInstanceResponse", this).call(this, response, Annotation);
	    }
	  }]);

	  return Annotation;
	}(Model);

	module.exports = Annotation;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var iNaturalistAPI = __webpack_require__(1),
	    Comment = __webpack_require__(14);

	var comments = function () {
	  function comments() {
	    _classCallCheck(this, comments);
	  }

	  _createClass(comments, null, [{
	    key: "create",
	    value: function create(params, options) {
	      return iNaturalistAPI.post("comments", params, options).then(Comment.typifyInstanceResponse);
	    }
	  }, {
	    key: "update",
	    value: function update(params, options) {
	      return iNaturalistAPI.put("comments/:id", params, options).then(Comment.typifyInstanceResponse);
	    }
	  }, {
	    key: "delete",
	    value: function _delete(params, options) {
	      return iNaturalistAPI.delete("comments/:id", params, options);
	    }
	  }]);

	  return comments;
	}();

	module.exports = comments;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Model = __webpack_require__(10);

	var Comment = function (_Model) {
	  _inherits(Comment, _Model);

	  function Comment() {
	    _classCallCheck(this, Comment);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Comment).apply(this, arguments));
	  }

	  _createClass(Comment, null, [{
	    key: "typifyInstanceResponse",
	    value: function typifyInstanceResponse(response) {
	      return _get(Object.getPrototypeOf(Comment), "typifyInstanceResponse", this).call(this, response, Comment);
	    }
	  }]);

	  return Comment;
	}(Model);

	module.exports = Comment;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var iNaturalistAPI = __webpack_require__(1),
	    ControlledTerm = __webpack_require__(16);

	var controlled_terms = function () {
	  function controlled_terms() {
	    _classCallCheck(this, controlled_terms);
	  }

	  _createClass(controlled_terms, null, [{
	    key: "for_taxon",
	    value: function for_taxon(params) {
	      return iNaturalistAPI.get("controlled_terms/for_taxon", params).then(function (response) {
	        response = ControlledTerm.typifyResultsResponse(response);
	        for (var i = 0; i < response.results.length; i++) {
	          if (!response.results[i] || !!response.results[i].values) {
	            continue;
	          }
	          response.results[i].values = response.results[i].values.map(function (v) {
	            return new ControlledTerm(v);
	          });
	        }
	        return response;
	      });
	    }
	  }]);

	  return controlled_terms;
	}();

	module.exports = controlled_terms;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Model = __webpack_require__(10);

	var ControlledTerm = function (_Model) {
	  _inherits(ControlledTerm, _Model);

	  function ControlledTerm(attrs) {
	    _classCallCheck(this, ControlledTerm);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ControlledTerm).call(this, attrs));

	    if (_this.values) {
	      _this.values = _this.values.map(function (v) {
	        return new ControlledTerm(v);
	      });
	    }
	    return _this;
	  }

	  return ControlledTerm;
	}(Model);

	module.exports = ControlledTerm;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var iNaturalistAPI = __webpack_require__(1),
	    Flag = __webpack_require__(18);

	var flags = function () {
	  function flags() {
	    _classCallCheck(this, flags);
	  }

	  _createClass(flags, null, [{
	    key: "create",
	    value: function create(params, options) {
	      return iNaturalistAPI.post("flags", params, options).then(Flag.typifyInstanceResponse);
	    }
	  }, {
	    key: "delete",
	    value: function _delete(params, options) {
	      return iNaturalistAPI.delete("flags/:id", params, options);
	    }
	  }]);

	  return flags;
	}();

	module.exports = flags;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Model = __webpack_require__(10);

	var Flag = function (_Model) {
	  _inherits(Flag, _Model);

	  function Flag() {
	    _classCallCheck(this, Flag);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Flag).apply(this, arguments));
	  }

	  _createClass(Flag, null, [{
	    key: "typifyInstanceResponse",
	    value: function typifyInstanceResponse(response) {
	      return _get(Object.getPrototypeOf(Flag), "typifyInstanceResponse", this).call(this, response, Flag);
	    }
	  }]);

	  return Flag;
	}(Model);

	module.exports = Flag;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var iNaturalistAPI = __webpack_require__(1),
	    Identification = __webpack_require__(20),
	    Taxon = __webpack_require__(21),
	    User = __webpack_require__(24);

	var identifications = function () {
	  function identifications() {
	    _classCallCheck(this, identifications);
	  }

	  _createClass(identifications, null, [{
	    key: "create",
	    value: function create(params, options) {
	      return iNaturalistAPI.post("identifications", params, options).then(Identification.typifyInstanceResponse);
	    }
	  }, {
	    key: "update",
	    value: function update(params, options) {
	      return iNaturalistAPI.put("identifications/:id", params, options).then(Identification.typifyInstanceResponse);
	    }
	  }, {
	    key: "delete",
	    value: function _delete(params, options) {
	      return iNaturalistAPI.delete("identifications/:id", params, options);
	    }
	  }, {
	    key: "similar_species",
	    value: function similar_species(params, options) {
	      return iNaturalistAPI.get("identifications/similar_species", params, options).then(function (response) {
	        if (response.results) {
	          response.results = response.results.map(function (r) {
	            r.taxon = new Taxon(r.taxon);
	            return r;
	          });
	        }
	        return response;
	      });
	    }
	  }, {
	    key: "identifiers",
	    value: function identifiers(params, options) {
	      return iNaturalistAPI.get("identifications/identifiers", params, options).then(function (response) {
	        if (response.results) {
	          response.results = response.results.map(function (r) {
	            r.user = new User(r.user);
	            return r;
	          });
	        }
	        return response;
	      });
	    }
	  }]);

	  return identifications;
	}();

	module.exports = identifications;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Model = __webpack_require__(10),
	    Taxon = __webpack_require__(21);

	var Identification = function (_Model) {
	  _inherits(Identification, _Model);

	  function Identification(attrs) {
	    _classCallCheck(this, Identification);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Identification).call(this, attrs));

	    if (_this.taxon && _this.taxon !== undefined) {
	      _this.taxon = new Taxon(_this.taxon);
	    }
	    return _this;
	  }

	  _createClass(Identification, null, [{
	    key: "typifyInstanceResponse",
	    value: function typifyInstanceResponse(response) {
	      return _get(Object.getPrototypeOf(Identification), "typifyInstanceResponse", this).call(this, response, Identification);
	    }
	  }]);

	  return Identification;
	}(Model);

	module.exports = Identification;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Model = __webpack_require__(10),
	    Photo = __webpack_require__(22),
	    ConservationStatus = __webpack_require__(23);

	var Taxon = function (_Model) {
	  _inherits(Taxon, _Model);

	  function Taxon(attrs) {
	    _classCallCheck(this, Taxon);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Taxon).call(this, attrs));

	    if (_this.default_photo && _this.default_photo !== undefined) {
	      _this.defaultPhoto = new Photo(_this.default_photo);
	    }
	    if (_this.taxon_photos && _this.taxon_photos !== undefined) {
	      _this.taxonPhotos = _this.taxon_photos.map(function (tp) {
	        return {
	          taxon: new Taxon(tp.taxon),
	          photo: new Photo(tp.photo)
	        };
	      });
	    }
	    if (_this.conservation_status && _this.conservation_status !== undefined) {
	      _this.conservationStatus = new ConservationStatus(_this.conservation_status);
	    }
	    if (_this.conservation_statuses && _this.conservation_statuses !== undefined) {
	      _this.conservationStatuses = _this.conservation_statuses.map(function (cs) {
	        return new ConservationStatus(cs);
	      });
	    }
	    if (_this.ancestors && _this.ancestors !== undefined) {
	      _this.ancestorTaxa = _this.ancestors.map(function (a) {
	        return new Taxon(a);
	      });
	    }
	    if (_this.children && _this.children !== undefined) {
	      _this.childTaxa = _this.children.map(function (a) {
	        return new Taxon(a);
	      });
	    }
	    return _this;
	  }

	  _createClass(Taxon, [{
	    key: "iconicTaxonName",
	    value: function iconicTaxonName() {
	      if (this.iconic_taxon_name && this.iconic_taxon_name.length > 0) {
	        return this.iconic_taxon_name;
	      }
	      return "Unknown";
	    }
	  }, {
	    key: "photoTag",
	    value: function photoTag() {
	      if (this.default_photo) {
	        return "<img src='" + this.default_photo.square_url + "'/>";
	      }
	      return "<i class='icon icon-iconic-" + this.iconicTaxonName().toLowerCase() + "'/>";
	    }
	  }], [{
	    key: "typifyResultsResponse",
	    value: function typifyResultsResponse(response) {
	      return _get(Object.getPrototypeOf(Taxon), "typifyResultsResponse", this).call(this, response, Taxon);
	    }
	  }]);

	  return Taxon;
	}(Model);

	module.exports = Taxon;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Model = __webpack_require__(10);

	var Photo = function (_Model) {
	  _inherits(Photo, _Model);

	  function Photo() {
	    _classCallCheck(this, Photo);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Photo).apply(this, arguments));
	  }

	  _createClass(Photo, [{
	    key: "photoUrl",
	    value: function photoUrl(size) {
	      this.cachedPhotos = this.cachedPhotos || {};
	      size = size || "square";
	      if (this.cachedPhotos[size]) {
	        return this.cachedPhotos[size];
	      }
	      if (this[size + "_url"]) {
	        return this[size + "_url"];
	      }
	      if (!this.url) {
	        return;
	      } else {
	        this.cachedPhotos[size] = this.url.replace("square", size);
	      }
	      return this.cachedPhotos[size];
	    }
	  }, {
	    key: "dimensions",
	    value: function dimensions(size) {
	      var longEdges = {
	        square: 75,
	        thumb: 100,
	        small: 240,
	        medium: 500,
	        large: 1024,
	        original: 2048
	      };
	      if (!longEdges[size] || size === "original" || !this.original_dimensions) {
	        return this.original_dimensions;
	      }
	      var w = this.original_dimensions.width;
	      var h = this.original_dimensions.height;
	      if (Math.max(w, h) < longEdges[size]) {
	        return null;
	      }
	      if (w < h) {
	        return {
	          width: parseInt(longEdges[size] / this.original_dimensions.height * this.original_dimensions.width),
	          height: longEdges[size]
	        };
	      } else {
	        return {
	          width: longEdges[size],
	          height: parseInt(longEdges[size] / this.original_dimensions.width * this.original_dimensions.height)
	        };
	      }
	    }
	  }]);

	  return Photo;
	}(Model);

	module.exports = Photo;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Model = __webpack_require__(10);

	var ConservationStatus = function (_Model) {
	  _inherits(ConservationStatus, _Model);

	  function ConservationStatus() {
	    _classCallCheck(this, ConservationStatus);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(ConservationStatus).apply(this, arguments));
	  }

	  _createClass(ConservationStatus, [{
	    key: "iucnStatus",
	    value: function iucnStatus() {
	      switch (this.iucn) {
	        case 0:
	          return "not evaluated";
	        case 5:
	          return "data deficient";
	        case 10:
	          return "least concern";
	        case 20:
	          return "near threatened";
	        case 30:
	          return "vulnerable";
	        case 40:
	          return "endangered";
	        case 50:
	          return "critically endangered";
	        case 60:
	          return "extinct in the wild";
	        case 70:
	          return "extinct";
	        default:
	          return null;
	      }
	    }
	  }, {
	    key: "iucnStatusCode",
	    value: function iucnStatusCode() {
	      return {
	        "not evaluated": "NE",
	        "data deficient": "DD",
	        "least concern": "LC",
	        "near threatened": "NT",
	        "vulnerable": "VU",
	        "endangered": "EN",
	        "critically endangered": "CR",
	        "extinct in the wild": "EW",
	        "extinct": "EX"
	      }[this.iucnStatus()];
	    }
	  }, {
	    key: "statusText",
	    value: function statusText() {
	      switch (this.authority) {
	        case "IUCN Red List":
	          return this.iucnStatus();
	        case "NatureServe":
	          return this.natureServeStatus();
	        case "Norma Oficial 059":
	          return this.normaStatus();
	        default:
	          switch (this.status.toLowerCase()) {
	            case "se":
	            case "fe":
	            case "le":
	            case "e":
	              return "endangered";
	            case "st":
	            case "ft":
	            case "lt":
	            case "t":
	              return "threatened";
	            case "sc":
	              return "special concern";
	            case "c":
	              return "candidate";
	            default:
	              if (this.description && this.description.length < 50) {
	                return this.description + " (" + this.status + ")";
	              } else {
	                return this.status;
	              }
	          }
	      }
	    }
	  }, {
	    key: "natureServeStatus",
	    value: function natureServeStatus() {
	      var status = this.status || "";
	      var matches = status.match(/T(.)/);
	      var nsStatus = matches ? matches[1] : status[1];
	      switch (nsStatus) {
	        case "X":
	          return "extinct";
	        case "H":
	          return "possibly extinct";
	        case "1":
	          return "critically imperiled";
	        case "2":
	          return "imperiled";
	        case "3":
	          return "vulnerable";
	        case "4":
	          return "apparently secure";
	        case "5":
	          return "secure";
	        default:
	          return this.status;
	      }
	    }
	  }, {
	    key: "normaStatus",
	    value: function normaStatus() {
	      switch (this.status) {
	        case "P":
	          return "en peligro de extinción";
	        case "A":
	          return "amenazada";
	        case "Pr":
	          return "sujeta a protección especial";
	        case "Ex":
	          return "probablemente extinta en el medio silvestre";
	        default:
	          return status;
	      }
	    }
	  }], [{
	    key: "typifyInstanceResponse",
	    value: function typifyInstanceResponse(response) {
	      return _get(Object.getPrototypeOf(ConservationStatus), "typifyInstanceResponse", this).call(this, response, ConservationStatus);
	    }
	  }]);

	  return ConservationStatus;
	}(Model);

	module.exports = ConservationStatus;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Model = __webpack_require__(10);

	var User = function (_Model) {
	  _inherits(User, _Model);

	  function User() {
	    _classCallCheck(this, User);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(User).apply(this, arguments));
	  }

	  _createClass(User, null, [{
	    key: "typifyResultsResponse",
	    value: function typifyResultsResponse(response) {
	      return _get(Object.getPrototypeOf(User), "typifyResultsResponse", this).call(this, response, User);
	    }
	  }, {
	    key: "typifyInstanceResponse",
	    value: function typifyInstanceResponse(response) {
	      return _get(Object.getPrototypeOf(User), "typifyInstanceResponse", this).call(this, response, User);
	    }
	  }]);

	  return User;
	}(Model);

	module.exports = User;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var iNaturalistAPI = __webpack_require__(1),
	    ObservationFieldValue = __webpack_require__(26);

	var observationFieldValues = function () {
	  function observationFieldValues() {
	    _classCallCheck(this, observationFieldValues);
	  }

	  _createClass(observationFieldValues, null, [{
	    key: "create",
	    value: function create(params, options) {
	      return iNaturalistAPI.post("observation_field_values", params, options).then(ObservationFieldValue.typifyInstanceResponse);
	    }
	  }, {
	    key: "update",
	    value: function update(params, options) {
	      return iNaturalistAPI.put("observation_field_values/:id", params, options).then(ObservationFieldValue.typifyInstanceResponse);
	    }
	  }, {
	    key: "delete",
	    value: function _delete(params, options) {
	      return iNaturalistAPI.delete("observation_field_values/:id", params, options);
	    }
	  }]);

	  return observationFieldValues;
	}();

	module.exports = observationFieldValues;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Model = __webpack_require__(10);

	var ObservationFieldValue = function (_Model) {
	  _inherits(ObservationFieldValue, _Model);

	  function ObservationFieldValue() {
	    _classCallCheck(this, ObservationFieldValue);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(ObservationFieldValue).apply(this, arguments));
	  }

	  _createClass(ObservationFieldValue, null, [{
	    key: "typifyInstanceResponse",
	    value: function typifyInstanceResponse(response) {
	      return _get(Object.getPrototypeOf(ObservationFieldValue), "typifyInstanceResponse", this).call(this, response, ObservationFieldValue);
	    }
	  }]);

	  return ObservationFieldValue;
	}(Model);

	module.exports = ObservationFieldValue;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var iNaturalistAPI = __webpack_require__(1),
	    ControlledTerm = __webpack_require__(16),
	    Observation = __webpack_require__(28),
	    Taxon = __webpack_require__(21),
	    User = __webpack_require__(24);

	var observations = function () {
	  function observations() {
	    _classCallCheck(this, observations);
	  }

	  _createClass(observations, null, [{
	    key: "create",
	    value: function create(params, options) {
	      return iNaturalistAPI.post("observations", params, options).then(Observation.typifyInstanceResponse);
	    }
	  }, {
	    key: "update",
	    value: function update(params, options) {
	      return iNaturalistAPI.put("observations/:id", params, options).then(Observation.typifyInstanceResponse);
	    }
	  }, {
	    key: "delete",
	    value: function _delete(params, options) {
	      return iNaturalistAPI.delete("observations/:id", params, options);
	    }
	  }, {
	    key: "fave",
	    value: function fave(params, options) {
	      return observations.vote(params, options);
	    }
	  }, {
	    key: "unfave",
	    value: function unfave(params, options) {
	      return observations.unvote(params, options);
	    }
	  }, {
	    key: "vote",
	    value: function vote(params, options) {
	      return iNaturalistAPI.post("votes/vote/observation/:id", params, options).then(Observation.typifyInstanceResponse);
	    }
	  }, {
	    key: "unvote",
	    value: function unvote(params, options) {
	      return iNaturalistAPI.delete("votes/unvote/observation/:id", params, options);
	    }
	  }, {
	    key: "subscribe",
	    value: function subscribe(params, options) {
	      return iNaturalistAPI.post("subscriptions/Observation/:id/subscribe", params, options);
	    }
	  }, {
	    key: "review",
	    value: function review(params, options) {
	      var p = Object.assign({}, params);
	      p.reviewed = "true";
	      return iNaturalistAPI.post("observations/:id/review", p, options);
	    }
	  }, {
	    key: "unreview",
	    value: function unreview(params, options) {
	      var p = Object.assign({}, params);
	      return iNaturalistAPI.delete("observations/:id/review", p, options);
	    }
	  }, {
	    key: "qualityMetrics",
	    value: function qualityMetrics(params, options) {
	      return iNaturalistAPI.get("observations/:id/quality_metrics", params, options);
	    }
	  }, {
	    key: "setQualityMetric",
	    value: function setQualityMetric(params, options) {
	      return iNaturalistAPI.post("observations/:id/quality/:metric", params, options);
	    }
	  }, {
	    key: "deleteQualityMetric",
	    value: function deleteQualityMetric(params, options) {
	      return iNaturalistAPI.delete("observations/:id/quality/:metric", params, options);
	    }
	  }, {
	    key: "fetch",
	    value: function fetch(ids, params) {
	      return iNaturalistAPI.fetch("observations", ids, params).then(Observation.typifyResultsResponse);
	    }
	  }, {
	    key: "search",
	    value: function search(params) {
	      return iNaturalistAPI.get("observations", params, { useAuth: true }).then(Observation.typifyResultsResponse);
	    }
	  }, {
	    key: "identifiers",
	    value: function identifiers(params) {
	      return iNaturalistAPI.get("observations/identifiers", params).then(function (response) {
	        if (response.results) {
	          response.results = response.results.map(function (r) {
	            r.user = new User(r.user);
	            return r;
	          });
	        }
	        return response;
	      });
	    }
	  }, {
	    key: "observers",
	    value: function observers(params) {
	      return iNaturalistAPI.get("observations/observers", params).then(function (response) {
	        if (response.results) {
	          response.results = response.results.map(function (r) {
	            r.user = new User(r.user);
	            return r;
	          });
	        }
	        return response;
	      });
	    }
	  }, {
	    key: "speciesCounts",
	    value: function speciesCounts(params) {
	      return iNaturalistAPI.get("observations/species_counts", params).then(function (response) {
	        if (response.results) {
	          response.results = response.results.map(function (r) {
	            r.taxon = new Taxon(r.taxon);
	            return r;
	          });
	        }
	        return response;
	      });
	    }
	  }, {
	    key: "popularFieldValues",
	    value: function popularFieldValues(params) {
	      return iNaturalistAPI.get("observations/popular_field_values", params).then(function (response) {
	        if (response.results) {
	          response.results = response.results.map(function (r) {
	            r.controlled_attribute = new ControlledTerm(r.controlled_attribute);
	            r.controlled_value = new ControlledTerm(r.controlled_value);
	            return r;
	          });
	        }
	        return response;
	      });
	    }
	  }, {
	    key: "histogram",
	    value: function histogram(params) {
	      return iNaturalistAPI.get("observations/histogram", params);
	    }
	  }, {
	    key: "subscriptions",
	    value: function subscriptions(params) {
	      return iNaturalistAPI.get("observations/:id/subscriptions", params, { useAuth: true });
	    }
	  }, {
	    key: "taxonSummary",
	    value: function taxonSummary(params) {
	      return iNaturalistAPI.get("observations/:id/taxon_summary", params);
	    }
	  }, {
	    key: "updates",
	    value: function updates(params, options) {
	      options = options || {};
	      options.useAuth = true;
	      return iNaturalistAPI.get("observations/updates", params, options);
	    }
	  }]);

	  return observations;
	}();

	module.exports = observations;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Model = __webpack_require__(10),
	    Taxon = __webpack_require__(21),
	    Photo = __webpack_require__(22),
	    Identification = __webpack_require__(20);

	var Observation = function (_Model) {
	  _inherits(Observation, _Model);

	  function Observation(attrs) {
	    _classCallCheck(this, Observation);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Observation).call(this, attrs));

	    if (_this.geojson && _this.geojson.coordinates) {
	      _this.latitude = _this.geojson.coordinates[1];
	      _this.longitude = _this.geojson.coordinates[0];
	    }
	    if (_this.taxon) {
	      _this.taxon = new Taxon(_this.taxon);
	    }
	    if (_this.photos && _this.photos.length > 0) {
	      _this.photos = _this.photos.map(function (p) {
	        return new Photo(p);
	      });
	    }
	    if (_this.identifications && _this.identifications.length > 0) {
	      _this.identifications = _this.identifications.map(function (i) {
	        return new Identification(i);
	      });
	    }
	    return _this;
	  }

	  _createClass(Observation, [{
	    key: "photo",
	    value: function photo(size) {
	      this.cachedPhotos = this.cachedPhotos || {};
	      size = size || "square";
	      if (this.cachedPhotos[size]) {
	        return this.cachedPhotos[size];
	      }
	      if (this.photos && this.photos.length > 0) {
	        this.cachedPhotos[size] = this.photos[0].photoUrl(size);
	      }
	      return this.cachedPhotos[size];
	    }
	  }, {
	    key: "hasPhotos",
	    value: function hasPhotos() {
	      return this.photos && this.photos.length > 0;
	    }
	  }, {
	    key: "hasSounds",
	    value: function hasSounds() {
	      return this.sounds && this.sounds.length > 0;
	    }
	  }, {
	    key: "hasMedia",
	    value: function hasMedia() {
	      if (this.hasPhotos() || this.hasSounds()) {
	        return true;
	      }
	      return false;
	    }
	  }], [{
	    key: "typifyResultsResponse",
	    value: function typifyResultsResponse(response) {
	      return _get(Object.getPrototypeOf(Observation), "typifyResultsResponse", this).call(this, response, Observation);
	    }
	  }, {
	    key: "typifyInstanceResponse",
	    value: function typifyInstanceResponse(response) {
	      return _get(Object.getPrototypeOf(Observation), "typifyInstanceResponse", this).call(this, response, Observation);
	    }
	  }]);

	  return Observation;
	}(Model);

	module.exports = Observation;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var iNaturalistAPI = __webpack_require__(1);

	var photos = function () {
	  function photos() {
	    _classCallCheck(this, photos);
	  }

	  _createClass(photos, null, [{
	    key: "create",
	    value: function create(params, options) {
	      return iNaturalistAPI.upload("photos", params, options);
	    }
	  }]);

	  return photos;
	}();

	module.exports = photos;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var iNaturalistAPI = __webpack_require__(1),
	    Place = __webpack_require__(31);

	var places = function () {
	  function places() {
	    _classCallCheck(this, places);
	  }

	  _createClass(places, null, [{
	    key: "fetch",
	    value: function fetch(ids) {
	      return iNaturalistAPI.fetch("places", ids).then(Place.typifyResultsResponse);
	    }
	  }, {
	    key: "autocomplete",
	    value: function autocomplete(params) {
	      return iNaturalistAPI.get("places/autocomplete", params).then(Place.typifyResultsResponse);
	    }
	  }, {
	    key: "containing",
	    value: function containing(params) {
	      return iNaturalistAPI.get("places/containing", params).then(Place.typifyResultsResponse);
	    }
	  }]);

	  return places;
	}();

	module.exports = places;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Model = __webpack_require__(10);

	var Place = function (_Model) {
	  _inherits(Place, _Model);

	  function Place() {
	    _classCallCheck(this, Place);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Place).apply(this, arguments));
	  }

	  _createClass(Place, null, [{
	    key: "typifyResultsResponse",
	    value: function typifyResultsResponse(response) {
	      return _get(Object.getPrototypeOf(Place), "typifyResultsResponse", this).call(this, response, Place);
	    }
	  }]);

	  return Place;
	}(Model);

	module.exports = Place;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var iNaturalistAPI = __webpack_require__(1),
	    Post = __webpack_require__(33);

	var posts = function () {
	  function posts() {
	    _classCallCheck(this, posts);
	  }

	  _createClass(posts, null, [{
	    key: "for_user",
	    value: function for_user(params, options) {
	      return iNaturalistAPI.get("posts/for_user", params, options).then(Post.typifyArrayResponse);
	    }
	  }]);

	  return posts;
	}();

	module.exports = posts;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Model = __webpack_require__(10);

	var Post = function (_Model) {
	  _inherits(Post, _Model);

	  function Post() {
	    _classCallCheck(this, Post);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Post).apply(this, arguments));
	  }

	  _createClass(Post, null, [{
	    key: "typifyArrayResponse",
	    value: function typifyArrayResponse(response) {
	      return _get(Object.getPrototypeOf(Post), "typifyArrayResponse", this).call(this, response, Post);
	    }
	  }]);

	  return Post;
	}(Model);

	module.exports = Post;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var iNaturalistAPI = __webpack_require__(1),
	    Project = __webpack_require__(35);

	var projects = function () {
	  function projects() {
	    _classCallCheck(this, projects);
	  }

	  _createClass(projects, null, [{
	    key: "fetch",
	    value: function fetch(ids) {
	      return iNaturalistAPI.fetch("projects", ids).then(Project.typifyResultsResponse);
	    }
	  }, {
	    key: "join",
	    value: function join(params, options) {
	      return iNaturalistAPI.post("projects/:id/join", params, options);
	    }
	  }, {
	    key: "leave",
	    value: function leave(params, options) {
	      return iNaturalistAPI.delete("projects/:id/leave", params, options);
	    }
	  }, {
	    key: "add",
	    value: function add(params, options) {
	      return iNaturalistAPI.post("projects/:id/add", params, options);
	    }
	  }, {
	    key: "remove",
	    value: function remove(params, options) {
	      return iNaturalistAPI.delete("projects/:id/remove", params, options);
	    }
	  }]);

	  return projects;
	}();

	module.exports = projects;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Model = __webpack_require__(10);

	var Project = function (_Model) {
	  _inherits(Project, _Model);

	  function Project() {
	    _classCallCheck(this, Project);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Project).apply(this, arguments));
	  }

	  _createClass(Project, null, [{
	    key: "typifyResultsResponse",
	    value: function typifyResultsResponse(response) {
	      return _get(Object.getPrototypeOf(Project), "typifyResultsResponse", this).call(this, response, Project);
	    }
	  }]);

	  return Project;
	}(Model);

	module.exports = Project;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var iNaturalistAPI = __webpack_require__(1),
	    ProjectObservation = __webpack_require__(37);

	var projectObservations = function () {
	  function projectObservations() {
	    _classCallCheck(this, projectObservations);
	  }

	  _createClass(projectObservations, null, [{
	    key: "create",
	    value: function create(params, options) {
	      return iNaturalistAPI.post("project_observations", params, options).then(ProjectObservation.typifyInstanceResponse);
	    }
	  }, {
	    key: "update",
	    value: function update(params, options) {
	      return iNaturalistAPI.put("project_observations/:id", params, options).then(ProjectObservation.typifyInstanceResponse);
	    }
	  }, {
	    key: "delete",
	    value: function _delete(params, options) {
	      return iNaturalistAPI.delete("project_observations/:id", params, options);
	    }
	  }]);

	  return projectObservations;
	}();

	module.exports = projectObservations;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Model = __webpack_require__(10);

	var ProjectObservation = function (_Model) {
	  _inherits(ProjectObservation, _Model);

	  function ProjectObservation() {
	    _classCallCheck(this, ProjectObservation);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(ProjectObservation).apply(this, arguments));
	  }

	  _createClass(ProjectObservation, null, [{
	    key: "typifyInstanceResponse",
	    value: function typifyInstanceResponse(response) {
	      return _get(Object.getPrototypeOf(ProjectObservation), "typifyInstanceResponse", this).call(this, response, ProjectObservation);
	    }
	  }]);

	  return ProjectObservation;
	}(Model);

	module.exports = ProjectObservation;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var iNaturalistAPI = __webpack_require__(1),
	    Taxon = __webpack_require__(21);

	var taxa = function () {
	  function taxa() {
	    _classCallCheck(this, taxa);
	  }

	  _createClass(taxa, null, [{
	    key: "fetch",
	    value: function fetch(ids, params) {
	      return iNaturalistAPI.fetch("taxa", ids, params).then(Taxon.typifyResultsResponse);
	    }
	  }, {
	    key: "autocomplete",
	    value: function autocomplete(params) {
	      return iNaturalistAPI.get("taxa/autocomplete", params).then(Taxon.typifyResultsResponse);
	    }
	  }]);

	  return taxa;
	}();

	module.exports = taxa;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var iNaturalistAPI = __webpack_require__(1),
	    User = __webpack_require__(24);

	var users = function () {
	  function users() {
	    _classCallCheck(this, users);
	  }

	  _createClass(users, null, [{
	    key: "fetch",
	    value: function fetch(ids) {
	      return iNaturalistAPI.fetch("users", ids).then(User.typifyResultsResponse);
	    }
	  }, {
	    key: "update",
	    value: function update(params, options) {
	      return iNaturalistAPI.put("users/:id", params, options).then(User.typifyInstanceResponse);
	    }
	  }, {
	    key: "update_session",
	    value: function update_session(params, options) {
	      return iNaturalistAPI.put("users/update_session", params, options);
	    }
	  }, {
	    key: "me",
	    value: function me(options) {
	      options = options || {};
	      options.useAuth = true;
	      return iNaturalistAPI.get("users/me", null, options).then(User.typifyResultsResponse);
	    }
	  }]);

	  return users;
	}();

	module.exports = users;

/***/ }
/******/ ])));