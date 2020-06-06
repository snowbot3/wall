/**
 * Wall Frame
 */

import { WallElem } from './elem.mjs';

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
	return new WallElem(elem ?? 'div');
}
