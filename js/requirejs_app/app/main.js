/**
 * Created by Ivan Zmerzlyi on 28.04.2015.
 */

define(['app/config', 'vkontakte'], function (config, VK) {
    "use strict";

    return {
        init: init
    };

    function init(options) {
        config.set(options);
        VK.init({
            apiId: config.get('vkAppId')
        });
    }
});