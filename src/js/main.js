'use strict';

/*! https://mths.be/startswith v0.2.0 by @mathias */
if (!String.prototype.startsWith) {
    (function () {
        'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
        var defineProperty = (function () {
            // IE 8 only supports `Object.defineProperty` on DOM elements
            try {
                var object = {};
                var $defineProperty = Object.defineProperty;
                var result = $defineProperty(object, object, object) && $defineProperty;
            } catch (error) {
            }
            return result;
        }());
        var toString = {}.toString;
        var startsWith = function (search) {
            if (this === null) {
                throw TypeError();
            }
            var string = String(this);
            if (search && toString.call(search) === '[object RegExp]') {
                throw TypeError();
            }
            var stringLength = string.length;
            var searchString = String(search);
            var searchLength = searchString.length;
            var position = arguments.length > 1 ? arguments[1] : undefined;
            // `ToInteger`
            var pos = position ? Number(position) : 0;
            if (pos != pos) { // better `isNaN`
                pos = 0;
            }
            var start = Math.min(Math.max(pos, 0), stringLength);
            // Avoid the `indexOf` call if no match is possible
            if (searchLength + start > stringLength) {
                return false;
            }
            var index = -1;
            while (++index < searchLength) {
                if (string.charCodeAt(start + index) !== searchString.charCodeAt(index)) {
                    return false;
                }
            }
            return true;
        };
        if (defineProperty) {
            defineProperty(String.prototype, 'startsWith', {
                'value': startsWith,
                'configurable': true,
                'writable': true
            });
        } else {
            String.prototype.startsWith = startsWith;
        }
    }());
}

requirejs.config(
        {
            baseUrl: 'js',

            // Path mappings for the logical module names
            paths:
                    //injector:mainReleasePaths
                            {
                                'knockout': 'libs/knockout/knockout-3.4.0.debug',
                                'jquery': 'libs/jquery/jquery-3.1.0',
                                'jqueryui-amd': 'libs/jquery/jqueryui-amd-1.12.0',
                                'promise': 'libs/es6-promise/es6-promise',
                                'hammerjs': 'libs/hammer/hammer-2.0.8',
                                'moment': 'libs/moment/moment-with-locales',
                                'ojdnd': 'libs/dnd-polyfill/dnd-polyfill-1.0.0',
                                'ojs': 'libs/oj/v2.1.0/debug',
                                'ojL10n': 'libs/oj/v2.1.0/ojL10n',
                                'ojtranslations': 'libs/oj/v2.1.0/resources',
                                'text': 'libs/require/text',
                                'signals': 'libs/js-signals/signals'
                            }
                    //endinjector
                    ,
                    // Shim configurations for modules that do not expose AMD
                    shim:
                            {
                                'jquery':
                                        {
                                            exports: ['jQuery', '$']
                                        }
                            },

                    config: {
                        ojL10n: {
                            merge: {
                                'ojtranslations/nls/ojtranslations': 'resources/nls/euregjug'
                            }
                        }
                    }
                }
        );

        /**
         * A top-level require call executed by the Application.
         * Although 'ojcore' and 'knockout' would be loaded in any case (they are specified as dependencies
         * by the modules themselves), we are listing them explicitly to get the references to the 'oj' and 'ko'
         * objects in the callback
         */
        require(['ojs/ojcore', 'knockout', 'appController', 'ojs/ojknockout',
            'ojs/ojmodule', 'ojs/ojrouter', 'ojs/ojnavigationlist', 'ojs/ojbutton', 'ojs/ojtoolbar'],
                function (oj, ko, app) { // this callback gets executed when all required modules are loaded

                    $(function () {

                        function init() {
                            oj.Router.sync().then(
                                    function () {
                                        // Bind your ViewModel for the content of the whole page body.
                                        ko.applyBindings(app, document.getElementById('globalBody'));
                                    },
                                    function (error) {
                                        oj.Logger.error('Error in root start: ' + error.message);
                                    }
                            );
                        }

                        // If running in a hybrid (e.g. Cordova) environment, we need to wait for the deviceready 
                        // event before executing any code that might interact with Cordova APIs or plugins.
                        if ($(document.body).hasClass('oj-hybrid')) {
                            document.addEventListener("deviceready", init);
                        } else {
                            init();
                        }

                    });

                }
        );
