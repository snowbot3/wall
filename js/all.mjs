export * as type from './type.mjs';
export * as oddity from './oddity.mjs';
export * as args from './args.mjs';
export * as qe from './qelem.mjs';
export * as frame from './frame.mjs';
export { dom } from './dom.mjs';
export { doms } from './doms.mjs';

function wrap(mod) {
	function wrap(...params) {
		return mod.default(...params);
	}
	Object.assign(wrap, mod);
	return wrap;
}

import * as wall_elem from './elem.mjs';
const elem = wrap(wall_elem);
import * as wall_css from './css.mjs';
const css = wrap(wall_css);
export { elem, css };
