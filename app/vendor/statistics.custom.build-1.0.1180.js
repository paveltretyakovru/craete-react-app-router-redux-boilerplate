
var com = window.com || {};
com.rooxteam = com.rooxteam || {};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * @type {Object} The namespace declaration for this file.
 */

com.rooxteam.sharedcontext = com.rooxteam.sharedcontext || {};


/**
 * @type {Object} Global DataContext to contain requested data sets.
 */
(function() {

    function DataContext(isPersistent) {
        var listeners = [];

        var _storage;
        if (isPersistent) {
            _storage = window.localStorage;
        } else {
            _storage = window.sessionStorage;
        }
//  var dataSets = {};

        /**
         * Puts a data set into the global DataContext object. Fires listeners
         * if they are satisfied by the associated key being inserted.
         *
         * @param {string} key The key to associate with this object.
         * @param {ResponseItem|Object} obj The data object.
         * @param {boolean=} opt_fireListeners Default true.
         */
        var putDataSet = function(key, obj, opt_fireListeners) {
            if (typeof obj === 'undefined' || obj === null) {
                return;
            }
            _storage.setItem(key, JSON.stringify(obj));

            if (!(opt_fireListeners === false)) {
                fireCallbacks(key);
            }
        };

        var removeDataSet = function(key, opt_fireListeners) {
            _storage.removeItem(key);

            if (!(opt_fireListeners === false)) {
                fireCallbacks(key);
            }
        };

        /**
         * Registers a callback listener for a given set of keys.
         * @param {string|Array.<string>} keys Key or set of keys to listen on.
         * @param {function(Array.<string>)} callback Function to call when a
         * listener is fired.
         * @param {booelan} oneTimeListener Remove this listener after first callback?
         * @param {boolean} fireIfReady Instantly fire this if all data is available?
         */
        var registerListener = function(keys, callback, oneTimeListener, fireIfReady) {
            var oneTime = !!oneTimeListener;
            var listener = {keys: {}, callback: callback, oneTime: oneTime};

            if (typeof keys === 'string') {
                listener.keys[keys] = true;
                if (keys != '*') {
                    keys = [keys];
                }
            } else {
                for (var i = 0; i < keys.length; i++) {
                    listener.keys[keys[i]] = true;
                }
            }

            listeners.push(listener);

            // Check to see if this one should fire immediately.
            if (fireIfReady && keys !== '*' && isDataReady(listener.keys)) {
                window.setTimeout(function() {
                    maybeFireListener(listener, keys);
                }, 1);
            }
        };

        /**
         * Checks if the data for a map of keys is available.
         * @param {Object.<string, *>} keys An map of keys to check.
         * @return {boolean} Data for all the keys is present.
         */
        var isDataReady = function(keys) {
            if (keys['*']) {
                return true;
            }

//        for (var key in keys) {
//            if (typeof dataSets[key] === 'undefined') {
//                return false;
//            }
//        }
            return true;
        };

        /**
         * Fires a listener for a key, but only if the data is ready for other
         * keys this listener is bound to.
         * @param {Object} listener The listener object.
         * @param {string} key The key that this listener is being fired for.
         */
        var maybeFireListener = function(listener, key) {
            if (isDataReady(listener.keys)) {
                listener.callback(key);
                if (listener.oneTime) {
                    removeListener(listener);
                }
            }
        };

        /**
         * Removes a listener from the list.
         * @param {Object} listener The listener to remove.
         */
        var removeListener = function(listener) {
            for (var i = 0; i < listeners.length; ++i) {
                if (listeners[i] == listener) {
                    listeners.splice(i, 1);
                    return;
                }
            }
        };

        /**
         * Scans all active listeners and fires off any callbacks that inserting this
         * key or list of keys satisfies.
         * @param {string|Array.<string>} keys The key that was updated.
         * @private
         */
        var fireCallbacks = function(keys) {
            if (typeof(keys) == 'string') {
                keys = [keys];
            }
            for (var i = 0; i < listeners.length; ++i) {
                var listener = listeners[i];
                for (var j = 0; j < keys.length; j++) {
                    var key = keys[j];
                    if (listener.keys[key] || listener.keys['*']) {
                        maybeFireListener(listener, keys);
                        break;
                    }
                }
            }
        };


        return {

            /**
             * Returns a map of existing data.
             * @return {Object} A map of current data sets.
             * TODO: Add to the spec API?
             */
            getData: function() {
                var data = {};
                for (var keyIdx = 0; keyIdx < _storage.length; keyIdx++) {
                    data[keyIdx] = _storage.getItem(_storage.key(keyIdx));
                }
            },

            /**
             * Registers a callback listener for a given set of keys.
             * @param {string|Array.<string>} keys Key or set of keys to listen on.
             * @param {function(Array.<string>)} callback Function to call when a
             * listener is fired.
             */
            registerListener: function(keys, callback) {
                registerListener(keys, callback, false, true);
            },

            /**
             * Private version of registerListener which allows one-time listeners to
             * be registered. Not part of the spec. Exposed because needed by
             * opensocial-templates.
             * @param {string|Array.<string>} keys Key or set of keys to listen on.
             * @param {function(Array.<string>)} callback Function to call when a.
             */
            registerOneTimeListener_: function(keys, callback) {
                registerListener(keys, callback, true, true);
            },

            /**
             * Private version of registerListener which allows listeners to be
             * registered that do not fire initially, but only after a data change.
             * Exposed because needed by opensocial-templates.
             * @param {string|Array.<string>} keys Key or set of keys to listen on.
             * @param {function(Array.<string>)} callback Function to call when a.
             */
            registerDeferredListener_: function(keys, callback) {
                registerListener(keys, callback, false, false);
            },

            /**
             * Retrieve a data set for a given key.
             * @param {string} key Key for the requested data set.
             * @return {Object} The data set object.
             */
            getDataSet: function(key) {
                var result = _storage.getItem(key)
                if (typeof result === 'undefined' || result === null) {
                    return result;
                }
                return JSON.parse(result);
            },

            /**
             * Puts a data set into the global DataContext object. Fires listeners
             * if they are satisfied by the associated key being inserted.
             *
             * @param {string} key The key to associate with this object.
             * @param {ResponseItem|Object} obj The data object.
             */
            putDataSet: function(key, obj) {
                putDataSet(key, obj, true);
            },

            /**
             * Removes value from data set
             *
             * @param {string} key The key to associate with this object.
             */
            removeDataSet: function(key) {
                removeDataSet(key, true);
            },

            /**
             * Inserts multiple data sets from a JSON object.
             * @param {Object.<string, Object>} dataSets a JSON object containing Data
             * sets keyed by Data Set Key. All the DataSets are added, before firing
             * listeners.
             */
            putDataSets: function(dataSets) {
                var keys = [];
                for (var key in dataSets) {
                    keys.push(key);
                    putDataSet(key, dataSets[key], false);
                }
                fireCallbacks(keys);
            }
        };

    }

    com.rooxteam.sharedcontext.DataContext = DataContext(false);

    com.rooxteam.sharedcontext.PersistentDataContext = DataContext(true);

})();

/**
 * Accessor to the shared, global SharedContext.
 */
com.rooxteam.sharedcontext.getDataContext = function() {
    return com.rooxteam.sharedcontext.DataContext;
};

/**
 * Accessor to the persistent global storage
 */
com.rooxteam.sharedcontext.getPersistentDataContext = function() {
    return com.rooxteam.sharedcontext.PersistentDataContext;
};;

com.rooxteam.deferred = com.rooxteam.deferred || {};
/* global dust, jQuery, WinJS */



/**
 * Feature to work with Promises
 * @class com.rooxteam.deferred
 * @singleton
 */

/**
 * Instance of jQuery Deferred Class. See [Deferred Object](http://api.jquery.com/category/deferred-object/).
 * @class com.rooxteam.deferred.Deferred
 */
com.rooxteam.deferred.Deferred = jQuery.Deferred;

/*
 * Allows join together jQuery and WinJS.Promise
 * @method
 * @param {com.rooxteam.deferred.Deferred/WinJS.Promise...} - variable number of Promises to join.
 * @returns {com.rooxteam.deferred.Deferred} new joined promise that fulfills when all templates done, or any fails
 */
com.rooxteam.deferred.when = function () {
    "use strict";
    var args = Array.prototype.slice.call(arguments);

    args = jQuery.map(args, function (arg) {
        if (typeof WinJS !== "undefined" && arg instanceof WinJS.Promise) {
            arg = jQuery.Deferred(function (dfd) {
                arg.then(
                    function complete() {
                        dfd.resolveWith(this, arguments);
                    }, function error() {
                        dfd.rejectWith(this, arguments);
                    }, function progress() {
                        dfd.notifyWith(this, arguments);
                    });
            }).promise();
        }
        return arg;
    });

    return jQuery.when.apply(this, args);
};

/*
 * Allows join together jquery and winjs.promise
 * @method
 * @param {com.rooxteam.deferred.Deferred[] | WinJS.Promise[]} - variable number of Promises to join as array.
 * @returns {com.rooxteam.deferred.Deferred} new joined promise that fulfills when all templates done, or any fails
 */
com.rooxteam.deferred.whenArray = function (deferreds) {
    "use strict";
    return com.rooxteam.deferred.when.apply(null, deferreds);
};

/*
 * Allows join together jquery and winjs.promise, resolve or reject only when all arguments resolved or rejected
 * @method
 * @param {com.rooxteam.deferred.Deferred/WinJS.Promise...} - variable number of Promises to join.
 * @returns {com.rooxteam.deferred.Deferred} new joined promise that fulfills when all templates done, or all fails
 */
com.rooxteam.deferred.whenAll = function (deferreds) {
    "use strict";
    var args = Array.prototype.slice.call(arguments);
    if (args && args.length) {
        var deferred = $.Deferred(),
            toResolve = args.length,
            someFailed = false,
            fail,
            always;
        always = function () {
            if (!--toResolve) {
                deferred[someFailed ? 'reject' : 'resolve']();
            }
        };
        fail = function () {
            someFailed = true;
        };
        args.forEach(function (d) {
            d.fail(fail).always(always);
        });
        return deferred;
    } else {
        return $.Deferred().resolve();
    }
};

/*
 * Allows join together jquery and winjs.promise, resolve or reject only when all arguments resolved or rejected
 * @method
 * @param {com.rooxteam.deferred.Deferred[] | WinJS.Promise[]} - variable number of Promises to join as array.
 * @returns {com.rooxteam.deferred.Deferred} new joined promise that fulfills when all templates done, or all fails
 */
com.rooxteam.deferred.whenAllArray = function (deferreds) {
    "use strict";
    return com.rooxteam.deferred.whenAll.apply(null, deferreds);
};

/*
 * Allows join together jquery and winjs.promise, resolve or reject when some of argument resolved or all rejected
 * @method
 * @param {com.rooxteam.deferred.Deferred/WinJS.Promise...} - variable number of Promises to join.
 * @returns {com.rooxteam.deferred.Deferred} new joined promise that fulfills when some template done, or all fails
 */
com.rooxteam.deferred.whenSome = function (deferreds) {
    "use strict";
    var args = Array.prototype.slice.call(arguments);
    if (args && args.length) {
        var deferred = $.Deferred(),
            toResolve = args.length,
            someDone = false,
            done,
            always;
        always = function () {
            if (!--toResolve || someDone) {
                deferred[someDone ? 'resolve' : 'reject']();
            }
        };
        done = function () {
            someDone = true;
        };
        args.forEach(function (d) {
            d.done(done).always(always);
        });
        return deferred;
    } else {
        return $.Deferred().resolve();
    }
};

/*
 * Allows join together jquery and winjs.promise, resolve or reject when some of argument resolved or all rejected
 * @method
 * @param {com.rooxteam.deferred.Deferred[] | WinJS.Promise[]} - variable number of Promises to join as array.
 * @returns {com.rooxteam.deferred.Deferred} new joined promise that fulfills when some template done, or all fails
 */
com.rooxteam.deferred.whenSomeArray = function (deferreds) {
    "use strict";
    return com.rooxteam.deferred.whenSome.apply(null, deferreds);
};


/*
 * Allows create new promise that fulfills after period of time or that cancel promise after period of time. See [WinJs.Promise.timeout](http://msdn.microsoft.com/en-us/library/windows/apps/br229729.aspx).
 * @method
 * @param {Number} delay quantity of milliseconds to wait.
 * @param {com.rooxteam.deferred.Deferred} [promise] Promise to cancel after timeout.
 * @returns {com.rooxteam.deferred.Deferred} new promise that fulfills after period of time, or new promise with timeout logic
 */
com.rooxteam.deferred.timeout = function(delay, promise) {
    "use strict";
    var args = Array.prototype.slice.call(arguments, 1);

    var timeout = jQuery.Deferred(function(deferred) {
        deferred.timeoutID = setTimeout(function() {
            deferred.resolveWith(deferred, args);
        }, delay);

        deferred.fail(function() {
            clearTimeout(deferred.timeoutID);
        });
    });
    //check if second parameter is jquery deferred
    if (promise.promise && promise.resolve) {
        var cancelPromise = function () { promise.rejectWith(promise, args.slice(1)); };
        var cancelTimeout = function () { timeout.rejectWith(timeout, args.slice(1)); };
        timeout.then(cancelPromise);
        promise.then(cancelTimeout, cancelTimeout);
        return promise;
    } else {
        return timeout;
    }
};


if (typeof dust !== "undefined" && dust.helpers) {

    /**
     * @class dust
     * @singleton
     */

    /**
     * @class dust.helpers
     * @singleton
     */

    /**
     * Dustjs helpers to work with not completed deferreds
     * @param {com.rooxteam.deferred.Deferred} value Promise for processing.
     * @param {String} body Body block will be evaluated when deferred done, there will be new return value and args Array in context.
     * @param {String} else Else block will be evaluated when deferred fails, there will be new return value and args Array in context.
     * @returns {String} Rendered html for body or else blocks
     *
     *     @example
     *     var customer_get = new com.rooxteam.deferred.Deferred();
     *
     *     {@deferred value="{customer_get}"}
     *        Ваш бонус:  ${return.bonus}
     *     {:else}
     *        Ошибка получения данных
     *     {/deferred}
     *
     *     customer_get.resolve({bonus: 100});
     */
    dust.helpers.deferred = function (chunk, context, bodies, params) {
        "use strict";
        var body = bodies.block,
            error = bodies['else'];
        if( params && params.value){
            var promise = params.value;
            return chunk.map(function(chunk) {
                promise.then(
                    function(){
                        chunk.render(body, context.push({"return": arguments[0], "args": arguments}));
                        chunk.end();
                    },
                    function(){
                        if(error) {
                            chunk.render(error, context.push({"return": arguments[0], "args": arguments}));
                        }
                        chunk.end();
                    }
                );
            });
        } else {
            return chunk;
        }
    };
}
;
/*\
|*|
|*|  :: cookies.js ::
|*|
|*|  A complete cookies reader/writer framework with full unicode support.
|*|
|*|  revision #1
|*|
|*|  https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
|*|
|*|  This framework is released under the GNU Public License, version 3 or later.
|*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
|*|
|*|  Syntaxes:
|*|
|*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
|*|  * docCookies.getItem(name)
|*|  * docCookies.removeItem(name[, path[, domain]])
|*|  * docCookies.hasItem(name)
|*|  * docCookies.keys()
|*|
\*/



com.rooxteam.docCookies = {
  getItem: function (sKey) {
    if (!sKey) { return null; }
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function (sKey, sPath, sDomain) {
    if (!this.hasItem(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function (sKey) {
    if (!sKey) { return false; }
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  keys: function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  }
};;
/*global localStorage, setTimeout, clearTimeout, window */

"use strict";

function WindowController () {
    this.id = Math.random();
    this.isMaster = false;
    this.others = {};

    window.addEventListener( 'storage', this, false );
    window.addEventListener( 'unload', this, false );

    this.broadcast( 'hello' );

    var that = this;
    var check = function check () {
        that.check();
        that._checkTimeout = setTimeout( check, 9000 );
    };
    var ping = function ping () {
        that.sendPing();
        that._pingTimeout = setTimeout( ping, 17000 );
    };
    this._checkTimeout = setTimeout( check, 500 );
    this._pingTimeout = setTimeout( ping, 17000 );
}

WindowController.prototype.destroy = function () {
    clearTimeout( this._pingTimeout );
    clearTimeout( this._checkTimeout );

    window.removeEventListener( 'storage', this, false );
    window.removeEventListener( 'unload', this, false );

    this.broadcast( 'bye' );
};

WindowController.prototype.handleEvent = function ( event ) {
    if ( event.type === 'unload' ) {
        this.destroy();
    } else if ( event.key === 'broadcast' ) {
        try {
            var data = JSON.parse( event.newValue );
            if ( data.id !== this.id ) {
                this[ data.type ]( data );
            }
        } catch ( error ) {}
    }
};

WindowController.prototype.sendPing = function () {
    this.broadcast( 'ping' );
};

WindowController.prototype.hello = function ( event ) {
    this.ping( event );
    if ( event.id < this.id ) {
        this.check();
    } else {
        this.sendPing();
    }
};

WindowController.prototype.ping = function ( event ) {
    this.others[ event.id ] = +new Date();
};

WindowController.prototype.bye = function ( event ) {
    delete this.others[ event.id ];
    this.check();
};

WindowController.prototype.check = function ( event ) {
    var now = +new Date(),
        takeMaster = true,
        id;
    for ( id in this.others ) {
        if ( this.others[ id ] + 23000 < now ) {
            delete this.others[ id ];
        } else if ( id < this.id ) {
            takeMaster = false;
        }
    }
    if ( this.isMaster !== takeMaster ) {
        this.isMaster = takeMaster;
        this.masterDidChange();
    }
};

WindowController.prototype.masterDidChange = function () {};

WindowController.prototype.broadcast = function ( type, data ) {
    var event = {
        id: this.id,
        type: type
    };
    for ( var x in data ) {
        event[x] = data[x];
    }
    try {
        localStorage.setItem( 'broadcast', JSON.stringify( event ) );
    } catch ( error ) {}
};

;
/*global window, widgetUrls, performance, document */

com.rooxteam.statistic = com.rooxteam.statistic || {};
com.rooxteam.statistic.utils = com.rooxteam.statistic.utils || {};

/**
 *  Some utilities methods
 *  @class com.rooxteam.statistic.utils
 */

(function (docCookies, $, sharedcontext, gadgetsConfig) {
    'use strict';
    var utils = com.rooxteam.statistic.utils,
        userPrefsFilter = ['url', 'lang', 'debug', 'nocache', 'country', 'refresh', 'delayed', 'feature_mode'],
        parameters = null,
        getDescriptorPathFromWidgetUrls = function (widgetUrls) {
            var wUrls = widgetUrls || [],
                ln = wUrls.length,
                mids = [],
                index = -1;
            if (ln) {
                for (var i = 0; i < ln; i++) {
                    if (typeof wUrls[i] === 'string') {
                        mids.push(i);
                    }
                }
                if (mids.length === 1) {
                    index = wUrls[mids[0]].indexOf('?');
                    if (index !== -1) {
                        return wUrls[mids[0]].substr(0, index);
                    } else {
                        return wUrls[mids[0]];
                    }
                }
            }
        };

    // keep reference for test case
    utils._getDescriptorPathFromWidgetUrls = getDescriptorPathFromWidgetUrls;

    /**
     * Parses URL parameters into an object.
     * @param {string} url - the url parameters to parse.
     * @return {Array.<string>} The parameters as an array.
     */
    function parseUrlParams(url) {
        // Get settings from url, 'hash' takes precedence over 'search' component
        // don't use document.location.hash due to browser differences.
        var query;
        var queryIdx = url.indexOf('?');
        var hashIdx = url.indexOf('#');
        if (hashIdx === -1) {
            query = url.substr(queryIdx + 1);
        } else {
            // essentially replaces "#" with "&"
            query = [url.substr(queryIdx + 1, hashIdx - queryIdx - 1), '&',
                     url.substr(hashIdx + 1)].join('');
        }
        return query.split('&');
    }

    utils.parseUrlParams = parseUrlParams;

    /**
    * Gets the URL parameters.
    *
    * @param {string=} opt_url Optional URL whose parameters to parse.
    *                         Defaults to window's current URL.
    * @return {Object} Parameters passed into the query string.
    * @private Implementation detail.
    */
    utils.getUrlParameters = function (opt_url) {
        var no_opt_url = typeof opt_url === 'undefined';
        if (parameters !== null && no_opt_url) {
            // "parameters" is a cache of current window params only.
            return parameters;
        }
        var parsed = {};
        var pairs = parseUrlParams(opt_url || document.location.href);
        var unesc = window.decodeURIComponent ? window.decodeURIComponent : window.unescape;
        for (var i = 0, j = pairs.length; i < j; ++i) {
            var pos = pairs[i].indexOf('=');
            if (pos === -1) {
                continue;
            }
            var argName = pairs[i].substring(0, pos);
            var value = pairs[i].substring(pos + 1);
            // difference to IG_Prefs, is that args doesn't replace spaces in
            // argname. Unclear on if it should do:
            // argname = argname.replace(/\+/g, " ");
            value = value.replace(/\+/g, ' ');
            try {
                parsed[argName] = unesc(value);
            } catch (e) {
                // Undecodable/invalid value; ignore.
            }
        }
        if (no_opt_url) {
            // Cache current-window params in parameters var.
            parameters = parsed;
        }
        return parsed;
    };

    /**
     * Return params to goto method
     * @param  {String} url - url to redirect to
     * @param  {DomObject} el  - element, usial link
     * @return {String} - query params
     */
    utils._buildRedirectorParams = function (url, el) {
        var encodedUrl = url.replace(/\&amp\;/g, '&'),
            redirectData = { 'goto': encodedUrl },
            domAttrs =  com.rooxteam.statistic.getElementAttributes(el),
            domData = com.rooxteam.statistic.getDOMElementData(el),
            data = com.rooxteam.statistic.getContext(redirectData, domAttrs, domData);

        return $.param(data);
    };

       /**
     * Wrap url to redirector
     * @param  {String} url - url to go to
     * @return {String} - url with redirection
     */
    utils.wrapUriToRedirected = function (url, el) {
        var redirectorUrl = (
                gadgetsConfig &&
                gadgetsConfig.get('com.rooxteam.config').redirector &&
                gadgetsConfig.get('com.rooxteam.config').redirector.url
            );

        if (!redirectorUrl) {
            return url;
        }

        return redirectorUrl + '/redirect?' + utils._buildRedirectorParams(url, el);
    };

    /**
     * Replace href element to redirected Uri if target != _blank
     * @param  {DOMObject} el - Dom element to wrap
     */
    utils.makeRedirectedLink = function (el) {
        var $el = $(el),
            href = $el.attr('href'),
            target = $el.attr('target');
        if ($el.hasClass('rx-redirector-wrapped')) {
            // prevent circle wrapping
            return;
        }
        //Catch all links for complete statistics except anchors
        //TODO skip also other hash links like path#anchor, host/path#anchor
        if (href && href.lastIndexOf('#', 0) < 0) {
            $el.attr('href', utils.wrapUriToRedirected(href, el));
            $el.addClass('rx-redirector-wrapped');
        }
    };
    /**
     * Check does click event target is external link
     * @param  {DomObject}   el - element to test link
     * @param {EventObject} event object
     * @return {Boolean} - is external link
     */
    utils.isExternalClick = function (el, evt) {
        var $el = $(el),
            isExternal = false,
            aHref = $el.attr('href'),
            href = el.href + '';
        try {
            isExternal = (
                !(
                    // flags that forces to open new browser window
                    evt.which === 2 ||
                    evt.metaKey ||
                    evt.ctrlKey
                ) && (
                    // rebuild current href
                    el.tagName.toLowerCase() === 'a' &&
                    el.target !== '_blank' &&
                    !!aHref.length &&
                    !!href.length &&
                    href !== window.location.href &&
                    href.indexOf('#') < 0
                )
            );
        } catch (e) {}
        return isExternal;
    };

    /**
     * Parse functions name from onclick attribute
     * @param   {String} onClick - onclick attribute string
     * @returns {Object} - additional data
     */
    utils.getOnClickFunctionsNames = function (onClick) {
        var data = {},
            aux;
        if (onClick && onClick.toString) {
            aux = onClick.toString().match(/([^\W]*)\(/g);
            if (aux && aux.length) {
                data.clkFuncs = [];
                $.each(aux, function (i, str) {
                    var aux2 = str.match(/[^\W]*/);
                    if (aux2[0] && aux2[0] !== 'function' && aux2[0] !== 'alert' && aux2[0] !== 'onclick') {
                        data.clkFuncs.push(aux2[0]);
                    }
                });
                return data.clkFuncs.length ? data : {};
            } else {
                return data;
            }
        } else {
            return data;
        }
    };

    /**
     * Redirect location after click log
     * @param  {String} url - to redirect to
     */
    utils.redirectMainWindow = function (url, target) {
        var isInIframe = (window.parent != window); // jshint ignore:line
        if (isInIframe && target === '_parent') {
            window.parent.location.href = url;
        } else if (isInIframe && target === '_top') {
            window.top.location.href = url;
        } else {
            window.location.href = url;
        }
    };

    /**
     * Return userPrefs object parsed from location.href or window.widgetUrls
     * @param  {Mixed} mid - moduleId, if param is not undefined - get params from global window.widgetUrls, in another way - from location.href
     * @return {Object} - additional userPrefs
     */
    utils.getUserPrefs = function (mid) {
        var urlPrefs = {}, result = {}, url;
        if (typeof mid !== 'undefined' && window.widgetUrls && window.widgetUrls.length && window.widgetUrls[mid]) {
            url = window.widgetUrls[mid];
            urlPrefs = utils.getUrlParameters(url);
        } else {
            // from location.href
            urlPrefs = utils.getUrlParameters();
        }
        for (var p in urlPrefs) {
            if (urlPrefs.hasOwnProperty(p) && $.inArray(p, userPrefsFilter) === -1) {
                result[p] = urlPrefs[p];
            }
        }
        return result;
    };

    utils.proccessServerAddress = function (address) {
        if (address && address.substr(0, 2) === '//') {
            address = document.location.protocol + address;
        }
        return address;
    };

    /**
     * Simple function for IE detection
     * @return {Boolean}
     */
    utils.isIE = function () {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        if (msie > 0 || !!window.navigator.userAgent.match(/Trident.*rv\:11\./)) {
            return true;
        } else {
            return false;
        }
    };
    /**
     * Check, does CORS supported in XHR
     * @returns {Boolean} - does withCredentials supported
     */
    utils.hasCorsXHR = function () {
        return (window.XMLHttpRequest && 'withCredentials' in new window.XMLHttpRequest());
    };

    /**
     * return window.console object or fake object
     * @return {Object}
     */
    utils.getConsole = function () {
        if (window.console && window.console.log) {
            return window.console;
        } else {
            // fake console
            return {
                log: function () {},
                info: function () {},
                warn: function () {},
                error: function () {}
            };
        }
    };
    /**
     * @method getParentUrl
     * try to retrivie parent.location.href or top.location.href,
     * if has origin exception - return document.referrer
     * If not in iframe return window.location.href
     * @return {String} referrer or location
     */
    utils.getParentUrl = function () {
        var isInIframe = (window.parent != window), // jshint ignore:line
            descriptorPath = '',
            parentUrl = null;
        if (isInIframe) {
            try {
                if (window.parent != window.top) { // jshint ignore:line
                    parentUrl = window.top.location.href;
                } else {
                    parentUrl = window.parent.location.href;
                }
            } catch (e) {
                parentUrl = document.referrer;
            }
        } else {
            parentUrl = window.location.href;
            descriptorPath = getDescriptorPathFromWidgetUrls(window.widgetUrls);
            if (descriptorPath && parentUrl.indexOf(descriptorPath) !== -1) {
                // current location contains descriptor path from widgetUrls
                // no return puri for open wrs address
                parentUrl = 'NA';
            }
        }

        return parentUrl;
    };

    /**
     * Return all available widgets mids
     * Iterate throw widgetUrls and store all available widgets
     * @return {Array} array of finded mids
     */
    utils.getAvailableWidgetsMids = function () {
        var mids = [];
        if (window.widgetUrls && window.widgetUrls.length) {
            $.each(widgetUrls, function (mid, url) {
                if (url) {
                    mids.push(mid);
                }
            });
        }
        return mids;
    };

    /**
     * Search widget root element- for inline is #widget_wrapper_<mid> for iframe is body
     * @param  {String} mid - wigdet module id
     * @return {JqueryDOM} - jquery widget root element
     */
    utils.findWidgetRoot = function (mid) {
        var $root = $('#widget_wrapper_' + mid);
        if ($root.length) {
            return $root;
        } else {
            // render=type - is iframe
            return $('body');
        }
    };

    /**
     * Make function closure
     * @param  {Function} callback - callback function to closure
     * @param  {Object} scope - callback context
     * @return {Function} - closured function
     */
    utils.makeClosure = function (callback, scope) {
        // arguments isn't a real array, so we copy it into one.
        var baseArgs = Array.prototype.slice.call(arguments, 2);
        return function () {
            // append new arguments.
            var tmpArgs = baseArgs.slice();
            for (var i = 0, j = arguments.length; i < j; ++i) {
                tmpArgs.push(arguments[i]);
            }
            return callback.apply(scope, tmpArgs);
        };
    };

    /**
     * Retrivew context-id from container config
     * @return {String|Null} [description]
     */
    utils.getContextId = function () {
        var containerConfig = gadgetsConfig && gadgetsConfig.get('com.rooxteam.container');
        if (containerConfig && containerConfig['com.rooxteam.env.wrs.contextId']) {
            return containerConfig['com.rooxteam.env.wrs.contextId'];
        } else {
            return null;
        }
    };

    /**
     * Compact widget.display additional info
     * @param  {Object} obj - object to log
     * @return {Object}     compact object
     */
    utils.compact = function (obj) {
        var res = {};
        $.each(obj, function (key, val) {
            if (val !== null && val !== 'NA') {
                res[key] = val;
            }
        });
        return res;
    };

    /**
     * Generates UUID
     * @return {string}
     */
    utils.guid = function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };

    utils.getRenderTypeFromContainer = function getRenderTypeFromContainer() {
        if (com.rooxteam.container && typeof com.rooxteam.container.renderType === 'string') {
            return com.rooxteam.container.renderType.toUpperCase();
        }
        return '';
    };

    utils.getWidgetNameByUrl = function getWidgetNameByUrl(widgetUrlFull) {
        if (!widgetUrlFull) {
            return '';
        }
        var aux = widgetUrlFull.split(/([^/|^\\]*)/),
            widgetUrl,
            index,
            widgetName;
        aux.pop(); // remove empty string
        //Fallback to original url as name
        widgetUrl = aux.pop() || widgetUrlFull;
        index = widgetUrl.indexOf('?');
        if (index !== -1) {
            widgetName = widgetUrl.substr(0, index);
        } else {
            // no query params
            widgetName = widgetUrl;
        }
        return widgetName.replace('.xml', '');
    };

    /**
     * Parse widget descriptor name from widgetUrl and return as widgetname
     * @param  {String} mid module id
     * @return {String} - widget name
     */
    utils.getWidgetNameByModuleId = function getWidgetNameByModuleId(mid) {
        if (typeof widgetUrls !== 'undefined' && widgetUrls && widgetUrls[mid]) {
            return utils.getWidgetNameByUrl(widgetUrls[mid]);
        } else {
            return '';
        }
    };
    /**
     * Notify widget when visible
     * This method used only in com.rooxteam.renderWidget - to log widget.display stat event
     * @param  {String} elId - widget root element id
     * @param  {Number} mid - module id for widget
     */
    utils.notifyDelayVisibilityChanged = function (elId, mid) {
        var renderType = utils.getRenderTypeFromContainer();
        if (renderType === 'INLINE' && $(document).find(elId).is(':visible')) {
            window.postMessage(JSON.stringify({id: 'widget.display', data: {mid: mid}}), '*');
        }
    };

    utils.getStorage = function (isPersistent) {
        var _storage;
        if (isPersistent) {
            _storage = window.localStorage;
        } else {
            _storage = window.sessionStorage;
        }
        return _storage;
    };

    utils.getStorageItem = function (name, isPersistent) {
        var _storage = utils.getStorage(isPersistent),
            result = null;
        if (_storage) {
            try {
                result = JSON.parse(_storage.getItem(name));
            } catch (e) {}
        }
        return result;
    };

    utils.setStorageItem = function (name, value, isPersistent) {
        var _storage = utils.getStorage(isPersistent);
        if (_storage) {
            // stringify it for gadgets compability
            value = JSON.stringify(value);
            _storage.setItem(name, value);
        }
    };
    /**
     * Check is storage property key in CREDENTIALS_SYNC_MAP
     * @param  {String}  storageKey - storage key which need sync
     * @member com.rooxteam.statistic
     * @return {Boolean} - is need sync
     */
    utils.isSyncCredential = function (storageKey) {
        var result = false;
        if (com.rooxteam.config.statistic.CREDENTIALS_SYNC_ENABLED &&
            com.rooxteam.config.statistic.CREDENTIALS_SYNC_MAP &&
            typeof com.rooxteam.config.statistic.CREDENTIALS_SYNC_MAP === 'object') {
            for (var cookieKey in com.rooxteam.config.statistic.CREDENTIALS_SYNC_MAP) {
                if (com.rooxteam.config.statistic.CREDENTIALS_SYNC_MAP.hasOwnProperty(cookieKey) &&
                   com.rooxteam.config.statistic.CREDENTIALS_SYNC_MAP[cookieKey] === storageKey) {
                    result = true;
                }
            }
        }
        return result;
    };
    /**
     * Sync credential item. If value is in cookie - override localStorage value
     * If credential is in localStorage - copy it into cookie
     * @param  {String} cookieKey  - cookie key to sync
     * @param  {String} storageKey - localStorage key to sync
     * @return {undefined}
     */
    utils.syncCredentialItem = function (cookieKey, storageKey) {
        var cookieItem, storageItem, logger = window.gadgets ? window.gadgets : utils.getConsole();
        if (docCookies.hasItem(cookieKey)) {
            // cookie has high priority
            cookieItem = docCookies.getItem(cookieKey);
            utils.setStorageItem(storageKey, cookieItem, true);
            // logger.warn('localStorage CREDENTIAL:' + storageKey + ' was overriden by cookie CREDENTIAL:' + cookieKey);
        } else {
            storageItem = utils.getStorageItem(storageKey, true);
            if (storageItem) {
                docCookies.setItem(cookieKey, storageItem, Infinity, '/', com.rooxteam.config.statistic.CREDENTIALS_COOKIE_DOMAIN);
            }
        }
    };

    /**
     * Sync all mapped credentials
     * @param  {Boolean} needSync - does CREDENTIALS_SYNC_ENABLED is true
     * @return {undefined}
     */
    utils.syncCredentials = function (needSync) {
        if (needSync && com.rooxteam.config.statistic.CREDENTIALS_SYNC_MAP && typeof com.rooxteam.config.statistic.CREDENTIALS_SYNC_MAP === 'object') {
            for (var cookieKey in com.rooxteam.config.statistic.CREDENTIALS_SYNC_MAP) {
                if (com.rooxteam.config.statistic.CREDENTIALS_SYNC_MAP.hasOwnProperty(cookieKey)) {
                    utils.syncCredentialItem(cookieKey, com.rooxteam.config.statistic.CREDENTIALS_SYNC_MAP[cookieKey]);
                }
            }
        }
    };
    /**
     * Only for S-WRS - try to retriview widget mid from widgetUrls
     * set up as mid last array key
     * @return {Number} - mid
     */
    utils.getMidFromWidgetUrls = function () {
        var mid = 0;
        if (window.widgetUrls && $.isArray(window.widgetUrls)) {
            $.each(window.widgetUrls, function (key) {
                mid = key;
            });
        }
        return mid;
    };
    /**
     * Return widget time loading
     * @return {Number|String} return time
     */
    utils.getPerformanceLoadTime = function () {
        if (window.performance &&
            window.performance.timing &&
            window.performance.timing.navigationStart &&
            window.performance.timing.loadEventEnd) {
            return window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        } else {
            return 'NA';
        }
    };

    /**
     * Collect performance info if support and return data
     * http://www.w3.org/TR/navigation-timing/
     * @return {Object} - performance info
     */
    utils.getPerformanceData = function () {
        var performanceTiming = {},
            count = 0;
        if (window.performance &&
            window.performance.timing &&
            window.performance.timing.navigationStart) {
            for (var key in window.performance.timing) {
                if (!window.performance.timing.hasOwnProperty(key) || !window.performance.timing[key]) {
                    continue;
                }
                var newKey = key.charAt(0).toUpperCase() + key.replace(/[^A-Z]/g, '');
                count = 0;
                while (performanceTiming.hasOwnProperty(newKey + '' + count)) {count++; }
                performanceTiming[newKey + '' + count] = (window.performance.timing[key] - window.performance.timing.navigationStart);
            }
        }
        return performanceTiming;
    };

})(
    com.rooxteam.docCookies,
    window.jQuery,
    com.rooxteam.sharedcontext,
    (window.gadgets && window.gadgets.config)
);
;

com.rooxteam.config = com.rooxteam.config || {};
com.rooxteam.statistic = com.rooxteam.statistic || {};

//default statistic configuration
com.rooxteam.config.statistic = {
    "ENABLED": true,
    "LIC_ENABLED": false,
    "LIC_SERVER_ADDRESS": 'https://lic.rooxcloud.com/pushreport',
    "LIC_OBFUSCATED_DATA": ["userid", "msisdn", "^pn$", "authentication_token"], //Regexp as string
    "TRANSPORT": "POST",
    "DISABLE_IN_ROAMING": false,
    "SERVER_ADDRESS": '/ny2018/pushreport/',
    "OPERATOR_ID": "RAIF",
    "SERVICE_TYPE_PARAMETER" : 'YA_REPORT_SERVICE',
    "CHECKSUM_PARAMETER" : 'YA_REPORT_CHECKSUM',
    "SENDING_TIME_PARAMETER" : 'YA_REPORT_SENDING_TIME',
    "FILTERING_ERROR_PARAMETER": 'filtering_error',
    "COUNTER_SERVICE_TYPE": 'counter',
    "ACCUMULATE_TIME": 20000,
    'TIMER_UPDATE_INTERVAL': 5000,
    "ACCUMULATE_OPERATION_LIMIT": 1,        //after this accumulate operation limit - try send to server report
    "OVER_ACCUMULATE_OPERATION_LIMIT" : 100,     //max over accumulation limit if can't send report
    "COUNT_OF_IMMEDIATE_SENDING" : 10,
    "MAX_URL_LENGTH" : 2000,
    "TRACEKIT_ENABLED": false,
    "IO_EVENTS_ENABLED": true,
    "VIEW_EVENTS_ENABLED": true,
    "DOM_EVENTS_ENABLED": true,
    "USE_LS_WITH_MUTEX": true,
    "USE_ELECTION": false,
    "WRAP_LINKS": true,
    "IS_SLAVE": false,
    "JQUERY_AJAX_WRAP": true,
    "AJAX_WRAP": false,
    "PERFORMANCE_TIMING_ENABLED":false,
    "EXTERNAL_LINKS_LOG_ENABLED": false,
    "LINKS_LOG_REDIRECT_TIMEOUT": 100,
    "AUTO_GENERATE_UIID": true,
    "AUTO_GENERATE_IID": true,
    "DOM_EVENTS": {
        "click": {
            "verbose": 4,
            "selector": "a, button, .raiff-logo"
        }
    },
    META: {
        "CONTAINER": {
            "LOADED": null
        },
        "WIDGET": {
            "LOADED": null
        }
    },
    "CREDENTIALS_SYNC_ENABLED": true,
    "CREDENTIALS_COOKIE_DOMAIN": "",
    "CREDENTIALS_SYNC_MAP": {
        "roox_uiid": "com.roox.cm.Common.App.Properties.unit.UserInstallationId"
    }
};


(function (gadgets, utils, console) {

    function traverse(o, func) {
        for (var i in o) {
            if (o.hasOwnProperty(i)) {
                if (typeof o[i] == "object") {
                    traverse(o[i], func);
                } else {
                    func.apply(o, [i, o[i]]);
                }
            }
        }
    }

    // workaround for incorrect types
    function convertTypes(obj) {
        traverse(obj, function (key, value) {
            if (/^[\s]*true[\s]*$/i.test(value)) {
                this[key] = true;
            } else if (/^[\s]*false[\s]*$/i.test(value)) {
                this[key] = false;
            } else if (/^[\s]*[\d]+[\s]*$/.test(value)) {
                this[key] = parseInt(value, 10);
            }
        });
        return obj;
    }

    com.rooxteam.statistic.updateConfiguration = function (localConfig, overrideConfig, widgetName, pageName){
    if (widgetName) {
        if(
            typeof overrideConfig.DOM_EVENTS_WIDGETS != "undefined" &&
            typeof overrideConfig.DOM_EVENTS_WIDGETS[widgetName] != "undefined"
        ){
            $.extend(localConfig, overrideConfig, {
                "DOM_EVENTS": overrideConfig.DOM_EVENTS_WIDGETS[widgetName]
            });
        } else {
            $.extend(localConfig, overrideConfig);
        }
    } else if(pageName){
        if(
            typeof overrideConfig.DOM_EVENTS_PAGES != "undefined" &&
            typeof overrideConfig.DOM_EVENTS_PAGES[pageName] != "undefined"
        ){
            $.extend(localConfig, overrideConfig, {
                "DOM_EVENTS": overrideConfig.DOM_EVENTS_PAGES[pageName]
            });
        } else {
            $.extend(localConfig, overrideConfig);
        }
    } else {
        $.extend(localConfig, overrideConfig);
    }
    //Hack to disable stat in CM screenshots
    var dataContext = com.rooxteam.sharedcontext.getDataContext();
    if(dataContext.getDataSet('com.roox.cm.Common.App.Properties.unit.IsScreenshotting') === true) {
        localConfig['ENABLED'] = false;
    }
};

com.rooxteam.statistic.reconfigureElection = function reconfigureElection() {
    try {
        //Use election only with LocalStorageEnabled
        if (!utils.isIE() && com.rooxteam.config.statistic.USE_ELECTION && com.rooxteam.config.statistic.USE_LS_WITH_MUTEX) {
            com.rooxteam.config.statistic.election = new WindowController();

            com.rooxteam.config.statistic.election.masterDidChange = function () {
                if(this.isMaster) {
                    console.info("selected as master");
                    com.rooxteam.config.statistic.IS_SLAVE = false;
                } else {
                    console.info("selected as slave");
                    com.rooxteam.config.statistic.IS_SLAVE = true;
                }
            };
            com.rooxteam.config.statistic.election.masterDidChange();

            //Listen event from SLAVES for fast sending
            com.rooxteam.config.statistic.election.trySendReport = function () {
                com.rooxteam.statistic.client.trySendReport();
            };
        }
    } catch(e){
        console.error("Election error");
        com.rooxteam.config.statistic.IS_SLAVE = false;
    }
}
//Reinit dao and migrate data
com.rooxteam.statistic.reconfigureDao = function reconfigureDao() {

    var config = com.rooxteam.config.statistic;
    if (!config.statisticDao){
        // FIX PD-3248 when config.statisticDao is undefined
        return;
    }
    var old_context = config.statisticDao.getContext();
    var old_stat = config.statisticDao.getStatistic();
    var old_buffer_context = config.statisticBufferDao.getContext();
    var old_buffer_stat = config.statisticBufferDao.getStatistic();

    config.statisticDao = new com.rooxteam.statistic.StatisticDao('statistic', old_context);
    config.statisticBufferDao = new com.rooxteam.statistic.StatisticDao('statisticBuffer', old_buffer_context);

    config.statisticDao.saveUpdateStatistic(old_stat);
    config.statisticBufferDao.saveUpdateStatistic(old_buffer_stat);

};

com.rooxteam.statistic.initConfiguration = function(widgetName, pageName){
    if(pageName && com.rooxteam.config.statistic.ENABLED === true && com.rooxteam.config.statistic.META.CONTAINER.LOADED === null){
        $.ajax({
            url: 'container-ver.json',
            dataType: 'json'
            //,async: false
        }).done(function(data) {
                com.rooxteam.config.statistic.META.CONTAINER.LOADED = true;
                $.extend(com.rooxteam.config.statistic.META.CONTAINER, data);
            }).fail(function() {
                com.rooxteam.config.statistic.META.CONTAINER.LOADED = false;
            })
    }
    //update configuration from gadgets.config
    if (gadgets && gadgets.config) {
        com.rooxteam.config.statistic.ENABLED=false;
        var updateConfiguration = function() {
            com.rooxteam.statistic.updateConfiguration(com.rooxteam.config.statistic, convertTypes(gadgets.config.get('com.rooxteam.statistic')), widgetName, pageName)
            if(com.rooxteam.config.statistic.ENABLED === true){
                console.log("Stats enabled");
            } else {
                console.log("Stats disabled");
            }
            com.rooxteam.statistic.client.initTransport(com.rooxteam.config.statistic.TRANSPORT);
            com.rooxteam.statistic.reconfigureDao();
            com.rooxteam.statistic.reconfigureElection();
        };
        gadgets.config.register('com.rooxteam.statistic', {}, updateConfiguration, updateConfiguration);
        if (gadgets.config.get()) {
            com.rooxteam.statistic.updateConfiguration(com.rooxteam.config.statistic, convertTypes(gadgets.config.get('com.rooxteam.statistic')), widgetName, pageName)
        }
    }
};

// try to sync user credentials
utils.syncCredentials(com.rooxteam.config.statistic.CREDENTIALS_SYNC_ENABLED);

})(window.gadgets, com.rooxteam.statistic.utils, com.rooxteam.statistic.utils.getConsole());
;
/*global com */

com.rooxteam.statistic = com.rooxteam.statistic || {};

(function () {
    'use strict';
    var CURRENT_VERSION = '2.1';
    var VERSION_PARAM   = 'version';
    var STORAGE_ID = 'com.rooxteam.statistic';
    var utils = com.rooxteam.statistic.utils;
    var config = com.rooxteam.config.statistic;


    function StatisticDao(storage_statistic, init_context) {

        //There is no MUTEX for LS in IE
        if (!utils.isIE() && config.USE_LS_WITH_MUTEX) {
            this.storage = com.rooxteam.sharedcontext.getPersistentDataContext();
        } else {
            var localStorageObj = {};
            this.storage = {
                getDataSet: function (key) {
                    return localStorageObj[key] || null;
                },
                putDataSet: function (key, name) {
                    localStorageObj[key] = name;
                }
            };
        }


        this.storageId = STORAGE_ID;

        this.storage_statistic = storage_statistic ? storage_statistic : 'statistic';
        this.storage_statistic_context = this.storage_statistic    + '_context';

        this._init(init_context);
    }

    StatisticDao.prototype = {
        _init: function (init_context) {
            var data = this.storage.getDataSet(this.storageId);
            if (!data) {
                data = {};
                data[VERSION_PARAM] = CURRENT_VERSION;
            } else if (!data[VERSION_PARAM] || (data[VERSION_PARAM] && data[VERSION_PARAM] !== CURRENT_VERSION)) {
                data = {};
                data[VERSION_PARAM] = CURRENT_VERSION;
            }
            if (!data[this.storage_statistic]) {
                data[this.storage_statistic] = [];
            }
            if (!data[this.storage_statistic_context]) {
                data[this.storage_statistic_context] = {};
            }
            this.storage.putDataSet(this.storageId, data);
            if (init_context) {
                this._initContext(init_context);
            }
        },

        saveUpdateStatistic: function (report) {
            this._saveUpdateStorageItem(this.storage_statistic, report);
        },

        getStatistic: function () {
            return this._getStorageItem(this.storage_statistic) || [];
        },

        saveUpdateContextValue: function (key, value) {
            var context = this._getStorageItem(this.storage_statistic_context);
            if (!context) {
                context = {};
            }
            context[key] = value;
            this._saveUpdateStorageItem(this.storage_statistic_context, context);
        },

        getContextValue: function (key) {
            var context = this._getStorageItem(this.storage_statistic_context);
            if (context) {
                return context[key];
            } else {
                return null;
            }
        },

        getContext: function () {
            return this._getStorageItem(this.storage_statistic_context);
        },

        clear: function () {
            var arr = this.getStatistic();
            arr.length = 0;
            this.saveUpdateStatistic(arr);
        },

        _initContext: function (init_context) {
            var context = this._getStorageItem(this.storage_statistic_context);
            if (!context) {
                context = {};
            }
            for (var key in init_context) {
                if (!context[key]) {
                    context[key] = init_context[key];
                }
            }
            this._saveUpdateStorageItem(this.storage_statistic_context, context);
        },

        _saveUpdateStorageItem: function (name, item) {
            var data = this.storage.getDataSet(this.storageId);
            if (data) {
                data[name] = item;
                this.storage.putDataSet(this.storageId, data);
            }
        },

        _getStorageItem: function (name) {
            var data = this.storage.getDataSet(this.storageId);
            if (data) {
                return data[name];
            } else {
                return null;
            }
        }

    };

    com.rooxteam.statistic.StatisticDao = StatisticDao;

})();
;
/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(e,m){var p={},j=p.lib={},l=function(){},f=j.Base={extend:function(a){l.prototype=this;var c=new l;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
n=j.WordArray=f.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=m?c:4*a.length},toString:function(a){return(a||h).stringify(this)},concat:function(a){var c=this.words,q=a.words,d=this.sigBytes;a=a.sigBytes;this.clamp();if(d%4)for(var b=0;b<a;b++)c[d+b>>>2]|=(q[b>>>2]>>>24-8*(b%4)&255)<<24-8*((d+b)%4);else if(65535<q.length)for(b=0;b<a;b+=4)c[d+b>>>2]=q[b>>>2];else c.push.apply(c,q);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
32-8*(c%4);a.length=e.ceil(c/4)},clone:function(){var a=f.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],b=0;b<a;b+=4)c.push(4294967296*e.random()|0);return new n.init(c,a)}}),b=p.enc={},h=b.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var b=[],d=0;d<a;d++){var f=c[d>>>2]>>>24-8*(d%4)&255;b.push((f>>>4).toString(16));b.push((f&15).toString(16))}return b.join("")},parse:function(a){for(var c=a.length,b=[],d=0;d<c;d+=2)b[d>>>3]|=parseInt(a.substr(d,
2),16)<<24-4*(d%8);return new n.init(b,c/2)}},g=b.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var b=[],d=0;d<a;d++)b.push(String.fromCharCode(c[d>>>2]>>>24-8*(d%4)&255));return b.join("")},parse:function(a){for(var c=a.length,b=[],d=0;d<c;d++)b[d>>>2]|=(a.charCodeAt(d)&255)<<24-8*(d%4);return new n.init(b,c)}},r=b.Utf8={stringify:function(a){try{return decodeURIComponent(escape(g.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return g.parse(unescape(encodeURIComponent(a)))}},
k=j.BufferedBlockAlgorithm=f.extend({reset:function(){this._data=new n.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=r.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,b=c.words,d=c.sigBytes,f=this.blockSize,h=d/(4*f),h=a?e.ceil(h):e.max((h|0)-this._minBufferSize,0);a=h*f;d=e.min(4*a,d);if(a){for(var g=0;g<a;g+=f)this._doProcessBlock(b,g);g=b.splice(0,a);c.sigBytes-=d}return new n.init(g,d)},clone:function(){var a=f.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});j.Hasher=k.extend({cfg:f.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){k.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(c,b){return(new a.init(b)).finalize(c)}},_createHmacHelper:function(a){return function(b,f){return(new s.HMAC.init(a,
f)).finalize(b)}}});var s=p.algo={};return p}(Math);
(function(){var e=CryptoJS,m=e.lib,p=m.WordArray,j=m.Hasher,l=[],m=e.algo.SHA1=j.extend({_doReset:function(){this._hash=new p.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(f,n){for(var b=this._hash.words,h=b[0],g=b[1],e=b[2],k=b[3],j=b[4],a=0;80>a;a++){if(16>a)l[a]=f[n+a]|0;else{var c=l[a-3]^l[a-8]^l[a-14]^l[a-16];l[a]=c<<1|c>>>31}c=(h<<5|h>>>27)+j+l[a];c=20>a?c+((g&e|~g&k)+1518500249):40>a?c+((g^e^k)+1859775393):60>a?c+((g&e|g&k|e&k)-1894007588):c+((g^e^
k)-899497514);j=k;k=e;e=g<<30|g>>>2;g=h;h=c}b[0]=b[0]+h|0;b[1]=b[1]+g|0;b[2]=b[2]+e|0;b[3]=b[3]+k|0;b[4]=b[4]+j|0},_doFinalize:function(){var f=this._data,e=f.words,b=8*this._nDataBytes,h=8*f.sigBytes;e[h>>>5]|=128<<24-h%32;e[(h+64>>>9<<4)+14]=Math.floor(b/4294967296);e[(h+64>>>9<<4)+15]=b;f.sigBytes=4*e.length;this._process();return this._hash},clone:function(){var e=j.clone.call(this);e._hash=this._hash.clone();return e}});e.SHA1=j._createHelper(m);e.HmacSHA1=j._createHmacHelper(m)})();
;

com.rooxteam.statistic = com.rooxteam.statistic || {};

(function (CryptoJS, $, utils, console) {
    'use strict';
    // var filters = com.rooxteam.config.statistic.LIC_OBFUSCATED_DATA;

    function shouldBeObfuscated(key) {
        var filters = com.rooxteam.config.statistic.LIC_OBFUSCATED_DATA,
            re = new RegExp(filters.join('|'), 'i');
        return (key.match(re) !== null);
    }

    function obfuscateUrlParams(url) {
        var filters = com.rooxteam.config.statistic.LIC_OBFUSCATED_DATA,
            queryIdx = url.indexOf('?'),
            urlParams = utils.parseUrlParams(url),
            makeRegExp = function () {
                var regExpArr = [];
                for (var i in filters) {
                    if (filters.hasOwnProperty(i)) {
                        regExpArr.push(filters[i]);
                    }
                }
                return new RegExp(regExpArr.join('|'), 'i');
            },
            replaceObfuscatedParam = function (paramStr) {
                var aux = paramStr.split('=');
                if (aux.length !== 2) {
                    return paramStr;
                }
                aux[1] = 'NA';
                return aux.join('=');
            },
            testParam = function (re, param) {
                var name = param.split('=')[0];
                return re.test(name);
            },
            regExpObj = makeRegExp(),
            arrNewUrlParams = [];
        for (var index in urlParams) {
            if (testParam(regExpObj, urlParams[index])) {
                arrNewUrlParams[index] = replaceObfuscatedParam(urlParams[index]);
            } else {
                arrNewUrlParams[index] = urlParams[index];
            }
        }
        return url.substr(0, queryIdx + 1) + arrNewUrlParams.join('&');
    }
    //Polyfill for ie8
    if (!Array.isArray) {
        Array.isArray = function (arg) {
            return Object.prototype.toString.call(arg) === '[object Array]';
        };
    }

    function deepDataFilter(o, level) {
        if (typeof level === 'undefined') {
            level = 0;
        }
        //Prevent stack overflow
        if (level > 1000) {
            return false;
        }
        for (var i in o) {
            if (o.hasOwnProperty(i)) {
                if (Array.isArray(o)) {
                    deepDataFilter(o[i], ++level);
                } else if (o[i] !== null && o[i] !== undefined && typeof o[i] === 'object') {
                    deepDataFilter(o[i], ++level);
                } else if (i === 'url' && typeof o[i] === 'string') {
                    o[i] = obfuscateUrlParams(o[i]);
                } else if (shouldBeObfuscated(i)) {
                    if (typeof o[i] !== 'string' && typeof o[i] !== 'number') {
                        console.log('Attempt to obfuscate non string or number - ' + typeof o[i]);
                    }
                    if (o[i] && o[i].toString && o[i].toString().length) {
                        // encrypt only if dataType has toString method^
                        o[i] = CryptoJS.SHA1(o[i].toString()).toString(CryptoJS.enc.Base64);
                    }
                }
            }
        }
    }

    function deepFilter(content) {
        var data = {
                data: content
            },
            contentObj,
            result;
        try {
            contentObj = JSON.parse(content);
            if (contentObj.data && typeof contentObj.data !== 'object') {
                data.error = 'wrong_structure';
                return data;
            }
        } catch (e) {
            data.error = 'json_parse';
            return data;
        }
        try {
            deepDataFilter(contentObj);
        } catch (e) {
            data.error = 'deep_filter';
            return data;
        }
        try {
            result = JSON.stringify({data: contentObj.data});
        } catch (e) {
            data.error = 'stringify';
            return data;
        }
        return result;
    }
    com.rooxteam.statistic.deepDataFilter = deepDataFilter;
    // make function reference for testing unit
    com.rooxteam.statistic.obfuscateUrlParams = obfuscateUrlParams;
    //todo implement real deep filtering of json
    com.rooxteam.statistic.deepFilter = deepFilter;

})(window.CryptoJS, window.jQuery, com.rooxteam.statistic.utils, com.rooxteam.statistic.utils.getConsole());
;

com.rooxteam.statistic = com.rooxteam.statistic || {};

(function ($) {
    'use strict';
    var config = com.rooxteam.config.statistic;
    var transports;

    function JoinStatisticTransport() {
        transports = arguments;
    }

    JoinStatisticTransport.prototype = {
        /**
         * Set initial report (not obfuscated) to transport
         * @param {String} report report from DAO
         */
        setReport: function (report) {
            $.each(transports, function (indexInArray, transport) {
                transport.setReport(report);
            });
        },

        sendReport: function (content, parameters, successCallback, errorCallback) {
            var promises = [], self = this;
            $.each(transports, function (indexInArray, transport) {
                promises.push(transport.sendReport(content, parameters));
            });
            //call successCallback if any of callbacks success
            return com.rooxteam.deferred.whenSomeArray(promises).then(successCallback, errorCallback);
        },

        validate: function (content, parameters) {
            var isValid = true;
            $.each(transports, function (indexInArray, transport) {
                isValid = isValid && transport.validate(content, parameters);
            });
            return isValid;
        }
    };

    com.rooxteam.statistic.JoinStatisticTransport = JoinStatisticTransport;

})(window.jQuery);;
/*global Image,document */

com.rooxteam.statistic = com.rooxteam.statistic || {};

(function ($, utils) {
    'use strict';
    var config = com.rooxteam.config.statistic;
    var STATISTIC_IMG_ID = 'roox-statistic-img';
    var MAX_URL_LENGTH = config.MAX_URL_LENGTH;

    function GetStatisticTransport(serverAddressKeyOverride, useFiltersOverride) {
        this.serverAddressKey = serverAddressKeyOverride;
        //True for our stat server i.e. rcmlic
        this.useFilters = useFiltersOverride || false;
        // keep reference to com.rooxteam.statistic.client
        this.statistic = null;
        this.params = null;
        this.content = null;
    }

    GetStatisticTransport.prototype = {

        setReport: function (report) {
            var filtered = this.filterReport(report);
            this.content = filtered.content;
            this.params = filtered.parameters;
        },

        getReport: function  () {
            return this.content;
        },

        getParameters: function () {
            return this.params ? this.params : {};
        },

        isRcmLicUrl: function () {
            var url = (config[this.serverAddressKey || 'SERVER_ADDRESS']);
            return url === config.LIC_SERVER_ADDRESS;
        },

        sendReport: function (content, parameters, successCallback, errorCallback) {
            if (this.content === null) {
                this.setReport(content);
            }
            // override parameters by new checksumm
            parameters = $.extend({}, parameters, this.getParameters());
            content = this.getReport();
            return this._createUpdateImage(this._composeUrl(content, parameters), successCallback, errorCallback);
        },
        /**
         * Create alias of method - use in immediatly sending events (logOperationSync)
         */
        sendSyncReport: function () {
            var args = Array.prototype.slice.call(arguments);
            this.sendReport.apply(this, args);
        },

        validate: function (content, parameters) {
            // override parameters by new checksumm
            parameters = $.extend({}, parameters, this.getParameters());
            content = this.getReport();
            var url = this._composeUrl(content, parameters);
            return url.length <= MAX_URL_LENGTH;
        },

        filterReport: function (content) {
            var parameters;
            if (this.useFilters) {
                content = com.rooxteam.statistic.deepFilter(content);
                parameters = {};
                if (typeof content !== 'string' && content && typeof content.data === 'string') {
                    if (content.error) {
                        parameters[config.FILTERING_ERROR_PARAMETER] = content.error;
                    }
                    content = content.data;
                }
                parameters[config.CHECKSUM_PARAMETER] = com.rooxteam.statistic.calculateChecksum(content);
            }
            return {
                content: content,
                parameters: parameters
            };
        },

        _composeUrl: function (content, parameters) {
            var serverAddressKey = this.serverAddressKey || 'SERVER_ADDRESS',
                url = utils.proccessServerAddress(config[serverAddressKey]) + '?content=' + encodeURIComponent(content);

            for (var key in parameters) {
                url += '&' + key + '=' + parameters[key];
            }

            return url;
        },

        _createUpdateImage: function (imgSrc, onLoad, onError) {
            return $.Deferred($.proxy(function (d) {
                var img = document.getElementById(STATISTIC_IMG_ID + '-' + this.serverAddressKey);
                if (!img) {
                    img = new Image(1, 1);
                    img.id = STATISTIC_IMG_ID + '-' + this.serverAddressKey;
                    img.style.position = 'absolute';
                    img.style.left = '-99999px';
                    img.style.top = '-99999px';
                    $('body').append(img);
                }
                img.onload = function () {
                    if (typeof onLoad === 'function') {
                        onLoad();
                    }
                    d.resolveWith(img, ['success']);
                };
                img.onerror = function () {
                    if (typeof onError === 'function') {
                        onError();
                    }
                    d.rejectWith(img, ['error']);
                };
                img.src = imgSrc;
            }, this)).promise();
        }
    };

    com.rooxteam.statistic.GetStatisticTransport = GetStatisticTransport;

})(window.jQuery, com.rooxteam.statistic.utils);
;

com.rooxteam.statistic = com.rooxteam.statistic || {};

(function ($, utils) {
    'use strict';
    var config = com.rooxteam.config.statistic;

    function PostStatisticTransport(serverAddressKeyOverride, useFiltersOverride) {
        this.serverAddressKey = serverAddressKeyOverride;
        this.useFilters = useFiltersOverride || false;
        this.statistic = null;
        this.params = null;
        this.content = null;
    }

    PostStatisticTransport.prototype = {

        setReport: function (report) {
            var filtered = this.filterReport(report);
            this.content = filtered.content;
            this.params = filtered.parameters;
        },

        getReport: function  () {
            return this.content;
        },

        getParameters: function () {
            return this.params ? this.params : {};
        },

        isRcmLicUrl: function () {
            var url = (config[this.serverAddressKey || 'SERVER_ADDRESS']);
            return url === config.LIC_SERVER_ADDRESS;
        },

        filterReport: function (content) {
            var parameters;
            if (this.useFilters) {
                content = com.rooxteam.statistic.deepFilter(content);
                parameters = {};
                if (typeof content !== 'string' && content && typeof content.data === 'string') {
                    if (content.error) {
                        parameters[config.FILTERING_ERROR_PARAMETER] = content.error;
                    }
                    content = content.data;
                }
                parameters[config.CHECKSUM_PARAMETER] = com.rooxteam.statistic.calculateChecksum(content);
            }
            return {
                content: content,
                parameters: parameters
            };
        },

        sendReport: function (content, parameters, successCallback, errorCallback, isAsync, forceContent) {
            var serverAddressKey = this.serverAddressKey || 'SERVER_ADDRESS',
                url = utils.proccessServerAddress(config[serverAddressKey]);
            isAsync = (typeof isAsync === 'undefined' || isAsync) ? true : false;
            // if (this.content === null) {
            //     this.setReport(content);
            // }
            parameters = $.extend({}, parameters, this.getParameters());
            content = forceContent ? content : this.getReport();
            return $.ajax({
                url: url,
                type: 'POST',
                data: content,
                async: isAsync,
                beforeSend: function (xhr) {
                    for (var key in parameters) {
                        xhr.setRequestHeader(key, parameters[key]);
                    }
                },
                success: function () {
                    if (typeof successCallback === 'function') {
                        successCallback();
                    }
                },
                error: function () {
                    if (typeof errorCallback === 'function') {
                        errorCallback();
                    }
                }
            }).then(function () {
                    return 'success';
                }, function () {
                    return 'error';
                });

        },

        sendSyncReport: function () {
            var args = Array.prototype.slice.call(arguments);
            args.length = 4;
            args.push(true); // set async=true
            args.push(true); // set forceContent=true
            return this.sendReport.apply(this, args);
        },

        validate: function (content, parameters) {
            return true;
        }

    };

    com.rooxteam.statistic.PostStatisticTransport = PostStatisticTransport;

})(window.jQuery, com.rooxteam.statistic.utils);
;

com.rooxteam.statistic = com.rooxteam.statistic || {};

(function () {
    'use strict';
    /*
     * @private
     * @member com.rooxteam.statistic.client
     */
    com.rooxteam.statistic.calculateChecksum = function (buffer) {
        var result = 0;
        var i;
        var bytes = [];

        for (i = 0; i < buffer.length; i++) {
            var code = buffer.charCodeAt(i);
            if (code < 128) {
                bytes.push(code);
            }
            else if (code < 2048) {
                bytes.push(192 + (code >> 6));
                bytes.push(128 + (code & 63));
            }
            else if (code < 65536) {
                bytes.push(224 + (code >> 12));
                bytes.push(128 + ((code >> 6) & 63));
                bytes.push(128 + (code & 63));
            }
            else if (code < 2097152) {
                bytes.push(240 + (code >> 18));
                bytes.push(128 + ((code >> 12) & 63));
                bytes.push(128 + ((code >> 6) & 63));
                bytes.push(128 + (code & 63));
            }
        }

        for (i = 0; i < bytes.length; i++) {
            var tmp, to_shift;
            if (i % 3 === 0 || i % 5 === 2) {
                to_shift = bytes[i] > 127 ? 0xffffff00 | bytes[i] : bytes[i];
                result ^= (to_shift << (i % 24));
            }
            else {
                result ^= ((0xff & ~bytes[i]) << (i % 24));
            }
        }
        return result;
    };
})();


/**
 * Provides utilities for gathering, accumulate and sending statistic data.
 * @class com.rooxteam.statistic.client
 * @singleton
 */
com.rooxteam.statistic.client = (function (self, gadgets, console, $, utils) {
    'use strict';

    var config = com.rooxteam.config.statistic;

    config.statisticDao = new com.rooxteam.statistic.StatisticDao('statistic', {'lastSend': (new Date()).getTime()});
    config.statisticBufferDao = new com.rooxteam.statistic.StatisticDao('statisticBuffer', {'lastSend': 0});

    var statisticTransport;

    if (!Date.prototype.toISOString) {
        (function () {
            function pad(number) {
                var r = String(number);
                if (r.length === 1) {
                    r = '0' + r;
                }
                return r;
            }

            Date.prototype.toISOString = function () {
                return this.getUTCFullYear() +
                    '-' + pad(this.getUTCMonth() + 1) +
                    '-' + pad(this.getUTCDate()) +
                    'T' + pad(this.getUTCHours()) +
                    ':' + pad(this.getUTCMinutes()) +
                    ':' + pad(this.getUTCSeconds()) +
                    '.' + String((this.getUTCMilliseconds() / 1000).toFixed(3)).slice(2, 5) +
                    'Z';
            };
        }());
    }

    /*
     * @private
     * @member com.rooxteam.statistic.client
     */
    self.initTransport = function (name) {
        var licStatisticTransport;

        //Prepare main stat transport
        if (name === 'GET') {
            statisticTransport = new com.rooxteam.statistic.GetStatisticTransport('SERVER_ADDRESS');
        } else if (name === 'POST') {
            statisticTransport = new com.rooxteam.statistic.PostStatisticTransport('SERVER_ADDRESS');
        }
        //Prepare lic stat transport
        if (config.LIC_ENABLED === true) {
            if (name === 'GET') {
                licStatisticTransport = new com.rooxteam.statistic.GetStatisticTransport('LIC_SERVER_ADDRESS', true);
            } else if (name === 'POST') {
                licStatisticTransport = new com.rooxteam.statistic.PostStatisticTransport('LIC_SERVER_ADDRESS', true);
            }
            statisticTransport = new com.rooxteam.statistic.JoinStatisticTransport(statisticTransport, licStatisticTransport);
        }
    };

    self.initTransport(config.TRANSPORT);

    /*
     * @private
     * @member com.rooxteam.statistic.client
     */
    self._init = function () {
        if (self.beforeLoadLogData && self.beforeLoadLogData.length) {
            for (var i = 0; i < self.beforeLoadLogData.length; i++) {
                self.logOperation.apply(self, self.beforeLoadLogData[i]);
            }
        }
        setInterval(function () {
            self.trySendReport();
        }, config.TIMER_UPDATE_INTERVAL);
    };

    /*
     * @private
     * @member com.rooxteam.statistic.client
     */
    self.trySendReport = function (stackSize) {
        if (!config.ENABLED) {
            return;
        }
        //Do not send in SLAVE mode
        if (config.IS_SLAVE) {
            return;
        }


        var statisticBuffer = config.statisticBufferDao.getStatistic();
        var bufferLastSend = config.statisticBufferDao.getContextValue('lastSend');

        //Goes here only on second trySendReport call
        if (statisticBuffer && statisticBuffer.length > 0) {
            //Checking is expired
            if (self.isExpired(config.ACCUMULATE_TIME, bufferLastSend)) {

                var remainedBuffer = [];
                var report = self.getCreateReport(statisticBuffer);
                statisticTransport.setReport(report);
                var parameters = self.calculateParams(config.COUNTER_SERVICE_TYPE, report);// some params can be overriden
                var isValid = statisticTransport.validate(report, parameters);
                //Move events from statisticBuffer to remainedBuffer until valid size
                while (!isValid && statisticBuffer.length > 0) {
                    while (!isValid && statisticBuffer.length > 0) {
                        var elem = statisticBuffer.pop();
                        if (statisticBuffer.length > 0) {
                            remainedBuffer.push(elem);
                            report = self.getCreateReport(statisticBuffer);
                            statisticTransport.setReport(report);
                            parameters = self.calculateParams(config.COUNTER_SERVICE_TYPE, report);
                            isValid = statisticTransport.validate(report, parameters);
                        } else {
                            //Last report but too big to send
                            console.log('Remove report operation (too big): ' + JSON.stringify(elem));
                        }
                    }

                    //Fix order after moving
                    remainedBuffer.reverse();

                    //Full reset of buffer without last big report. Exactly deletes last big event.
                    if (!isValid) {
                        statisticBuffer = remainedBuffer;
                        remainedBuffer = [];
                    }
                }

                //If remained events in statisticBuffer are valid then send them
                if (isValid) {
                    statisticTransport.sendReport(report, parameters,
                        function () {
                            //After successful sending save remainedBuffer to statisticBuffer and start sending over
                            config.statisticBufferDao.saveUpdateStatistic(remainedBuffer);

                            //quick fix; smart logic for calculating threshold, timeout before sending of remainedbuffer
                            var toSend = (remainedBuffer.length + config.statisticDao.getStatistic().length),
                                lastSendValue;
                            if (toSend > config.COUNT_OF_IMMEDIATE_SENDING) {

                                var now = (new Date()).getTime();
                                var waitBeforeSend = config.ACCUMULATE_TIME * (toSend / (config.ACCUMULATE_OPERATION_LIMIT + config.OVER_ACCUMULATE_OPERATION_LIMIT));
                                //lastSend should not be in future
                                lastSendValue = Math.min(now - 1, now - config.ACCUMULATE_TIME + waitBeforeSend);
                            } else {
                                lastSendValue = 0;
                            }
                            //end, smart logic


                            config.statisticBufferDao.saveUpdateContextValue('lastSend', lastSendValue);

                            if (remainedBuffer.length > 0) {
                                self.trySendReport();
                            }

                        },
                        function () {
                            console.log('Can\'t send statistic report.');
                        });
                    config.statisticBufferDao.saveUpdateContextValue('lastSend', (new Date()).getTime());
                } else {
                    //If remained events in statisticBuffer aren't valid then start over from remainedBuffer
                    config.statisticBufferDao.saveUpdateStatistic(remainedBuffer);

                    if (remainedBuffer.length > 0) {
                        //Prevents function stack overflow
                        if (typeof stackSize === 'undefined') {
                            stackSize = 0;
                        } else {
                            stackSize++;
                        }
                        if (stackSize < 1000) {
                            self.trySendReport(stackSize);
                        }
                    }
                }

            }
            return;
        }

        var statistic = config.statisticDao.getStatistic();
        var lastSend = config.statisticDao.getContextValue('lastSend');

        //Watch roaming and pause sending.
        var disableInRoaming = false;
        if (config.DISABLE_IN_ROAMING && com && com.rooxteam && com.rooxteam.network) {
            disableInRoaming = com.rooxteam.network.isRoaming();
            if (disableInRoaming) {
                console.log('Can\'t send statistic report in roaming.');
            }
        }

        //On first call move all statistic events to buffer
        if (!disableInRoaming && statistic && statistic.length > 0 && (self.isExpired(config.ACCUMULATE_TIME, lastSend) || statistic.length >= config.ACCUMULATE_OPERATION_LIMIT)) {
            //FIXME investigate errors in multithreaded env.
            config.statisticBufferDao.saveUpdateStatistic(statistic);
            config.statisticDao.saveUpdateStatistic([]);
            config.statisticDao.saveUpdateContextValue('lastSend', (new Date()).getTime());
            self.trySendReport();
        }
    };

    /**
     * Send sync event by POST transport
     * @param  {[type]} statEvents [description]
     * @return {[type]}            [description]
     */
    self.sendSyncReport = function (statEvents) {
        var getTransport = function (addressConfigKey) {
                var transport;
                if (!utils.hasCorsXHR()) {
                    // for IE<10 use GET transport
                    transport = new com.rooxteam.statistic.GetStatisticTransport(addressConfigKey);
                } else {
                    transport = new com.rooxteam.statistic.PostStatisticTransport(addressConfigKey);
                }
                return transport;
            },
            report = self.getCreateReport(statEvents),
            statisticTransport = getTransport('SERVER_ADDRESS'),
            parameters = self.calculateParams(config.COUNTER_SERVICE_TYPE, report),
            statisticLicTransport;
        if (config.LIC_ENABLED) {
            statisticLicTransport = getTransport('LIC_SERVER_ADDRESS');
            return $.when(
                statisticTransport.sendSyncReport(report, parameters),
                statisticLicTransport.sendSyncReport(report, parameters)
            );
        } else {
            return $.when(
                statisticTransport.sendSyncReport(report, parameters)
            );
        }
    };

    /*
     * @private
     * @member com.rooxteam.statistic.client
     */
    self.getCreateReport = function (statistic) {
        var report = {};
        report.data = statistic;
        return JSON.stringify(report) + '\n';
    };

    /*
    * @private
    * @param {Object} additional parameter to mark filtering error
    * @member com.rooxteam.statistic.client
    */
    self.calculateParams = function (type, report) {
        var parameters = {};
        parameters[config.SERVICE_TYPE_PARAMETER] = type;
        parameters[config.CHECKSUM_PARAMETER] = com.rooxteam.statistic.calculateChecksum(report);
        parameters[config.SENDING_TIME_PARAMETER] = new Date().toISOString();
        return parameters;
    };

    /**
     * Save current statisttic data in queue for sending to server.
     * @param {String} name Name of the stat event, for example widget.click..
     * @param {Object} data Additional data, various transport support various max size.
     * @param {Number} quantity Quantity of repetitive events or weight of event
     * @param {Date} timeStart Date and time when event started, defaults to NOW
     * @param {Date} timeEnd Date and time when event ends, defaults to NOW
     * @returns {void}
     */
    self.logOperation = function (name, data, quantity, timeStart, timeEnd) {

        if (!config.ENABLED) {
            return;
        }
        if (name) {
            var operationCount = config.statisticDao.getStatistic().length;
            if (operationCount < config.ACCUMULATE_OPERATION_LIMIT + config.OVER_ACCUMULATE_OPERATION_LIMIT) {
                var operation = {};
                operation.name = name;
                operation.quantity = quantity ? quantity : 1;
                operation.timeStart = timeStart ? timeStart : (new Date()).getTime();
                operation.timeEnd = timeEnd ? timeEnd : operation.timeStart;
                operation.data = data ? data : '';
                var report = config.statisticDao.getStatistic();
                report.push(operation);
                config.statisticDao.saveUpdateStatistic(report);
            }
            if (operationCount >= config.ACCUMULATE_OPERATION_LIMIT) {
                if (com.rooxteam.config.statistic.IS_SLAVE) {
                    //Send message to master
                    com.rooxteam.config.statistic.election.broadcast('trySendReport');
                } else {
                    self.trySendReport();
                }
            }
        }
    };
    /**
     * Log one event sync by POST request - using for outbound links
     * @param  {String} name - string
     * @param  {Object} data - data to log
     */
    self.logOperationSync = function (name, data, quantity, timeStart, timeEnd, callback) {
        if (!config.ENABLED) {
            // force call callback because of program code flow
            setTimeout(function () {
                callback();
            }, 10);
            return;
        }
        var statisticBufferSync = new com.rooxteam.statistic.StatisticDao('statisticSyncStack');
        if (name) {
            var called = false,
                timeout = parseInt(com.rooxteam.config.statistic.LINKS_LOG_REDIRECT_TIMEOUT, 10) || 100,
                operation = {};
            operation.name = name;
            operation.quantity = quantity ? quantity : 1;
            operation.timeStart = timeStart ? timeStart : (new Date()).getTime();
            operation.timeEnd = timeEnd ? timeEnd : operation.timeStart;
            operation.data = data ? data : '';
            var report = statisticBufferSync.getStatistic();
            report.push(operation);
            statisticBufferSync.saveUpdateStatistic(report);
            this.sendSyncReport(statisticBufferSync.getStatistic())
            .done(function () {
                if (!called) {
                    statisticBufferSync.clear(); // clear Buffer when log data
                    callback();
                    called = true;
                }
            })
            .fail(function () {
                if (!called) {
                    callback();
                    called = true;
                }
            });
            window.setTimeout(function () {
                if (!called) {
                    callback();
                    called = true;
                }
            }, timeout);
        }
    };

    /**
     * Save current stisttic data in queue for sending to server. Data.userId will be filled if user is logged in. See {@link com.rooxteam.statistic.client#logOperation}.
     * @param {String} name Name of the stat event, for example widget.click..
     * @param {Object} data Additional data, various transport support various max size. Primitive types disallowed.
     * @param {Number} quantity Quantity of repetitive events or weight of event
     * @param {Date} timeStart Date and time when event started, defaults to NOW
     * @param {Date} timeEnd Date and time when event ends, defaults to NOW
     * @returns {void}
     */
    self.logOperationAuth = function (name, data, quantity, timeStart, timeEnd) {
        if (com.rooxteam.auth) {
            var userId = com.rooxteam.auth.getPrincipal();
            if (userId) {
                if (data) {
                    data.userId = userId;
                } else {
                    data = {};
                    data.userId = userId;
                }
            }
        }
        self.logOperation(name, data, quantity, timeStart, timeEnd);
    };
    /**
     * log io.request event
     * @param  {Object} data - data from xhr context
     * @param  {Object} xobj - native XMLHttpRequest object or Jquery wrapped XHRHttpRequest
     */
    self.logAjaxRequest = function (data, xobj) {
        data = data || {};
        var config = com.rooxteam.config.statistic,
            xobjData = {},
            responseJSONparsed,
            widgetData,
            logData = {};
        if (config.IO_EVENTS_ENABLED) {
            widgetData = com.rooxteam.statistic.getWidgetData();
            if (xobj) {
                xobjData = {
                    'stat': xobj.status,
                    'len': (xobj.response && xobj.response.length) || 0,
                    'cnx': (xobj.getResponseHeader('X-Context-Id') || 'na')
                };
            }
            logData = com.rooxteam.statistic.getContext(xobjData, data, widgetData);
            if (window.JSON && xobj.response && xobj.response.length) {
                try {
                    responseJSONparsed = window.JSON.parse(xobj.response);
                } catch (e) {
                    // do nothing
                }
                if (responseJSONparsed &&
                    responseJSONparsed.error &&
                    responseJSONparsed.error.hasOwnProperty('code')) {
                    if (logData.stat !== responseJSONparsed.error.code) {
                        logData.error_code = responseJSONparsed.error.code;
                    }
                }
            }
            com.rooxteam.statistic.client.logOperationAuth('io.request', logData, 1, null, null);
        }
    };

    /*
     * @private
     * @member com.rooxteam.statistic.client
     */
    self.isExpired = function (interval, time) {
        var now_time = (new Date()).getTime();
        return now_time < time || now_time - time > interval;
    };



    self._init();
    return self;

})(
    com.rooxteam.statistic.client || {},
    window.gadgets,
    com.rooxteam.statistic.utils.getConsole(),
    window.jQuery,
    com.rooxteam.statistic.utils
);

;

com.rooxteam.statistic = com.rooxteam.statistic || {};

/**
 *  Some utilities fof gathering statistic events
 *  @class com.rooxteam.statistic
 */

(function (WinJS, console) {
    'use strict';
    /**
     * Retrieve current page name. Work seemsless in various containers.
     * @param {String} url Url of current page.
     * @returns {String} Current page name
     */
    com.rooxteam.statistic.getPageName = function getPageName(fromUrl) {
        var currentPageName;
        try {
            var currentPageNameWithExt;
            if (typeof fromUrl !== 'undefined') {
                currentPageNameWithExt = fromUrl.split('/').pop();
            } else if (typeof WinJS !== 'undefined' && typeof WinJS.Navigation !== 'undefined' && WinJS.Navigation.location) {
                currentPageNameWithExt = WinJS.Navigation.location.split('/').pop();
            } else {
                currentPageNameWithExt = window.location.href.split('/').pop();
            }

            currentPageName = currentPageNameWithExt.substr(0, currentPageNameWithExt.lastIndexOf('.')) || currentPageNameWithExt;
        } catch (e) {
            console.log('can\'t detect current url');
            currentPageName = 'undetected';
        }
        return currentPageName;
    };

})(window.WinJS, com.rooxteam.statistic.utils.getConsole());

(function (gadgets, $, WinJS, document, TraceKit) {
    'use strict';
    var utils = com.rooxteam.statistic.utils;

    if (TraceKit && TraceKit.report) {
        TraceKit.report.subscribe(function myTraceKitLogger(errorReport) {
            var config = com.rooxteam.config.statistic;
            if (config.TRACEKIT_ENABLED !== true) {
                return false;
            }
            var data = com.rooxteam.statistic.getContext(errorReport);
            try {
                com.rooxteam.statistic.client.logOperationAuth('event.exception', data, 1, null, null);
            } catch (e) {
                //stay silent if couldn't send
            }
        });
    }

    /**
     * Setup click handlers for widget child elements
     */
    com.rooxteam.statistic.registerWidgetsLoadHandlers = function () {
        var config = com.rooxteam.config.statistic,
            mids = utils.getAvailableWidgetsMids();
        var onLoadHandler = function (mid) {
            return function () {
                if (config.WRAP_LINKS) {
                    if (utils.isIE()) {
                        // for IE replace link href when onload
                        $(function () {
                            com.rooxteam.statistic.replaceWidgetLinks(mid, config.WRAP_LINKS_SELECTOR);
                        });
                    } else {
                        // another browsers support replace href on a fly
                        $(function () {
                            com.rooxteam.statistic.catchWidgetLinksClicks(mid, config.WRAP_LINKS_SELECTOR);
                        });
                    }
                }
            };
        };
        //Run first handler explicitly
        onLoadHandler(0);
        $.each(mids, function (i, mid) {
            gadgets.util.registerOnLoadHandler(onLoadHandler(mid), mid);
        });
    };
    /**
     * in IE browser replace all links to links throw redirector
     * Some dynamic HTML link can be missing
     * @param  {Number} mid - widget module id
     * @param  {String} linkSelector - selector
     */
    com.rooxteam.statistic.replaceWidgetLinks = function (mid, linkSelector) {
        var $widgetRoot = utils.findWidgetRoot(mid);
        linkSelector = linkSelector || 'a';
        $widgetRoot.find(linkSelector).each(function () {
            utils.makeRedirectedLink(this);
        });
    };
    /**
     * In normal browser can change link href to redirector when user clicked
     * To catch middle and right click use mouseup event
     * Right click detect directly on element
     * @param  {[type]} mid          [description]
     * @param  {[type]} linkSelector [description]
     * @return {[type]}              [description]
     */
    com.rooxteam.statistic.catchWidgetLinksClicks = function (mid, linkSelector) {
        var $widgetRoot = utils.findWidgetRoot(mid);
        linkSelector = linkSelector || 'a';
        $widgetRoot.find(linkSelector).on('mouseup', function (e) {
            if (e.which === 3) { // only right click
                utils.makeRedirectedLink(e.currentTarget);
            }
            return true;
        });
        $widgetRoot.on('mouseup', linkSelector, function (e) {
            utils.makeRedirectedLink(e.currentTarget);
            return true;
        });
    };
    /**
     * @private
     */
    com.rooxteam.statistic.setupCapturingEvent = function setupCapturingEvent(data) {
        var config = com.rooxteam.config.statistic;
        if (!config.DOM_EVENTS_ENABLED || !config.DOM_EVENTS) {
            return true;
        }
        var configData = data;

        //Change current page in winapp
        if (typeof WinJS !== 'undefined' && typeof WinJS.Navigation !== 'undefined') {
            WinJS.Navigation.addEventListener('navigated', function (event) {
                configData['p'] = com.rooxteam.statistic.getPageName(event.detail.location);
            });
        }

        if (document.addEventListener) {
            $.each(config.DOM_EVENTS, function (eventName, eventSettings) {
                if (eventName === 'mouseleave' || eventName === 'mouseenter') {
                    $(document).on(eventName, eventSettings.selector, configData, function (event) {
                        if (!config.DOM_EVENTS_ENABLED) {
                            return true;
                        }
                        event.data = $.extend(event.data, configData);
                        com.rooxteam.statistic.processEvent(event);
                        return true;
                    });
                } else {
                    document.addEventListener(eventName, function (event) {
                        if (!config.DOM_EVENTS_ENABLED) {
                            return true;
                        }
                        if (eventSettings.selector && !$(event.target).is(eventSettings.selector)) {
                            return true;
                        }
                        var jevent = $.event.fix(event);
                        jevent.data = configData;
                        com.rooxteam.statistic.processEvent(jevent);
                    }, true);
                }
            });
        } else {
            //Fallback to jquery event if ie<9
            $.each(config.DOM_EVENTS, function (eventName, eventSettings) {
                $(document).on(eventName, eventSettings.selector, configData, function (event) {
                    if (!config.DOM_EVENTS_ENABLED) {
                        return false;
                    }
                    event.data = $.extend(event.data, configData);
                    com.rooxteam.statistic.processEvent(event);
                    var onclickAttr = $(event.currentTarget).attr('onclick') || $(event.target).attr('onclick');

                    //Return false to prevent additional native event with onclick
                    return (typeof onclickAttr === 'undefined' || onclickAttr === null);
                });
            });
        }
    };

    /**
     * Calculate full dom path for the DOM element.
     * @param {HTMLElement} el Dom element.
     * @returns {String} Current dom path
     * @member com.rooxteam.statistic
     */
    com.rooxteam.statistic.getDomPath = function getDomPath(el) {
        var stack = [];
        while (el.parentNode !== null) {
            var sibCount = 0;
            var sibIndex = 0;
            for (var i = 0; i < el.parentNode.childNodes.length; i++) {
                var sib = el.parentNode.childNodes[i];
                if (sib.nodeName === el.nodeName) {
                    if (sib === el) {
                        sibIndex = sibCount;
                    }
                    sibCount++;
                }
            }
            if (el.hasAttribute('id') && el.id !== '') {
                stack.unshift(el.nodeName.toLowerCase() + '#' + el.id);
            } else if (sibCount > 1) {
                stack.unshift(el.nodeName.toLowerCase() + ':eq(' + sibIndex + ')');
            } else {
                stack.unshift(el.nodeName.toLowerCase());
            }
            el = el.parentNode;
        }

        return stack.slice(1).join(' ');
    };

    /**
     * Calculate moduleId for the element.
     * @private
     */
    com.rooxteam.statistic.getModuleId = function getModuleId(el) {
        if (typeof el === 'undefined') {
            return NaN;
        }
        var widgetRoot = $(el).parents('[id^="widget_wrapper_"]');
        if (widgetRoot.length > 0) {
            var matcher = /^widget_wrapper_(.+)$/.exec(widgetRoot[0].id);
            if (matcher && matcher[1] !== 'undefined') {
                return +matcher[1];
            }
        } else {
            //Support renderType iframe
            var widgetRootIfr = $(el).parents('[id^="widget"]');
            if (widgetRootIfr.length > 0) {
                var matcherIfr = /^widget(.+)$/.exec(widgetRootIfr[0].id);
                if (matcherIfr && matcherIfr[1] !== 'undefined') {
                    return +matcherIfr[1];
                }
            } else {
                //try to fallback, for example for POST widgets
                return utils.getMidFromWidgetUrls();
            }
        }
        return NaN;
    };

    /**
     * Extend Object with some usefull data (phone, uiid, iid,...). Merge with provided arguments.
     * @param {...Object} var_args Any number of additional data to merge
     * @returns {Object} Single object with merged arguments and additional data
     * @member com.rooxteam.statistic
     */
    com.rooxteam.statistic.getContext =  function getContext(additional) {
        var dataContext = com.rooxteam.sharedcontext.getDataContext();
        var persistentDataContext = com.rooxteam.sharedcontext.getPersistentDataContext();
        var args = Array.prototype.slice.call(arguments);

        function getProperty(propertyName, autogenerate) {
            propertyName = 'com.roox.cm.Common.App.Properties.unit.' + propertyName;
            if (autogenerate) {
                var propertyValue = persistentDataContext.getDataSet(propertyName);
                if (!propertyValue) {
                    propertyValue = utils.guid();
                    //Fail silently if it is not possible to save iid/uiid
                    try {
                        persistentDataContext.putDataSet(propertyName, propertyValue);
                    } catch (ex) {
                        if (gadgets && gadgets.log) {
                            gadgets.log('It is not possible to save iid/uiid in LocalStorage');
                            gadgets.log(ex.message);
                        }
                    }

                }

                try {
                    dataContext.putDataSet(propertyName, propertyValue);
                } catch (ex) {
                    if (gadgets && gadgets.log) {
                        gadgets.log('It is not possible to save iid/uiid in session Storage');
                        gadgets.log(ex.message);
                    }
                }

                if (utils.isSyncCredential(propertyName)) {
                    // try to sync user credentials
                    utils.syncCredentials(com.rooxteam.config.statistic.CREDENTIALS_SYNC_ENABLED);
                }
                return propertyValue;
            }
            return dataContext.getDataSet(propertyName);
        }

        if (dataContext) {
            args.unshift({
                'cmver': dataContext.getDataSet('com.roox.cm.Common.App.Properties.unit.AppArtifact') || '',
                'oid': dataContext.getDataSet('com.roox.cm.Common.App.Properties.unit.AppCode') || com.rooxteam.config.statistic.OPERATOR_ID || '',
                'uiid':  getProperty('UserInstallationId', com.rooxteam.config.statistic.AUTO_GENERATE_UIID) || '',
                'iid': getProperty('InstallationId', com.rooxteam.config.statistic.AUTO_GENERATE_IID) || ''
            });
        }
        if (com.rooxteam.config.statistic.META.CONTAINER.LOADED) {
            args.unshift({
                'cwrsver': com.rooxteam.config.statistic.META.CONTAINER.jobName + '-' + com.rooxteam.config.statistic.META.CONTAINER.buildNumber
            });
        }

        if (gadgets && gadgets.config) {
            var containerConfig = gadgets.config.get('com.rooxteam.container');
            if (containerConfig) {
                var componentId = containerConfig['com.rooxteam.env.wrs.componentId'],
                    componentVersion = containerConfig['com.rooxteam.env.wrs.componentVersion'],
                    envKey = containerConfig['com.rooxteam.env.name'];

                if (componentId && componentVersion) {
                    args.unshift({
                        'swrsver': componentId + '-' + componentVersion
                    });
                }

                if (envKey) {
                    args.unshift({
                        'env_key': envKey
                    });
                }

            }

            var regionalCodeAttrName = com.rooxteam.config.statistic.REGIONAL_CODE_ATTRIBUTE_NAME || null;
            if (regionalCodeAttrName) {
                var authConfig = gadgets.config.get('shindig.auth');
                if (authConfig && authConfig['trustedJson']) {
                    var trustedJson = null;
                    try {
                        trustedJson = JSON.parse(authConfig['trustedJson']);
                    } catch (ignored) {}

                    if (trustedJson) {
                        var rc = trustedJson['attributes'] && trustedJson['attributes'][regionalCodeAttrName] || null;
                        if (rc !== null) {
                            args.unshift({
                                'reg_code': rc
                            });
                        }
                    }
                }
            }

        }

        if (gadgets && gadgets.util && gadgets.util.hasFeature('com.rooxteam.network')) {
            var cachedMsisdn = persistentDataContext.getDataSet('com.rooxteam.cached_msisdn') || '';
            var currentMsisdn = (com.rooxteam.network.getMobileDevice() && com.rooxteam.network.getMobileDevice().getDeviceInfo().getPhoneNumber()) || '';
            currentMsisdn = currentMsisdn.replace('+', '');

            args.unshift({
                'mst': com.rooxteam.network.getMobileState(),
                'wst': com.rooxteam.network.getWifiState(),
                'fst': com.rooxteam.network.getFixedState(),
                'pn': currentMsisdn || cachedMsisdn
            });
        }

        if (utils.getRenderTypeFromContainer() === 'INLINE') {
            args.unshift({
                'p': com.rooxteam.statistic.getPageName()
            });
        }

        args.unshift({
            'tz': (new Date()).getTimezoneOffset()
        });

        args.unshift({});
        return $.extend.apply(null, args);
    };
    /**
     * Search additional element data
     * @param  {Object} el DOM element
     * @return {Object} DOM element data
     */
    com.rooxteam.statistic.getDOMElementData = function (el) {
        var elData = $(el).data(),
            domDataAttrs = {},
            hasItems = false;
        $.each(elData, function (k, v) {
            var key = k.substr(4, k.length);
            key = key.charAt(0).toLowerCase() + key.slice(1);
            domDataAttrs[key] = v;
            hasItems = true;
        });
        if (hasItems) {
            return {
                dattrs: domDataAttrs
            };
        } else {
            return {};
        }
    };

    /**
    * Dump all DOM element attributes need for it identification
    * @param  {Object} el DOM element
    * @return {Object} DOM attributes data
    */
    com.rooxteam.statistic.getElementAttributes = function getElementAttributes(target, verbose_input) {
        var config = com.rooxteam.config.statistic;
        var elementProperties = {};
        var verbose = verbose_input || 4;
        if (typeof target !== 'undefined') {
            if (target.id) {
                elementProperties['id'] = target.id;
            } else {
                var path = com.rooxteam.statistic.getDomPath(target);
                if (path) {
                    elementProperties['path'] = path;
                }
            }

            if (target.className && verbose >= 1) {
                elementProperties['cls'] = target.className;
            }

            if (target.getAttribute('href') && verbose >= 4) {
                elementProperties['href'] = target.getAttribute('href');
            }

            if (target.getAttribute('onclick') && verbose >= 4) {
                elementProperties['clk'] = target.getAttribute('onclick');
            }


            if (target.getAttribute('alt') && verbose >= 7) {
                elementProperties['alt'] = target.getAttribute('alt');
            }

            if (target.getAttribute('title') && verbose >= 7) {
                elementProperties['title'] = target.getAttribute('title');
            }

            if ((!target.children || target.children.length === 0) && target.textContent && verbose === 9) {
                elementProperties['txt'] = target.textContent;
            }

            var mid = com.rooxteam.statistic.getModuleId(target);
            if (!isNaN(mid)) {
                elementProperties['mid'] = mid;
                var widgetName = utils.getWidgetNameByModuleId(mid);
                if (widgetName) {
                    elementProperties['w'] = widgetName;
                }
            }
        }
        return elementProperties;
    };

    com.rooxteam.statistic.processEvent =  function precessEvent(event) {
        var getParentOrThis = function (el, sel) {
            var $el = $(el);
            if (!$el.is(sel)) {
                var $parent = $el.parent(sel);
                if ($parent.is(sel) && $parent.children().length === 1) {
                    return $parent[0];
                }
            }
            return el;
        };

        var config = com.rooxteam.config.statistic,
            utils = com.rooxteam.statistic.utils;

        var ev = event.originalEvent ? event.originalEvent : event;
        // process group <a><child></a> as simple <a></a> to collect attributes from <a> element instead of <child>
        var target = getParentOrThis(ev.target, 'a');

        var verbose = (config.DOM_EVENTS[event.type] && config.DOM_EVENTS[event.type]['verbose']) || 4;
        var domAttrs =  com.rooxteam.statistic.getElementAttributes(target, verbose);
        var domData = com.rooxteam.statistic.getDOMElementData(target);
        var clkFuncsData = (ev.type === 'click'  && target) ? com.rooxteam.statistic.utils.getOnClickFunctionsNames(target.onclick) : {};
        var data = com.rooxteam.statistic.getContext(event.data, domAttrs, domData, clkFuncsData, utils.getUserPrefs(domAttrs['mid']));


        if (config.EXTERNAL_LINKS_LOG_ENABLED &&
            ev.type === 'click' &&
            com.rooxteam.statistic.utils.isExternalClick(target, ev)) {
            ev.preventDefault();
            com.rooxteam.statistic.client.logOperationSync('event.' + event.type, data, 1, null, null, function () {
                com.rooxteam.statistic.utils.redirectMainWindow(target.href, target.target);
            });
            return;
        }
        if (verbose >= 2) {
            com.rooxteam.statistic.client.logOperationAuth('event.' + event.type, data, 1, null, null);
        } else {
            com.rooxteam.statistic.client.logOperation('event.' + event.type, data, 1, null, null);
        }
    };

    // setup io request logging
    if ($ && $.ajax && $.fn.ajaxComplete) {
        $(document).ajaxComplete(function (ev, jqxhr, options) {
            if (com.rooxteam.config.statistic.JQUERY_AJAX_WRAP && !/pushreport(\/)?$/.test(options.url)) {
                try {
                    com.rooxteam.statistic.client.logAjaxRequest({
                        'url': options.url,
                        'mthd': options.type,
                        'et': 'na'
                    }, jqxhr);
                } catch (ex) {
                    if (gadgets && gadgets.log) {
                        gadgets.log('An error during logAjaxRequestwas occured');
                        gadgets.log(ex.message);
                    }
                }
            }
        });
    }

})(window.gadgets, window.jQuery, window.WinJS, window.document, window.TraceKit);
;

com.rooxteam.statistic = com.rooxteam.statistic || {};

(function (gadgets, $, document) {
    'use strict';

    var utils = com.rooxteam.statistic.utils,
        performanceTimingLogged = false;

    function notifyVisibilityChanged(renderType) {
        if (document.hidden === true) {
            return;
        }

        if (renderType === 'INLINE') {
            $(document).find('[id^="widget_wrapper_"]').each(function () {
                var this$ = $(this),
                    mid = NaN;
                if (this$.find(':visible').length > 0) {
                    // has visible elements
                    var matcher = /^widget_wrapper_([\d]+)$/.exec(this.id);
                    if (matcher && matcher[1] !== 'undefined') {
                        mid = +matcher[1];
                    }
                    window.postMessage(JSON.stringify({id: 'widget.display', data: {mid: mid}}), '*');
                }
            });
        } else if (renderType === 'IFRAME') {
            window.postMessage(JSON.stringify({id: 'widget.display'}), '*');
        }
    }

    com.rooxteam.statistic.getWidgetData = function getWidgetData() {
        var urlParams = utils.getUrlParameters(),
            widgetNameWithExt =  urlParams['widgetDescriptor'] || urlParams['url'] || '',
            mid = urlParams['mid'] || 0;
        //widgetsUrls is empty yet
        var widgetName = utils.getWidgetNameByUrl(widgetNameWithExt) || widgetNameWithExt;
        return {'w': widgetName, 'mid': mid};
    };

    var widgetData = com.rooxteam.statistic.getWidgetData();
    com.rooxteam.statistic.initConfiguration(widgetData.w, null);
    if (document.readyState && document.readyState === 'complete') {
        com.rooxteam.statistic.setupCapturingEvent(widgetData);
    } else {
        $(window).on('load', function () {
            com.rooxteam.statistic.setupCapturingEvent(widgetData);
        });
    }
    // setup onLoadHandlers for all widgets
    //TODO implement other async loading check
    if (gadgets && gadgets.util) {
        gadgets.util.registerOnLoadHandler(function () {
            com.rooxteam.statistic.registerWidgetsLoadHandlers();
        });
    }

    (function () {
        var renderType = utils.getRenderTypeFromContainer(),
            setupVisibilityChangeListner = function () {
                $(document).on('visibilitychange', function () {
                    notifyVisibilityChanged(renderType);
                });
            },
            widgetReadyNotifyDisplay = function (callback) {
                if (renderType === 'INLINE') {
                    $(document).ready(function () {
                        notifyVisibilityChanged(renderType);
                        if (callback) {
                            callback();
                        }
                    });
                } else {
                    // renderType - IFRAME
                    if (gadgets && gadgets.util) {
                        gadgets.util.registerOnLoadHandler(function () {
                            notifyVisibilityChanged(renderType);
                            if (callback) {
                                callback();
                            }
                        }, utils.getMidFromWidgetUrls());
                    }
                }
            };
        if (typeof document.hidden !== 'undefined' && document.hidden) {
            // only for widgets under S-WRS
            // has visibilityApi and hidden widget
            setupVisibilityChangeListner();
        } else if (typeof document.hidden !== 'undefined' && !document.hidden) {
            // has visibility - but widget visible
            widgetReadyNotifyDisplay(setupVisibilityChangeListner);
        } else {
            // visibilityApi not supported
            widgetReadyNotifyDisplay();
        }
    })();

    var eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent',
        messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';

    window[eventMethod](messageEvent, function (e) {
        var message, mid;
        try {
            message = JSON.parse(e.data);
        } catch (e) {
            return;
        }

        if (message && message.id === 'widget.display') {

            var config = com.rooxteam.config.statistic;
            if (config.VIEW_EVENTS_ENABLED === true) {
                //Empty for widget in IFRAME mode
                if (message.data && !isNaN(message.data.mid)) {
                    widgetData['mid'] = message.data.mid;
                } else {
                    //try to fallback for POST widgets
                    if (!widgetData['mid']) {
                        widgetData['mid'] = utils.getMidFromWidgetUrls();
                    }
                }

                var widgetName = utils.getWidgetNameByModuleId(widgetData['mid']);
                if (widgetName) {
                    widgetData['w'] = widgetName;
                }

                var dataLog = com.rooxteam.statistic.getContext(
                    widgetData,
                    utils.getUserPrefs(widgetData['mid']),
                    utils.compact({
                        puri: utils.getParentUrl(),
                        plt: utils.getPerformanceLoadTime(),
                        cnx: utils.getContextId()
                    })
                );
                com.rooxteam.statistic.client.logOperationAuth('widget.display', dataLog, 1, null, null);
            }
            if (config.PERFORMANCE_TIMING_ENABLED === true && !performanceTimingLogged) {
                // send performance data
                com.rooxteam.statistic.client.logOperation('widget.timing', com.rooxteam.statistic.getContext(utils.getPerformanceData()));
                performanceTimingLogged = true;
            }
        }
    });
})(window.gadgets, window.jQuery, window.document);
;
(function (stat) {
    stat.BUILD = "${env.BUILD_NUMBER}";
})(com.rooxteam.statistic);

window.com = com;