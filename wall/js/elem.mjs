/** wall-elem **/

import { dom } from './dom.mjs';
import { WallElem } from './elem/base.mjs';
import './elem/list.mjs';
import './elem/frame.mjs';

export { WallElem } from './elem/base.mjs';
export { WallElemList } from './elem/list.mjs';

// const dt = elem`div class=turtle`;
// still acts like before, but elem templating code is in wall-dom now.
export function elem(...params) {
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
