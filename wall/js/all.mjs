export * as type from './type.mjs';
export * as oddity from './oddity.mjs';
export * as args from './args.mjs';
export { elem } from './elem.mjs';
export { dom } from './dom.mjs';

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
import * as wall_page from './page.mjs';
const page = wrap(wall_page); // EVLOAD, EVUNLOAD
export { css, frame, page };
