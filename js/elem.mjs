/** @module wall-elem **/

import { dom } from './dom.mjs';
import { WallElem } from './elem/base.mjs';
import './elem/list.mjs';
import './elem/frame.mjs';

export { WallElem } from './elem/base.mjs';
export { WallElemList } from './elem/list.mjs';

// const dt = elem`div class=turtle`;
// still acts like before, but elem templating code is in wall-dom now.
/**
 * WallElem wrapper for dom call
 * @param {Function | Object | String} params Crazy Possibilities
 * @returns WallElem | Function
 */
export default function elem(...params) {
	let init = dom;
	if (params.length > 0 && params[0] instanceof Function) {
		init = params.shift();
	}
	const rtn = init(...params);
	if (rtn instanceof Function) {
		return elem.bind(this, rtn);
	}
	return new WallElem(rtn);
}

/**
 * 
 * @param id {string}
 * @param params {...(Object | string)}
 * @returns WallElem
 */
export function id(id, ...params) {
	let node = document.getElementById(id);
	return elem(node, ...params);
}

/**
 * 
 * @param sel {string} query selector
 * @returns WallElem
 */
export function query(sel) {
	let doc = elem(document.documentElement);
	return doc.query(sel);
}
