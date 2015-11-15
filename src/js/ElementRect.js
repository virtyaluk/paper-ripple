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
class ElementRect {
    /**
     * Initializes a new instance of the `ElementRect` class with the specified `element`.
     *
     * @constructs ElementRect
     * @param {HTMLElement} element - The DOM element to get metrics from
     * @returns {ElementRect} The new instance of a class.
     */
    constructor(element) {
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
    get center() {
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
    get boundingRect() {
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
    static euclideanDistance(point1, point2) {
        return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
    }

    /**
     * Calculates the distance between given point and farthest corner of the current element.
     *
     * @param {{ x: Number, y:Number }} [point={x:0,y:0}] - The point object containing x and y coordinates.
     * @returns {Number} Distance from a point to the container's farthest corner.
     */
    distanceToFarthestCorner({ x = 0, y = 0 }) {
        return Math.max(
            ElementRect.euclideanDistance({ x, y }, { x: 0, y: 0 }),
            ElementRect.euclideanDistance({ x, y }, { x: this.width, y: 0 }),
            ElementRect.euclideanDistance({ x, y }, { x: 0, y: this.height }),
            ElementRect.euclideanDistance({ x, y }, { x: this.width, y: this.height })
        );
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
    contains({ x, y, clientX, clientY }) {
        let l = this.boundingRect.left,
            t = this.boundingRect.top,
            w = this.boundingRect.width,
            h = this.boundingRect.height,
            _x = x || clientX || 0,
            _y = y || clientY || 0;

        return _x >= l && _x <= l + w && _y >= t && _y <= t + h;
    }
}