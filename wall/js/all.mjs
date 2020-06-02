export * as type from './type.mjs';
export * as oddity from './oddity.mjs';
export * as args from './args.mjs';
export { elem } from './elem.mjs';
export { dom } from './dom.mjs';

// { frame, onhash } => frame.onhash
export { default as frame } from './frame.mjs';

export { default as page, EVLOAD, EVUNLOAD } from './page.mjs';
/*import * as wall_page from './page.mjs';
function page(...params) {
	return wall_page.default(...params);
}
for (let key in wall_page) {
	page[key] = wall_page[key];
}
export { page };*/

import * as wall_css from './css.mjs';
function css(...params) {
	return wall_css.css(...params);
}
for (let key in wall_css) {
	css[key] = wall_css[key];
}
export { css };
