import { WallElem } from './base.mjs';
import { cycle } from '../oddity.mjs';
import { name as typeName } from '../type.mjs';

const EVCLASS = "WallLoad";
export const EVLOAD = 'WallLoad';
export const EVUNLOAD = 'WallUnload';

Object.assign(WallElem.prototype, {
	load: async function load(original, fnname) {
		//const er = new Error();
		let page = cycle(original, fnname || 'default', true);
		if (page instanceof Promise) { page = await page; }
		if (page instanceof Node) {
			page = new WallElem(page);
		}
		if (page instanceof WallElem) {
			this.query('.' + EVCLASS).each(kid=>kid.fire(EVUNLOAD));
			this.clear();
			this.append(page);
			page.fire(EVLOAD);
			page.query('.'+EVCLASS).each(el=>el.fire(EVLOAD));
		} else {
			//console.log(er);
			throw new Error(`WallElem.load: unsupported type: ${typeName(page)} :: original: ${typeName(original)}`);
		}
	},
	onload: function onload(fn) {
		this.on(EVLOAD, fn);
	},
	onunload: function onunload(fn) {
		this.on(EVUNLOAD, fn);
	}
});