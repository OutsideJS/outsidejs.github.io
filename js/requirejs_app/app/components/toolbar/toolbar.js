/**
 * Created by Ivan Zmerzlyi on 28.04.2015.
 */
define([
    'jquery', 'app/config', 'handlebars', 'text!components/toolbar/toolbar.html',
    'components/swipeMenu/swipeMenu', 'models/users', 'lib/auth'
], function ($, config, Handlebars, template, menu, User, auth) {
    'use strict';

    var _template = Handlebars.compile(template),
        toolbarHtml = _template({title: ""}),
        $toolbar = $(toolbarHtml);

    $(config.get('view-element')).append($toolbar);

    function changeTitle(title) {
        $toolbar.find('.title .pageTitle').html(title);
    };

    $toolbar.find('.menu').on('click', function () {
        menu.toggle();
    });

    $toolbar.find('#vk_login').on('click', function () {
        auth.login(function (response) {
            userLogin(response.session);
        }, 8192);
    });

    $toolbar.find('#vk_logout').on('click', function () {
        auth.logout(function () {
            userLogout();
        });
    });

    function userLogin(session) {
        User.getUsers(session.mid, function (data) {
            var $pageTitle = $toolbar.find('.title .pageTitle');
            $toolbar.find('.title').html('');
            $toolbar.find('.title').append($pageTitle);
            $toolbar.find('.title').append(' | ' + data[0].first_name + ' ' +
            '<span class="userAva"><img src="' + data[0].photo + '"/></span>');

        });
        $('#vk_login').hide();
        $('#vk_logout').show();
    };

    function userLogout() {
        var $pageTitle = $toolbar.find('.title .pageTitle');
        $toolbar.find('.title').html('');
        $toolbar.find('.title').append($pageTitle);
        $('#vk_logout').hide();
        $('#vk_login').show();
    };

    auth.checkStatus(function (session) {
        if (session) {
            userLogin(session);
        } else {
            userLogout();
        }
        ;
    });

    return {
        changeTitle: changeTitle
    }
});