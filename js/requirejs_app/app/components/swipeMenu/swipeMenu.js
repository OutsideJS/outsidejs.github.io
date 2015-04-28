/**
 * Created by Ivan Zmerzlyi on 28.04.2015.
 */
define(['jquery', 'component/stateController', 'handlebars', 'text!component/swipeMenu/swipeMenu.html'],
    function ($, state, Handlebars, template) {
        'use strict';

        var showed = false,
            template = Handlebars.compile(template),
            menuHtml = template({
                items: state.getStates()
            }),
            $menu = $(menuHtml);

        $('body').append($menu);

        function toggleMenu() {
            if (showed) {
                hide();
            } else {
                show();
            }
        };

        return {
            toggle: toggleMenu
        }

        // private methods
        function show() {
            showed = true;
            $('html').addClass('activeMenu');
        };

        function hide() {
            showed = false;
            $('html').removeClass('activeMenu');
        };
    });