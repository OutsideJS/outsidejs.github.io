/**
 * Created by Ivan Zmerzlyi on 28.04.2015.
 */

(function (w, undefined) {
    'use strict';

    var q = w[w['OutsideJsObject']].q, i,
        self = {init: init};

    function init(scriptUrl, options, callback) {
        w[w['OutsideJsObject']].loadScript = loadScript;
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

    w[w['OutsideJsObject']] = function () {
        var action = Array.prototype.shift.call(arguments);
        (action === "init") && self[action].apply(null, arguments);
    };

    for (i = 0; i < q.length; i++) {
        w[w['OutsideJsObject']].apply(null, q[i]);
    }

})(window);