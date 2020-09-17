export * as type from './type.mjs';
export * as oddity from './oddity.mjs';
export * as args from './args.mjs';
export * as qe from './qelem.mjs';
export * as frame from './frame.mjs';
export { dom } from './dom.mjs';
export { doms } from './doms.mjs';
export { elem } from './elem.mjs';

function wrap(mod) {
	function wrap(...params) {
		return mod.default(...params);
	}
	Object.assign(wrap, mod);
	return wrap;
}

import * as wall_css from './css.mjs';
const css = wrap(wall_css);
export { css };
