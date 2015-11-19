<h1 align="center">
	<img width="256" src="https://raw.githubusercontent.com/virtyaluk/paper-ripple/master/media/paper-ripple.png" alt="mutation-watcher" style="clear: right;">
<br/>
PaperRipple

</h1>

> Material Design Ripple effect in pure JS & CSS.
 
**PaperRipple** lets you add a Material Design [ripple effect](https://www.google.com/design/spec/animation/responsive-interaction.html#responsive-interaction-surface-reaction) to UI elements.

## Install

##### Bower:

```bash
$ bower install paper-ripple
```

##### NPM:
```bash
$ npm install paper-ripple --save
```

## How it looks like

![](https://raw.githubusercontent.com/virtyaluk/paper-ripple/master/media/demo.gif)

Live example at [codepen](http://codepen.io/virtyaluk/pen/BoMXKM).

## Usage

First, you need to include **PaperRipple** JS and CSS files to your HTML-page.

Assume, you have next HTML:
````html
<button class="paper-button">button</button>
<button class="paper-button blue-text">button</button>
<button class="paper-button orange-text">button</button>
````

Your JS will look like:
```js
// // Getting all the buttons
var button = document.querySelectorAll('button.paper-button');

// Traversing the buttons
[].forEach.call(buttons, function(button) {
	// New PaperRipple for the button
	var ripple = new PaperRipple();
	
	// Adding ripple container to the button
	button.appendChild(ripple.$);

	// Subscribing to 'mousedown' and 'mouseup' button events to activate ripple effect
	// when a user clicks on the button.
	button.addEventListener('mousedown', function(ev) {
		ripple.downAction(ev);
	});
	button.addEventListener('mouseup', function() {
		ripple.upAction();
	});
});
```

__NOTE:__ It's important that each element you add the ripple to must be relative position.

If you prefer to work with modules in JS, **PaperRipple** exports itself in AMD, CommonJS and as global variable if no `require` or `module` were found. In addition, under `dist\systemjs` you may find **PaperRipple** as SystemJS module.

Even more, if you prefer to work with jQuery you may find jQuery plugin based on **PaperRipple** under `dist` folder. So, the previous example may be simplified to the next:

```js
$('button.paper-button').paperRipple();
```

### Configuration

You may pass additional options to the constructor to control **PaperRipple** behavior:

```js
var ripple = new PaperRipple(cfg);
```

If you have DOM element you want to use as **PaparRipple** element, pass it to the constructor. But be careful, **PaperRipple** element must follow next structure:

```html
<div class="paper-ripple">
	<!-- optional -->
	<div class="paper-ripple__background"></div>

	<!-- optional -->
	<div class="paper-ripple__waves"></div>
</div>
```

```js
var rippleEl = document.querySelector('.paper-ripple'),
	ripple = new PaperRipple(rippleEl);

assert(ripple.$ === rippleEl); // true
```

Or you may pass object containing next options:

* `initialOpacity`: *Number* - Defaults to `0.25`. The initial opacity of the each wave.
* `opacityDecayVelocity`: *Number* - Defaults to `0.8`. How fast (opacity per second) the wave fades out.
* `recenters`: *Boolean* - Defaults to `false`. If `true`, waves will exhibit a gravitational pull towards the center of their container as they fade away.
* `center`: *Boolean* - Defaults to `false`. If `true`, waves will center inside its container.
* `target`: *HTMLElement* - Defaults to `null`. Target DOM element as the container for the waves.

```js
var ripple = new PaperRipple({
	initialOpacity: 0.3,
	recenters: true
});
```

Each of these options may be changed after initializing:

```js
ripple.center = true;
ripple.opacityDecayVelocity = 0.7;
```
**NOTE:** Changing of `$`, `$background` or `$waves` after initialization not recommended.

### Styling

Use CSS color property to style the ripple:

```css
.paper-ripple {
	color: #FF9800;
}
```

**NOTE:** CSS color property is inherited so it is not required to set it on the `.paper-ripple` directly.

If you want to make the rippling effect within a circle, add `.paper-ripple--round` to main DOM element:

```js
var ripple = new PaperRipple();

ripple.$.classList.add('paper-ripple--round').
```

## Browser Support

- Chrome
- Firefox
- Safari
- Opera
- IE9+

__NOTE:__ IE9 doesn't support `classList` on `HTMLElement` object and `requestAnimationFrame`. You need to polyfill it. My choice: classList - [`bower install classlist`](https://github.com/components/classList.js) or [`npm install classlist-polyfill`](https://github.com/yola/classlist-polyfill); requestAnimationFrame - [`bower install window.requestanimationframe`](https://github.com/Polyfiller/window.requestAnimationFrame) or [`npm install window.requestanimationframe`](https://github.com/Polyfiller/window.requestAnimationFrame).

## Docs

**PaperRipple** JS has an excellent documentation. [Esdoc](https://github.com/nanopx/gulp-esdoc) is used to generate it. To generate it by yourself do following:

Clone the repo:

```bash
$ git clone https://github.com/virtyaluk/paper-ripple.git
```
Install dependencies:

```bash
$ npm install -g gulp && npm install
```

Generate the docs:

```bash
$ gulp docs
```

Docs will be available under `docs` folder in the root of the project.

## Running tests

Install dependencies:

```bash
$ npm install
```

Run them:

```bash
$ gulp test
```

## License

### MIT