/*
 * This file/code is part of Paper UI project.
 *
 * Paper UI - is a modern front-end framework based on Material Design by Google
 * https://github.com/virtyaluk/paper-ui
 *
 * Copyright (c) 2015 Bohdan Shtepan
 * http://modern-dev.com/
 *
 * Licensed under the MIT license.
 */
 ;(function(window, $, module) {
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

/*eslint no-unused-vars: 0*/

/**
 * Provides the utilities for getting element's metrics.
 *
 * @class ElementRect
 */

var ElementRect = (function () {
    /**
     * Initializes a new instance of the `ElementRect` class with the specified `element`.
     *
     * @constructs ElementRect
     * @param {HTMLElement} element - The DOM element to get metrics from
     * @returns {ElementRect} The new instance of a class.
     */

    function ElementRect(element) {
        _classCallCheck(this, ElementRect);

        this._element = element;

        /**
         * Returns the width of the current element.
         *
         * @type {Number}
         */
        this.width = this.boundingRect.width;

        /**
         * Returns the height of the current element.
         *
         * @type {Number}
         */
        this.height = this.boundingRect.height;

        /**
         * Returns the size (the biggest side) of the current element.
         *
         * @type {number}
         */
        this.size = Math.max(this.width, this.height);

        return this;
    }

    /**
     * Returns the center coordinates of the current element.
     *
     * @returns {{ x: Number, y: Number }} Object containing coordinates of the element's center.
     */

    _createClass(ElementRect, [{
        key: 'distanceToFarthestCorner',

        /**
         * Calculates the distance between given point and farthest corner of the current element.
         *
         * @param {{ x: Number, y:Number }} [point={x:0,y:0}] - The point object containing x and y coordinates.
         * @returns {Number} Distance from a point to the container's farthest corner.
         */
        value: function distanceToFarthestCorner(_ref) {
            var _ref$x = _ref.x;
            var x = _ref$x === undefined ? 0 : _ref$x;
            var _ref$y = _ref.y;
            var y = _ref$y === undefined ? 0 : _ref$y;

            return Math.max(ElementRect.euclideanDistance({ x: x, y: y }, { x: 0, y: 0 }), ElementRect.euclideanDistance({ x: x, y: y }, { x: this.width, y: 0 }), ElementRect.euclideanDistance({ x: x, y: y }, { x: 0, y: this.height }), ElementRect.euclideanDistance({ x: x, y: y }, { x: this.width, y: this.height }));
        }

        /**
         *  Determines if the specified point is contained within this element.
         *
         * @param {(Event|Object)} ev - The object containing coordinates of the point.
         * @param {Number} ev.x - The `x` coordinate of the point.
         * @param {Number} ev.y - The `y` coordinate of the point.
         * @param {Number} ev.clientX - The `x` coordinate of the point.
         * @param {Number} ev.clientY - The `y` coordinate of the point.
         * @returns {Boolean} Returns `true` if the `x` and `y` coordinates of point is a point inside this element's rectangle, otherwise `false`.
         */

    }, {
        key: 'contains',
        value: function contains(_ref2) {
            var x = _ref2.x;
            var y = _ref2.y;
            var clientX = _ref2.clientX;
            var clientY = _ref2.clientY;

            var l = this.boundingRect.left,
                t = this.boundingRect.top,
                w = this.boundingRect.width,
                h = this.boundingRect.height,
                _x = x || clientX || 0,
                _y = y || clientY || 0;

            return _x >= l && _x <= l + w && _y >= t && _y <= t + h;
        }
    }, {
        key: 'center',
        get: function get() {
            return {
                x: this.width / 2,
                y: this.height / 2
            };
        }

        /**
         * Returns the size of the current element and its position relative to the viewport.
         *
         * @returns {ClientRect} The returned value is a `ClientRect` object, which contains read-only `left`, `top`, `right` and `bottom` properties
         * describing the border-box in pixels. `top` and `left` are relative to the top-left of the viewport.
         */

    }, {
        key: 'boundingRect',
        get: function get() {
            return this._element.getBoundingClientRect();
        }

        /**
         * Calculates euclidean distance between two points.
         *
         * @static
         * @param {{ x: Number, y: Number }} point1 - Start point
         * @param {{ x: Number, y: Number }} point2 - End point
         * @returns {Number} Distance between two points.
         */

    }], [{
        key: 'euclideanDistance',
        value: function euclideanDistance(point1, point2) {
            return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
        }
    }]);

    return ElementRect;
})();
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

/*eslint no-unused-vars: 0*/

var _window = window || undefined,
    _doc = _window.document,
    _now = (function () {
    return _window.performance && _window.performance.now ? _window.performance.now.bind(_window.performance) : Date.now;
})();

/**
 * Provides all the logic to produce a one-time rippling effect.
 *
 * @class PaperWave
 */

var PaperWave = (function () {
    /**
     * Initializes a new instance of the `PaperWave` class with the specified `PaperRipple` instance.
     *
     * @constructs PaperWave
     * @returns {PaperWave} The new instance of a class.
     *
     * @example
     * var paperWave = new PaperWave(paperRipple);
     *
     * paperWave.downAction(null);
     * paperWave.upAction();
     *
     * if (paperWave.isAnimationCompleted) {
     *     paperWave.remove();
     * }
     */

    function PaperWave(_ref3) {
        var $ = _ref3.$;
        var _ref3$recenters = _ref3.recenters;
        var recenters = _ref3$recenters === undefined ? false : _ref3$recenters;
        var _ref3$center = _ref3.center;
        var center = _ref3$center === undefined ? false : _ref3$center;
        var _ref3$initialOpacity = _ref3.initialOpacity;
        var initialOpacity = _ref3$initialOpacity === undefined ? 0.25 : _ref3$initialOpacity;
        var _ref3$opacityDecayVel = _ref3.opacityDecayVelocity;
        var opacityDecayVelocity = _ref3$opacityDecayVel === undefined ? 0.8 : _ref3$opacityDecayVel;

        _classCallCheck(this, PaperWave);

        /**
         * Gets or sets the color of the wave.
         *
         * @type {String}
         */
        this.color = _window.getComputedStyle($).color;

        /**
         * Gets or sets the container metrics of the wave.
         *
         * @type {ElementRect}
         */
        this.containerRect = new ElementRect($);

        /**
         * Determines whether the wave should be re-centered towards the center of its container.
         *
         * @type {Boolean}
         */
        this.recenters = recenters;

        /**
         * Determines whether the wave should start a movement from the center of its container.
         *
         * @type {Boolean}
         */
        this.center = center;

        /**
         * Gets initial opacity of the wave.
         *
         * @type {Number}
         */
        this.initialOpacity = initialOpacity;

        /**
         * Gets opacity decay velocity of the wave.
         *
         * @type {Number}
         */
        this.opacityDecayVelocity = opacityDecayVelocity;

        /**
         * Represents the object wrapped around the `wave` DOM element that belongs to the current instance.
         *
         * @type {Object}
         */
        this.$wave = _doc.createElement('div');

        this.$wave.classList.add('paper-ripple__wave');
        this.$wave.style.backgroundColor = this.color;

        /**
         * Represents the object wrapped around the main DOM element that belongs to the current instance.
         *
         * @type {Object}
         */
        this.$ = _doc.createElement('div');

        this.$.classList.add('paper-ripple__wave-container');
        this.$.appendChild(this.$wave);

        this.resetDefaults();

        return this;
    }

    /**
     * Represents the max possible value of the wave's radius.
     *
     * @const {Number}
     * @default
     */

    _createClass(PaperWave, [{
        key: 'resetDefaults',

        /**
         * Resets all the wave's values.
         *
         * @returns {PaperWave} Current instance for method chaining.
         */
        value: function resetDefaults() {
            /**
             * Gets or sets max radius of the wave.
             *
             * @type {Number}
             */
            this.maxRadius = 0;

            /**
             * Gets or sets the time of starting interaction with the wave.
             *
             * @type {Number}
             */
            this.touchDownStarted = 0;

            /**
             * Gets or sets the time of ending interaction with the wave.
             *
             * @type {Number}
             */
            this.touchUpStarted = 0;

            /**
             * Gets or sets the start position of the wave.
             *
             * @type {{x: Number, y: Number}}
             */
            this.startPosition = { x: 0, y: 0 };

            /**
             * Gets or sets the end position of the wave.
             *
             * @type {{x: Number, y: Number}}
             */
            this.endPosition = { x: 0, y: 0 };

            return this;
        }

        /**
         * Performs updating of the wave's values.
         *
         * @returns {PaperWave} Current instance for method chaining.
         */

    }, {
        key: 'draw',
        value: function draw() {
            var cssString = undefined,
                scaleFactor = this.radius / (this.containerRect.size / 2),
                containerCenter = this.containerRect.center,
                currentPos = this.currentPosition,
                deltaPos = {
                x: currentPos.x - containerCenter.x,
                y: currentPos.y - containerCenter.y
            };

            this.$wave.style.opacity = this.opacity;

            cssString = 'translate(' + deltaPos.x + 'px, ' + deltaPos.y + 'px)';
            this.$.style.webkitTransform = cssString;
            this.$.style.mozTransform = cssString;
            this.$.style.msTransform = cssString;
            this.$.style.oTransform = cssString;
            this.$.style.transform = 'translate3d(' + deltaPos.x + 'px, ' + deltaPos.y + 'px, 0)';

            cssString = 'scale(' + scaleFactor + ',' + scaleFactor + ')';
            this.$wave.style.webkitTransform = cssString;
            this.$wave.style.mozTransform = cssString;
            this.$wave.style.msTransform = cssString;
            this.$wave.style.oTransform = cssString;
            this.$wave.style.transform = 'scale3d(' + scaleFactor + ',' + scaleFactor + ', 1)';

            return this;
        }

        /**
         * Performs ripple-down effect on the current wave.
         *
         * @param {(Event|Object)} [event=null] - An object containing coordinates of interaction point to set start position of ripple effect.
         * @returns {PaperWave} Current instance for method chaining.
         */

    }, {
        key: 'downAction',
        value: function downAction() {
            var event = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

            var containerCenter = this.containerRect.center;

            this.resetDefaults();

            this.touchDownStarted = _now();
            this.startPosition = this.center || !event ? containerCenter : {
                x: (event.clientX || event.x) - this.containerRect.boundingRect.left,
                y: (event.clientY || event.y) - this.containerRect.boundingRect.top
            };
            this.endPosition = this.recenters ? containerCenter : this.endPosition;
            this.maxRadius = this.containerRect.distanceToFarthestCorner(this.startPosition);

            this.$.style.top = (this.containerRect.height - this.containerRect.size) / 2 + 'px';
            this.$.style.left = (this.containerRect.width - this.containerRect.size) / 2 + 'px';
            this.$.style.width = this.containerRect.size + 'px';
            this.$.style.height = this.containerRect.size + 'px';

            return this;
        }

        /**
         * Performs ripple-up effect on the current wave.
         *
         * @returns {PaperWave} Current instance for method chaining.
         */

    }, {
        key: 'upAction',
        value: function upAction() {
            if (!this.isTouchDown) {
                return this;
            }

            /**
             * @private
             */
            this.touchUpStarted = _now();

            return this;
        }

        /**
         * Removes the wave from a DOM.
         *
         * @returns {PaperWave} Current instance for method chaining.
         */

    }, {
        key: 'remove',
        value: function remove() {
            this.$.parentNode.removeChild(this.$);

            return this;
        }
    }, {
        key: 'touchDownElapsed',

        /**
         * Gets the time in milliseconds elapsed from the moment where interaction with the wave was started.
         *
         * @returns {Number} The time in milliseconds.
         */
        get: function get() {
            var elapsed;

            if (!this.touchDownStarted) {
                return 0;
            }

            elapsed = _now() - this.touchDownStarted;

            if (this.touchUpStarted) {
                elapsed -= this.touchUpElapsed;
            }

            return elapsed;
        }

        /**
         * Gets the time in milliseconds elapsed from the moment where interaction with the wave was ended.
         *
         * @returns {Number} The time in milliseconds.
         */

    }, {
        key: 'touchUpElapsed',
        get: function get() {
            return this.touchUpStarted ? _now() - this.touchUpStarted : 0;
        }

        /**
         * Gets the time in seconds elapsed since the moment where interaction with the wave was started.
         *
         * @returns {Number} The time in seconds.
         */

    }, {
        key: 'touchDownElapsedSeconds',
        get: function get() {
            return this.touchDownElapsed / 1000;
        }

        /**
         * Gets the time in seconds elapsed since the moment where interaction with the wave was ended.
         *
         * @returns {number} The time in seconds.
         */

    }, {
        key: 'touchUpElapsedSeconds',
        get: function get() {
            return this.touchUpElapsed / 1000;
        }

        /**
         * Gets the total interaction time.
         *
         * @returns {Number} The time in seconds
         */

    }, {
        key: 'mouseInteractionSeconds',
        get: function get() {
            return this.touchDownElapsedSeconds + this.touchUpElapsedSeconds;
        }

        /**
         * Gets the wave's radius at the current time.
         *
         * @returns {Number} The value of the wave's radius.
         */

    }, {
        key: 'radius',
        get: function get() {
            var radius = Math.min(Math.sqrt(Math.pow(this.containerRect.width, 2) + Math.pow(this.containerRect.height, 2)), PaperWave.MAX_RADIUS) * 1.1 + 5,
                elapsed = 1.1 - 0.2 * (radius / PaperWave.MAX_RADIUS),
                currentTime = this.mouseInteractionSeconds / elapsed,
                actualRadius = radius * (1 - Math.pow(80, -currentTime));

            return Math.abs(actualRadius);
        }

        /**
         * Gets the wave's opacity at the current time.
         *
         * @returns {Number} The value of the wave's opacity.
         */

    }, {
        key: 'opacity',
        get: function get() {
            if (!this.touchUpStarted) {
                return this.initialOpacity;
            }

            return Math.max(0, this.initialOpacity - this.touchUpElapsedSeconds * this.opacityDecayVelocity);
        }

        /**
         * Gets the wave's outer opacity at the current time.
         *
         * @returns {Number} The value of the wave's outer opacity.
         */

    }, {
        key: 'outerOpacity',
        get: function get() {
            return Math.max(0, Math.min(this.touchUpElapsedSeconds * 0.3, this.opacity));
        }

        /**
         * Determines whether the wave is fully opaque or not.
         *
         * @returns {Boolean} `true`, if so, otherwise `false`.
         */

    }, {
        key: 'isWaveFullyOpaque',
        get: function get() {
            return this.opacity < 0.01 && this.radius >= Math.min(this.maxRadius, PaperWave.MAX_RADIUS);
        }

        /**
         * Determines whether the wave reached its max radius or not.
         *
         * @returns {Boolean} `true`, if so, otherwise `false`.
         */

    }, {
        key: 'isMaxRadiusReached',
        get: function get() {
            return this.opacity >= this.initialOpacity && this.radius >= Math.min(this.maxRadius, PaperWave.MAX_RADIUS);
        }

        /**
         * Determines whether the animation of rippling effect completed or not.
         *
         * @returns {Boolean} `true`, if so, otherwise `false`.
         */

    }, {
        key: 'isAnimationComplete',
        get: function get() {
            return this.touchUpStarted ? this.isWaveFullyOpaque : this.isMaxRadiusReached;
        }

        /**
         * Gets the wave's translation fraction value.
         *
         * @returns {Number} The value of the wave's translation fraction.
         */

    }, {
        key: 'translationFraction',
        get: function get() {
            return Math.min(1, this.radius / this.containerRect.size * 2 / Math.sqrt(2));
        }

        /**
         * Gets the wave's current position.
         *
         * @returns {{x: Number, y: Number}} Object containing coordinates of the wave's current position.
         */

    }, {
        key: 'currentPosition',
        get: function get() {
            var translateFraction = this.translationFraction,
                x = this.startPosition.x,
                y = this.startPosition.y;

            if (this.endPosition.x) {
                x = this.startPosition.x + translateFraction * (this.endPosition.x - this.startPosition.x);
            }

            if (this.endPosition.y) {
                y = this.startPosition.y + translateFraction * (this.endPosition.y - this.startPosition.y);
            }

            return { x: x, y: y };
        }

        /**
         * Determines whether the pointing device is still in interaction with the current wave.
         *
         * @returns {Boolean} `true`, if so, otherwise `false`.
         */

    }, {
        key: 'isTouchDown',
        get: function get() {
            return this.touchDownStarted && !this.touchUpStarted;
        }
    }]);

    return PaperWave;
})();
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

/**
 * Provides all the logic to produce ripple visual effect.
 * Other elements can use it to simulate rippling effect emanating from the point of contact.
 *
 * @class PaperRipple
 */

PaperWave.MAX_RADIUS = 300;

var PaperRipple = (function () {
    /**
     * Initializes a new instance of the `PaperRipple` class with the specified `config` object.
     *
     * @constructs PaperRipple
     * @param {(Object|Element)} [cfg={}] - A configuration object.
     * @param {Number} [cfg.initialOpacity=0.25] - The initial opacity of the each wave.
     * @param {Number} [cfg.opacityDecayVelocity=0.8] - How fast (opacity per second) the wave fades out.
     * @param {Boolean} [cfg.recenters=false] - If `true`, waves will exhibit a gravitational pull towards the center of their container as they fade away.
     * @param {Boolean} [cfg.center=false] - If `true`, waves will center inside its container.
     * @param {Boolean} [cfg.round=false] - If `true`, ripple effect will apply within a circle.
     * @param {Element} [cfg.target=null] - Target DOM element as the container for the waves.
     * If target element is not presented, then new one will be created automatically.
     * @returns {PaperRipple} The new instance of a class.
     *
     * @example
     * // Creating the new instance
     * var ripple = new PaperRipple({ recenters: true });
     *
     * // Appending it to another DOM element
     * ripple.$.appendTo(someEl);
     *
     * // Listening to that element's events and performing ripple effect
     * someEl.on({
     *     mousedown: function(ev) {
     *         ripple.downAction(ev);
     *     },
     *     mouseup: function() {
     *         ripple.upAction();
     *     }
     * );
     */

    function PaperRipple(cfg) {
        _classCallCheck(this, PaperRipple);

        var _ref4 = cfg || {};

        var _ref4$initialOpacity = _ref4.initialOpacity;
        var initialOpacity = _ref4$initialOpacity === undefined ? 0.25 : _ref4$initialOpacity;
        var _ref4$opacityDecayVel = _ref4.opacityDecayVelocity;
        var opacityDecayVelocity = _ref4$opacityDecayVel === undefined ? 0.8 : _ref4$opacityDecayVel;
        var _ref4$recenters = _ref4.recenters;
        var recenters = _ref4$recenters === undefined ? false : _ref4$recenters;
        var _ref4$center = _ref4.center;
        var center = _ref4$center === undefined ? false : _ref4$center;
        var _ref4$round = _ref4.round;
        var round = _ref4$round === undefined ? false : _ref4$round;
        var _ref4$target = _ref4.target;
        var target = _ref4$target === undefined ? null : _ref4$target;

        /**
         * Gets or sets the initial opacity of the each wave.
         *
         * @type {Number}
         */

        this.initialOpacity = initialOpacity;

        /**
         * Gets or sets how fast (opacity per second) the wave fades out.
         *
         * @type {Number}
         */
        this.opacityDecayVelocity = opacityDecayVelocity;

        /**
         * @type {PaperWave[]}
         * @private
         */
        this._waves = [];

        this._initTarget(cfg && cfg.nodeType ? cfg : target && target.nodeType ? target : null);

        /**
         * @type {Boolean}
         * @private
         */
        this.recenters = recenters || this.recenters;

        /**
         * @type {Boolean}
         * @private
         */
        this.center = center || this.center;

        /**
         * @type {Boolean}
         * @private
         */
        this.round = round || this.round;

        return this;
    }

    /**
     * Determines whether all the waves should be re-centered towards the center of the container.
     *
     * @returns {Boolean} If `true`, waves will exhibit a gravitational pull towards the center of the container as they fade away.
     */

    _createClass(PaperRipple, [{
        key: '_initTarget',

        /**
         * @param {HTMLElement} [target=null] - Target DOM element.
         * @returns {PaperRipple} Current instance for method chaining.
         * @private
         */
        value: function _initTarget() {
            var target = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

            var _doc = _doc || window.document;

            if (!this.$) {
                /**
                 * The object wrapper containing all the DOM elements belongs to the current instance.
                 *
                 * @type {Object}
                 */
                this.$ = target || _doc.createElement('div');
                this.$.classList.add('paper-ripple');
            }

            if (!this.$background) {
                /**
                 * The object wrapper containing the `$background` DOM element belongs to the current instance.
                 *
                 * @type {Object}
                 */
                this.$background = target && target.querySelector('.paper-ripple__background') || _doc.createElement('div');

                this.$background.classList.add('paper-ripple__background');
                this.$.appendChild(this.$background);
            }

            if (!this.$waves) {
                /**
                 * The object wrapper containing the waves container belongs to the current instance.
                 *
                 * @type {Object}
                 */
                this.$waves = target && target.querySelector('.paper-ripple__waves') || _doc.createElement('div');

                this.$waves.classList.add('paper-ripple__waves');
                this.$.appendChild(this.$waves);
            }

            return this;
        }

        /**
         * Adds new wave to the list of visual ripples.
         *
         * @returns {PaperWave} Current instance for method chaining.
         */

    }, {
        key: 'addWave',
        value: function addWave() {
            var wave = new PaperWave(this);

            this.$waves.appendChild(wave.$);
            this.$background.style.backgroundColor = wave.color;
            this._waves.push(wave);

            return wave;
        }

        /**
         * Produces a ripple-down effect.
         *
         * @param {(Event|{clientX: Number, clientY: Number}|{x: Number, y: Number})} [ev=null] - Object containing coordinates of the point of contact.
         * @returns {PaperRipple} Current instance for method chaining.
         */

    }, {
        key: 'downAction',
        value: function downAction(ev) {
            var wave = this.addWave();

            wave.downAction(ev);
            this.animate();

            return this;
        }

        /**
         * Produces a ripple-up effect.
         *
         * @returns {PaperRipple} Current instance for method chaining.
         */

    }, {
        key: 'upAction',
        value: function upAction() {
            this._waves.forEach(function (wave) {
                wave.upAction();
            });

            this.animate();

            return this;
        }

        /**
         * Removes given wave from the list of visual ripples.
         *
         * @param {PaperWave} wave - The wave to remove.
         * @returns {PaperRipple} Current instance for method chaining.
         */

    }, {
        key: 'removeWave',
        value: function removeWave(wave) {
            var waveIndex = this._waves.indexOf(wave);

            if (waveIndex < 0) {
                return this;
            }

            this._waves.splice(waveIndex, 1);

            wave.remove();

            return this;
        }

        /**
         * Animates all the waves in the list of visual ripples.
         *
         * @returns {PaperRipple} Current instance for method chaining.
         */

    }, {
        key: 'animate',
        value: function animate() {
            var i = undefined,
                l = undefined,
                wave = undefined;

            for (i = 0, l = this._waves.length; i < l; i++) {
                wave = this._waves[i];

                if (wave) {
                    wave.draw();

                    this.$background.style.opacity = wave.outerOpacity;

                    if (wave.isWaveFullyOpaque && !wave.isMaxRadiusReached) {
                        this.removeWave(wave);
                    }
                }
            }

            if (!this.shouldKeepAnimating && this._waves.length === 0) {
                this.$background.style.backgroundColor = null;
            } else {
                window.requestAnimationFrame(this.animate.bind(this));
            }

            return this;
        }
    }, {
        key: 'recenters',
        get: function get() {
            return this.$.hasAttribute('recenters');
        }

        /**
         * Sets the value that indicates whether all the waves should be re-centered towards the center of the container.
         *
         * @param {Boolean} [newValue=false] - The new value.
         * @returns {void} Nothing.
         */
        ,
        set: function set(newValue) {
            this.$[newValue ? 'setAttribute' : 'removeAttribute']('recenters', '');
        }

        /**
         * Determines whether all the waves should start a movement from the center of the container.
         *
         * @returns {Boolean} If `true`, waves will center inside its container
         */

    }, {
        key: 'center',
        get: function get() {
            return this.$.hasAttribute('center');
        }

        /**
         * Sets the value that indicates whether all the waves should start a movement from the center of the container.
         *
         * @param {Boolean} [newValue=false] - The new value.
         * @returns {void} Nothing.
         */
        ,
        set: function set(newValue) {
            this.$[newValue ? 'setAttribute' : 'removeAttribute']('center', '');
        }

        /**
         * Determines whether ripple effect should apply within a circle.
         * 
         * @returns {Boolean} If `true`, ripple effect will apply within a circle.
         */

    }, {
        key: 'round',
        get: function get() {
            return this.$.classList.contains('paper-ripple--round');
        }

        /**
         * Sets the value that indicates whether ripple effect should apply within a circle.
         * 
         * @param {Boolean} [newValue=false] - The new value.
         * @returns {void} Nothing.
         */
        ,
        set: function set(newValue) {
            this.$.classList.toggle('paper-ripple--round', newValue);
        }

        /**
         * Determines whether the ripple should keep animating or not.
         *
         * @returns {Boolean} `true`, if so, otherwise `false`.
         */

    }, {
        key: 'shouldKeepAnimating',
        get: function get() {
            return this._waves.some(function (wave) {
                return !wave.isAnimationComplete;
            });
        }
    }]);

    return PaperRipple;
})();

module.exports = PaperRipple;
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

var _touchEvents = (function () {
    return window.navigator.msPointerEnabled ? window.PointerEvent ? { down: 'pointerdown', up: 'pointerup' } : { down: 'MSPointerDown', up: 'MSPointerUp' } : { down: 'touchstart', up: 'touchend' };
})();

/**
 * paperRipple - makes each element in the current set able to produce a rippling effect within the element each time user interacts with the element.
 *
 * @param {(Object|HTMLElement)} [options=null] - A configuration object.
 * @returns {jQuery} Return the jQuery object itself.
 * @class paperRipple
 * @memberOf jQuery.fn
 */
$.fn.paperRipple = function (options) {
    return this.each(function () {
        var ripple = new PaperRipple(options),
            ev = {};

        ev['mousedown ' + _touchEvents.down] = function (e) {
            ripple.downAction(e);
        };
        ev['mouseup ' + _touchEvents.up] = function () {
            ripple.upAction();
        };

        $(this).prepand(ripple.$).on(ev);
    });
};
//# sourceMappingURL=paperRipple.jquery.js.map
}(window, jQuery, {}));
