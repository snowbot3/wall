//import { WallElemList } from './list.mjs';
import * as wall_type from '../type.mjs';

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
	_appendSingle(...args) {
		wall_type.run(this, args,
			[WallElem], function(elem) {
				this.elem.appendChild(elem.elem);
			},
			[Node], function(node) {
				this.elem.appendChild(node);
			},
			function(arg) {
				this.elem.appendChild(
					document.createTextNode(arg)
				);
			});
	}
	append(...args) {
		args.forEach(function(arg){
			this._appendSingle(arg);
		}, this);
	}
	props(props) {
		for (let key in props) {
			this.prop(key, props[key]);
		}
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
				// make a map when more are needed
				if ( key == 'class' ) { key = 'className'; }
				this.elem[key] = val;
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
		this.elem.innerHTML = ''; // fasts tested!
	}
	/* * query was here * */
	remove() {
		return this.elem.remove();
	}
	get comp() {
		return window.getComputedStyle(this.elem);
	}
	on(evname, evfn, props) {
		this.elem.addEventListener(evname, evfn.bind(this), props);
	}
	fire(evname, detail) {
		const ev = new CustomEvent(evname, {
			//bubbles: true,
			detail: detail || {}
		});
		return this.elem.dispatchEvent(ev);
	}
}
