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

let _window = window || this,
    _doc = _window.document,
    _now = (function() {
        return _window.performance && _window.performance.now ? _window.performance.now.bind(_window.performance) : Date.now;
    }());

/**
 * Provides all the logic to produce a one-time rippling effect.
 *
 * @class PaperWave
 */
class PaperWave {
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
    constructor({ $, recenters = false, center = false, initialOpacity = 0.25, opacityDecayVelocity = 0.8 }) {
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
    static MAX_RADIUS = 300;


    /**
     * Gets the time in milliseconds elapsed from the moment where interaction with the wave was started.
     *
     * @returns {Number} The time in milliseconds.
     */
    get touchDownElapsed() {
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
    get touchUpElapsed() {
        return this.touchUpStarted ? _now() - this.touchUpStarted : 0;
    }

    /**
     * Gets the time in seconds elapsed since the moment where interaction with the wave was started.
     *
     * @returns {Number} The time in seconds.
     */
    get touchDownElapsedSeconds() {
        return this.touchDownElapsed / 1000;
    }

    /**
     * Gets the time in seconds elapsed since the moment where interaction with the wave was ended.
     *
     * @returns {number} The time in seconds.
     */
    get touchUpElapsedSeconds() {
        return this.touchUpElapsed / 1000;
    }

    /**
     * Gets the total interaction time.
     *
     * @returns {Number} The time in seconds
     */
    get mouseInteractionSeconds() {
        return this.touchDownElapsedSeconds + this.touchUpElapsedSeconds;
    }

    /**
     * Gets the wave's radius at the current time.
     *
     * @returns {Number} The value of the wave's radius.
     */
    get radius() {
        let radius = Math.min(
                Math.sqrt(Math.pow(this.containerRect.width, 2) + Math.pow(this.containerRect.height, 2)),
                PaperWave.MAX_RADIUS
                ) * 1.1 + 5,
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
    get opacity() {
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
    get outerOpacity() {
        return Math.max(0, Math.min(this.touchUpElapsedSeconds * 0.3, this.opacity));
    }

    /**
     * Determines whether the wave is fully opaque or not.
     *
     * @returns {Boolean} `true`, if so, otherwise `false`.
     */
    get isWaveFullyOpaque() {
        return this.opacity < 0.01 && this.radius >= Math.min(this.maxRadius, PaperWave.MAX_RADIUS);
    }

    /**
     * Determines whether the wave reached its max radius or not.
     *
     * @returns {Boolean} `true`, if so, otherwise `false`.
     */
    get isMaxRadiusReached() {
        return this.opacity >= this.initialOpacity && this.radius >= Math.min(this.maxRadius, PaperWave.MAX_RADIUS);
    }

    /**
     * Determines whether the animation of rippling effect completed or not.
     *
     * @returns {Boolean} `true`, if so, otherwise `false`.
     */
    get isAnimationComplete() {
        return this.touchUpStarted ? this.isWaveFullyOpaque : this.isMaxRadiusReached;
    }

    /**
     * Gets the wave's translation fraction value.
     *
     * @returns {Number} The value of the wave's translation fraction.
     */
    get translationFraction() {
        return Math.min(1, this.radius / this.containerRect.size * 2 / Math.sqrt(2));
    }

    /**
     * Gets the wave's current position.
     *
     * @returns {{x: Number, y: Number}} Object containing coordinates of the wave's current position.
     */
    get currentPosition() {
        let translateFraction = this.translationFraction,
            x = this.startPosition.x,
            y = this.startPosition.y;

        if (this.endPosition.x) {
            x = this.startPosition.x + translateFraction * (this.endPosition.x - this.startPosition.x);
        }

        if (this.endPosition.y) {
            y = this.startPosition.y + translateFraction * (this.endPosition.y - this.startPosition.y);
        }

        return { x, y };
    }

    /**
     * Determines whether the pointing device is still in interaction with the current wave.
     *
     * @returns {Boolean} `true`, if so, otherwise `false`.
     */
    get isTouchDown() {
        return this.touchDownStarted && !this.touchUpStarted;
    }

    /**
     * Resets all the wave's values.
     *
     * @returns {PaperWave} Current instance for method chaining.
     */
    resetDefaults() {
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
    draw() {
        let cssString,
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
    downAction(event = null) {
        let containerCenter = this.containerRect.center;

        this.resetDefaults();

        this.touchDownStarted = _now();
        this.startPosition = this.center || !event ?
            containerCenter :
            {
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
    upAction() {
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
    remove() {
        this.$.parentNode.removeChild(this.$);

        return this;
    }
}