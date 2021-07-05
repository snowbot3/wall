/** @module wall-elem-base */

import * as wall_type from '../type.mjs';
import * as elem_util from './util.mjs';
import * as qe from '../qelem.mjs';

/** Class shorthand wrapper for DomElement */
export class WallElem {
	/**
	 * Create WallElem
	 * @param {DomElement | String} node - element to wrap or tag name of element to create
	 */
	constructor(node) {
		if (wall_type.is(String, node)) {
			node = document.createElement(node);
		} else if (wall_type.is(WallElem, node)) {
			node = node.elem;
		}
		if (!wall_type.is(Node, node)) {
			throw new Error('not allowed argument types: ' + typeof node);
		}
		this.elem = node;
	}
	/**
	 * Append elements or text
	 * @param {...(WallElem | DomElement | String)} children - elements or text to append
	 */
	append(...args) {
		qe.append(this.elem, ...args);
	}
	/**
	 * Alter properties of element
	 * @param {Object} props - name-values to alter
	 */
	props(props) {
		elem_util.handleProps(this.elem, props);
	}
	// for [String, Object] the prop settings should be recursive
	// I would like 2 specials (so far) 'on' and 'data'
	// onclick vs data-header? but data-header requires quotes...
	// what about camel? onClick dataHeaderTitle?
	// does not handle custom events.
	prop(...args) {
		return wall_type.run(this, args,
			[String], function(key) {
				return this.elem[key];
			},
			[String, 'any'], function(key, val) {
				elem_util.handleProp(this.elem, key, val);
			},
			function(arg){
				throw new Error(`wall-elem: ${args}`);
			});
	}
	/** get textContent */
	get text() {
		return this.elem.textContent;
	}
	/** set textContent */
	set text(val) {
		this.elem.textContent = val;
	}
	/** remove all children */
	clear() {
		this.elem.innerHTML = ''; // fastest tested!
	}
	/** remove self from parent element */
	remove() {
		return this.elem.remove();
	}
	/** getComputedStyle */
	get comp() {
		return window.getComputedStyle(this.elem);
	}
	/** event binding */
	on(evname, evfn, props) {
		qe.on(this.elem, evname, evfn.bind(this), props);
	}
	/** event emitting */
	emit(evname, detail) {
		return qe.emit(this.elem, evname, detail);
	}
}
