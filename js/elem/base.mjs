import * as wall_type from '../type.mjs';
import * as elem_util from './util.mjs';
import * as qe from '../qelem.mjs';

export class WallElem {
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
	append(...args) {
		qe.append(this.elem, ...args);
	}
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
	get text() {
		return this.elem.textContent;
	}
	set text(val) {
		this.elem.textContent = val;
	}
	clear() {
		this.elem.innerHTML = ''; // fastest tested!
	}
	remove() {
		return this.elem.remove();
	}
	get comp() {
		return window.getComputedStyle(this.elem);
	}
	on(evname, evfn, props) {
		qe.on(this.elem, evname, evfn.bind(this), props);
	}
	emit(evname, detail) {
		return qe.emit(this.elem, evname, detail);
	}
}
