/**
 * Wall Frame
 */

//import { WallElem } from './elem.mjs';
import * as qe from './qelem.mjs';
import { cycle } from './oddity.mjs';

export function onhash(fn, runNow) {
	function wrap(ev){
		let hash = window.location.hash;
		if (hash[0] === '#') { hash = hash.slice(1); }
		fn.call(this, hash, ev);
	}
	qe.on(window, 'hashchange', wrap);
	if (runNow) { wrap(); }
}

// todo: pull out frame loading concept from WallElem.
// Need a design that works for std DomElement(s).
const EVCLASS = "WallLoad";
export const EVLOAD = 'WallLoad';
export const EVUNLOAD = 'WallUnload';
function emitMany(elem, name) {
	if (elem.classList.contains(EVCLASS)) {
		qe.emit(elem, name);
	}
	const list = [...qe.query(elem, '.'+EVCLASS)];
	list.forEach((el)=>qe.emit(el, name));
}
function loadInner(elem, page) {
	if (page instanceof Node) {
		emitMany(elem, EVUNLOAD);
		qe.clear(elem);
		qe.append(elem, page);
		emitMany(elem, EVLOAD);
	} else if (page instanceof Object && page.elem instanceof Node) {
		loadInner(elem, page.elem);
	} else {
		throw new Error(`WallElem.load: unsupported type: ${typeName(page)} :: original: ${typeName(original)}`);
	}
}
export async function load(elem, original, fnname) {
	let page = cycle(original, fnname || 'default', true); // last param is true to evaluate returned function.
	if (page instanceof Promise) { page = await page; }
	loadInner(elem, page);
}
export function onload(elem, fn) {
	qe.on(elem, EVLOAD, fn);
	elem.classList.add(EVCLASS);
}
export function onunload(elem, fn) {
	qe.on(elem, EVUNLOAD, fn);
	elem.classList.add(EVCLASS);
}

// todo: depricate.
// The easiest idea, for later us, would be to make events async... on WallElem...
/*export default function frame(elem){
	return new WallElem(elem ?? 'div');
}*/
