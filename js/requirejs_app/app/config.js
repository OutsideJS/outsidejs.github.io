/**
 * Created by Ivan Zmerzlyi on 28.04.2015.
 */

define(['jquery'], function($){
    "use strict";

    var configObj = {};
    
    return {
        set: set,
        getAll: getAll,
        get: get
    };
    
    function set(params){
        configObj = $.extend(true, {}, configObj, params);
        return configObj;
    }

    function getAll() {
        return configObj;
    }
    
    function get(param){
        return configObj[param] || undefined;
    }
});