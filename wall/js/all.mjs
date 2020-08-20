export * as type from './type.mjs';
export * as oddity from './oddity.mjs';
export * as args from './args.mjs';
export { elem } from './elem.mjs';
export { doms } from './doms.mjs';

function wrap(mod) {
	function wrap(...params) {
		return mod.default(...params);
	}
	Object.assign(wrap, mod);
	return wrap;
}

import * as wall_css from './css.mjs';
const css = wrap(wall_css);
import * as wall_frame from './frame.mjs';
const frame = wrap(wall_frame);
export { css, frame };
