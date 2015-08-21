/**
 * Created by Ivan Zmerzlyi on 28.04.2015.
 */

(function (w, undefined) {
    'use strict';

    var q = w[w['OutsideJsObject']].q, i,
        self = {init: init};

    function init(scriptUrl, options, callback) {
        w[w['OutsideJsObject']].loadScript = loadScript;
        w[w['OutsideJsObject']].loadCss = loadCss;
        w[w['OutsideJsObject']].fetch = fetch;
        w[w['OutsideJsObject']].InitEnv = {
            options: options,
            baseUrl: scriptUrl.substring(0, scriptUrl.lastIndexOf("/") + 1)
        };

        loadScript(scriptUrl, callback);
    }

    function loadScript(url, callback) {
        var script = document.createElement('script');
        script.async = true;
        script.src = url;

        var entry = document.getElementsByTagName('script')[0];
        entry.parentNode.insertBefore(script, entry);

        script.onload = script.onreadystatechange = function () {
            var rdyState = script.readyState;

            if (!rdyState || /complete|loaded/.test(script.readyState)) {
                callback && callback();

                script.onload = null;
                script.onreadystatechange = null;
            }
        }
    }

    function loadCss(url) {
        var fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", url);
        document.getElementsByTagName("head")[0].appendChild(fileref);
    }

    function fetch(url, postData, successCallback, errorCallback, alwaysCallback) {
        var req = createXMLHTTPObject();
        if (!req) return;
        var method = (postData) ? "POST" : "GET";
        req.open(method,url,true);
        if (postData)
            req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
        req.onreadystatechange = function () {
            alwaysCallback && alwaysCallback(req);
            if (req.readyState != 4) return;
            if (req.status != 200 && req.status != 304) {
                errorCallback && errorCallback(req.status, req);
                return;
            }
            successCallback && successCallback(req.response, req);
        };
        if (req.readyState == 4) return;
        req.send(postData);
    }

    var XMLHttpFactories = [
        function () {return new XMLHttpRequest()},
        function () {return new ActiveXObject("Msxml2.XMLHTTP")},
        function () {return new ActiveXObject("Msxml3.XMLHTTP")},
        function () {return new ActiveXObject("Microsoft.XMLHTTP")}
    ];

    function createXMLHTTPObject() {
        var xmlhttp = false;
        for (var i=0;i<XMLHttpFactories.length;i++) {
            try {
                xmlhttp = XMLHttpFactories[i]();
            }
            catch (e) {
                continue;
            }
            break;
        }
        return xmlhttp;
    }

    w[w['OutsideJsObject']] = function () {
        var action = Array.prototype.shift.call(arguments);
        (action === "init") && self[action].apply(null, arguments);
    };

    for (i = 0; i < q.length; i++) {
        w[w['OutsideJsObject']].apply(null, q[i]);
    }

})(window);