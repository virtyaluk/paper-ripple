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
class PaperRipple {
    /**
     * Initializes a new instance of the `PaperRipple` class with the specified `config` object.
     *
     * @constructs PaperRipple
     * @param {(Object|Element)} [cfg={}] - A configuration object.
     * @param {Number} [cfg.initialOpacity=0.25] - The initial opacity of the each wave.
     * @param {Number} [cfg.opacityDecayVelocity=0.8] - How fast (opacity per second) the wave fades out.
     * @param {Boolean} [cfg.recenters=false] - If `true`, waves will exhibit a gravitational pull towards the center of their container as they fade away.
     * @param {Boolean} [cfg.center=false] - If `true`, waves will center inside its container.
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
    constructor(cfg) {
        let { initialOpacity = 0.25, opacityDecayVelocity = 0.8, recenters = false, center = false, target = null } = cfg || {};

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

        return this;
    }

    /**
     * Determines whether all the waves should be re-centered towards the center of the container.
     *
     * @returns {Boolean} If `true`, waves will exhibit a gravitational pull towards the center of the container as they fade away.
     */
    get recenters() {
        return this.$.hasAttribute('recenters');
    }

    /**
     * Sets the value that indicates whether all the waves should be re-centered towards the center of the container.
     *
     * @param {Boolean} [newValue=false] - The new value.
     * @returns {void} Nothing.
     */
    set recenters(newValue) {
        this.$[newValue ? 'setAttribute' : 'removeAttribute']('recenters', '');
    }

    /**
     * Determines whether all the waves should start a movement from the center of the container.
     *
     * @returns {Boolean} If `true`, waves will center inside its container
     */
    get center() {
        return this.$.hasAttribute('center');
    }

    /**
     * Sets the value that indicates whether all the waves should start a movement from the center of the container.
     *
     * @param {Boolean} [newValue=false] - The new value.
     * @returns {void} Nothing.
     */
    set center(newValue) {
        this.$[newValue ? 'setAttribute' : 'removeAttribute']('center', '');
    }

    /**
     * Determines whether the ripple should keep animating or not.
     *
     * @returns {Boolean} `true`, if so, otherwise `false`.
     */
    get shouldKeepAnimating() {
        return this._waves.some(wave => !wave.isAnimationComplete);
    }

    /**
     * @param {HTMLElement} [target=null] - Target DOM element.
     * @returns {PaperRipple} Current instance for method chaining.
     * @private
     */
    _initTarget(target = null) {
        let _doc = _doc || window.document;

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
    addWave() {
        let wave = new PaperWave(this);

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
    downAction(ev) {
        let wave = this.addWave();

        wave.downAction(ev);
        this.animate();

        return this;
    }

    /**
     * Produces a ripple-up effect.
     *
     * @returns {PaperRipple} Current instance for method chaining.
     */
    upAction() {
        this._waves.forEach(wave => {
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
    removeWave(wave) {
        let waveIndex = this._waves.indexOf(wave);

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
    animate() {
        let i,
            l,
            wave;

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
}

module.exports = PaperRipple;