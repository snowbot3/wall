/** wall-elem **/

//import { is as isType, isSimpleObject, run as typeRun } from './type.mjs';
import * as wall_type from './type.mjs';
import tmplProps from './props.mjs';

import { WallElem } from './elem/base.mjs';
import './elem/list.mjs';
import './elem/frame.mjs';

export { WallElem } from './elem/base.mjs';
export { WallElemList } from './elem/list.mjs';

function isTagTmpl(param) {
	return (
		param instanceof Array
		&& param.raw instanceof Array
	);
}

function elemTagNameTmplBind(params) {
	const raw = Array.from(params[0].raw || params[0]);
	const first = raw[0].trimLeft();
	const nind = first.search(/[=\s]/);
	if (nind == -1 && raw.length == 1) {
		return elem.bind(this, first);
	} else {
		if (nind == -1) {
			return elemTagTmplBind([
				first,
				['', ...(raw.slice(1))],
				...params.slice(1)
			], 1);
		}
		return elemTagTmplBind([
			first.slice(0, nind),
			[first.slice(nind), ...(raw.slice(1))],
			...params.slice(1)
		], 1);
	}
	throw new Error('WallElem: bind tagName: bad format');
}

function elemTagTmplBind(params, tind) {
	if (tind == undefined) {
		tind = params.findIndex(isTagTmpl, 0);
	}
	if (tind == 0) {
		return elemTagNameTmplBind(params);
	}
	const props = tmplProps(...params.splice(tind));
	return elem.bind(this, ...params, props); // stacking binds?
}

// const dt = elem`div class=turtle`;
export function elem(...params /*node, ...props, ...children*/) {
	if (params.some(isTagTmpl)) {
		return elemTagTmplBind(params);
	}
	const node = params.shift();
	const elem = new WallElem(node);
	while (params.length > 0 && wall_type.is('simple', params[0])) {
		elem.props(params.shift());
	}
	elem.append(...params);
	return elem;
}
