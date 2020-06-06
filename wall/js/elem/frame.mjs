import { WallElem } from './base.mjs';

const EVCLASS = "wall-events";
export const EVLOAD = 'WallElemLoad';
export const EVUNLOAD = 'WallElemUnload';

Object.assign(WallElem.prototype, {
	load: async function load(original, fnname) {
		//const er = new Error();
		let page = original;
		while (page) { // I want a more generic concept for this.
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
			this.query('.' + EVCLASS).each(kid=>kid.fire(EVUNLOAD));
			this.clear();
			this.append(page);
			page.fire(EVLOAD);
			page.query('.'+EVCLASS).each(el=>el.fire(EVLOAD));
		} else {
			//console.log(er);
			throw new Error('WallFrame: unsupported type: ' + typeName(page) + ' :: original: ' + typeName(original));
		}
	},
	onload: function onload(fn) {
		this.on(EVLOAD, fn);
	},
	onunload: function onunload(fn) {
		this.on(EVUNLOAD, fn);
	}
});