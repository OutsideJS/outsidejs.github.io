/**
 * Created by Ivan Zmerzlyi on 28.04.2015.
 */

define(['vkontakte', 'components/stateController'], function(VK, state){
    'use strict';
    
    var session = null;

    return {
        login: login,
        logout: logout,
        getSession: getSession,
        checkStatus: checkStatus
    };
    
    function checkStatus(callback){
        VK.Auth.getLoginStatus(function(response) {
            if (response.session) {
                session = response.session;
            } else {
                session = null;
            };
            callback(session)
        });
    }
    
    function getSession(){
        return session;
    }
    
    function login(callback){
        VK.Auth.login(function(response){
            callback(response);
            session = response.session;
            state.refresh();
        }, 8192);
    }
    
    function logout(callback){
        VK.Auth.logout(function(response){
            callback(response);
            session = null;
            state.refresh();
        });
    }

});