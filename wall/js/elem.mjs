/** wall-elem **/

//import { is as isType, isSimpleObject, run as typeRun } from './type.mjs';
import * as wall_type from './type.mjs';
import tmplProps from './props.mjs';

export class WallElem {
	constructor(node) {
		if (wall_type.is(String, node)) {
			node = document.createElement(node);
		} else if (wall_type.is(WallElem, node)) {
			node = node.elem;
		}
		if (!wall_type.is(Node, node)) {
			console.log([node, ...params]);
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
	query(selector) {
		const list = this.elem.querySelectorAll(selector);
		//return Array.prototype.map.call(list, (el)=>new WallElem(el));
		return new WallElemList(list);
	}
	// queryOne?
	get kids() {
		return new WallElemList(this.elem.children);
	}
	remove() {
		return this.elem.remove();
	}
	comp() {
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

/*
class AsyncEventTarget {
	constructor() {
		this.events = {};
	}
	on(evname, evfn) {
		// what if async functions are bound on 3 children elements?
		// but is fired from here...
	}
}
*/

export class WallElemList extends Array {
	constructor(elems) {
		super(...elems);
		/*if (elems && elems.length) {
			this.push(...elems);
		}*/
	}
	get(index) {
		return new WallElem(this[index]);
	}
	each(fn, ...params) {
		const list = this;
		return this.forEach(function(node, ind, arr){
			const elem = list.get(ind);
			fn.call(elem, elem, ind, arr);
		}, ...params);
	}
	// forEach(function(value, index, array){});
	// forEachW(function(wallelem, index, array, elem){});
}

function isTagTmpl(param) {
	return (
		param instanceof Array
		&& param.raw instanceof Array
	);
}

function elemTagTmplBind(...params) {
	const tind = params.findIndex(isTagTmpl, 1);
	const props = tmplProps(...params.splice(tind));
	return elem.bind(this, ...params, props); // stacking binds?
}

export function elem(node, ...params /*...props, ...children*/) {
	if (params.some(isTagTmpl)) {
		return elemTagTmplBind(node, ...params);
	}
	const elem = new WallElem(node);
	while (params.length > 0 && wall_type.is('simple', params[0])) {
		elem.props(params.shift());
	}
	elem.append(...params);
	return elem;
}
