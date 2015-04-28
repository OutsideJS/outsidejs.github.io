/**
 * Created by Ivan Zmerzlyi on 28.04.2015.
 */
define(['app/config'], function (config) {
    var states = config.get('states'),
        defaultState = config.get('defaultState'),
        currentState = null,
        refreshPage = false;

    return {
        start: start,
        go: go,
        refresh: refresh,
        getStates: getStates
    };

    function start() {
        go(defaultState.hash);
    }

    function getStates() {
        return states;
    }

    function go(hash){
        if(currentState.hash != hash){
            for (var i = 0, state; state = states[i++];) {
                if (state.hash === hash) {
                    dispatchController(state.controller);
                    currentState = state;
                }
            }
        }
    }

    function refresh() {
        refreshPage = true;
    }

    function dispatchController(controllerName) {
        require(['controllers/' + controllerName], function (controller) {
            controller.dispatch();
        });
    }
});