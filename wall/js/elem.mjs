/** wall-elem **/

//import { is as isType, isSimpleObject, run as typeRun } from './type.mjs';
import * as wall_type from './type.mjs';
import tmplProps from './props.mjs';

import { WallElem } from './elem/base.mjs';
//import { WallElemList } from './elem/list.mjs';
import './elem/frame.mjs';

export { WallElem } from './elem/base.mjs';
export { WallElemList } from './elem/list.mjs';

function isTagTmpl(param) {
	return (
		param instanceof Array
		&& param.raw instanceof Array
	);
}

function elemTagTmplBind(...params) {
	const tind = params.findIndex(isTagTmpl, 1);
	const props = tmplProps(...params.splice(tind));
	return elem.bind(this, ...params, props); // stacking binds?
}

export function elem(node, ...params /*...props, ...children*/) {
	if (params.some(isTagTmpl)) {
		return elemTagTmplBind(node, ...params);
	}
	const elem = new WallElem(node);
	while (params.length > 0 && wall_type.is('simple', params[0])) {
		elem.props(params.shift());
	}
	elem.append(...params);
	return elem;
}
