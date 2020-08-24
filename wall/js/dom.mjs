/** wall-dom **/
/*
Concept changed:
single element templating from wall-elem moved here.
wall elem should just be the shorthand wrapper.
wall dom should return a DOM Element.
this will allow it to work nicely with existing tools like jquery.
*/

import * as wall_type from './type.mjs';
import tmplProps from './props.mjs';
import { handleChildren, handleProps } from './elem/util.mjs';

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
		return dom.bind(this, first);
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
	throw new Error('WallDom: bind tagName: bad format');
}

function elemTagTmplBind(params, tind) {
	if (tind == undefined) {
		tind = params.findIndex(isTagTmpl, 0);
	}
	if (tind == 0) {
		return elemTagNameTmplBind(params);
	}
	const props = tmplProps(...params.splice(tind));
	return dom.bind(this, ...params, props);
}

// const dt = dom`div class=turtle`;
export function dom(...params /*node, ...props, ...children*/) {
	if (params.some(isTagTmpl)) {
		return elemTagTmplBind(params);
	}
	const node = params.shift();
	const elem = node instanceof Node ? node : document.createElement(node);
	while (params.length > 0 && wall_type.is('simple', params[0])) {
		handleProps(elem, params.shift());
	}
	handleChildren(elem, ...params);
	return elem;
}
