/**
 * This file\code is part of Paper UI project.
 *
 * Paper UI - is a modern front-end framework based on Material Design by Google
 * https://github.com/virtyaluk/paper-ui
 *
 * Copyright (c) 2015 Bohdan Shtepan
 * http://modern-dev.com/
 *
 * Licensed under the MIT license.
 */

var _touchEvents = (function() {
    return window.navigator.msPointerEnabled ?
        window.PointerEvent ? { down: 'pointerdown', up: 'pointerup' } :
        { down: 'MSPointerDown', up: 'MSPointerUp' } :
    { down: 'touchstart', up: 'touchend' };
}());

/**
 * paperRipple - makes each element in the current set able to produce a rippling effect within the element each time user interacts with the element.
 *
 * @param {(Object|HTMLElement)} [options=null] - A configuration object.
 * @returns {jQuery} Return the jQuery object itself.
 * @class paperRipple
 * @memberOf jQuery.fn
 */
$.fn.paperRipple = function(options) {
    return this.each(function() {
        var ripple = new PaperRipple(options),
            ev = {};

        ev['mousedown ' + _touchEvents.down] = function(e) { ripple.downAction(e); };
        ev['mouseup ' + _touchEvents.up] = function() { ripple.upAction(); };

        $(this).prepend(ripple.$).on(ev);
    });
};
