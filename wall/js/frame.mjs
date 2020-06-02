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
		const er = new Error();
		let page = await original;
		if (page instanceof Object || typeof page === 'object') {
			if (fnname === undefined) {
				fnname = 'default';
			}
			page = page[fnname];
		}
		if (page instanceof Function) {
			page = await page();
		}
		// Should I allow string?
		if (page instanceof Node) {
			page = new WebElem(page);
		}
		if (page instanceof WallElem) {
			this.kids.each(kid=>kid.fire(EVUNLOAD));
			this.clear();
			this.append(page);
			page.fire(EVLOAD);
		} else {
			console.log(er);
			throw new Error('WallFrame: unsupported type: ' + typeName(original), er);
		}
	}
	onhash(fn, runNow){
		// how do I want hashing?
		const bound = fn.bind(this);
		window.addEventListener('hashchange', bound);
		if (runNow) { bound(); }
	}
}

// The easiest idea, for later us, would be to make events async... on WallElem...
export default function frame(elem){
	return new WallFrame(elem ?? 'div');
}
