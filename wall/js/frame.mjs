/**
 * Wall Frame
 */

import { WallElem } from './elem.mjs';
import { name as typeName } from './type.mjs';
import { EVLOAD, EVUNLOAD } from './page.mjs';

class WallFrame extends WallElem {
	constructor(elem) {
		super(elem);
	}
	async load(original, fnname) {
		//const er = new Error();
		let page = original;
		while (page) {
			if (page instanceof WallElem) {
				break;
			}
			if (page instanceof Promise) {
				page = await page;
			} else if (page instanceof Node) {
				page = new WallElem(page);
			} else if (page instanceof Function) {
				page = page();
			} else if (page instanceof Object || typeof page === 'object') {
				if (fnname === undefined) {
					fnname = 'default';
				}
				page = page[fnname];
			} else {
				//console.log(er);
				throw new Error('WallFrame: unsupported type: ' + typeName(page) + ' :: original: ' + typeName(original));
			}
		}
		if (page instanceof WallElem) {
			this.kids.each(kid=>kid.fire(EVUNLOAD));
			this.clear();
			this.append(page);
			page.fire(EVLOAD);
		} else {
			//console.log(er);
			throw new Error('WallFrame: unsupported type: ' + typeName(page) + ' :: original: ' + typeName(original));
		}
	}
	onhash(fn, runNow){
		// how do I want hashing?
		const bound = onhash(fn, runNow).bind(this);
		window.addEventListener('hashchange', bound);
		if (runNow) { bound(); }
	}
}

export function onhash(fn, runNow) {
	function wrap(ev){
		let hash = window.location.hash;
		if (hash[0] === '#') { hash = hash.slice(1); }
		fn.call(this, hash, ev);
	}
	window.addEventListener('hashchange', wrap);
	if (runNow) { wrap(); }
}

// The easiest idea, for later us, would be to make events async... on WallElem...
export default function frame(elem){
	return new WallFrame(elem ?? 'div');
}
