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
 'use strict';

System.register('PaperRipple', [], function (_export, _context) {
  "use strict";

  var _createClass, ElementRect, _window, _doc, _now, PaperWave, PaperRipple;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      ElementRect = function () {
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
          value: function distanceToFarthestCorner(_ref) {
            var _ref$x = _ref.x,
                x = _ref$x === undefined ? 0 : _ref$x,
                _ref$y = _ref.y,
                y = _ref$y === undefined ? 0 : _ref$y;

            return Math.max(ElementRect.euclideanDistance({ x: x, y: y }, { x: 0, y: 0 }), ElementRect.euclideanDistance({ x: x, y: y }, { x: this.width, y: 0 }), ElementRect.euclideanDistance({ x: x, y: y }, { x: 0, y: this.height }), ElementRect.euclideanDistance({ x: x, y: y }, { x: this.width, y: this.height }));
          }
        }, {
          key: 'contains',
          value: function contains(_ref2) {
            var x = _ref2.x,
                y = _ref2.y,
                clientX = _ref2.clientX,
                clientY = _ref2.clientY;

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
        }, {
          key: 'boundingRect',
          get: function get() {
            return this._element.getBoundingClientRect();
          }
        }], [{
          key: 'euclideanDistance',
          value: function euclideanDistance(point1, point2) {
            return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
          }
        }]);

        return ElementRect;
      }();

      _window = window || undefined;
      _doc = _window.document;

      _now = function () {
        return _window.performance && _window.performance.now ? _window.performance.now.bind(_window.performance) : Date.now;
      }();

      PaperWave = function () {
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
          var $ = _ref3.$,
              _ref3$recenters = _ref3.recenters,
              recenters = _ref3$recenters === undefined ? false : _ref3$recenters,
              _ref3$center = _ref3.center,
              center = _ref3$center === undefined ? false : _ref3$center,
              _ref3$initialOpacity = _ref3.initialOpacity,
              initialOpacity = _ref3$initialOpacity === undefined ? 0.25 : _ref3$initialOpacity,
              _ref3$opacityDecayVel = _ref3.opacityDecayVelocity,
              opacityDecayVelocity = _ref3$opacityDecayVel === undefined ? 0.8 : _ref3$opacityDecayVel;

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
        }, {
          key: 'draw',
          value: function draw() {
            var cssString = void 0,
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
        }, {
          key: 'downAction',
          value: function downAction() {
            var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

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
        }, {
          key: 'remove',
          value: function remove() {
            this.$.parentNode.removeChild(this.$);

            return this;
          }
        }, {
          key: 'touchDownElapsed',
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
        }, {
          key: 'touchUpElapsed',
          get: function get() {
            return this.touchUpStarted ? _now() - this.touchUpStarted : 0;
          }
        }, {
          key: 'touchDownElapsedSeconds',
          get: function get() {
            return this.touchDownElapsed / 1000;
          }
        }, {
          key: 'touchUpElapsedSeconds',
          get: function get() {
            return this.touchUpElapsed / 1000;
          }
        }, {
          key: 'mouseInteractionSeconds',
          get: function get() {
            return this.touchDownElapsedSeconds + this.touchUpElapsedSeconds;
          }
        }, {
          key: 'radius',
          get: function get() {
            var radius = Math.min(Math.sqrt(Math.pow(this.containerRect.width, 2) + Math.pow(this.containerRect.height, 2)), PaperWave.MAX_RADIUS) * 1.1 + 5,
                elapsed = 1.1 - 0.2 * (radius / PaperWave.MAX_RADIUS),
                currentTime = this.mouseInteractionSeconds / elapsed,
                actualRadius = radius * (1 - Math.pow(80, -currentTime));

            return Math.abs(actualRadius);
          }
        }, {
          key: 'opacity',
          get: function get() {
            if (!this.touchUpStarted) {
              return this.initialOpacity;
            }

            return Math.max(0, this.initialOpacity - this.touchUpElapsedSeconds * this.opacityDecayVelocity);
          }
        }, {
          key: 'outerOpacity',
          get: function get() {
            return Math.max(0, Math.min(this.touchUpElapsedSeconds * 0.3, this.opacity));
          }
        }, {
          key: 'isWaveFullyOpaque',
          get: function get() {
            return this.opacity < 0.01 && this.radius >= Math.min(this.maxRadius, PaperWave.MAX_RADIUS);
          }
        }, {
          key: 'isMaxRadiusReached',
          get: function get() {
            return this.opacity >= this.initialOpacity && this.radius >= Math.min(this.maxRadius, PaperWave.MAX_RADIUS);
          }
        }, {
          key: 'isAnimationComplete',
          get: function get() {
            return this.touchUpStarted ? this.isWaveFullyOpaque : this.isMaxRadiusReached;
          }
        }, {
          key: 'translationFraction',
          get: function get() {
            return Math.min(1, this.radius / this.containerRect.size * 2 / Math.sqrt(2));
          }
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
        }, {
          key: 'isTouchDown',
          get: function get() {
            return this.touchDownStarted && !this.touchUpStarted;
          }
        }]);

        return PaperWave;
      }();

      PaperWave.MAX_RADIUS = 300;

      PaperRipple = function () {
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

          var _ref4 = cfg || {},
              _ref4$initialOpacity = _ref4.initialOpacity,
              initialOpacity = _ref4$initialOpacity === undefined ? 0.25 : _ref4$initialOpacity,
              _ref4$opacityDecayVel = _ref4.opacityDecayVelocity,
              opacityDecayVelocity = _ref4$opacityDecayVel === undefined ? 0.8 : _ref4$opacityDecayVel,
              _ref4$recenters = _ref4.recenters,
              recenters = _ref4$recenters === undefined ? false : _ref4$recenters,
              _ref4$center = _ref4.center,
              center = _ref4$center === undefined ? false : _ref4$center,
              _ref4$round = _ref4.round,
              round = _ref4$round === undefined ? false : _ref4$round,
              _ref4$target = _ref4.target,
              target = _ref4$target === undefined ? null : _ref4$target;

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
          value: function _initTarget() {
            var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            // eslint-disable-next-line no-use-before-define
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
        }, {
          key: 'addWave',
          value: function addWave() {
            var wave = new PaperWave(this);

            this.$waves.appendChild(wave.$);
            this.$background.style.backgroundColor = wave.color;
            this._waves.push(wave);

            return wave;
          }
        }, {
          key: 'downAction',
          value: function downAction(ev) {
            var wave = this.addWave();

            wave.downAction(ev);
            this.animate();

            return this;
          }
        }, {
          key: 'upAction',
          value: function upAction() {
            this._waves.forEach(function (wave) {
              wave.upAction();
            });

            this.animate();

            return this;
          }
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
        }, {
          key: 'animate',
          value: function animate() {
            var i = void 0,
                l = void 0,
                wave = void 0;

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
          },
          set: function set(newValue) {
            this.$[newValue ? 'setAttribute' : 'removeAttribute']('recenters', '');
          }
        }, {
          key: 'center',
          get: function get() {
            return this.$.hasAttribute('center');
          },
          set: function set(newValue) {
            this.$[newValue ? 'setAttribute' : 'removeAttribute']('center', '');
          }
        }, {
          key: 'round',
          get: function get() {
            return this.$.classList.contains('paper-ripple--round');
          },
          set: function set(newValue) {
            this.$.classList.toggle('paper-ripple--round', newValue);
          }
        }, {
          key: 'shouldKeepAnimating',
          get: function get() {
            return this._waves.some(function (wave) {
              return !wave.isAnimationComplete;
            });
          }
        }]);

        return PaperRipple;
      }();

      module.exports = PaperRipple;
    }
  };
});
//# sourceMappingURL=PaperRipple.js.map
