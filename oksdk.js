(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
            (factory((global.OKSDK = {})));
}(this, function (exports) {
    'use strict';

    var OK_CONNECT_URL = 'https://connect.ok.ru/';
    var OK_MOB_URL = 'https://m.ok.ru/';
    var OK_API_SERVER = 'https://api.ok.ru/';

    var OK_ANDROID_APP_UA = 'OkApp';

	var MOBILE = 'mobile';
	var WEB = 'web';
	var NATIVE_APP = 'application';
	var EXTERNAL = 'external';

	var PLATFORM_REGISTER = {
		'w': WEB,
		'm': MOBILE,
		'n': NATIVE_APP,
		'e': EXTERNAL
	};

	var APP_EXTLINK_REGEXP = /\bjs-sdk-extlink\b/;

    var state = {
        app_id: 0, app_key: '',
        sessionKey: '', accessToken: '', sessionSecretKey: '', apiServer: '', widgetServer: '', mobServer: '',
        baseUrl: '',
        container: false, header_widget: ''
    };
    var ads_state = {
        init: false,
        ready: false
    };

    var ads_widget_style = {
        border: 0,
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1000,
        display: "none"
    };

    var sdk_success = nop;
    var sdk_failure = nop;
    var eventCallback = nop;
    var extLinkListenerOn = false;
    var externalLinkHandler = nop;

    // ---------------------------------------------------------------------------------------------------
    // General
    // ---------------------------------------------------------------------------------------------------

    /**
     * initializes the SDK<br/>
     * If launch parameters are not detected, switches to OAUTH (via redirect)
     *
     * @param args
     * @param {Number} args.app_id application id
     * @param {String} args.app_key application key
     * @param [args.oauth] - OAUTH configuration
     * @param {String} [args.oauth.scope='VALUABLE_ACCESS'] scope
     * @param {String} [args.oauth.url=location.href] return url
     * @param {String} [args.oauth.state=''] state for security checking
     * @param {String} [args.oauth.layout='a'] authorization layout (w - web, m - mobile)
     * @param {Function} success success callback
     * @param {Function} failure failure callback
     */
    function init(args, success, failure) {
        args.oauth = args.oauth || {};
        sdk_success = isFunc(success) ? success : nop;
        sdk_failure = isFunc(failure) ? failure : nop;

        if (args.use_extlinks) {
            OKSDK.Util.addExternalLinksListener(args.use_extlinks.customClass, args.use_extlinks.decorator);
        } else if (extLinkListenerOn) {
            OKSDK.Util.removeExternalLinksListener();
        }

        var params = getRequestParameters(args['location_search'] || window.location.search);
        var hParams = getRequestParameters(args['location_hash'] || window.location.hash);

        state.app_id = args.app_id;
        state.app_key = params["application_key"] || args.app_key;

        if (!state.app_id || !state.app_key) {
            sdk_failure('Required arguments app_id/app_key not passed');
            return;
        }

        state.sessionKey = params["session_key"];
        state.accessToken = hParams['access_token'];
        state.groupId = params['group_id'] || hParams['group_id'] || args['group_id'];
        state.sessionSecretKey = params["session_secret_key"] || hParams['session_secret_key'];
        state.apiServer = args["api_server"] || params["api_server"] || OK_API_SERVER;
        state.widgetServer = encodeURI(getRemoteUrl([args["widget_server"], params['widget_server']], OK_CONNECT_URL));
        state.mobServer = encodeURI(getRemoteUrl([args["mob_server"], params["mob_server"]], OK_MOB_URL));
        state.baseUrl = state.apiServer + "fb.do";
        state.header_widget = params['header_widget'];
        state.container = params['container'];
        state.layout = (params['layout'] || hParams['layout'] || args.layout)
            || params['api_server']
                ? params['mob'] && params['mob'] === 'true'
                    ? 'm'
                    : 'w'
                : 'w';

        if (!params['api_server']) {
            if ((hParams['access_token'] == null) && (hParams['error'] == null)) {
                window.location = state.widgetServer + 'oauth/authorize' +
                    '?client_id=' + args.app_id +
                    '&scope=' + (args.oauth.scope || 'VALUABLE_ACCESS') +
                    '&response_type=' + 'token' +
                    '&redirect_uri=' + (args.oauth.url || window.location.href) +
                    '&layout=' + (args.oauth.layout || 'a') +
                    '&state=' + (args.oauth.state || '');
                return;
            }
            if (hParams['error'] != null) {
                sdk_failure('Error with OAUTH authorization: ' + hParams['error']);
                return;
            }
        }
        window.addEventListener("message", onWindowMessage);
        sdk_success();
    }

    /**
     * @param {Array} sources
     * @param {String} fallback
     */
    function getRemoteUrl(sources, fallback) {
        for (var i = 0; i < sources.length; i++) {
            var source = sources[i];
            if (source && (source.startsWith("http://") || source.startsWith("https://"))) return getBaseUrl(source);
        }
        return fallback;
    }

    function getBaseUrl(stringUrl) {
        // URL() not supported for Android < 4.4
        var url = document.createElement('a');
        url.setAttribute('href', stringUrl);
        return url.protocol + "//" + url.hostname + "/"
    }

    function invokeUIMethod() {
        var argStr = "";
        for (var i = 0; i < arguments.length; i++) {
            var arg = arguments[i];
            if (i > 0) argStr += '$';
            if (arg != null) argStr += encodeURIComponent(String(arg));
        }
        parent.postMessage("__FAPI__" + argStr, state.mobServer);
    }

    // ---------------------------------------------------------------------------------------------------
    // REST
    // ---------------------------------------------------------------------------------------------------

    var REST_NO_SIGN_ARGS = ["sig", "access_token"];

    function executeRemoteRequest(query, usePost, callback) {
        var xhr = new XMLHttpRequest();
        if (usePost) {
            xhr.open("POST", state.baseUrl, true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        } else {
            xhr.open("GET", state.baseUrl + "?" + query, true);
            xhr.setRequestHeader("Content-type", "application/json");
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (!isFunc(callback)) return;
                var responseJson;
                try {
                    responseJson = JSON.parse(xhr.responseText)
                } catch (e) {
                    responseJson = {"result": xhr.responseText}
                }

                if (xhr.status != 200 || responseJson.hasOwnProperty("error_msg")) {
                    callback("error", null, responseJson)
                } else {
                    callback("ok", responseJson, null)
                }
            }
        };
        xhr.send(usePost ? query : null);
    }

    /**
     * Calls a REST request
     *
     * @param {String} method
     * @param {Object} [params]
     * @param {restCallback} [callback]
     * @param {Object} [callOpts]
     * @param {boolean} [callOpts.no_session] true if REST method prohibits session
     * @param {boolean} [callOpts.no_sig] true if no signature is required for the method
     * @param {string} [callOpts.app_secret_key] required for non-session requests
     * @param {string} [callOpts.use_post] send request via POST
     */
    function restCall(method, params, callback, callOpts) {
        params = params || {};
        params.method = method;
        params = restFillParams(params);
        if (callOpts && callOpts.no_session) {
            delete params['session_key'];
            delete params['access_token'];
        }

        var key;
        for (key in params) {
            if (params.hasOwnProperty(key)) {
                var param = params[key];
                if (typeof param === 'object') {
                    params[key] = JSON.stringify(param);
                }
            }
        }

        if (!callOpts || !callOpts.no_sig) {
            var secret = (callOpts && callOpts.app_secret_key) ? callOpts.app_secret_key : state.sessionSecretKey;
            params['sig'] = calcSignature(params, secret);
        }

        var query = "";
        for (key in params) {
            if (params.hasOwnProperty(key)) {
                if (query.length !== 0) query += '&';
                query += key + "=" + encodeURIComponent(params[key]);
            }
        }

        return executeRemoteRequest(query, callOpts && callOpts.use_post, callback);
    }

    /**
     * Calculates request signature basing on the specified call arguments
     *
     * @param {Object} query
     * @param {string} [secretKey] alternative secret_key (fe: app secret key for non-session requests)
     * @returns {string}
     */
    function calcSignatureExternal(query, secretKey) {
        return calcSignature(restFillParams(query), secretKey);
    }

    function calcSignature(query, secretKey) {
        var i, keys = [];
        for (i in query) {
            if (query.hasOwnProperty(i)) {
            	keys.push(i.toString());
			}
        }
        keys.sort();
        var sign = "";
        for (i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (REST_NO_SIGN_ARGS.indexOf(key) == -1) {
                sign += keys[i] + '=' + query[keys[i]];
            }
        }
        sign += secretKey || state.sessionSecretKey;
        sign = encodeUtf8(sign);
        return md5(sign);
    }

    function restFillParams(params) {
        params = params || {};
        params["application_key"] = state.app_key;
        if (state.sessionKey) {
            params["session_key"] = state.sessionKey;
        } else {
            params["access_token"] = state.accessToken;
        }
        params["format"] = 'JSON';
        return params;
    }

    // ---------------------------------------------------------------------------------------------------
    // Payment
    // ---------------------------------------------------------------------------------------------------

    /**
     * Opens a payment window for a selected product
     *
     * @param {String} productName      product's name to be displayed in a payment window
     * @param {Number} productPrice     product's price to be displayed in a payment window
     * @param {String} productCode      product's code used for validation in a server callback and displayed in transaction info
     * @param {Object} options          additional payment parameters
     * @returns {Window} opened window or null
     */
    function paymentShow(productName, productPrice, productCode, options) {
        return window.open(getPaymentQuery(productName, productPrice, productCode, options));
    }

    /**
     * Opens a payment window for a selected product in an embedded iframe
     * Opens a payment window for a selected product as an embedded iframe
     * You can either create frame container element by yourself or leave element creation for this method
     *
     * @param {String} productName      product's name to be displayed in a payment window
     * @param {Number} productPrice     product's price to be displayed in a payment window
     * @param {String} productCode      product's code used for validation in a server callback and displayed in transaction info
     * @param {Object} options          additional payment parameters
     * @param {String} frameId          id of a frame container element
     */
    function paymentShowInFrame(productName, productPrice, productCode, options, frameId) {
        var frameElement =
            "<iframe 'style='position: absolute; left: 0px; top: 0px; background-color: white; z-index: 9999;' src='"
            + getPaymentQuery(productName, productPrice, productCode, options)
            + "'; width='100%' height='100%' frameborder='0'></iframe>";

        var frameContainer = window.document.getElementById(frameId);
        if (!frameContainer) {
            frameContainer = window.document.createElement("div");
            frameContainer.id = frameId;
            document.body.appendChild(frameContainer);
        }

        frameContainer.innerHTML = frameElement;
        frameContainer.style.display = "block";
        frameContainer.style.position = "fixed";
        frameContainer.style.left = "0px";
        frameContainer.style.top = "0px";
        frameContainer.style.width = "100%";
        frameContainer.style.height = "100%";
    }


    /**
     * Closes a payment window and hides it's container on game's page
     *
     * @param {String} frameId  id of a frame container element
     */
    function closePaymentFrame(frameId) {
        if (window.parent) {
            var frameContainer;
            try {
                frameContainer = window.document.getElementById(frameId) || window.parent.document.getElementById(frameId);
            } catch (e) {
                console.log(e);
            }

            if (frameContainer) {
                frameContainer.innerHTML = "";
                frameContainer.style.display = "none";
                frameContainer.style.position = "";
                frameContainer.style.left = "";
                frameContainer.style.top = "";
                frameContainer.style.width = "";
                frameContainer.style.height = "";
            }
        }
    }

    /**
     * Genrates an OK payment service URL for a selected product
     */
    function getPaymentQuery(productName, productPrice, productCode, options) {
        var params = {};
        params['name'] = productName;
        params['price'] = productPrice;
        params['code'] = productCode;

        options = options || {};
        var host = options['mob_pay_url'] || state.mobServer;

        params["application_key"] = state.app_key;
        if (state.sessionKey) {
            params["session_key"] = state.sessionKey;
        } else {
            params["access_token"] = state.accessToken;
        }
        params['sig'] = calcSignature(params, state.sessionSecretKey);

        var query = host + 'api/show_payment?';
        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                query += key + "=" + encodeURIComponent(params[key]) + "&";
            }
        }

        return query;
    }

    // ---------------------------------------------------------------------------------------------------
    // Ads
    // ---------------------------------------------------------------------------------------------------

    /**
     * Injects an OK Ads Widget to a game's page
     *
     * @param {string}      [frameId]   optional frame element id. If not present "ok-ads-frame" id will be used
     * @param {function}    [callbackFunction] callbackFunction used for all ad methods. Takes a single object input parameter
     */
    function injectAdsWidget(frameId, callbackFunction) {
        if (ads_state.frame_element) {
            return;
        }
        var frame = document.createElement("iframe");
        var framesCount = window.frames.length;
        frame.id = frameId || "ok-ads-frame";

        frame.src = getAdsWidgetSrc();
        for (var prop in ads_widget_style) {
            frame.style[prop] = ads_widget_style[prop];
        }
        frame.style.display = "none";
        document.body.appendChild(frame);
        ads_state.frame_element = frame;
        ads_state.window_frame = window.frames[framesCount];

        var callback = callbackFunction || defaultAdCallback;
        window.addEventListener('message', callback);
    }

    /**
     * Requests an ad to be shown for a user from ad providers
     */
    function prepareMidroll() {
        if (!ads_state.window_frame) {
            console.log("Ads are not initialized. Please initialize them first");
            return;
        }
        ads_state.window_frame.postMessage(JSON.stringify({method: 'prepare', arguments: ['midroll']}), '*');
    }

    /**
     * Shows previously prepared ad to a user
     */
    function showMidroll() {
        if (!ads_state.window_frame) {
            console.log("Ads are not initialized. Please initialize them first");
            return;
        }
        if (!ads_state.ready) {
            console.log("Ad is not ready. Please make sure ad is ready to be shown");
        }
        ads_state.frame_element.style.display = '';
        setTimeout(function () {
            ads_state.window_frame.postMessage(JSON.stringify({method: 'show'}), '*');
        }, 10);
    }

    /**
     * Removed an Ok Ads Widget from page source and completely resets ads status
     */
    function removeAdsWidget() {
        if (ads_state.frame_element) {
            ads_state.frame_element.parentNode.removeChild(ads_state.frame_element);
            OKSDK.Ads.State.init = ads_state.init = false;
            OKSDK.Ads.State.ready = ads_state.ready = false;
            OKSDK.Ads.State.frame_element = ads_state.frame_element = null;
            OKSDK.Ads.State.window_frame = ads_state.window_frame = null;
        }
    }

    /**
     * Generates an URL for OK Ads Widget
     */
    function getAdsWidgetSrc() {
        var sig = md5("call_id=1" + state.sessionSecretKey).toString();
        var widgetSrc = state.widgetServer + "dk?st.cmd=WidgetVideoAdv&st.app=" + state.app_id + "&st.sig=" + sig + "&st.call_id=1&st.session_key=" + state.sessionKey;
        return widgetSrc;
    }

    /**
     * Default callback function used for OK Ads Widget
     */
    function defaultAdCallback(message) {
        if (!message.data) {
            return;
        }

        var data = JSON.parse(message.data);

        if (!data.call || !data.call.method) {
            return;
        }

        if (!data.result || !data.result.status) {
            return;
        }

        switch (data.call.method) {
            case "init":
                if (data.result.status === "ok") {
                    console.log("OK Ads initialization complete");
                    ads_state.init = true;
                } else {
                    console.log("OK Ads failed to initialize");
                    ads_state.init = false;
                }
                break;
            case "prepare":
                if (data.result.status === "ok") {
                    if (data.result.code === "ready") {
                        console.log("Ad is ready to be shown");
                        ads_state.ready = true;
                    }
                } else {
                    console.log("Ad is not ready to be shown. Status: " + data.result.status + ". Code: " + data.result.code);
                    ads_state.ready = false;
                }
                break;
            case "show":
                ads_state.frame_element.style.display = "none";
                if (data.result.status === "ok") {
                    if (data.result.code === "complete") {
                        console.log("Ad is successfully shown");
                        ads_state.ready = false;
                    }
                } else {
                    console.log("An ad can't be shown. Status: " + data.result.status + ". Code: " + data.result.code);
                    ads_state.ready = false;
                }
                break;
        }
    }

    function isNativeAdSupported() {
        return (typeof OKApp !== 'undefined') && (typeof OKApp.isAdsEnabled !== 'undefined') && OKApp.isAdsEnabled()
    }

    function requestNativeAd() {
        if (isNativeAdSupported()) invokeUIMethod('requestNativeAd')
    }

    function requestManualAd() {
        if (isNativeAdSupported()) invokeUIMethod('requestManualAd')
    }

    function showLoadedAd() {
        if (isNativeAdSupported()) invokeUIMethod('showLoadedAd')
    }

    // ---------------------------------------------------------------------------------------------------
    // Widgets
    // ---------------------------------------------------------------------------------------------------

    var WIDGET_SIGNED_ARGS = ["st.attachment", "st.return", "st.redirect_uri", "st.state"];

    /**
     * Opens mediatopic post widget
     *
     * @param {String} returnUrl callback url (if null, result will be posted via postmessage and popup closed)
     * @param {Object} options options
     * @param {Object} options.attachment mediatopic (feed) to be posted
     * @param {boolean} forcePopup  use WidgetBuilder or make direct popup call
     * @returns false if widget opening failed (like blocked popup)
     */
    function widgetMediatopicPost(returnUrl, options, forcePopup) {
        options = options || {};
        if (!options.attachment) {
            options = {attachment: options}
        }

        if (forcePopup) {
			options.attachment = btoa(unescape(encodeURIComponent(toString(options.attachment))));
			return widgetOpen('WidgetMediatopicPost', options, returnUrl);
        } else {
            var mergedOptions = OKSDK.Util.mergeObject(options, {return: returnUrl}, false);
            OKSDK.Widgets.builds.post.configure(mergedOptions).run();
        }
    }

    /**
     * Opens app invite widget (invite friends to app)
     *
     * @see widgetSuggest widgetSuggest() for more details on arguments
     */
	function widgetInvite(returnUrl, options, forcePopup) {
		if (forcePopup) {
			return widgetOpen('WidgetInvite', options, returnUrl);
		} else {
			OKSDK.Widgets.builds.invite.configure(
				OKSDK.Util.mergeObject(
					options,
					{return: returnUrl}
				)
			).run();
		}
	}

    /**
     * Opens app suggest widget (suggest app to friends, both already playing and not yet)
     *
     * @param {String} returnUrl callback url (if null, result will be posted via postmessage and popup closed)
     * @param {Object} [options] options
     * @param {boolean} forcePopup  fallback for old method to open widget
     * @param {int} [options.autosel] amount of friends to be preselected
     * @param {String} [options.comment] default text set in the suggestion text field
     * @param {String} [options.custom_args] custom args to be passed when app opened from suggestion
     * @param {String} [options.state] custom args to be passed to return url
     * @param {String} [options.target] comma-separated friend IDs that should be preselected by default
     * @returns false if widget opening failed (like blocked popup)
     */
    function widgetSuggest(returnUrl, options, forcePopup) {
        if (forcePopup) {
            return widgetOpen('WidgetSuggest', options, returnUrl);
        } else {
            OKSDK.Widgets.builds.suggest.configure(
                OKSDK.Util.mergeObject(
                    options,
                    { return: returnUrl }
                )
            ).run();
        }
    }

    function widgetGroupAppPermissions(scope, returnUrl, options) {
        options = options || {};
        options.groupId = options.groupId || state.groupId;
        scope = getInnerType(scope) == getInnerType._array ? scope.join(';') : scope;

        OKSDK.Widgets.builds.askGroupAppPermissions
            .configure(
                OKSDK.Util.mergeObject(
                    options,
                    /* this will be translated in request query as params */
                    {
                        scope: scope,
                        redirect_uri: returnUrl,
                        response_type: 'token',
                        popupConfig: { width: 600, height: 300 }
                    },
                    false
                )
            )
            .run();
    }

    function widgetUserContacts(returnUrl, data, options) {
        options = options || {};
        if (data) {
            options.data = JSON.stringify(data);
        }
        var lines = data && data.data ? data.data.length : 0;
        OKSDK.Widgets.builds.userContacts
            .configure(
                OKSDK.Util.mergeObject(
                    options,
                    /* this will be translated in request query as params */
                    {
                        redirect_uri: returnUrl,
                        response_type: 'token',
                        popupConfig: { width: 600, height: 360 + lines * 32 }
                    },
                    false
                )
            )
            .run();
	}

    function widgetOpen(widget, args, returnUrl) {
        args = args || {};
        args.return = returnUrl || args.return || args.redirect_uri;
        var popupConfig = args.popupConfig;
        var popup = false;

        if (popupConfig) {
            delete args.popupConfig;
            var w = popupConfig.width;
            var h = popupConfig.height;
            var documentElement = document.documentElement;
            if (typeof popupConfig.left == 'undefined') {
                var screenLeft = window.screenLeft;
                var innerWidth = window.innerWidth;
                var screenOffsetLeft = typeof screenLeft == 'undefined' ? screen.left : screenLeft;
                var screenWidth = innerWidth ? innerWidth : documentElement.clientWidth ? documentElement.clientWidth : screen.width;
                var left = (screenWidth / 2 - w / 2) + screenOffsetLeft;
            }
            if (typeof popupConfig.top == 'undefined') {
                var screenTop = window.screenTop;
                var screenOffsetTop = typeof screenTop == 'undefined'? screen.top : screenTop;
                var innerHeight = window.innerHeight;
                var screenHeight = innerHeight ? innerHeight : documentElement.clientHeight ? documentElement.clientHeight : screen.height;
                var top = (screenHeight / 2 - h / 2) + screenOffsetTop;
            }


            popup = window.open(
                getLinkOnWidget(widget, args),
                '',
                'width=' + w + ',' +
                'height=' + h + ',' +
                'top=' + top + ',' +
                'left=' + left +
                (popupConfig.options ? (',' + popupConfig.options) : '')
            );

        } else {
            popup = window.open(getLinkOnWidget(widget, args));
        }

        return popup;
    }

    function getLinkOnWidget(widget, args) {
        var keys = [];
        for (var arg in args) {
            keys.push(arg.toString());
        }
        keys.sort();

        var sigSource = '';
        var query = state.widgetServer + 'dk?st.cmd=' + widget + '&st.app=' + state.app_id;
        for (var i = 0; i < keys.length; i++) {
            var key = "st." + keys[i];
            var val = args[keys[i]];
            if (WIDGET_SIGNED_ARGS.indexOf(key) != -1) {
                sigSource += key + "=" + val;
            }
            query += "&" + key + "=" + encodeURIComponent(val);
        }
        sigSource += state.sessionSecretKey;
        query += '&st.signature=' + md5(sigSource);
        if (state.accessToken != null) {
            query += '&st.access_token=' + state.accessToken;
        }
        if (state.sessionKey) {
            query += '&st.session_key=' + state.sessionKey;
        }
        return query;
    }

    // ---------------------------------------------------------------------------------------------------
    // SDK constructor
    // ---------------------------------------------------------------------------------------------------


    /**
     * @param {String} widgetName
     * @constructor
     */
    function WidgetConfigurator(widgetName) {
        this.name = widgetName;
        this.configAdapter = nop;
        this.adapters = {};
    }

    WidgetConfigurator.prototype = {
        /* one of FAPI.UI methods, more: https://apiok.ru/search?q=FAPI.UI */
        withUiLayerName: function(name) {
            this.uiLayerName = name;
            return this;
        },
        withValidators: function (validators) {
            this.validators = validators;
            return this;
        },
        withConfigAdapter: function (adapterFn) {
            this.configAdapter = adapterFn;
            return this;
        },
        withAdapters: function (adapters) {
            this.adapters = adapters;
            return this;
        },

        /**
         * @callback adapterCallback
         * @param {Object} data
         * @param {Object} options
         * @returns {Array}
         */
        /**
         * @param {adapterCallback} fn
         * @returns {WidgetConfigurator}
         */
        withUiAdapter: function(fn) {
            this.adapters.openUiLayer = fn;
            return this;
        },
        /**
         * @param {adapterCallback} fn
         * @returns {WidgetConfigurator}
         */
        withPopupAdapter: function(fn) {
            this.adapters.openPopup = fn;
            return this;
        },
        /**
         * @param {adapterCallback} fn
         * @returns {WidgetConfigurator}
         */
        withIframeAdapter: function(fn) {
            this.adapters.openIframeLayer = fn;
            return this;
        }
    };

    /**
     *
     * @param {WidgetConfigurator | String} widget
     * @param {Object} [options]
     * @constructor
     */
    function WidgetLayerBuilder(widget, options) {
        if (widget instanceof WidgetConfigurator === false) {
            widget = new WidgetConfigurator(widget);
        }

        this.widgetConf = widget;
        this.options = options || {};
        this.configAdapter = this.widgetConf.configAdapter;
        this.adapters = this._createMethodSuppliers(this.widgetConf.adapters);
        this.validators = this._createMethodSuppliers(this.widgetConf.validators);
        this._callContext = resolveContext();
    }

    WidgetLayerBuilder.prototype = {
        /**
         * @private
         */
        _callContext: {},
        /**
         * @private
         * @description resolve when method is allowed to use relate to application envinronment context
         */
        _validatorRegister: {
            openUiLayer: function () {
                var context = this._callContext;
                return this.widgetConf.uiLayerName && !(context.isExternal || context.isMob);
            },
            openIframeLayer: function () {
                return false;
            },
            openPopup: function () {
                return true;
            }
        },

        /**
         * @private
         *
         * @param {Object} methodMap    see: WidgetLayerBuilder.widgetInterface
         * @param {Function} methodMap.openPopup
         * @param {Function} methodMap.openUiLayer
         * @param {Function} methodMap.openIframeLayer
         */
        _createMethodSuppliers: function (methodMap) {
            var result = {};
            if (methodMap) {
                var widgetInterface = this.widgetInterface;
                for (var i = 0, l = widgetInterface.length; i < l; i++) {
                    var m = widgetInterface[i];
                    if (methodMap.hasOwnProperty(m)) {
                        result[m] = methodMap[m];
                    }
                }
            }

            return result;
        },
        widgetInterface:
            [
                'openPopup',
                'openUiLayer',
                'openIframeLayer'
            ],
        openPopup: function () {
            return widgetOpen(this.widgetConf.name, this.adaptedOptions || this.options);
        },
        openUiLayer: function () {
            return invokeUIMethod.apply(null, this.adaptedOptions || this.options);
        },
        openIframeLayer: function () {
            // 'iframe-layer feature is under development'
        },
        run: function () {
            var clientId = this.options.client_id;
            if (typeof clientId == 'undefined'
                || (getInnerType(clientId) == getInnerType._string && clientId.length < 1)) {

                this.options.client_id = state.app_id;
            }
            // TODO: make state update to be optional;
            this._callContext = resolveContext();
            this.configAdapter(state);

            var validatorRegister = this._validatorRegister;
            for (var method in validatorRegister) {
                var result = validatorRegister[method].call(this);
                if (this.validators[method]) {
                    result = this.validators[method].call(this);
                }

                // убеждаемся, что такой метод есть в прототипе конструтора
                if (result && (!this.hasOwnProperty(method) && method in this)) {
                    var adapter = this.adapters[method];
                    if (adapter) {
                        this.adaptedOptions = adapter(this.widgetConf, this.options);
                    }
                    return this[method]();
                }
            }
        },
        changeParams: function (options) {
            if (this.options) {
                mergeObject(this.options, options, true);
                return this;
            } else {
                return this.configure(options);
            }
        },
        addParams: function (options) {
            if (this.options) {
                mergeObject(this.options, options, false);
                return this;
            } else {
                return this.configure(options);
            }
        },
        configure: function (options) {
            this.options = options;
            return this;
        }
    };

    /* todo: виджеты в леере
    function createIframe(uri, customCssClass) {
        var iframe = document.createElement('iframe');
        var iframeClassName = typeof customCssClass === 'undefined' ? "" : customCssClass;
        iframe.src = uri;
        iframe.className = ("ok-sdk-frame " + iframeClassName);

        document.body.appendChild(iframe);

        //iframe.contentWindow.postMessage({'test-message': 7}, "*")
    }
    */

    function invokeUIMethod() {
        var argStr = "";
        for (var i = 0, l = arguments.length; i < l; i++) {
            var arg = arguments[i];

            if (i > 0) {
                argStr += '$';
            }
            if (arg != null) {
                argStr += encodeURIComponent(String(arg));
            }
        }
        window.parent.postMessage("__FAPI__" + argStr, "*");
    }

    /**
     * @class WidgetLayerBuilder
     *
     * @returns {Boolean} context.platform
     * @returns {Boolean} context.isOKApp
     * @returns {Boolean} context.isOauth
     * @returns {Boolean} context.isIframe
     * @returns {Boolean} context.isPopup
     * @returns {Boolean} context.isExternal
     * @returns {Object} context
     */
    function resolveContext() {
        var stateMode = state.layout && state.layout.toLowerCase();
        var userAgent = navigator.userAgent.toLowerCase();
        var IOS_UA_REG = /(iphone|ipad|ipod)/g;
        var ANDROID_UA_REG = /android/g;
        var WP_UA_REG = /windows phone/g;
        var context = {
            layout: PLATFORM_REGISTER[stateMode],
            isOKApp: Boolean(state.container),
            isOAuth: stateMode === 'o',
            isIframe: window.parent && window.parent !== window,
            isPopup: window.opener && window.opener !== window,
            isAndroid: ANDROID_UA_REG.test(userAgent),
            isIOS: IOS_UA_REG.test(userAgent),
            isWP: WP_UA_REG.test(userAgent)
        };
        context.isExternal = context.layout == EXTERNAL || !(context.isIframe || context.isPopup || context.isOAuth);
        context.isMob = context.layout === MOBILE || context.layout === NATIVE_APP;

        return state.context = context;
    }


    // ---------------------------------------------------------------------------------------------------
    // Utils
    // ---------------------------------------------------------------------------------------------------

    /**
     * calculates md5 of a string
     * @param {String} str
     * @returns {String}
     */
    function md5(str) {
        var hex_chr = "0123456789abcdef";

        function rhex(num) {
            var str = "";
            for (var j = 0; j <= 3; j++) {
                str += hex_chr.charAt((num >> (j * 8 + 4)) & 0x0F) +
                    hex_chr.charAt((num >> (j * 8)) & 0x0F);
            }
            return str;
        }

        /*
         * Convert a string to a sequence of 16-word blocks, stored as an array.
         * Append padding bits and the length, as described in the MD5 standard.
         */
        function str2blks_MD5(str) {
            var nblk = ((str.length + 8) >> 6) + 1;
            var blks = new Array(nblk * 16);
            var i = 0;
            for (i = 0; i < nblk * 16; i++) {
                blks[i] = 0;
            }
            for (i = 0; i < str.length; i++) {
                blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
            }
            blks[i >> 2] |= 0x80 << ((i % 4) * 8);
            blks[nblk * 16 - 2] = str.length * 8;
            return blks;
        }

        /*
         * Add integers, wrapping at 2^32. This uses 16-bit operations internally
         * to work around bugs in some JS interpreters.
         */
        function add(x, y) {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF);
            var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF);
        }

        /*
         * Bitwise rotate a 32-bit number to the left
         */
        function rol(num, cnt) {
            return (num << cnt) | (num >>> (32 - cnt));
        }

        /*
         * These functions implement the basic operation for each round of the
         * algorithm.
         */
        function cmn(q, a, b, x, s, t) {
            return add(rol(add(add(a, q), add(x, t)), s), b);
        }

        function ff(a, b, c, d, x, s, t) {
            return cmn((b & c) | ((~b) & d), a, b, x, s, t);
        }

        function gg(a, b, c, d, x, s, t) {
            return cmn((b & d) | (c & (~d)), a, b, x, s, t);
        }

        function hh(a, b, c, d, x, s, t) {
            return cmn(b ^ c ^ d, a, b, x, s, t);
        }

        function ii(a, b, c, d, x, s, t) {
            return cmn(c ^ (b | (~d)), a, b, x, s, t);
        }

        var x = str2blks_MD5(str);
        var a = 1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d = 271733878;

        for (var i = 0; i < x.length; i += 16) {
            var olda = a;
            var oldb = b;
            var oldc = c;
            var oldd = d;

            a = ff(a, b, c, d, x[i], 7, -680876936);
            d = ff(d, a, b, c, x[i + 1], 12, -389564586);
            c = ff(c, d, a, b, x[i + 2], 17, 606105819);
            b = ff(b, c, d, a, x[i + 3], 22, -1044525330);
            a = ff(a, b, c, d, x[i + 4], 7, -176418897);
            d = ff(d, a, b, c, x[i + 5], 12, 1200080426);
            c = ff(c, d, a, b, x[i + 6], 17, -1473231341);
            b = ff(b, c, d, a, x[i + 7], 22, -45705983);
            a = ff(a, b, c, d, x[i + 8], 7, 1770035416);
            d = ff(d, a, b, c, x[i + 9], 12, -1958414417);
            c = ff(c, d, a, b, x[i + 10], 17, -42063);
            b = ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = ff(a, b, c, d, x[i + 12], 7, 1804603682);
            d = ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = ff(b, c, d, a, x[i + 15], 22, 1236535329);

            a = gg(a, b, c, d, x[i + 1], 5, -165796510);
            d = gg(d, a, b, c, x[i + 6], 9, -1069501632);
            c = gg(c, d, a, b, x[i + 11], 14, 643717713);
            b = gg(b, c, d, a, x[i], 20, -373897302);
            a = gg(a, b, c, d, x[i + 5], 5, -701558691);
            d = gg(d, a, b, c, x[i + 10], 9, 38016083);
            c = gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = gg(b, c, d, a, x[i + 4], 20, -405537848);
            a = gg(a, b, c, d, x[i + 9], 5, 568446438);
            d = gg(d, a, b, c, x[i + 14], 9, -1019803690);
            c = gg(c, d, a, b, x[i + 3], 14, -187363961);
            b = gg(b, c, d, a, x[i + 8], 20, 1163531501);
            a = gg(a, b, c, d, x[i + 13], 5, -1444681467);
            d = gg(d, a, b, c, x[i + 2], 9, -51403784);
            c = gg(c, d, a, b, x[i + 7], 14, 1735328473);
            b = gg(b, c, d, a, x[i + 12], 20, -1926607734);

            a = hh(a, b, c, d, x[i + 5], 4, -378558);
            d = hh(d, a, b, c, x[i + 8], 11, -2022574463);
            c = hh(c, d, a, b, x[i + 11], 16, 1839030562);
            b = hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = hh(a, b, c, d, x[i + 1], 4, -1530992060);
            d = hh(d, a, b, c, x[i + 4], 11, 1272893353);
            c = hh(c, d, a, b, x[i + 7], 16, -155497632);
            b = hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = hh(a, b, c, d, x[i + 13], 4, 681279174);
            d = hh(d, a, b, c, x[i], 11, -358537222);
            c = hh(c, d, a, b, x[i + 3], 16, -722521979);
            b = hh(b, c, d, a, x[i + 6], 23, 76029189);
            a = hh(a, b, c, d, x[i + 9], 4, -640364487);
            d = hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = hh(c, d, a, b, x[i + 15], 16, 530742520);
            b = hh(b, c, d, a, x[i + 2], 23, -995338651);

            a = ii(a, b, c, d, x[i], 6, -198630844);
            d = ii(d, a, b, c, x[i + 7], 10, 1126891415);
            c = ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = ii(b, c, d, a, x[i + 5], 21, -57434055);
            a = ii(a, b, c, d, x[i + 12], 6, 1700485571);
            d = ii(d, a, b, c, x[i + 3], 10, -1894986606);
            c = ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = ii(b, c, d, a, x[i + 1], 21, -2054922799);
            a = ii(a, b, c, d, x[i + 8], 6, 1873313359);
            d = ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = ii(c, d, a, b, x[i + 6], 15, -1560198380);
            b = ii(b, c, d, a, x[i + 13], 21, 1309151649);
            a = ii(a, b, c, d, x[i + 4], 6, -145523070);
            d = ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = ii(c, d, a, b, x[i + 2], 15, 718787259);
            b = ii(b, c, d, a, x[i + 9], 21, -343485551);

            a = add(a, olda);
            b = add(b, oldb);
            c = add(c, oldc);
            d = add(d, oldd);
        }
        return rhex(a) + rhex(b) + rhex(c) + rhex(d);
    }

    /**
     *
     * @param receiver {Object}    obj where copy to
     * @param donor {Object}    obj where copied from
     * @param [rewrite=true] {boolean}
     * @returns {*}
     */
    function mergeObject(receiver, donor, rewrite) {
        if (getInnerType(donor) == getInnerType._object && getInnerType(receiver) == getInnerType._object) {
            for (var k in donor) {
                if (donor.hasOwnProperty(k)) {
                    if (receiver.hasOwnProperty(k) && typeof rewrite !== 'undefined' && !rewrite) {
                        continue;
                    }
                    var property = donor[k];
                    if (getInnerType(property) == getInnerType._object) {
                        mergeObject(receiver[k] = receiver[k] || {}, property, rewrite);
                    } else {
                        receiver[k] = property;
                    }
                }
            }

            return receiver;
        }

        return new Error('Both merged elements should be instances of an Object type');
    }

    function processExternalLink(e) {
        var target = e.target;
        var href;
        var tries = 5;

        var isValidTarget = isHandledExtlink(target);

        while (!isValidTarget && target && tries) {
            isValidTarget = isHandledExtlink(target = target.parentNode);
            tries--;
        }

        if (isValidTarget) {
            if (state.context || resolveContext()) {
                if (state.context.isOKApp) {
                    target.removeAttribute('target');
                } else if (state.context.isIframe) {
                    target.setAttribute('target', '_blank');
                }
            }

            href = target.href;
            if (href) {
                target.href = createAppExternalLink(href);
            }
        }

    }

    function isHandledExtlink(target) {
        return target
            && (target.tagName && target.tagName.toLowerCase() === 'a')
            && (target.className && target.className.match(APP_EXTLINK_REGEXP));
    }

    function createAppExternalLink(href) {
        if (state.context.isOKApp) {
            return (state.context.isIOS ? 'apphook:applink:' : 'https://ok.ru/apphook/outlink?url=') + href;
        }

        return href;
    }

    function getInnerType(o) {
        return Object.prototype.toString.call(o);
    }

    getInnerType._object = getInnerType({}); // [object Object]
    getInnerType._function = getInnerType(nop); // [object Function]
    getInnerType._array = getInnerType([]); // [object Array]
    getInnerType._string = getInnerType(''); // [object String]
    getInnerType._number = getInnerType(1); // [object Number]

    function isFunc(obj) {
        return getInnerType(obj) === getInnerType._function;
    }

    function isString(obj) {
        return Object.prototype.toString.call(obj) === getInnerType._string;
    }

    function toString(obj) {
        return isString(obj) ? obj : JSON.stringify(obj);
    }

    /**
     * Parses parameters to a JS map<br/>
     * Supports both window.location.search and window.location.hash)
     * @param {String} [source=window.location.search] string to parse
     * @returns {Object}
     */
    function getRequestParameters(source) {
        var res = {};
        var url = source || window.location.search;
        if (url) {
            url = url.substr(1);    // Drop the leading '?' / '#'
            var nameValues = url.split("&");

            for (var i = 0; i < nameValues.length; i++) {
                var nameValue = nameValues[i].split("=");
                var name = nameValue[0];
                var value = nameValue[1];
                value = value && decodeURIComponent(value.replace(/\+/g, " "));
                res[name] = value;
            }
        }
        return res;
    }

    function encodeUtf8(string) {
        return unescape(encodeURIComponent(string));
    }

    function decodeUtf8(utftext) {
        return decodeURIComponent(escape(utftext));
    }

    /**
     * Checks if a game was opened in OK Android app's WebView
     * Checks if a game is opened in an OK Android app's WebView
     */
    function isLaunchedInOKAndroidWebView() {
        var userAgent = window.navigator.userAgent;

        return (userAgent && userAgent.length >= 0 && userAgent.indexOf(OK_ANDROID_APP_UA) > -1);
    }

    /** stub func */
    function nop() {
    }

    /**
     * @callback onSuccessCallback
     * @param {String} result
     */

    /**
     * @callback restCallback
     * @param {String} code (either 'ok' or 'error')
     * @param {Object} data success data
     * @param {Object} error error data
     */

    /**
     * @callback CB_eventCallback
     * @param {String} method name
     * @param {String} code ('ok', 'error', 'event')
     * @param {String} data
     */

    /**
     * process postMessage
     * @param {EventListener} event
     */
    function onWindowMessage(event) {
        if (event.origin === state.mobServer || event.origin == state.apiServer) {
            var args = event.data.split('$', -1);
            if (args.length < 3) return;
            args = args.map(decodeURIComponent);
            var method = args[0];
            if (method.startsWith("__FAPI__")) method = method.substr("__FAPI__".length);
            eventCallback(method, args[1], args[2])
        }
    }

    /**
     * @param {CB_eventCallback} [callback]
     */
    function registerCallback(callback) {
        if (isFunc(callback)) eventCallback = callback;
    }

    // ---------------------------------------------------------------------------------------------------


	// ---------------------------------------------------------------------------------------------------
	// Widget configurations
	// ---------------------------------------------------------------------------------------------------

	var widgetConfigs = {
		groupPermission: new WidgetConfigurator('WidgetGroupAppPermissions')
			.withUiLayerName('showGroupPermissions')
			.withUiAdapter(function (data, options) {
				return [
					data.uiLayerName,
					options.scope,
					options.groupId
				];
			})
			.withConfigAdapter(function (state) {
				if (typeof this.options.groupId == 'undefined') {
					this.options.groupId = state.groupId;
				}
			}),
		userContacts: new WidgetConfigurator('WidgetUserContacts')
			.withUiAdapter(function (data, options) {
				return [
					data.uiLayerName,
					options.scope
				];
			}),
		post: new WidgetConfigurator('WidgetMediatopicPost')
			.withUiLayerName('postMediatopic')
			.withUiAdapter(function (data, options) {
				return [
					data.uiLayerName,
					JSON.stringify(options.attachment),
					options.status ? 'on' : 'off',
					options.platforms ? options.platforms.join(',') : '',
					options.groupId
				];
			})
			.withPopupAdapter(function (data, options) {
				options.attachment = btoa(unescape(encodeURIComponent(toString(options.attachment))));
				return options;
			}),
		invite: new WidgetConfigurator('WidgetInvite')
			.withUiLayerName('showInvite')
			.withUiAdapter(function (data, options) {
				return [data.uiLayerName, options.text, options.params, options.uids];
			})
	};

	// ---------------------------------------------------------------------------------------------------


    exports.init = init;
    exports.registerCallback = registerCallback;

    exports.REST = {
        call: restCall,
        calcSignature: calcSignatureExternal
    };

    exports.Payment = {
        show: paymentShow,
        showInFrame: paymentShowInFrame,
        query: getPaymentQuery,
        closePaymentFrame: closePaymentFrame
    };

    exports.Widgets = {
        getBackButtonHtml: nop,
        post: widgetMediatopicPost,
        invite: widgetInvite,
        suggest: widgetSuggest,
		Builder: WidgetLayerBuilder,
		WidgetConfigurator: WidgetConfigurator,
		configs: {
			groupPermission: widgetConfigs.groupPermission,
			post: widgetConfigs.post,
			invite: widgetConfigs.invite
		},
		builds: {
			post: new WidgetLayerBuilder(widgetConfigs.post),
			invite: new WidgetLayerBuilder(widgetConfigs.invite),
			suggest: new WidgetLayerBuilder('WidgetSuggest'),
			askGroupAppPermissions: new WidgetLayerBuilder(widgetConfigs.groupPermission),
			userContacts: new WidgetLayerBuilder(widgetConfigs.userContacts)
		},
		askGroupAppPermissions: widgetGroupAppPermissions,
		userContacts: widgetUserContacts
    };

    exports.Ads = {
        init: injectAdsWidget,
        prepareMidroll: prepareMidroll,
        showMidroll: showMidroll,
        destroy: removeAdsWidget,
        State: ads_state,
        isNativeAdSupported: isNativeAdSupported,
        requestNativeAd: requestNativeAd,
        requestManualAd: requestManualAd,
        showLoadedAd: showLoadedAd
    };

    exports.Util = {
        md5: md5,
        encodeUtf8: encodeUtf8,
        decodeUtf8: decodeUtf8,
        encodeBase64: btoa,
        decodeBase64: atob,
        getRequestParameters: getRequestParameters,
        toString: toString,
        isLaunchedFromOKApp: isLaunchedInOKAndroidWebView,
		resolveContext: resolveContext,
		mergeObject: mergeObject,
		openAppExternalLink: function (href) {
			if ((state.context || resolveContext()).isOKApp) {
				return location.assign(createAppExternalLink(href));
			}
			return window.open(createAppExternalLink(href));
		},
		addExternalLinksListener: function (appHookClass, eventDecorator) {
			if (!extLinkListenerOn) {
				resolveContext();

				if (typeof appHookClass !== 'undefined' && appHookClass.indexOf('.') === -1) {
					APP_EXTLINK_REGEXP = new RegExp('\\b'+appHookClass+'\\b');
				}

				externalLinkHandler =  function (e) {
					var _event = eventDecorator ? eventDecorator(e) : e;
					processExternalLink(_event);
				};

				document.body.addEventListener('click', externalLinkHandler, false);
				extLinkListenerOn = true;
			}
		},
		removeExternalLinksListener: function () {
			document.body.removeEventListener('click', externalLinkHandler, false);
			extLinkListenerOn = false;
		}
    }
}));
