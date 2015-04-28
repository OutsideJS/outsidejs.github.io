/**
 * Created by Ivan Zmerzlyi on 28.04.2015.
 */

(function (OutsideJS) {
    "use strict";

    console.log(OutsideJS.InitEnv);

    if (typeof requirejs == 'undefined') {
        OutsideJS.loadScript(OutsideJS.InitEnv.baseUrl + 'vendors/requirejs/require.js', function () {
            callback()
        });
    } else {
        callback();
    }

    function callback() {
        requirejs.config({
            baseUrl: OutsideJS.InitEnv.baseUrl,
            paths: {
                app: './app',
                controllers: './app/controllers',
                models: './app/models',
                views: './app/views',
                components: './app/components',
                jquery: './vendors/jquery/dist/jquery.min',
                handlebars: './vendors/handlebars/handlebars.min',
                "vkontakte": '//vk.com/js/api/openapi'
            },
            shim: {
                "handlebars": {exports: 'Handlebars'},
                "vkontakte": {exports: 'VK'}
            },
            urlArgs: "_=" + (new Date()).getTime()
        });

        requirejs(['app/main'], function (app) {
            app.init(OutsideJS.InitEnv.options);
        });
    }

})(window['OutsideJS']);
