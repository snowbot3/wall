
export * as type from './type.mjs';
export * as args from './args.mjs';
export { elem } from './elem.mjs';
export { dom } from './dom.mjs';

import * as wall_css from './css.mjs';
function css(...params) {
    wall_css.css(...params);
}
for (let key in wall_css) {
    css[key] = wall_css[key];
}
export { css };
